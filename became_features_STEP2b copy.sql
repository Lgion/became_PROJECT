USE became;

-- Insertion dans la table _text
INSERT INTO _text (id, username, fr, en, es) VALUES
('welcome_msg', 'admin', 'Bienvenue sur Became', 'Welcome to Became', 'Bienvenido a Became'),
('about_text', 'admin', 'À propos de nous...', 'About us...', 'Sobre nosotros...'),
('privacy_policy', 'admin', 'Politique de confidentialité...', 'Privacy policy...', 'Política de privacidad...');
-- [... autres entrées ...]

-- Insertion dans la table _text_
INSERT INTO _text_ (id, username, fr, en, es) VALUES
(1, 'admin', 'Description détaillée du cours de mathématiques...', 'Detailed mathematics course description...', 'Descripción detallada del curso de matemáticas...'),
(2, 'admin', 'Guide complet de programmation...', 'Complete programming guide...', 'Guía completa de programación...'),
(3, 'smartin', 'Cours avancé d''algèbre...', 'Advanced algebra course...', 'Curso avanzado de álgebra...');
-- [... autres entrées ...]

-- Insertion dans la table _varchar
INSERT INTO _varchar (username, fr, en, es) VALUES
('admin', 'Accueil', 'Home', 'Inicio'),
('admin', 'Connexion', 'Login', 'Iniciar sesión'),
('admin', 'Inscription', 'Register', 'Registrarse');
-- [... autres entrées ...]

-- PREMIÈRE ÉTAPE : Insertion dans la table users (avec IDs explicites)
ALTER TABLE users AUTO_INCREMENT = 1;
INSERT INTO users (id_user, nom, prenom, pseudo, password, email, role) VALUES
(1, 'Admin', 'System', 'admin', SHA2('admin123', 256), 'admin@became.com', 'admin'),
(2, 'Dubois', 'Jean', 'jdubois', SHA2('pass123', 256), 'jean.dubois@email.com', 'admin'),
(3, 'Martin', 'Sophie', 'smartin', SHA2('pass124', 256), 'sophie.martin@email.com', 'prof'),
(4, 'Bernard', 'Michel', 'mbernard', SHA2('pass125', 256), 'michel.bernard@email.com', 'prof'),
(5, 'Petit', 'Marie', 'mpetit', SHA2('pass126', 256), 'marie.petit@email.com', 'student'),
(6, 'Garcia', 'Antonio', 'agarcia', SHA2('pass127', 256), 'antonio.garcia@email.com', 'prof');

-- DEUXIÈME ÉTAPE : Insertion dans la table niveaux
INSERT INTO niveaux (alias, user_id) VALUES
('Primaire', 1),
('Collège', 1),
('Lycée', 1),
('Licence', 1),
('Master', 1);

-- TROISIÈME ÉTAPE : Insertion dans la table filieres
INSERT INTO filieres (alias, user_id, fk) VALUES
('Sciences', 1, 3),
('Littérature', 1, 3),
('Économie', 1, 3),
('Informatique', 1, 4),
('Mathématiques', 1, 4);

-- QUATRIÈME ÉTAPE : Insertion dans la table matieres
INSERT INTO matieres (alias, user_id, fk) VALUES
('Mathématiques', 1, 1),
('Physique-Chimie', 1, 1),
('SVT', 1, 1),
('Français', 1, 2),
('Histoire-Géo', 1, 2),
('Économie', 1, 3),
('Programmation', 1, 4),
('Algorithmes', 1, 4),
('Bases de données', 1, 4);

-- CINQUIÈME ÉTAPE : Insertion dans la table profs
INSERT INTO profs (id_user, href, name, title, id_matieres) VALUES
(2, '/prof/smartin', 'Sophie Martin', 'Professeur de Mathématiques', 1),
(3, '/prof/mbernard', 'Michel Bernard', 'Professeur de Physique', 2),
(5, '/prof/agarcia', 'Antonio Garcia', 'Professeur d''Informatique', 7);

-- SIXIÈME ÉTAPE : Insertion dans la table sujets
INSERT INTO sujets (alias, user_id, fk) VALUES
('Algèbre linéaire', 2, 1),
('Géométrie', 2, 1),
('Mécanique quantique', 3, 2),
('Programmation orientée objet', 5, 7),
('Structures de données', 5, 8);

-- SEPTIÈME ÉTAPE : Insertion dans la table tags
INSERT INTO tags (fr, en, es) VALUES
('Débutant', 'Beginner', 'Principiante'),
('Intermédiaire', 'Intermediate', 'Intermedio'),
('Avancé', 'Advanced', 'Avanzado'),
('Pratique', 'Practical', 'Práctico'),
('Théorie', 'Theory', 'Teoría');

-- HUITIÈME ÉTAPE : Insertion dans la table courses
INSERT INTO courses (pays, langue, href, name, title, short_descr, duree, likes, shares, views, note, coms, type_id, tag_ids, prix, profs_id, fk) VALUES
('FR', 'fr', '/course/math101', 'math101', 'Introduction aux mathématiques', 'Cours de base en mathématiques', 60, '{"count": 150}', 45, '{"total": 1200}', '{"avg": 4.5}', '{"count": 25}', 1, '1,4', 29.99, 1, 1),
('FR', 'fr', '/course/phys101', 'phys101', 'Physique fondamentale', 'Les bases de la physique', 45, '{"count": 120}', 30, '{"total": 800}', '{"avg": 4.2}', '{"count": 18}', 1, '1,5', 24.99, 2, 3),
('FR', 'fr', '/course/prog101', 'prog101', 'Programmation Java', 'Apprendre Java', 90, '{"count": 200}', 60, '{"total": 1500}', '{"avg": 4.8}', '{"count": 35}', 1, '1,4', 39.99, 3, 4);

-- NEUVIÈME ÉTAPE : Insertion dans la table ressources
INSERT INTO ressources (pays, langue, href, name, title, short_descr, likes, shares, views, note, coms, type_id, tag_ids, profs_id, user_id, json, sujets_id) VALUES
('FR', 'fr', '/resource/math-ex1', 'math-ex1', 'Exercices d''algèbre', 'Série d''exercices', '{"count": 75}', 25, '{"total": 500}', '{"avg": 4.3}', '{"count": 12}', 1, '1,4', 1, 1, '{"type": "pdf"}', 1),
('FR', 'fr', '/resource/phys-doc1', 'phys-doc1', 'Documentation physique', 'Support de cours', '{"count": 60}', 20, '{"total": 400}', '{"avg": 4.1}', '{"count": 8}', 2, '2,5', 2, 2, '{"type": "doc"}', 3),
('FR', 'fr', '/resource/prog-tp1', 'prog-tp1', 'TP Java', 'Travaux pratiques', '{"count": 90}', 30, '{"total": 600}', '{"avg": 4.6}', '{"count": 15}', 3, '1,4', 3, 3, '{"type": "zip"}', 4);

-- DIXIÈME ÉTAPE : Insertion dans la table classes
INSERT INTO classes (langue, pays, href, name, title, short_descr, type_id, start, end, eleve_ids, prof_ids, filieres_id) VALUES
('fr', 'FR', '/class/math2024', 'math2024', 'Classe de Mathématiques 2024', 'Cours annuel de mathématiques', 1, '2024-01-01 08:00:00', '2024-12-31 18:00:00', '4,5,6', '1,2', 1),
('fr', 'FR', '/class/phys2024', 'phys2024', 'Classe de Physique 2024', 'Cours annuel de physique', 1, '2024-01-01 08:00:00', '2024-12-31 18:00:00', '7,8,9', '2,3', 1),
('fr', 'FR', '/class/info2024', 'info2024', 'Classe d''Informatique 2024', 'Cours annuel d''informatique', 1, '2024-01-01 08:00:00', '2024-12-31 18:00:00', '10,11,12', '3,4', 4);

-- [... Suite du fichier précédent ...]

-- Compléter la table users jusqu'à 30 entrées
INSERT INTO users (id_user, nom, prenom, pseudo, password, email, role) VALUES
(7, 'Lefebvre', 'Thomas', 'tlefebvre', SHA2('pass128', 256), 'thomas.lefebvre@email.com', 'prof'),
(8, 'Rousseau', 'Emma', 'erousseau', SHA2('pass129', 256), 'emma.rousseau@email.com', 'student'),
(9, 'Moreau', 'Lucas', 'lmoreau', SHA2('pass130', 256), 'lucas.moreau@email.com', 'prof'),
(10, 'Laurent', 'Chloé', 'claurent', SHA2('pass131', 256), 'chloe.laurent@email.com', 'student'),
(11, 'Girard', 'Hugo', 'hgirard', SHA2('pass132', 256), 'hugo.girard@email.com', 'prof'),
(12, 'Roux', 'Léa', 'lroux', SHA2('pass133', 256), 'lea.roux@email.com', 'student'),
(13, 'Michel', 'Nathan', 'nmichel', SHA2('pass134', 256), 'nathan.michel@email.com', 'prof'),
(14, 'David', 'Sarah', 'sdavid', SHA2('pass135', 256), 'sarah.david@email.com', 'student'),
(15, 'Bertrand', 'Louis', 'lbertrand', SHA2('pass136', 256), 'louis.bertrand@email.com', 'prof'),
(16, 'Vincent', 'Alice', 'avincent', SHA2('pass137', 256), 'alice.vincent@email.com', 'student'),
(17, 'Simon', 'Gabriel', 'gsimon', SHA2('pass138', 256), 'gabriel.simon@email.com', 'prof'),
(18, 'Durand', 'Camille', 'cdurand', SHA2('pass139', 256), 'camille.durand@email.com', 'student'),
(19, 'Leroy', 'Jules', 'jleroy', SHA2('pass140', 256), 'jules.leroy@email.com', 'prof'),
(20, 'Petit', 'Manon', 'mpetit2', SHA2('pass141', 256), 'manon.petit@email.com', 'student'),
(21, 'Robert', 'Arthur', 'arobert', SHA2('pass142', 256), 'arthur.robert@email.com', 'prof'),
(22, 'Richard', 'Inès', 'irichard', SHA2('pass143', 256), 'ines.richard@email.com', 'student'),
(23, 'Thomas', 'Adam', 'athomas', SHA2('pass144', 256), 'adam.thomas@email.com', 'prof'),
(24, 'Dumont', 'Louise', 'ldumont', SHA2('pass145', 256), 'louise.dumont@email.com', 'student'),
(25, 'Lefevre', 'Raphaël', 'rlefevre', SHA2('pass146', 256), 'raphael.lefevre@email.com', 'prof'),
(26, 'Garcia', 'Eva', 'egarcia', SHA2('pass147', 256), 'eva.garcia@email.com', 'student'),
(27, 'Faure', 'Paul', 'pfaure', SHA2('pass148', 256), 'paul.faure@email.com', 'prof'),
(28, 'Andre', 'Nina', 'nandre', SHA2('pass149', 256), 'nina.andre@email.com', 'student'),
(29, 'Mercier', 'Oscar', 'omercier', SHA2('pass150', 256), 'oscar.mercier@email.com', 'prof'),
(30, 'Boyer', 'Jade', 'jboyer', SHA2('pass151', 256), 'jade.boyer@email.com', 'student');

-- Compléter la table niveaux
INSERT INTO niveaux (alias, user_id) VALUES
('Formation professionnelle', 1),
('BTS', 1),
('DUT', 1),
('Prépa', 1),
('Formation continue', 1);

-- Compléter la table filieres
INSERT INTO filieres (alias, user_id, fk) VALUES
('Physique', 1, 4),
('Chimie', 1, 4),
('Biologie', 1, 4),
('Sciences de la Terre', 1, 4),
('Langues Étrangères', 1, 3),
('Histoire', 1, 3),
('Géographie', 1, 3),
('Philosophie', 1, 3),
('Arts', 1, 3),
('Musique', 1, 3),
('Théâtre', 1, 3),
('Sport', 1, 3),
('Commerce', 1, 4),
('Marketing', 1, 4),
('Finance', 1, 4),
('Droit', 1, 4),
('Psychologie', 1, 4),
('Sociologie', 1, 4),
('Sciences Politiques', 1, 4),
('Communication', 1, 4),
('Architecture', 1, 4),
('Design', 1, 4),
('Médecine', 1, 4),
('Pharmacie', 1, 4),
('Ingénierie', 1, 4);

-- Compléter la table matieres
INSERT INTO matieres (alias, user_id, fk) VALUES
('Statistiques', 1, 1),
('Géométrie', 1, 1),
('Algèbre', 1, 1),
('Analyse', 1, 1),
('Mécanique', 1, 2),
('Électricité', 1, 2),
('Optique', 1, 2),
('Thermodynamique', 1, 2),
('Biologie Cellulaire', 1, 3),
('Génétique', 1, 3),
('Écologie', 1, 3),
('Littérature', 1, 4),
('Grammaire', 1, 4),
('Expression Écrite', 1, 4),
('Histoire Ancienne', 1, 5),
('Histoire Moderne', 1, 5),
('Géographie Humaine', 1, 5),
('Géographie Physique', 1, 5),
('Microéconomie', 1, 6),
('Macroéconomie', 1, 6),
('Java', 1, 7),
('Python', 1, 7),
('C++', 1, 7),
('Web Development', 1, 7),
('Mobile Development', 1, 7),
('Data Structures', 1, 8),
('Algorithms Design', 1, 8),
('SQL', 1, 9),
('NoSQL', 1, 9),
('Data Modeling', 1, 9);

-- Compléter la table profs
INSERT INTO profs (id_user, href, name, title, id_matieres) VALUES
(7, '/prof/tlefebvre', 'Thomas Lefebvre', 'Professeur de Statistiques', 10),
(9, '/prof/lmoreau', 'Lucas Moreau', 'Professeur de Géométrie', 11),
(11, '/prof/hgirard', 'Hugo Girard', 'Professeur d''Algèbre', 12),
(13, '/prof/nmichel', 'Nathan Michel', 'Professeur d''Analyse', 13),
(15, '/prof/lbertrand', 'Louis Bertrand', 'Professeur de Mécanique', 14),
(17, '/prof/gsimon', 'Gabriel Simon', 'Professeur d''Électricité', 15),
(19, '/prof/jleroy', 'Jules Leroy', 'Professeur d''Optique', 16),
(21, '/prof/arobert', 'Arthur Robert', 'Professeur de Thermodynamique', 17),
(23, '/prof/athomas', 'Adam Thomas', 'Professeur de Biologie', 18),
(25, '/prof/rlefevre', 'Raphaël Lefevre', 'Professeur de Génétique', 19),
(27, '/prof/pfaure', 'Paul Faure', 'Professeur d''Écologie', 20),
(29, '/prof/omercier', 'Oscar Mercier', 'Professeur de Littérature', 21);

-- [Je continue avec les autres tables ?]

-- Compléter la table sujets (aligné avec la structure des menus de fr.js)
INSERT INTO sujets (alias, user_id, fk) VALUES
-- Mathématiques
('Calcul différentiel', 2, 1),
('Probabilités', 2, 1),
('Trigonométrie', 2, 1),
('Matrices', 2, 1),
('Intégrales', 2, 1),
-- Physique
('Mécanique classique', 3, 2),
('Électromagnétisme', 3, 2),
('Thermodynamique', 3, 2),
('Optique', 3, 2),
-- Informatique
('HTML/CSS', 5, 7),
('JavaScript', 5, 7),
('PHP', 5, 7),
('Python avancé', 5, 7),
('Réseaux', 5, 7),
-- Base de données
('MySQL', 5, 9),
('MongoDB', 5, 9),
('PostgreSQL', 5, 9),
-- Algorithmes
('Tri et recherche', 5, 8),
('Graphes', 5, 8),
('Programmation dynamique', 5, 8),
-- Autres matières
('Littérature française', 19, 12),
('Grammaire avancée', 19, 13),
('Histoire contemporaine', 23, 16),
('Géopolitique', 23, 17),
('Microéconomie', 11, 19);

-- Compléter la table tags (basé sur les besoins de catégorisation du site)
INSERT INTO tags (fr, en, es) VALUES
('Cours magistral', 'Lecture', 'Clase magistral'),
('Travaux pratiques', 'Practical work', 'Trabajos prácticos'),
('Exercices', 'Exercises', 'Ejercicios'),
('Examen', 'Exam', 'Examen'),
('Projet', 'Project', 'Proyecto'),
('En ligne', 'Online', 'En línea'),
('Présentiel', 'In-person', 'Presencial'),
('Gratuit', 'Free', 'Gratuito'),
('Payant', 'Paid', 'De pago'),
('Certification', 'Certification', 'Certificación'),
('Pour débutants', 'For beginners', 'Para principiantes'),
('Niveau avancé', 'Advanced level', 'Nivel avanzado'),
('Tutorat', 'Tutoring', 'Tutoría'),
('Workshop', 'Workshop', 'Taller'),
('Conférence', 'Conference', 'Conferencia'),
('Webinaire', 'Webinar', 'Webinario'),
('Documentation', 'Documentation', 'Documentación'),
('Quiz', 'Quiz', 'Cuestionario'),
('Vidéo', 'Video', 'Video'),
('Audio', 'Audio', 'Audio'),
('PDF', 'PDF', 'PDF'),
('Interactive', 'Interactive', 'Interactivo'),
('À son rythme', 'Self-paced', 'A su ritmo'),
('En groupe', 'Group', 'En grupo'),
('Support inclus', 'Support included', 'Soporte incluido');

-- Compléter la table courses (aligné avec les types de cours définis dans fr.js)
INSERT INTO courses (pays, langue, href, name, title, short_descr, duree, likes, shares, views, note, coms, type_id, tag_ids, prix, profs_id, fk) VALUES
('FR', 'fr', '/course/math-analysis', 'math-analysis', 'Analyse mathématique approfondie', 'Cours avancé d''analyse', 120, '{"count": 180}', 55, '{"total": 1500}', '{"avg": 4.7}', '{"count": 30}', 1, '1,4,12', 49.99, 11, 1),
('FR', 'fr', '/course/algo-basics', 'algo-basics', 'Fondamentaux des algorithmes', 'Introduction aux algorithmes', 90, '{"count": 220}', 70, '{"total": 1800}', '{"avg": 4.6}', '{"count": 40}', 1, '1,11', 19.99, 5, 8),
('FR', 'fr', '/course/web-dev', 'web-dev', 'Développement Web Full-Stack', 'Formation complète développeur web', 180, '{"count": 300}', 95, '{"total": 2500}', '{"avg": 4.9}', '{"count": 60}', 1, '1,5,14', 99.99, 7, 7);

-- [Je continue avec les dernières tables ?]

-- Compléter la table ressources (aligné avec les types de ressources mentionnés dans fr.js)
INSERT INTO ressources (pays, langue, href, name, title, short_descr, likes, shares, views, note, coms, type_id, tag_ids, profs_id, user_id, json, sujets_id) VALUES
-- Ressources mathématiques
('FR', 'fr', '/resource/math-calculus', 'math-calculus', 'Calcul différentiel et intégral', 'Support de cours complet', '{"count": 150}', 45, '{"total": 800}', '{"avg": 4.5}', '{"count": 25}', 1, '1,21', 2, 2, '{"type": "pdf"}', 1),
('FR', 'fr', '/resource/math-exercises', 'math-exercises', 'Exercices de mathématiques', 'Série d''exercices corrigés', '{"count": 120}', 35, '{"total": 600}', '{"avg": 4.3}', '{"count": 20}', 2, '3,21', 2, 2, '{"type": "pdf"}', 1),

-- Ressources physique
('FR', 'fr', '/resource/physics-mechanics', 'physics-mechanics', 'Mécanique classique', 'Cours vidéo', '{"count": 200}', 60, '{"total": 1200}', '{"avg": 4.7}', '{"count": 35}', 3, '1,19', 3, 3, '{"type": "video"}', 6),
('FR', 'fr', '/resource/physics-lab', 'physics-lab', 'TP de physique', 'Travaux pratiques', '{"count": 80}', 25, '{"total": 400}', '{"avg": 4.2}', '{"count": 15}', 2, '2,21', 3, 3, '{"type": "pdf"}', 6),

-- Ressources informatique
('FR', 'fr', '/resource/prog-java', 'prog-java', 'Tutoriel Java', 'Cours complet Java', '{"count": 250}', 75, '{"total": 1500}', '{"avg": 4.8}', '{"count": 45}', 1, '1,19', 5, 5, '{"type": "video"}', 11),
('FR', 'fr', '/resource/prog-python', 'prog-python', 'Python pour débutants', 'Introduction à Python', '{"count": 180}', 55, '{"total": 900}', '{"avg": 4.6}', '{"count": 30}', 1, '11,19', 5, 5, '{"type": "video"}', 13),

-- Ressources base de données
('FR', 'fr', '/resource/sql-basics', 'sql-basics', 'Fondamentaux SQL', 'Introduction aux bases de données', '{"count": 160}', 48, '{"total": 750}', '{"avg": 4.4}', '{"count": 28}', 1, '11,21', 5, 5, '{"type": "pdf"}', 15),
('FR', 'fr', '/resource/mongodb-tuto', 'mongodb-tuto', 'MongoDB pour débutants', 'NoSQL avec MongoDB', '{"count": 140}', 42, '{"total": 650}', '{"avg": 4.3}', '{"count": 25}', 1, '11,19', 5, 5, '{"type": "video"}', 16);

-- Compléter la table classes (aligné avec la structure des menus de fr.js)
INSERT INTO classes (langue, pays, href, name, title, short_descr, type_id, start, end, eleve_ids, prof_ids, filieres_id) VALUES
-- Classes niveau collège
('fr', 'FR', '/class/maths-6eme', 'maths-6eme', 'Mathématiques 6ème', 'Programme de mathématiques niveau 6ème', 1, '2024-09-01 08:00:00', '2025-06-30 18:00:00', '4,5,6,8', '2', 1),
('fr', 'FR', '/class/francais-6eme', 'francais-6eme', 'Français 6ème', 'Programme de français niveau 6ème', 1, '2024-09-01 08:00:00', '2025-06-30 18:00:00', '4,5,6,8', '19', 2),

-- Classes niveau lycée
('fr', 'FR', '/class/maths-2nde', 'maths-2nde', 'Mathématiques Seconde', 'Programme de mathématiques niveau Seconde', 1, '2024-09-01 08:00:00', '2025-06-30 18:00:00', '10,12,14', '2,11', 1),
('fr', 'FR', '/class/physique-2nde', 'physique-2nde', 'Physique-Chimie Seconde', 'Programme de physique-chimie niveau Seconde', 1, '2024-09-01 08:00:00', '2025-06-30 18:00:00', '10,12,14', '3,15', 2),

-- Classes niveau université
('fr', 'FR', '/class/algo-l1', 'algo-l1', 'Algorithmes L1 Info', 'Algorithmes et structures de données', 1, '2024-09-01 08:00:00', '2025-06-30 18:00:00', '16,18,20', '5', 4),
('fr', 'FR', '/class/bdd-l1', 'bdd-l1', 'Bases de données L1 Info', 'Introduction aux bases de données', 1, '2024-09-01 08:00:00', '2025-06-30 18:00:00', '16,18,20', '5', 4),

-- Classes formation professionnelle
('fr', 'FR', '/class/web-dev', 'web-dev', 'Développement Web', 'Formation développeur web full-stack', 1, '2024-01-15 09:00:00', '2024-07-15 18:00:00', '22,24,26', '5,7', 4),
('fr', 'FR', '/class/data-science', 'data-science', 'Data Science', 'Formation data scientist', 1, '2024-01-15 09:00:00', '2024-07-15 18:00:00', '22,24,26', '7,11', 5);
