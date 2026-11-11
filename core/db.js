const mysql = require('mysql')
const transac = require('node-mysql-transaction')
const { spawn } = require('child_process')
const path = require('path')
const settings = require('./settings')

let useSqliteFallback = false

function objLength(obj) {
	var k = 0
	for (var i in obj) k++
	return k
}

function getMysqlParams(bdd = false) {
	let params = Object.assign({}, settings.dbConfig)
	if (typeof params.password === 'undefined' && typeof params.pwd !== 'undefined') {
		params.password = params.pwd
	}
	if (bdd !== false) params.database = bdd
	return params
}

function runSqliteFallback(queries, cb) {
	const isArray = Array.isArray(queries)
	const queryList = isArray ? queries : [queries]
	const py = spawn('python3', [path.join(__dirname, 'sqlite_runner.py')])
	let stdout = ''
	let stderr = ''

	py.stdout.on('data', (chunk) => {
		stdout += chunk.toString()
	})
	py.stderr.on('data', (chunk) => {
		stderr += chunk.toString()
	})
	py.on('close', (code) => {
		try {
			const parsed = JSON.parse(stdout)
			if (!parsed.ok) {
				console.error('Erreur SQL (SQLite fallback) :', parsed.error)
				return cb(null, new Error(parsed.error))
			}
			cb(isArray ? parsed.data : parsed.data[0])
		} catch (err) {
			console.error('Erreur critique SQLite fallback :', stderr || err)
			cb(null, err)
		}
	})
	py.stdin.write(JSON.stringify({ queries: queryList }))
	py.stdin.end()
}

function executeSql_(sql, cb, bdd = false) {
	if (useSqliteFallback) {
		return runSqliteFallback(sql, cb)
	}
	let params = getMysqlParams(bdd)
	let connection = mysql.createConnection(params)
	connection.connect((err) => {
		if (err) {
			if (err.code === 'ECONNREFUSED' || err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ER_ACCESS_DENIED_ERROR') {
				console.log('[DB] MySQL indisponible (' + err.code + ') -> bascule automatique sur core/became_local.sqlite')
				useSqliteFallback = true
				return runSqliteFallback(sql, cb)
			}
			console.log('executeSql_:: ' + err + '\nimpossible de se connecter avec les données : \n', params)
			return cb(null, err)
		}
		connection.query(sql, (qErr, res) => {
			connection.end()
			if (qErr) {
				console.log(qErr + '\nerreur dans la requete sql : ' + sql)
				cb(null, qErr)
			} else {
				cb(res)
			}
		})
	})
}

exports.executeSql = (sql, cb, bdd = false) => {
	executeSql_(sql, cb, bdd)
}

function executeTransaction_(sql, cb, connection = '', bdd = false, t = []) {
	if (typeof sql === 'string') sql = [sql]
	if (useSqliteFallback) {
		return runSqliteFallback(sql, (res, err) => {
			if (err) return cb(null, err)
			cb(t.length ? t.concat(res) : res)
		})
	}
	let tab = []
	let sql_ = ''
	sql.forEach(function (item, j) {
		if (j !== 0) tab.push(item)
		else sql_ = item
	})
	executeSql_(sql_, (data, err) => {
		if (err) return cb(null, err)
		t.push(data)
		if (tab.length !== 0) executeTransaction_(tab, cb, connection, bdd, t)
		else cb(t)
	}, bdd)
}

exports.executeTransaction = (sql, cb, connection = '', bdd = false) => {
	executeTransaction_(sql, cb, connection, bdd)
}

function transaction_(sql, cb, bdd, keys = '', t = [], chain = '') {
	if ((typeof t.length !== 'undefined' && t.length === 0) || (typeof t.length === 'undefined' && objLength(t) === 0)) {
		let params = getMysqlParams(bdd)
		let tr = transac({
			connection: [mysql.createConnection, params],
			dynamicConnection: 32,
			idleConnectionCutoffTime: 1000,
			timeout: 600
		})
		chain = tr.chain()
	}

	let sql_ = sql.shift()
	chain.on('commit', function () {
		cb(t)
	}).on('rollback', function (err) {
		console.log(err.code)
		cb(null, err)
	})
	chain.query(sql_).on('result', function (data) {
		if (keys === '') t.push(data)
		else t[keys.shift()] = data
		if (sql.length === 0) chain.commit()
		else transaction_(sql, cb, bdd, keys, t, chain)
	})
}

exports.transaction = (sql, cb, keys = [], bdd = false) => {
	if (keys.length !== 0) {
		if (sql.length === keys.length) transaction_(sql, cb, bdd, keys, {})
		else {
			console.log("les tailles des arrays 'sql' et 'key' ne correspondent pas")
			cb({ error: "les tailles des arrays 'sql' et 'key' ne correspondent pas" })
		}
	} else transaction_(sql, cb, bdd)
}
