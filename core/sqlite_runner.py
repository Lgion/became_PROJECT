#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pont d'exécution SQL compatible MySQL -> SQLite pour BECAME LMS.
Utilisé automatiquement par core/db.js lorsque le serveur MySQL local n'est pas démarré.
"""

import json
import os
import re
import sqlite3
import sys

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "became_local.sqlite")


def mysql_concat(*args):
    for a in args:
        if a is None:
            return None
    return "".join(str(a) for a in args)


def mysql_find_in_set(needle, haystack):
    if needle is None or haystack is None:
        return 0
    items = [x.strip() for x in str(haystack).split(",") if x.strip() != ""]
    try:
        return items.index(str(needle).strip()) + 1
    except ValueError:
        return 0


def translate_mysql_to_sqlite(sql):
    s = sql.strip()
    # 1. MySQL autorise "INSERT table_name(...)" sans "INTO"
    s = re.sub(r"(?i)^insert\s+(?!into\b|or\b|ignore\b)([a-zA-Z0-9_]+)\s*\(", r"INSERT OR REPLACE INTO \1(", s)
    s = re.sub(r"(?i)^insert\s+ignore\s+into\s+", "INSERT OR IGNORE INTO ", s)
    s = re.sub(r"(?i)^replace\s+into\s+", "INSERT OR REPLACE INTO ", s)

    # 2. Transformer group_concat(distinct EXPR separator 'SEP') ou group_concat(EXPR separator "SEP")
    # En SQLite, group_concat(DISTINCT expr) n'accepte pas de 2e argument séparateur,
    # donc on utilise une fonction d'agrégation personnalisée mysql_group_concat(expr, sep, is_distinct)
    def repl_gc(match):
        distinct_kw = match.group(1)
        expr = match.group(2).strip()
        sep = match.group(3)
        is_dist = 1 if distinct_kw else 0
        return f"mysql_group_concat({expr}, '{sep}', {is_dist})"

    s = re.sub(
        r"(?i)group_concat\(\s*(distinct\s+)?(.+?)\s+separator\s*['\"]([^'\"]+)['\"]\s*\)",
        repl_gc,
        s
    )

    # 3. En MySQL, "..." est un littéral chaîne de caractères, alors qu'en SQLite standard
    # "..." peut être résolu comme un alias de colonne (ex: SELECT t.fr AS article ... WHERE t.username="article").
    # On convertit les littéraux entre guillemets doubles en littéraux SQL entre apostrophes.
    def repl_dq(match):
        inner = match.group(1).replace('\\"', '"').replace("'", "''")
        return f"'{inner}'"

    s = re.sub(r'"((?:[^"\\]|\\.)*)"', repl_dq, s)
    return s


class MysqlGroupConcat:
    def __init__(self):
        self.values = []
        self.seen = set()
        self.sep = ","

    def step(self, value, sep=",", is_distinct=0):
        if sep is not None:
            self.sep = str(sep)
        if value is None:
            return
        sval = str(value)
        if is_distinct:
            if sval not in self.seen:
                self.seen.add(sval)
                self.values.append(sval)
        else:
            self.values.append(sval)

    def finalize(self):
        if not self.values:
            return None
        return self.sep.join(self.values)


def run_queries(queries):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.create_function("concat", -1, mysql_concat)
    conn.create_function("FIND_IN_SET", 2, mysql_find_in_set)
    conn.create_function("find_in_set", 2, mysql_find_in_set)
    conn.create_aggregate("mysql_group_concat", 3, MysqlGroupConcat)

    cur = conn.cursor()
    results = []
    for raw_sql in queries:
        sql = translate_mysql_to_sqlite(raw_sql)
        cur.execute(sql)
        if sql.lstrip().upper().startswith(("SELECT", "PRAGMA")):
            rows = [dict(r) for r in cur.fetchall()]
            results.append(rows)
        else:
            conn.commit()
            results.append({
                "insertId": cur.lastrowid,
                "affectedRows": cur.rowcount
            })
    conn.close()
    return results


def main():
    payload = json.loads(sys.stdin.read())
    queries = payload.get("queries", [])
    try:
        res = run_queries(queries)
        print(json.dumps({"ok": True, "data": res}, ensure_ascii=False))
    except Exception as e:
        print(json.dumps({"ok": False, "error": str(e)}, ensure_ascii=False))
        sys.exit(1)


if __name__ == "__main__":
    main()

