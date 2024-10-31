-- Création de la base de données
CREATE DATABASE IF NOT EXISTS became;
USE became;

-- Table des utilisateurs
CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    pseudo VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des niveaux
CREATE TABLE niveaux (
    id_niveaux INT AUTO_INCREMENT PRIMARY KEY,
    alias VARCHAR(255),
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_user)
);

-- Table des filières
CREATE TABLE filieres (
    id_filieres INT AUTO_INCREMENT PRIMARY KEY,
    alias VARCHAR(255),
    user_id INT,
    fk INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_user),
    FOREIGN KEY (fk) REFERENCES niveaux(id_niveaux)
);

-- Table des matières
CREATE TABLE matieres (
    id_matieres INT AUTO_INCREMENT PRIMARY KEY,
    alias VARCHAR(255),
    user_id INT,
    fk INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_user),
    FOREIGN KEY (fk) REFERENCES filieres(id_filieres)
);

-- Table des sujets
CREATE TABLE sujets (
    id_sujets INT AUTO_INCREMENT PRIMARY KEY,
    alias VARCHAR(255),
    user_id INT,
    fk INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_user),
    FOREIGN KEY (fk) REFERENCES matieres(id_matieres)
);

-- Table des cours
CREATE TABLE courses (
    id_courses INT AUTO_INCREMENT PRIMARY KEY,
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
    prix DECIMAL(10, 2),
    ressource_ids VARCHAR(255),
    profs_id INT,
    fk INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (fk) REFERENCES sujets(id_sujets)
);

-- Table des ressources
CREATE TABLE ressources (
    id_ressources INT AUTO_INCREMENT PRIMARY KEY,
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
    FOREIGN KEY (user_id) REFERENCES users(id_user),
    FOREIGN KEY (sujets_id) REFERENCES sujets(id_sujets)
);

-- Table des professeurs
CREATE TABLE profs (
    id_profs INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    href VARCHAR(255),
    name VARCHAR(255),
    title VARCHAR(255),
    id_matieres INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_matieres) REFERENCES matieres(id_matieres)
);

-- Table des classes
CREATE TABLE classes (
    id_classes INT AUTO_INCREMENT PRIMARY KEY,
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
    FOREIGN KEY (filieres_id) REFERENCES filieres(id_filieres)
);

-- Table des tags
CREATE TABLE tags (
    id_tags INT AUTO_INCREMENT PRIMARY KEY,
    fr VARCHAR(255),
    en VARCHAR(255),
    es VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des traductions de texte
CREATE TABLE _text (
    id VARCHAR(255),
    username VARCHAR(255),
    fr TEXT,
    en TEXT,
    es TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id, username)
);

-- Table des traductions de texte étendue
CREATE TABLE _text_ (
    id INT,
    username VARCHAR(255),
    fr TEXT,
    en TEXT,
    es TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id, username)
);

-- Table des variables
CREATE TABLE _varchar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    fr VARCHAR(255),
    en VARCHAR(255),
    es VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);