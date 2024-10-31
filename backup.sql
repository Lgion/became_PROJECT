-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: became
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.20.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS became;
CREATE DATABASE became;
USE became;

--
-- Table structure for table `_text`
--

DROP TABLE IF EXISTS `_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_text` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fr` text,
  `en` text,
  `es` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_text`
--

LOCK TABLES `_text` WRITE;
/*!40000 ALTER TABLE `_text` DISABLE KEYS */;
INSERT INTO `_text` VALUES ('course_intro','admin','Découvrez nos cours','Discover our courses','Descubre nuestros cursos','2024-10-31 00:19:55','2024-10-31 00:19:55'),('filieres_1','article','{\n    \"header\": {\n        \"h\": \"Programmation Débutant\",\n        \"img\": {\n            \"src\": \"/images/prog_debutant.jpg\",\n            \"alt\": \"Cours de programmation débutant\",\n            \"title\": \"Découvrez la programmation\"\n        }\n    },\n    \"main\": {\n        \"p\": \"La classe de débutant permet aux élèves de découvrir les bases de la programmation. Vous apprendrez les concepts fondamentaux de l\'algorithmique et de la logique de programmation.\"\n    },\n    \"footer\": {\n        \"template\": \"\"\n    }\n}',NULL,NULL,'2024-10-31 01:50:17','2024-10-31 01:54:42'),('filieres_4','article','Description de la filière 4',NULL,NULL,'2024-10-31 00:57:28','2024-10-31 00:57:28'),('matieres_1','article','{\n    \"header\": {\n        \"h\": \"Programmation\",\n        \"img\": {\n            \"src\": \"/images/prog.jpg\",\n            \"alt\": \"Programmation\",\n            \"title\": \"Cours de programmation\"\n        }\n    },\n    \"main\": {\n        \"p\": \"Découvrez nos cours de programmation\"\n    },\n    \"footer\": {}\n}',NULL,NULL,'2024-10-31 11:34:03','2024-10-31 11:34:03'),('sujets_1','article','{\n    \"header\": {\n        \"h\": \"Python\",\n        \"img\": {\n            \"src\": \"/images/python.jpg\",\n            \"alt\": \"Python Programming\",\n            \"title\": \"Apprendre Python\"\n        }\n    },\n    \"main\": {\n        \"p\": \"Python est un langage de programmation polyvalent et facile à apprendre\"\n    },\n    \"footer\": {}\n}',NULL,NULL,'2024-10-31 12:07:22','2024-10-31 12:07:22'),('welcome_message','admin','Bienvenue sur notre plateforme LMS','Welcome to our LMS platform','Bienvenido a nuestra plataforma LMS','2024-10-31 00:19:55','2024-10-31 00:19:55');
/*!40000 ALTER TABLE `_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_text_`
--

DROP TABLE IF EXISTS `_text_`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_text_` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `fr` text,
  `en` text,
  `es` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_text_`
--

LOCK TABLES `_text_` WRITE;
/*!40000 ALTER TABLE `_text_` DISABLE KEYS */;
INSERT INTO `_text_` VALUES (1,'admin','Conditions d\'utilisation','Terms of Use','Términos de uso','2024-10-31 00:19:55','2024-10-31 00:19:55'),(1,'matieres','{\"href\":\"programmation\",\"html\":\"Programmation\",\"title\":\"Cours de programmation\",\"img\":{\"src\":\"prog.jpg\",\"title\":\"Programmation\",\"alt\":\"Cours de programmation\"}}',NULL,NULL,'2024-10-31 01:47:02','2024-10-31 01:47:02'),(1,'sujets','{\n    \"href\": \"python\",\n    \"html\": \"Python\",\n    \"title\": \"Programmation en Python\",\n    \"img\": {\n        \"src\": \"/images/python.jpg\",\n        \"title\": \"Python\",\n        \"alt\": \"Langage de programmation Python\"\n    }\n}',NULL,NULL,'2024-10-31 11:44:57','2024-10-31 11:44:57'),(2,'admin','Politique de confidentialité','Privacy Policy','Política de privacidad','2024-10-31 00:19:55','2024-10-31 00:19:55');
/*!40000 ALTER TABLE `_text_` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_varchar`
--

DROP TABLE IF EXISTS `_varchar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_varchar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `fr` varchar(255) DEFAULT NULL,
  `en` varchar(255) DEFAULT NULL,
  `es` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_varchar`
--

LOCK TABLES `_varchar` WRITE;
/*!40000 ALTER TABLE `_varchar` DISABLE KEYS */;
INSERT INTO `_varchar` VALUES (1,'cl_type','Cours',NULL,NULL,'2024-10-31 01:41:06','2024-10-31 01:41:06'),(2,'cl_type','Exercices',NULL,NULL,'2024-10-31 01:41:06','2024-10-31 01:41:06'),(3,'cl_type','Évaluation',NULL,NULL,'2024-10-31 01:41:06','2024-10-31 01:41:06'),(4,'c_type','Cours',NULL,NULL,'2024-10-31 12:08:48','2024-10-31 12:08:48'),(5,'c_type','Exercices',NULL,NULL,'2024-10-31 12:08:48','2024-10-31 12:08:48'),(6,'c_type','Évaluation',NULL,NULL,'2024-10-31 12:08:48','2024-10-31 12:08:48'),(7,'r_type','Document',NULL,NULL,'2024-10-31 12:09:46','2024-10-31 12:09:46'),(8,'r_type','Video',NULL,NULL,'2024-10-31 12:09:46','2024-10-31 12:09:46'),(9,'r_type','Quiz',NULL,NULL,'2024-10-31 12:09:46','2024-10-31 12:09:46');
/*!40000 ALTER TABLE `_varchar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `id_classes` int NOT NULL AUTO_INCREMENT,
  `langue` varchar(50) DEFAULT NULL,
  `pays` varchar(50) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `short_descr` text,
  `meta` text,
  `type_id` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `eleve_ids` varchar(255) DEFAULT NULL,
  `prof_ids` varchar(255) DEFAULT NULL,
  `filieres_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_classes`),
  KEY `filieres_id` (`filieres_id`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`filieres_id`) REFERENCES `filieres` (`id_filieres`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'fr','France','/classes/info-debutant','info-debutant','Classe d\'informatique débutant','Pour les nouveaux en programmation','{\"niveau\": \"débutant\"}',1,'2024-10-31 01:19:55','2024-10-31 01:19:55','2025-01-31 01:19:55','1,4','2',1,'2024-10-31 00:19:55','2024-10-31 00:19:55'),(2,'fr','France','/classes/maths-avance','maths-avance','Classe de mathématiques avancées','Pour les passionnés de maths','{\"niveau\": \"avancé\"}',1,'2024-10-31 01:19:55','2024-10-31 01:19:55','2025-04-30 01:19:55','1,4','5',2,'2024-10-31 00:19:55','2024-10-31 00:19:55');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id_courses` int NOT NULL AUTO_INCREMENT,
  `pays` varchar(50) DEFAULT NULL,
  `langue` varchar(50) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `short_descr` text,
  `descr` text,
  `tl` text,
  `date` datetime DEFAULT NULL,
  `duree` int DEFAULT NULL,
  `likes` json DEFAULT NULL,
  `shares` int DEFAULT NULL,
  `views` json DEFAULT NULL,
  `note` json DEFAULT NULL,
  `coms` json DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `tag_ids` varchar(255) DEFAULT NULL,
  `prix` decimal(10,2) DEFAULT NULL,
  `ressource_ids` varchar(255) DEFAULT NULL,
  `profs_id` int DEFAULT NULL,
  `fk` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_courses`),
  KEY `fk` (`fk`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`fk`) REFERENCES `sujets` (`id_sujets`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'France','fr','/cours/python-debutant','python-debutant','Python pour débutants','Apprenez les bases de Python','Un cours complet pour débuter en Python','Python, programmation','2024-10-31 01:19:55',120,'{\"count\": 50}',25,'[\"2024-10-31T01:19:55\", \"2024-10-31T01:19:55\", \"2024-10-31T01:19:55\"]','[5, 4, 5, 4, 4]','[]',4,'1,2,3',29.99,'1,2',2,1,'2024-10-31 00:19:55','2024-10-31 12:29:57'),(2,'France','fr','/cours/algebre-lineaire','algebre-lineaire','Algèbre linéaire','Maîtrisez les concepts d\'algèbre linéaire','Cours approfondi sur l\'algèbre linéaire','Mathématiques, algèbre','2024-10-31 01:19:55',180,'{\"count\": 30}',15,'{\"count\": 800}','{\"avg\": 4.2}','[]',4,'4,5',39.99,'3,4',2,2,'2024-10-31 00:19:55','2024-10-31 12:18:43'),(3,'France','fr','/cours/mecanique-newtonienne','mecanique-newtonienne','Mécanique newtonienne','Découvrez les lois de Newton','Étude complète de la mécanique classique','Physique, mécanique','2024-10-31 01:19:55',150,'{\"count\": 40}',20,'{\"count\": 900}','{\"avg\": 4.7}','[]',4,'6,7',34.99,'5,6',3,3,'2024-10-31 00:19:55','2024-10-31 12:18:43');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filieres`
--

DROP TABLE IF EXISTS `filieres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filieres` (
  `id_filieres` int NOT NULL AUTO_INCREMENT,
  `alias` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `fk` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_filieres`),
  KEY `user_id` (`user_id`),
  KEY `fk` (`fk`),
  CONSTRAINT `filieres_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  CONSTRAINT `filieres_ibfk_2` FOREIGN KEY (`fk`) REFERENCES `niveaux` (`id_niveaux`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filieres`
--

LOCK TABLES `filieres` WRITE;
/*!40000 ALTER TABLE `filieres` DISABLE KEYS */;
INSERT INTO `filieres` VALUES (1,'Informatique',2,1,'2024-10-31 00:19:54','2024-10-31 00:19:54'),(2,'Mathématiques',2,2,'2024-10-31 00:19:54','2024-10-31 00:19:54'),(3,'Physique',3,3,'2024-10-31 00:19:54','2024-10-31 00:19:54'),(4,NULL,NULL,1,'2024-10-31 00:56:59','2024-10-31 00:56:59');
/*!40000 ALTER TABLE `filieres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matieres`
--

DROP TABLE IF EXISTS `matieres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matieres` (
  `id_matieres` int NOT NULL AUTO_INCREMENT,
  `alias` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `fk` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_matieres`),
  KEY `user_id` (`user_id`),
  KEY `fk` (`fk`),
  CONSTRAINT `matieres_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  CONSTRAINT `matieres_ibfk_2` FOREIGN KEY (`fk`) REFERENCES `filieres` (`id_filieres`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matieres`
--

LOCK TABLES `matieres` WRITE;
/*!40000 ALTER TABLE `matieres` DISABLE KEYS */;
INSERT INTO `matieres` VALUES (1,'Programmation',2,1,'2024-10-31 00:19:55','2024-10-31 00:19:55'),(2,'Algèbre',2,2,'2024-10-31 00:19:55','2024-10-31 00:19:55'),(3,'Mécanique',3,3,'2024-10-31 00:19:55','2024-10-31 00:19:55'),(4,NULL,NULL,4,'2024-10-31 00:57:12','2024-10-31 00:57:12');
/*!40000 ALTER TABLE `matieres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `niveaux`
--

DROP TABLE IF EXISTS `niveaux`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `niveaux` (
  `id_niveaux` int NOT NULL AUTO_INCREMENT,
  `alias` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_niveaux`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `niveaux_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `niveaux`
--

LOCK TABLES `niveaux` WRITE;
/*!40000 ALTER TABLE `niveaux` DISABLE KEYS */;
INSERT INTO `niveaux` VALUES (1,'Débutant',1,'2024-10-31 00:19:54','2024-10-31 00:19:54'),(2,'Intermédiaire',2,'2024-10-31 00:19:54','2024-10-31 00:19:54'),(3,'Avancé',3,'2024-10-31 00:19:54','2024-10-31 00:19:54');
/*!40000 ALTER TABLE `niveaux` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profs`
--

DROP TABLE IF EXISTS `profs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profs` (
  `id_profs` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `id_matieres` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_profs`),
  KEY `id_user` (`id_user`),
  KEY `id_matieres` (`id_matieres`),
  CONSTRAINT `profs_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  CONSTRAINT `profs_ibfk_2` FOREIGN KEY (`id_matieres`) REFERENCES `matieres` (`id_matieres`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profs`
--

LOCK TABLES `profs` WRITE;
/*!40000 ALTER TABLE `profs` DISABLE KEYS */;
INSERT INTO `profs` VALUES (1,2,'/profs/sophie-martin','Sophie Martin','Dr en Informatique',1,'2024-10-31 00:19:55','2024-10-31 00:19:55'),(2,5,'/profs/luc-bernard','Luc Bernard','Professeur de Mathématiques',2,'2024-10-31 00:19:55','2024-10-31 00:19:55');
/*!40000 ALTER TABLE `profs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ressources`
--

DROP TABLE IF EXISTS `ressources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ressources` (
  `id_ressources` int NOT NULL AUTO_INCREMENT,
  `pays` varchar(50) DEFAULT NULL,
  `langue` varchar(50) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `short_descr` text,
  `date` datetime DEFAULT NULL,
  `likes` json DEFAULT NULL,
  `shares` int DEFAULT NULL,
  `views` json DEFAULT NULL,
  `note` json DEFAULT NULL,
  `coms` json DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `tag_ids` varchar(255) DEFAULT NULL,
  `profs_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `json` json DEFAULT NULL,
  `sujets_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_ressources`),
  KEY `user_id` (`user_id`),
  KEY `sujets_id` (`sujets_id`),
  CONSTRAINT `ressources_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  CONSTRAINT `ressources_ibfk_2` FOREIGN KEY (`sujets_id`) REFERENCES `sujets` (`id_sujets`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ressources`
--

LOCK TABLES `ressources` WRITE;
/*!40000 ALTER TABLE `ressources` DISABLE KEYS */;
INSERT INTO `ressources` VALUES (1,'France','fr','/ressources/python-cheatsheet','python-cheatsheet','Aide-mémoire Python','Résumé des commandes Python essentielles','2024-10-31 01:19:55','{\"count\": 100}',50,'[\"2024-10-31T01:19:55\", \"2024-10-31T01:19:55\", \"2024-10-31T01:19:55\"]','[5, 5, 4, 5, 5]','[]',7,'1,2',2,1,'{\"type\": \"pdf\"}',1,'2024-10-31 00:19:55','2024-10-31 12:30:05'),(2,'France','fr','/ressources/matrice-exercices','matrice-exercices','Exercices sur les matrices','Série d\'exercices sur les matrices','2024-10-31 01:19:55','{\"count\": 80}',40,'{\"count\": 1500}','{\"avg\": 4.5}','[]',2,'4,5',2,2,'{\"type\": \"docx\"}',2,'2024-10-31 00:19:55','2024-10-31 00:19:55'),(3,'France','fr','/ressources/lois-newton-video','lois-newton-video','Vidéo sur les lois de Newton','Explication visuelle des lois de Newton','2024-10-31 01:19:55','{\"count\": 120}',60,'{\"count\": 2500}','{\"avg\": 4.9}','[]',3,'6,7',3,3,'{\"type\": \"mp4\"}',3,'2024-10-31 00:19:55','2024-10-31 00:19:55');
/*!40000 ALTER TABLE `ressources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sujets`
--

DROP TABLE IF EXISTS `sujets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sujets` (
  `id_sujets` int NOT NULL AUTO_INCREMENT,
  `alias` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `fk` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_sujets`),
  KEY `user_id` (`user_id`),
  KEY `fk` (`fk`),
  CONSTRAINT `sujets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  CONSTRAINT `sujets_ibfk_2` FOREIGN KEY (`fk`) REFERENCES `matieres` (`id_matieres`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sujets`
--

LOCK TABLES `sujets` WRITE;
/*!40000 ALTER TABLE `sujets` DISABLE KEYS */;
INSERT INTO `sujets` VALUES (1,'Python',2,1,'2024-10-31 00:19:55','2024-10-31 00:19:55'),(2,'Matrices',2,2,'2024-10-31 00:19:55','2024-10-31 00:19:55'),(3,'Cinématique',3,3,'2024-10-31 00:19:55','2024-10-31 00:19:55');
/*!40000 ALTER TABLE `sujets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id_tags` int NOT NULL AUTO_INCREMENT,
  `fr` varchar(255) DEFAULT NULL,
  `en` varchar(255) DEFAULT NULL,
  `es` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_tags`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'Python','Python','Python','2024-10-31 00:19:55','2024-10-31 00:19:55'),(2,'Programmation','Programming','Programación','2024-10-31 00:19:55','2024-10-31 00:19:55'),(3,'Débutant','Beginner','Principiante','2024-10-31 00:19:55','2024-10-31 00:19:55'),(4,'Algèbre','Algebra','Álgebra','2024-10-31 00:19:55','2024-10-31 00:19:55'),(5,'Matrices','Matrices','Matrices','2024-10-31 00:19:55','2024-10-31 00:19:55'),(6,'Physique','Physics','Física','2024-10-31 00:19:55','2024-10-31 00:19:55'),(7,'Mécanique','Mechanics','Mecánica','2024-10-31 00:19:55','2024-10-31 00:19:55');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `pseudo` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Dubois','Jean','jdubois','15cbf0d3fcb06da3bdf98d0370a38f00343d0747eecdf416d27556c0f3812fd6','jean.dubois@email.com','étudiant','2024-10-31 00:19:54','2024-10-31 00:19:54'),(2,'Martin','Sophie','smartin','430893cdce2e7074821444975c1b6929f88957c6aa63f9e335673b61d241d1ef','sophie.martin@email.com','professeur','2024-10-31 00:19:54','2024-10-31 00:19:54'),(3,'Leroy','Pierre','pleroy','14c28260dd730c72801cd9eea54aeee1c7a059bc969fae03b08fe23ca9ff8ec4','pierre.leroy@email.com','admin','2024-10-31 00:19:54','2024-10-31 00:19:54'),(4,'Moreau','Claire','cmoreau','c955f01321b0761f22aee14b339a477c430ccdc9513aa79943b6d49599b245e5','claire.moreau@email.com','étudiant','2024-10-31 00:19:54','2024-10-31 00:19:54'),(5,'Bernard','Luc','lbernard','fc2c40745e850b0bd81ea703c9320073e2b29003f63a813fbf061db1ee0ae8a0','luc.bernard@email.com','professeur','2024-10-31 00:19:54','2024-10-31 00:19:54');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-31 13:34:52
