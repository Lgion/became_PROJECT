-- ============================================================================
-- BECAME LMS - Schéma complet de la base de données MySQL / MariaDB
-- ============================================================================
CREATE DATABASE IF NOT EXISTS became DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE became;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS _varchar;
DROP TABLE IF EXISTS _text_;
DROP TABLE IF EXISTS _text;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS profs;
DROP TABLE IF EXISTS ressources;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS sujets;
DROP TABLE IF EXISTS matieres;
DROP TABLE IF EXISTS filieres;
DROP TABLE IF EXISTS niveaux;
DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

-- 1. Table des utilisateurs (étudiants, professeurs, administrateurs)
CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    pseudo VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'étudiant',
    avatar VARCHAR(255) DEFAULT '/imgs/select_void.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Table des menus principaux (1: Scolaires, 2: Universitaires, 3: Professionnels, 4: Passions)
CREATE TABLE menus (
    id_menus INT AUTO_INCREMENT PRIMARY KEY,
    alias VARCHAR(255) NOT NULL,
    user_id INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_user) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Table des niveaux (ex: 6ème..Terminale pour Scolaires, BTS/Licence/Master pour Universitaires...)
CREATE TABLE niveaux (
    id_niveaux INT AUTO_INCREMENT PRIMARY KEY,
    alias VARCHAR(255) NOT NULL,
    user_id INT DEFAULT 1,
    fk INT NOT NULL COMMENT 'Référence menus.id_menus',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_user) ON DELETE SET NULL,
    FOREIGN KEY (fk) REFERENCES menus(id_menus) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Table des filières (ex: Scientifique, Littéraire, Génie Logiciel...)
-- Note : Les niveaux du collège (id_niveaux 1,2,3,4,8 avec data-bool="false") possèdent
-- une filière directe de même ID (id_filieres 1,2,3,4,8) pour le court-circuit vers /_/matieres/:id
CREATE TABLE filieres (
    id_filieres INT AUTO_INCREMENT PRIMARY KEY,
    alias VARCHAR(255) NOT NULL,
    user_id INT DEFAULT 1,
    fk INT NOT NULL COMMENT 'Référence niveaux.id_niveaux',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_user) ON DELETE SET NULL,
    FOREIGN KEY (fk) REFERENCES niveaux(id_niveaux) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Table des matières / compétences / topics
CREATE TABLE matieres (
    id_matieres INT AUTO_INCREMENT PRIMARY KEY,
    alias VARCHAR(255) NOT NULL,
    user_id INT DEFAULT 1,
    fk INT NOT NULL COMMENT 'Référence filieres.id_filieres',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_user) ON DELETE SET NULL,
    FOREIGN KEY (fk) REFERENCES filieres(id_filieres) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Table des sujets pédagogiques
CREATE TABLE sujets (
    id_sujets INT AUTO_INCREMENT PRIMARY KEY,
    alias VARCHAR(255) NOT NULL,
    user_id INT DEFAULT 1,
    fk INT NOT NULL COMMENT 'Référence matieres.id_matieres',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_user) ON DELETE SET NULL,
    FOREIGN KEY (fk) REFERENCES matieres(id_matieres) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Table des professeurs
CREATE TABLE profs (
    id_profs INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    href VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    id_matieres INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_matieres) REFERENCES matieres(id_matieres) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Table des cours (avec timeline `tl` et archive live `tl_`)
CREATE TABLE courses (
    id_courses INT AUTO_INCREMENT PRIMARY KEY,
    pays VARCHAR(50) DEFAULT 'fr',
    langue VARCHAR(50) DEFAULT 'fr',
    href VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_descr TEXT,
    descr TEXT,
    tl LONGTEXT COMMENT 'JSON: {"phases":[...],"items":[...],"live":[...]}',
    tl_ LONGTEXT COMMENT 'JSON sauvegardé à la fin du cours via /_/endcourse',
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    duree INT DEFAULT 60 COMMENT 'Durée en minutes',
    likes TEXT COMMENT 'Tableau JSON des IDs users ayant liké, ex: [1,4]',
    shares INT DEFAULT 0,
    views TEXT COMMENT 'Tableau JSON des timestamps/dates de vues',
    note TEXT COMMENT 'Tableau JSON des notes attribuées, ex: [5,4,5]',
    coms TEXT COMMENT 'Tableau JSON des commentaires',
    type_id INT DEFAULT 1 COMMENT 'Référence _varchar(id) avec username=c_type',
    tag_ids VARCHAR(255) DEFAULT '1',
    prix DECIMAL(10, 2) DEFAULT 0.00,
    ressource_ids VARCHAR(255) DEFAULT '1',
    profs_id INT NOT NULL,
    fk INT NOT NULL COMMENT 'Référence sujets.id_sujets',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (profs_id) REFERENCES profs(id_profs) ON DELETE CASCADE,
    FOREIGN KEY (fk) REFERENCES sujets(id_sujets) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Table des ressources pédagogiques
CREATE TABLE ressources (
    id_ressources INT AUTO_INCREMENT PRIMARY KEY,
    pays VARCHAR(50) DEFAULT 'fr',
    langue VARCHAR(50) DEFAULT 'fr',
    href VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_descr TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    likes TEXT COMMENT 'Tableau JSON, ex: [1,2,4]',
    shares INT DEFAULT 0,
    views TEXT COMMENT 'Tableau JSON des dates de consultation',
    note TEXT COMMENT 'Tableau JSON des notes, ex: [5,5,4]',
    coms TEXT COMMENT 'Tableau JSON des commentaires',
    type_id INT DEFAULT 1 COMMENT 'Référence _varchar(id) avec username=r_type',
    tag_ids VARCHAR(255) DEFAULT '1',
    profs_id INT DEFAULT NULL,
    user_id INT NOT NULL,
    json LONGTEXT COMMENT 'Arborescence JSON dir_*/file_* des fichiers de la ressource',
    sujets_id INT NOT NULL COMMENT 'Référence sujets.id_sujets',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (profs_id) REFERENCES profs(id_profs) ON DELETE SET NULL,
    FOREIGN KEY (sujets_id) REFERENCES sujets(id_sujets) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Table des classes virtuelles
CREATE TABLE classes (
    id_classes INT AUTO_INCREMENT PRIMARY KEY,
    langue VARCHAR(50) DEFAULT 'fr',
    pays VARCHAR(50) DEFAULT 'fr',
    href VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_descr TEXT,
    meta TEXT,
    type_id INT DEFAULT 1 COMMENT 'Référence _varchar(id) avec username=cl_type',
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    start DATETIME DEFAULT CURRENT_TIMESTAMP,
    end DATETIME DEFAULT CURRENT_TIMESTAMP,
    eleve_ids VARCHAR(255) DEFAULT '',
    prof_ids VARCHAR(255) DEFAULT '',
    filieres_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (filieres_id) REFERENCES filieres(id_filieres) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. Table des mots-clés (tags multilingues)
CREATE TABLE tags (
    id_tags INT AUTO_INCREMENT PRIMARY KEY,
    fr VARCHAR(255) NOT NULL,
    en VARCHAR(255) DEFAULT NULL,
    es VARCHAR(255) DEFAULT NULL,
    de VARCHAR(255) DEFAULT NULL,
    jp VARCHAR(255) DEFAULT NULL,
    cn VARCHAR(255) DEFAULT NULL,
    ar VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. Table _text : articles de présentation JSON ({header, main, footer}) et traductions globales
CREATE TABLE _text (
    id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    fr LONGTEXT,
    en LONGTEXT,
    es LONGTEXT,
    de LONGTEXT,
    jp LONGTEXT,
    cn LONGTEXT,
    ar LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id, username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 13. Table _text_ : métadonnées de liens JSON ({href, html, title, img, meta})
CREATE TABLE _text_ (
    id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    fr LONGTEXT,
    en LONGTEXT,
    es LONGTEXT,
    de LONGTEXT,
    jp LONGTEXT,
    cn LONGTEXT,
    ar LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id, username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 14. Table _varchar : nomenclatures typées (cl_type, c_type, r_type, b_params)
CREATE TABLE _varchar (
    id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    fr VARCHAR(1000),
    en VARCHAR(1000),
    es VARCHAR(1000),
    de VARCHAR(1000),
    jp VARCHAR(1000),
    cn VARCHAR(1000),
    ar VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id, username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
