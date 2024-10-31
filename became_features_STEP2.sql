-- became_features_STEP2.sql
-- Génération des données pour la base became
-- Date: 2024-10-31

SET FOREIGN_KEY_CHECKS=0;

-- Nettoyage des tables existantes
TRUNCATE TABLE users;
TRUNCATE TABLE profs;
TRUNCATE TABLE niveaux;
TRUNCATE TABLE filieres;
TRUNCATE TABLE matieres;
TRUNCATE TABLE sujets;
TRUNCATE TABLE courses;
TRUNCATE TABLE ressources;
TRUNCATE TABLE classes;
TRUNCATE TABLE tags;
TRUNCATE TABLE _text;
TRUNCATE TABLE _text_;
TRUNCATE TABLE _varchar;

-- Section 1: Users et Profs
INSERT INTO users (nom, prenom, pseudo, password, email, role) VALUES
-- Admins
('Dupont', 'Michel', 'mdupont', SHA2('admin123', 256), 'michel.dupont@became.edu', 'admin'),
('Garcia', 'Maria', 'mgarcia', SHA2('admin456', 256), 'maria.garcia@became.edu', 'admin'),
-- Professeurs
('Martin', 'Sophie', 'smartin', SHA2('prof123', 256), 'sophie.martin@became.edu', 'professeur'),
('Bernard', 'Luc', 'lbernard', SHA2('prof456', 256), 'luc.bernard@became.edu', 'professeur'),
-- Suite des insertions...
-- Suite des insertions users
('Petit', 'Claire', 'cpetit', SHA2('prof789', 256), 'claire.petit@became.edu', 'professeur'),
('Dubois', 'Pierre', 'pdubois', SHA2('prof101', 256), 'pierre.dubois@became.edu', 'professeur'),
('Moreau', 'Anne', 'amoreau', SHA2('prof102', 256), 'anne.moreau@became.edu', 'professeur'),
-- Étudiants
('Leroy', 'Thomas', 'tleroy', SHA2('etud123', 256), 'thomas.leroy@became.edu', 'étudiant'),
('Roux', 'Julie', 'jroux', SHA2('etud456', 256), 'julie.roux@became.edu', 'étudiant'),
('Simon', 'Lucas', 'lsimon', SHA2('etud789', 256), 'lucas.simon@became.edu', 'étudiant');

-- Insertion des professeurs
INSERT INTO profs (id_user, href, name, title, id_matieres) VALUES
(3, '/profs/sophie-martin', 'Sophie Martin', 'Docteur en Mathématiques', 1),
(4, '/profs/luc-bernard', 'Luc Bernard', 'Professeur de Physique', 2),
(5, '/profs/claire-petit', 'Claire Petit', 'Maître de conférences en Informatique', 3);

-- Insertion des niveaux scolaires et autres
INSERT INTO niveaux (nom, niveau) VALUES
-- Scolaire
('6ème', 1),
('5ème', 2),
('4ème', 3),
('3ème', 4),
('2nde', 5),
('1ère', 6),
('Terminale', 7),
-- Universitaire
('Licence 1', 8),
('Licence 2', 9),
('Licence 3', 10),
('Master 1', 11),
('Master 2', 12),
-- Professionnel
('Débutant', 13),
('Intermédiaire', 14),
('Expert', 15);

-- Insertion des filières
INSERT INTO filieres (alias, niveau_id) VALUES
-- Scolaire 6ème
('Sciences', 1),
('Lettres', 1),
('Langues', 1),
-- Universitaire
('Informatique', 8),
('Mathématiques', 8),
('Physique', 8);
-- Insertion des matières
INSERT INTO matieres (alias, filiere_id) VALUES
-- Pour la filière Sciences 6ème
('Mathématiques', 1),
('Physique-Chimie', 1),
('SVT', 1),
-- Pour la filière Lettres 6ème
('Français', 2),
('Histoire-Géographie', 2),
('Education civique', 2),
-- Pour la filière Informatique université
('Programmation', 4),
('Algorithmes', 4),
('Bases de données', 4);

-- Insertion des sujets
INSERT INTO sujets (alias, user_id, fk) VALUES
-- Mathématiques 6ème
('Nombres décimaux', 3, 1),
('Fractions', 3, 1),
('Géométrie plane', 3, 1),
-- Programmation
('Python débutant', 5, 7),
('Algorithmes de base', 5, 8),
('SQL fondamentaux', 5, 9);

-- Insertion des tags
INSERT INTO tags (fr, en, es) VALUES
('Mathématiques', 'Mathematics', 'Matemáticas'),
('Programmation', 'Programming', 'Programación'),
('Débutant', 'Beginner', 'Principiante'),
('Intermédiaire', 'Intermediate', 'Intermedio'),
('Avancé', 'Advanced', 'Avanzado'),
('Exercices', 'Exercises', 'Ejercicios'),
('Cours', 'Course', 'Curso'),
('Évaluation', 'Assessment', 'Evaluación');

-- Insertion des cours
INSERT INTO courses (pays, langue, href, name, title, short_descr, descr, tl, date, duree, likes, shares, views, note, coms, type_id, tag_ids, prix, ressource_ids, profs_id, fk) VALUES
('France', 'fr', '/cours/mathematiques/decimaux', 'decimaux', 'Les nombres décimaux', 'Introduction aux nombres décimaux', 'Cours complet sur les nombres décimaux', 'Mathématiques, Arithmétique', NOW(), 60, 
'{"likes": []}', 0, '[]', '[]', '[]', 1, '1,3', 0.00, '1,2', 1, 1),

('France', 'fr', '/cours/python/bases', 'python-bases', 'Les bases de Python', 'Premiers pas en programmation Python', 'Découvrez la programmation avec Python', 'Programmation, Python', NOW(), 120,
'{"likes": []}', 0, '[]', '[]', '[]', 1, '2,3', 29.99, '3,4', 3, 4);

-- Insertion des ressources
INSERT INTO ressources (pays, langue, href, name, title, short_descr, date, likes, shares, views, note, coms, type_id, tag_ids, profs_id, user_id, json, sujets_id) VALUES
('France', 'fr', '/ressources/maths/exercices-decimaux', 'exercices-decimaux', 'Exercices sur les décimaux', 'Série d\'exercices pratiques', NOW(),
'{"likes": []}', 0, '[]', '[]', '[]', 7, '1,6', 1, 1, '{"type": "pdf", "difficulty": "easy"}', 1),

('France', 'fr', '/ressources/python/tp-introduction', 'tp-introduction', 'TP d\'introduction à Python', 'Travaux pratiques pour débuter', NOW(),
'{"likes": []}', 0, '[]', '[]', '[]', 7, '2,3,6', 3, 1, '{"type": "pdf", "difficulty": "beginner"}', 4);

-- Insertion des classes
INSERT INTO classes (langue, pays, href, name, title, short_descr, meta, type_id, date, start, end, eleve_ids, prof_ids, filieres_id) VALUES
('fr', 'France', '/classes/6eme-maths', '6eme-maths', 'Mathématiques 6ème', 'Classe de mathématiques niveau 6ème', 
'{"niveau": "6ème", "année": "2024-2025"}', 1, NOW(), '2024-09-01 08:00:00', '2025-06-30 18:00:00', '8,9,10', '3', 1),

('fr', 'France', '/classes/l1-info', 'l1-info', 'L1 Informatique', 'Classe de L1 informatique', 
'{"niveau": "L1", "année": "2024-2025"}', 1, NOW(), '2024-09-01 08:00:00', '2025-06-30 18:00:00', '8,9,10', '5', 4);

-- Insertion des traductions (_text)
INSERT INTO _text (id, username, fr, en, es) VALUES
('welcome', 'admin', 'Bienvenue sur la plateforme Became', 'Welcome to Became platform', 'Bienvenido a la plataforma Became'),
('about', 'admin', 'À propos de nous', 'About us', 'Sobre nosotros'),

('course_math_1', 'courses', 
'{"header": {"title": "Les nombres décimaux", "subtitle": "Initiation"}, "content": "Découvrez les nombres décimaux"}',
'{"header": {"title": "Decimal numbers", "subtitle": "Introduction"}, "content": "Discover decimal numbers"}',
'{"header": {"title": "Números decimales", "subtitle": "Iniciación"}, "content": "Descubre los números decimales"}');

-- Insertion des types (_varchar)
INSERT INTO _varchar (username, fr, en, es) VALUES
('course_type', 'Cours vidéo', 'Video course', 'Curso en video'),
('course_type', 'Cours écrit', 'Written course', 'Curso escrito'),
('course_type', 'Cours interactif', 'Interactive course', 'Curso interactivo'),

('resource_type', 'Document PDF', 'PDF Document', 'Documento PDF'),
('resource_type', 'Vidéo', 'Video', 'Video'),
('resource_type', 'Quiz', 'Quiz', 'Cuestionario');

SET FOREIGN_KEY_CHECKS=1;