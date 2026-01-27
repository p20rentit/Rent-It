-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: p20_rentit
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `models`
--

DROP TABLE IF EXISTS `models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `models` (
  `model_id` int NOT NULL AUTO_INCREMENT,
  `model` varchar(45) NOT NULL,
  `brand_id` int NOT NULL,
  PRIMARY KEY (`model_id`),
  KEY `model_id_fk` (`brand_id`),
  CONSTRAINT `model_id_fk` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `models`
--

LOCK TABLES `models` WRITE;
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
INSERT INTO `models` VALUES (1,'450',1),(2,'450X',1),(3,'450 Plus',1),(4,'Rizta',1),(5,'450S',1),(6,'450 Apex',1),(7,'450X Gen 3',1),(8,'450X Pro',1),(9,'450 Urban',1),(10,'450 Sport',1),(11,'Pulsar 125',2),(12,'Pulsar 150',2),(13,'Pulsar NS200',2),(14,'Pulsar RS200',2),(15,'Avenger Street',2),(16,'Avenger Cruise',2),(17,'Dominar 250',2),(18,'Dominar 400',2),(19,'CT 110',2),(20,'Platinaa 110',2),(21,'Splendor Plus',3),(22,'HF Deluxe',3),(23,'Passion Pro',3),(24,'Glamour',3),(25,'Super Splendor',3),(26,'Xtreme 160R',3),(27,'Xpulse 200',3),(28,'Destini 125',3),(29,'Maestro Edge',3),(30,'Pleasure Plus',3),(31,'Activa 6G',4),(32,'Dio',4),(33,'Shine',4),(34,'Unicorn',4),(35,'Hornet 2.0',4),(36,'CB350',4),(37,'CBR 250R',4),(38,'Livo',4),(39,'Grazia',4),(40,'SP 125',4),(41,'i10',5),(42,'i20',5),(43,'Aura',5),(44,'Verna',5),(45,'Creta',5),(46,'Venue',5),(47,'Alcazar',5),(48,'Tucson',5),(49,'Elantra',5),(50,'Kona EV',5),(51,'Seltos',6),(52,'Sonet',6),(53,'Carens',6),(54,'Carnival',6),(55,'EV6',6),(56,'Cerato',6),(57,'Rio',6),(58,'Optima',6),(59,'Sportage',6),(60,'Telluride',6),(61,'Duke 125',7),(62,'Duke 200',7),(63,'Duke 250',7),(64,'Duke 390',7),(65,'RC 125',7),(66,'RC 200',7),(67,'RC 390',7),(68,'Adventure 250',7),(69,'Adventure 390',7),(70,'Super Duke',7),(71,'Bolero',8),(72,'Bolero Neo',8),(73,'Scorpio',8),(74,'Scorpio N',8),(75,'XUV300',8),(76,'XUV400 EV',8),(77,'XUV700',8),(78,'Thar',8),(79,'Marazzo',8),(80,'KUV100',8),(81,'Alto',9),(82,'WagonR',9),(83,'Swift',9),(84,'Baleno',9),(85,'Dzire',9),(86,'Ciaz',9),(87,'Brezza',9),(88,'Grand Vitara',9),(89,'Ertiga',9),(90,'Fronx',9),(91,'S1',10),(92,'S1 Pro',10),(93,'S1 Air',10),(94,'S1 X',10),(95,'S1 Pro Gen2',10),(96,'S1 Air Gen2',10),(97,'S1 Urban',10),(98,'S1 Sport',10),(99,'S1 Plus',10),(100,'S1 Max',10),(101,'Classic 350',11),(102,'Bullet 350',11),(103,'Meteor 350',11),(104,'Hunter 350',11),(105,'Interceptor 650',11),(106,'Continental GT',11),(107,'Himalayan',11),(108,'Scram 411',11),(109,'Thunderbird',11),(110,'Classic Signals',11),(111,'Rapid',12),(112,'Slavia',12),(113,'Octavia',12),(114,'Superb',12),(115,'Kushaq',12),(116,'Kodiaq',12),(117,'Fabia',12),(118,'Yeti',12),(119,'Enyaq EV',12),(120,'Laura',12),(121,'Access 125',13),(122,'Burgman Street',13),(123,'Gixxer',13),(124,'Gixxer SF',13),(125,'Hayabusa',13),(126,'V-Strom 250',13),(127,'Avenis',13),(128,'Lets',13),(129,'Intruder',13),(130,'Katana',13),(131,'Tiago',14),(132,'Tiago EV',14),(133,'Tigor',14),(134,'Tigor EV',14),(135,'Altroz',14),(136,'Nexon',14),(137,'Nexon EV',14),(138,'Harrier',14),(139,'Safari',14),(140,'Punch',14),(141,'Apache RTR 160',15),(142,'Apache RTR 200',15),(143,'Raider 125',15),(144,'Star City',15),(145,'Jupiter',15),(146,'NTorq',15),(147,'XL 100',15),(148,'Ronin',15),(149,'Sport',15),(150,'Scooty Pep+',15),(151,'Innova',16),(152,'Innova Crysta',16),(153,'Fortuner',16),(154,'Glanza',16),(155,'Urban Cruiser',16),(156,'Camry',16),(157,'Corolla',16),(158,'Hilux',16),(159,'Land Cruiser',16),(160,'Yaris',16),(161,'Polo',17),(162,'Virtus',17),(163,'Vento',17),(164,'Taigun',17),(165,'Tiguan',17),(166,'Passat',17),(167,'Jetta',17),(168,'Atlas',17),(169,'ID4',17),(170,'Beetle',17),(171,'R15',18),(172,'R3',18),(173,'MT 15',18),(174,'FZ S',18),(175,'FZ X',18),(176,'Fascino',18),(177,'Ray ZR',18),(178,'Aerox 155',18),(179,'RX 100',18),(180,'Tenere 700',18);
/*!40000 ALTER TABLE `models` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-27 18:51:28
