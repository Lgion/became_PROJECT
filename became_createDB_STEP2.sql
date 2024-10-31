-- became_createDB_STEP2.sql
-- Date: 2024-10-31

DROP DATABASE IF EXISTS became;
CREATE DATABASE became;
USE became;

-- Table _text (textes longs multilingues)
CREATE TABLE _text (
    id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    fr TEXT,
    en TEXT,
    es TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id, username)
);

-- Table _text_ (textes longs multilingues avec ID numérique)
CREATE TABLE _text_ (
    id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    fr TEXT,
    en TEXT,
    es TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id, username)
);

-- Table _varchar (textes courts multilingues)
CREATE TABLE _varchar (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    fr VARCHAR(255),
    en VARCHAR(255),
    es VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Table users
CREATE TABLE users (
    id_user INT NOT NULL AUTO_INCREMENT,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    pseudo VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_user)
);

-- Table niveaux
CREATE TABLE niveaux (
    id_niveaux INT NOT NULL AUTO_INCREMENT,
    nom VARCHAR(255),
    niveau INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_niveaux)
);

-- Table filieres
CREATE TABLE filieres (
    id_filieres INT NOT NULL AUTO_INCREMENT,
    alias VARCHAR(255),
    niveau_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_filieres),
    FOREIGN KEY (niveau_id) REFERENCES niveaux(id_niveaux)
);

-- Table matieres
CREATE TABLE matieres (
    id_matieres INT NOT NULL AUTO_INCREMENT,
    alias VARCHAR(255),
    filiere_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_matieres),
    FOREIGN KEY (filiere_id) REFERENCES filieres(id_filieres)
);

-- Table profs
CREATE TABLE profs (
    id_profs INT NOT NULL AUTO_INCREMENT,
    id_user INT,
    href VARCHAR(255),
    name VARCHAR(255),
    title VARCHAR(255),
    id_matieres INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_profs),
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_matieres) REFERENCES matieres(id_matieres)
);

-- Table sujets
CREATE TABLE sujets (
    id_sujets INT NOT NULL AUTO_INCREMENT,
    alias VARCHAR(255),
    user_id INT,
    fk INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_sujets),
    FOREIGN KEY (user_id) REFERENCES users(id_user),
    FOREIGN KEY (fk) REFERENCES matieres(id_matieres)
);

-- Table tags
CREATE TABLE tags (
    id_tags INT NOT NULL AUTO_INCREMENT,
    fr VARCHAR(255),
    en VARCHAR(255),
    es VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_tags)
);

-- Table courses
CREATE TABLE courses (
    id_courses INT NOT NULL AUTO_INCREMENT,
    pays VARCHAR(50),
    langue VARCHAR(50),
    href VARCHAR(255),
    name VARCHAR(255),
    title VARCHAR(255),
    short_descr TEXT,
    descr TEXT,
    tl TEXT,
    date DATETIME,
    duree INT,
    likes JSON,
    shares INT,
    views JSON,
    note JSON,
    coms JSON,
    type_id INT,
    tag_ids VARCHAR(255),
    prix DECIMAL(10,2),
    ressource_ids VARCHAR(255),
    profs_id INT,
    fk INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_courses),
    FOREIGN KEY (fk) REFERENCES sujets(id_sujets),
    FOREIGN KEY (profs_id) REFERENCES profs(id_profs)
);

-- Table ressources
CREATE TABLE ressources (
    id_ressources INT NOT NULL AUTO_INCREMENT,
    pays VARCHAR(50),
    langue VARCHAR(50),
    href VARCHAR(255),
    name VARCHAR(255),
    title VARCHAR(255),
    short_descr TEXT,
    date DATETIME,
    likes JSON,
    shares INT,
    views JSON,
    note JSON,
    coms JSON,
    type_id INT,
    tag_ids VARCHAR(255),
    profs_id INT,
    user_id INT,
    json JSON,
    sujets_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_ressources),
    FOREIGN KEY (user_id) REFERENCES users(id_user),
    FOREIGN KEY (sujets_id) REFERENCES sujets(id_sujets),
    FOREIGN KEY (profs_id) REFERENCES profs(id_profs)
);


-- Table classes
CREATE TABLE classes (
    id_classes INT NOT NULL AUTO_INCREMENT,
    langue VARCHAR(50),
    pays VARCHAR(50),
    href VARCHAR(255),
    name VARCHAR(255),
    title VARCHAR(255),
    short_descr TEXT,
    meta TEXT,
    type_id INT,
    date DATETIME,
    start DATETIME,
    end DATETIME,
    eleve_ids VARCHAR(255),
    prof_ids VARCHAR(255),
    filieres_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_classes),
    FOREIGN KEY (filieres_id) REFERENCES filieres(id_filieres)
);

-- Index additionnels pour optimiser les performances
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_courses_langue ON courses(langue);
CREATE INDEX idx_ressources_langue ON ressources(langue);
CREATE INDEX idx_classes_langue ON classes(langue);
CREATE INDEX idx_matieres_filiere ON matieres(filiere_id);
CREATE INDEX idx_sujets_matiere ON sujets(fk);
CREATE INDEX idx_profs_matiere ON profs(id_matieres);

-- Optimisation des recherches textuelles
CREATE FULLTEXT INDEX ft_courses_title ON courses(title, short_descr);
CREATE FULLTEXT INDEX ft_ressources_title ON ressources(title, short_descr);
CREATE FULLTEXT INDEX ft_classes_title ON classes(title, short_descr);

-- Configuration des contraintes
SET FOREIGN_KEY_CHECKS = 1;
SET UNIQUE_CHECKS = 1;
SET AUTOCOMMIT = 1;
SET CHARACTER SET utf8mb4;
SET COLLATION_CONNECTION = 'utf8mb4_unicode_ci';

-- Privilèges (à adapter selon vos besoins)
-- GRANT ALL PRIVILEGES ON became.* TO 'became_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
-- FLUSH PRIVILEGES;