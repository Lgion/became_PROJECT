-- Niveaux principaux (Collège, Lycée)
INSERT INTO niveaux (id_niveaux, fk, alias) VALUES 
(1, 0, 'college'),
(2, 0, 'lycee');


-- Filières (classes) pour le collège
INSERT INTO filieres (id_filieres, fk, alias) VALUES 
(1, 1, '6eme'),
(2, 1, '5eme'),
(3, 1, '4eme'),
(4, 1, '3eme');
(5, 2, '2nde'),
(6, 2, '1ere'),
(7, 2, 'terminale');


-- Matières pour la 6ème (exemple)
INSERT INTO matieres (id_matieres, fk, alias) VALUES 
(1, 1, 'mathematiques'),
(2, 1, 'francais'),
(3, 1, 'histoire-geo');


-- Sujets pour les mathématiques 6ème
INSERT INTO sujets (id_sujets, fk, alias) VALUES 
(1, 1, 'nombres-decimaux'),
(2, 1, 'geometrie-plane'),
(3, 1, 'proportionnalite');

-- Tags pour les cours
INSERT INTO tags (id_tags, fr) VALUES 
(1, 'Débutant'),
(2, 'Intermédiaire'),
(3, 'Avancé'),
(4, 'Révision'),
(5, 'Examen');

-- Users (incluant les professeurs)
INSERT INTO users (id_user, nom, prenom, pseudo, email, password) VALUES 
(1, 'Dupont', 'Marie', 'maths_prof', 'marie.dupont@became.fr', 'hashed_password'),
(2, 'Martin', 'Pierre', 'hist_prof', 'pierre.martin@became.fr', 'hashed_password'),
(3, 'Bernard', 'Sophie', 'fr_prof', 'sophie.bernard@became.fr', 'hashed_password');

-- Professeurs
INSERT INTO profs (id_profs, id_user, id_matieres, href, name, title) VALUES 
(1, 1, 1, 'marie-dupont', 'Marie D.', 'Professeur de mathématiques'),
(2, 2, 3, 'pierre-martin', 'Pierre M.', 'Professeur d''histoire-géographie'),
(3, 3, 2, 'sophie-bernard', 'Sophie B.', 'Professeur de français');

-- Classes
INSERT INTO classes (id_classes, filieres_id, prof_ids, eleve_ids, pays, langue, href, name, title, 
                    short_descr, type_id, date, start, end) VALUES 
(1, 1, '1', '4,5,6', 'FR', 'fr', 'maths-6e-1', 'Mathématiques 6e groupe 1', 
   'Cours de mathématiques 6e', 'Groupe de mathématiques niveau 6e', 1, 
   '2024-01-01', '08:00:00', '09:00:00'),
(2, 1, '2', '4,5,6,7', 'FR', 'fr', 'hist-6e-1', 'Histoire 6e groupe 1',
   'Cours d''histoire 6e', 'Groupe d''histoire niveau 6e', 1,
   '2024-01-01', '09:00:00', '10:00:00');

-- Ressources pédagogiques
INSERT INTO ressources (id_ressources, sujets_id, user_id, profs_id, pays, langue, 
                       tag_ids, href, name, title, short_descr, type_id, date) VALUES 
(1, 1, 1, 1, 'FR', 'fr', '1,4', 'nombres-decimaux-intro', 
   'Introduction aux nombres décimaux', 'Les bases des nombres décimaux',
   'Cours d''introduction sur les nombres décimaux', 1, '2024-01-01'),
(2, 2, 1, 1, 'FR', 'fr', '1,2', 'geometrie-figures-planes',
   'Les figures planes', 'Introduction à la géométrie plane',
   'Découverte des figures géométriques de base', 1, '2024-01-01');

-- Cours (contenu pédagogique)
INSERT INTO courses (id_courses, pays, langue, tag_ids, href, name, title,
                    short_descr, descr, date, duree, type_id, prix, 
                    ressource_ids, profs_id, fk) VALUES 
(1, 'FR', 'fr', '1,4', 'cours-decimaux-6e', 'Les décimaux', 
   'Comprendre les nombres décimaux', 'Introduction aux nombres décimaux',
   'Contenu détaillé du cours sur les décimaux...', '2024-01-01', 
   '01:00:00', 1, 0, '1', 1, 1),
(2, 'FR', 'fr', '1,2', 'cours-geometrie-6e', 'Géométrie plane', 
   'Les bases de la géométrie plane', 'Découverte des figures géométriques',
   'Contenu détaillé du cours de géométrie...', '2024-01-01',
   '01:00:00', 1, 0, '2', 1, 2);

-- Élèves (ajout d'utilisateurs élèves)
INSERT INTO users (id_user, nom, prenom, pseudo, email, password) VALUES 
(4, 'Petit', 'Lucas', 'lucas_p', 'lucas.p@email.fr', 'hashed_password'),
(5, 'Dubois', 'Emma', 'emma_d', 'emma.d@email.fr', 'hashed_password'),
(6, 'Leroy', 'Hugo', 'hugo_l', 'hugo.l@email.fr', 'hashed_password'),
(7, 'Moreau', 'Léa', 'lea_m', 'lea.m@email.fr', 'hashed_password');

-- Métadonnées pour l'affichage (liens, titres, etc.)
INSERT INTO _text_ (username, id, fr) VALUES 
('niveaux', 1, '{"href":"college","html":"Collège","title":"Enseignement collège","img":{"src":"college.jpg","title":"Collège","alt":"Image collège"}}'),
('filieres', 1, '{"href":"6eme","html":"6ème","title":"Classe de 6ème","img":{"src":"6eme.jpg","title":"6ème","alt":"Classe de 6ème"}}'),
('matieres', 1, '{"href":"maths-6","html":"Mathématiques","title":"Mathématiques 6ème","img":{"src":"maths.jpg","title":"Maths","alt":"Cours de mathématiques"}}');

-- Descriptions des niveaux dans _text
INSERT INTO _text (id, username, fr) VALUES 
('niveaux_1', 'article', 'Le collège est la première étape des études secondaires...'),
('niveaux_2', 'article', 'Le lycée est la seconde étape des études secondaires...'),
('filieres_1', 'article', 'La classe de 6ème marque l''entrée au collège...'),
('filieres_2', 'article', 'La classe de 5ème poursuit les apprentissages...'),
('filieres_5', 'article', 'La classe de seconde est une année de détermination...'),
('matieres_1', 'article', 'Les mathématiques en 6ème constituent un apprentissage fondamental...'),
('matieres_2', 'article', 'Le français en 6ème permet de consolider les acquis du primaire...'),
('sujets_1', 'article', 'Les nombres décimaux sont essentiels dans la vie quotidienne...'),
('sujets_2', 'article', 'La géométrie plane permet de comprendre les figures à deux dimensions...');

-- Types de cours
INSERT INTO _varchar (id, username, fr) VALUES 
(1, 'cl_type', 'Cours'),
(2, 'cl_type', 'Exercices'),
(3, 'cl_type', 'Évaluation');
