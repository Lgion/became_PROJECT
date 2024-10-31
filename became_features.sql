-- Insertion de données dans la table users
INSERT INTO users (nom, prenom, pseudo, password, email, role) VALUES
('Dubois', 'Jean', 'jdubois', SHA2('motdepasse1', 256), 'jean.dubois@email.com', 'étudiant'),
('Martin', 'Sophie', 'smartin', SHA2('motdepasse2', 256), 'sophie.martin@email.com', 'professeur'),
('Leroy', 'Pierre', 'pleroy', SHA2('motdepasse3', 256), 'pierre.leroy@email.com', 'admin'),
('Moreau', 'Claire', 'cmoreau', SHA2('motdepasse4', 256), 'claire.moreau@email.com', 'étudiant'),
('Bernard', 'Luc', 'lbernard', SHA2('motdepasse5', 256), 'luc.bernard@email.com', 'professeur');

-- Insertion de données dans la table niveaux
INSERT INTO niveaux (alias, user_id) VALUES
('Débutant', 1),
('Intermédiaire', 2),
('Avancé', 3);

-- Insertion de données dans la table filieres
INSERT INTO filieres (alias, user_id, fk) VALUES
('Informatique', 2, 1),
('Mathématiques', 2, 2),
('Physique', 3, 3);

-- Insertion de données dans la table matieres
INSERT INTO matieres (alias, user_id, fk) VALUES
('Programmation', 2, 1),
('Algèbre', 2, 2),
('Mécanique', 3, 3);

-- Insertion de données dans la table sujets
INSERT INTO sujets (alias, user_id, fk) VALUES
('Python', 2, 1),
('Matrices', 2, 2),
('Cinématique', 3, 3);

-- Insertion de données dans la table courses
INSERT INTO courses (pays, langue, href, name, title, short_descr, descr, tl, date, duree, likes, shares, views, note, coms, type_id, tag_ids, prix, ressource_ids, profs_id, fk) VALUES
('France', 'fr', '/cours/python-debutant', 'python-debutant', 'Python pour débutants', 'Apprenez les bases de Python', 'Un cours complet pour débuter en Python', 'Python, programmation', NOW(), 120, '{"count": 50}', 25, '{"count": 1000}', '{"avg": 4.5}', '[]', 1, '1,2,3', 29.99, '1,2', 2, 1),
('France', 'fr', '/cours/algebre-lineaire', 'algebre-lineaire', 'Algèbre linéaire', 'Maîtrisez les concepts d''algèbre linéaire', 'Cours approfondi sur l''algèbre linéaire', 'Mathématiques, algèbre', NOW(), 180, '{"count": 30}', 15, '{"count": 800}', '{"avg": 4.2}', '[]', 1, '4,5', 39.99, '3,4', 2, 2),
('France', 'fr', '/cours/mecanique-newtonienne', 'mecanique-newtonienne', 'Mécanique newtonienne', 'Découvrez les lois de Newton', 'Étude complète de la mécanique classique', 'Physique, mécanique', NOW(), 150, '{"count": 40}', 20, '{"count": 900}', '{"avg": 4.7}', '[]', 1, '6,7', 34.99, '5,6', 3, 3);

-- Insertion de données dans la table ressources
INSERT INTO ressources (pays, langue, href, name, title, short_descr, date, likes, shares, views, note, coms, type_id, tag_ids, profs_id, user_id, json, sujets_id) VALUES
('France', 'fr', '/ressources/python-cheatsheet', 'python-cheatsheet', 'Aide-mémoire Python', 'Résumé des commandes Python essentielles', NOW(), '{"count": 100}', 50, '{"count": 2000}', '{"avg": 4.8}', '[]', 1, '1,2', 2, 1, '{"type": "pdf"}', 1),
('France', 'fr', '/ressources/matrice-exercices', 'matrice-exercices', 'Exercices sur les matrices', 'Série d''exercices sur les matrices', NOW(), '{"count": 80}', 40, '{"count": 1500}', '{"avg": 4.5}', '[]', 2, '4,5', 2, 2, '{"type": "docx"}', 2),
('France', 'fr', '/ressources/lois-newton-video', 'lois-newton-video', 'Vidéo sur les lois de Newton', 'Explication visuelle des lois de Newton', NOW(), '{"count": 120}', 60, '{"count": 2500}', '{"avg": 4.9}', '[]', 3, '6,7', 3, 3, '{"type": "mp4"}', 3);

-- Insertion de données dans la table profs
INSERT INTO profs (id_user, href, name, title, id_matieres) VALUES
(2, '/profs/sophie-martin', 'Sophie Martin', 'Dr en Informatique', 1),
(5, '/profs/luc-bernard', 'Luc Bernard', 'Professeur de Mathématiques', 2);

-- Insertion de données dans la table classes
INSERT INTO classes (langue, pays, href, name, title, short_descr, meta, type_id, date, start, end, eleve_ids, prof_ids, filieres_id) VALUES
('fr', 'France', '/classes/info-debutant', 'info-debutant', 'Classe d''informatique débutant', 'Pour les nouveaux en programmation', '{"niveau": "débutant"}', 1, NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 3 MONTH), '1,4', '2', 1),
('fr', 'France', '/classes/maths-avance', 'maths-avance', 'Classe de mathématiques avancées', 'Pour les passionnés de maths', '{"niveau": "avancé"}', 1, NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 6 MONTH), '1,4', '5', 2);

-- Insertion de données dans la table tags
INSERT INTO tags (fr, en, es) VALUES
('Python', 'Python', 'Python'),
('Programmation', 'Programming', 'Programación'),
('Débutant', 'Beginner', 'Principiante'),
('Algèbre', 'Algebra', 'Álgebra'),
('Matrices', 'Matrices', 'Matrices'),
('Physique', 'Physics', 'Física'),
('Mécanique', 'Mechanics', 'Mecánica');

-- Insertion de données dans la table _text
INSERT INTO _text (id, username, fr, en, es) VALUES
('welcome_message', 'admin', 'Bienvenue sur notre plateforme LMS', 'Welcome to our LMS platform', 'Bienvenido a nuestra plataforma LMS'),
('course_intro', 'admin', 'Découvrez nos cours', 'Discover our courses', 'Descubre nuestros cursos');

-- Insertion de données dans la table _text_
INSERT INTO _text_ (id, username, fr, en, es) VALUES
(1, 'admin', 'Conditions d''utilisation', 'Terms of Use', 'Términos de uso'),
(2, 'admin', 'Politique de confidentialité', 'Privacy Policy', 'Política de privacidad');

-- Insertion de données dans la table _varchar
INSERT INTO _varchar (username, fr, en, es) VALUES
('admin', 'Accueil', 'Home', 'Inicio'),
('admin', 'Cours', 'Courses', 'Cursos'),
('admin', 'Profil', 'Profile', 'Perfil');