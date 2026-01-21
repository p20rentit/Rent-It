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
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `area_id` int NOT NULL AUTO_INCREMENT,
  `area_name` varchar(45) NOT NULL,
  `city_id` int NOT NULL,
  `pincode` varchar(45) NOT NULL,
  PRIMARY KEY (`area_id`),
  KEY `city_id_fk_idx` (`city_id`),
  CONSTRAINT `city_id_fk` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=718 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (238,'Colaba',1,'400005'),(239,'Fort',1,'400001'),(240,'Marine Lines',1,'400020'),(241,'Churchgate',1,'400020'),(242,'Byculla',1,'400011'),(243,'Mazgaon',1,'400010'),(244,'Parel',1,'400012'),(245,'Dadar',1,'400014'),(246,'Mahim',1,'400016'),(247,'Worli',1,'400018'),(248,'Andheri East',2,'400069'),(249,'Andheri West',2,'400058'),(250,'Bandra East',2,'400051'),(251,'Bandra West',2,'400050'),(252,'Goregaon East',2,'400063'),(253,'Goregaon West',2,'400062'),(254,'Malad East',2,'400097'),(255,'Malad West',2,'400064'),(256,'Borivali East',2,'400066'),(257,'Borivali West',2,'400092'),(258,'Thane West',3,'400601'),(259,'Thane East',3,'400603'),(260,'Ghodbunder Road',3,'400607'),(261,'Manpada',3,'400610'),(262,'Vartak Nagar',3,'400606'),(263,'Kopri',3,'400603'),(264,'Kalwa',3,'400605'),(265,'Mumbra',3,'400612'),(266,'Wagle Estate',3,'400604'),(267,'Kolshet',3,'400607'),(268,'Shivajinagar',8,'411005'),(269,'Deccan Gymkhana',8,'411004'),(270,'Kothrud',8,'411038'),(271,'Karve Nagar',8,'411052'),(272,'Warje Malwadi',8,'411058'),(273,'Aundh',8,'411007'),(274,'Baner',8,'411045'),(275,'Balewadi',8,'411045'),(276,'Pashan',8,'411021'),(277,'Bavdhan',8,'411021'),(278,'Hinjewadi',8,'411057'),(279,'Wakad',8,'411057'),(280,'Pimple Saudagar',8,'411027'),(281,'Pimple Nilakh',8,'411027'),(282,'Katraj',8,'411046'),(283,'Bibwewadi',8,'411037'),(284,'Kondhwa',8,'411048'),(285,'Wanowrie',8,'411040'),(286,'Hadapsar',8,'411028'),(287,'Magarpatta',8,'411013'),(288,'Kharadi',8,'411014'),(289,'Viman Nagar',8,'411014'),(290,'Yerwada',8,'411006'),(291,'Kalyani Nagar',8,'411006'),(292,'Mundhwa',8,'411036'),(293,'Manjri',8,'412307'),(294,'Dhanori',8,'411015'),(295,'Lohegaon',8,'411047'),(296,'Sinhagad Road',8,'411051'),(297,'Swargate',8,'411042'),(298,'Camp',8,'411001'),(299,'Savedi',14,'414003'),(300,'Kedgaon',14,'414005'),(301,'Mukundnagar',14,'414001'),(302,'Bhingar',14,'414002'),(303,'Burudgaon Road',14,'414001'),(304,'Delhi Gate',14,'414001'),(305,'Maliwada',14,'414001'),(306,'Topkhana',14,'414001'),(307,'Camp Area',14,'414002'),(308,'MIDC Ahmednagar',14,'414111'),(309,'Station Road',14,'414001'),(310,'Market Yard',14,'414001'),(311,'Shivajinagar',14,'414001'),(312,'Pipeline Road',14,'414003'),(313,'Sarangpur',14,'414001'),(314,'Nalegaon',14,'414002'),(315,'Sawedi Naka',14,'414003'),(316,'Pathardi Road',14,'414001'),(317,'Rahuri Road',14,'414001'),(318,'Housing Board Colony',14,'414003'),(319,'Court Area',14,'414001'),(320,'Collector Office Area',14,'414001'),(321,'Bus Stand Area',14,'414001'),(322,'Railway Colony',14,'414001'),(323,'Sangamner Road',14,'414001'),(324,'Sangli Gaon',10,'416416'),(325,'Vishrambag',10,'416415'),(326,'Kupwad',10,'416436'),(327,'Miraj Road',10,'416410'),(328,'Civil Hospital Area',10,'416416'),(329,'Market Yard',10,'416416'),(330,'MIDC Sangli',10,'416416'),(331,'Station Road',10,'416416'),(332,'Shahupuri',11,'416001'),(333,'Rajarampuri',11,'416008'),(334,'Tarabai Park',11,'416003'),(335,'Udyam Nagar',11,'416008'),(336,'Kasba Bawada',11,'416006'),(337,'Rankala Lake Area',11,'416012'),(338,'Mangalwar Peth',11,'416012'),(339,'Ichalkaranji Road',11,'416005'),(340,'Solapur City',12,'413001'),(341,'Saat Rasta',12,'413003'),(342,'Railway Lines',12,'413001'),(343,'Vijapur Road',12,'413004'),(344,'Hotgi Road',12,'413003'),(345,'Market Yard',12,'413005'),(346,'MIDC Solapur',12,'413006'),(347,'Station Area',12,'413001'),(348,'Panchavati',13,'422003'),(349,'Gangapur Road',13,'422013'),(350,'College Road',13,'422005'),(351,'Indira Nagar',13,'422009'),(352,'CIDCO',13,'422008'),(353,'Satpur',13,'422007'),(354,'Govind Nagar',13,'422009'),(355,'Dwarka',13,'422011'),(356,'Trimbak Road',13,'422007'),(357,'Pathardi Phata',13,'422010'),(358,'Colaba',1,'400005'),(359,'Fort',1,'400001'),(360,'Marine Lines',1,'400020'),(361,'Churchgate',1,'400020'),(362,'Byculla',1,'400011'),(363,'Mazgaon',1,'400010'),(364,'Parel',1,'400012'),(365,'Dadar',1,'400014'),(366,'Mahim',1,'400016'),(367,'Worli',1,'400018'),(368,'Andheri East',2,'400069'),(369,'Andheri West',2,'400058'),(370,'Bandra East',2,'400051'),(371,'Bandra West',2,'400050'),(372,'Goregaon East',2,'400063'),(373,'Goregaon West',2,'400062'),(374,'Malad East',2,'400097'),(375,'Malad West',2,'400064'),(376,'Borivali East',2,'400066'),(377,'Borivali West',2,'400092'),(378,'Thane West',3,'400601'),(379,'Thane East',3,'400603'),(380,'Ghodbunder Road',3,'400607'),(381,'Manpada',3,'400610'),(382,'Vartak Nagar',3,'400606'),(383,'Kopri',3,'400603'),(384,'Kalwa',3,'400605'),(385,'Mumbra',3,'400612'),(386,'Wagle Estate',3,'400604'),(387,'Kolshet',3,'400607'),(388,'Palghar Town',4,'401404'),(389,'Boisar',4,'401501'),(390,'Tarapur',4,'401502'),(391,'Virar East',4,'401305'),(392,'Virar West',4,'401303'),(393,'Dahanu',4,'401601'),(394,'Safale',4,'401102'),(395,'Vasai East',4,'401208'),(396,'Vasai West',4,'401202'),(397,'Nalasopara',4,'401209'),(398,'Alibag',5,'402201'),(399,'Panvel',5,'410206'),(400,'Khopoli',5,'410203'),(401,'Pen',5,'402107'),(402,'Uran',5,'400702'),(403,'Mahad',5,'402301'),(404,'Karjat',5,'410201'),(405,'Roha',5,'402109'),(406,'Murud',5,'402401'),(407,'Mangaon',5,'402104'),(408,'Ratnagiri City',6,'415612'),(409,'Ganpatipule',6,'415615'),(410,'Chiplun',6,'415605'),(411,'Dapoli',6,'415712'),(412,'Guhagar',6,'415703'),(413,'Khed',6,'415709'),(414,'Rajapur',6,'416702'),(415,'Lanja',6,'416701'),(416,'Mandangad',6,'415203'),(417,'Sangameshwar',6,'415611'),(418,'Sawantwadi',7,'416510'),(419,'Kudal',7,'416520'),(420,'Malvan',7,'416606'),(421,'Vengurla',7,'416516'),(422,'Devgad',7,'416613'),(423,'Dodamarg',7,'416512'),(424,'Kankavli',7,'416602'),(425,'Achara',7,'416626'),(426,'Tarkarli',7,'416606'),(427,'Naringre',7,'416513'),(428,'Shivajinagar',8,'411005'),(429,'Deccan',8,'411004'),(430,'Kothrud',8,'411038'),(431,'Aundh',8,'411007'),(432,'Baner',8,'411045'),(433,'Hinjewadi',8,'411057'),(434,'Hadapsar',8,'411028'),(435,'Kharadi',8,'411014'),(436,'Viman Nagar',8,'411014'),(437,'Wakad',8,'411057'),(438,'Satara City',9,'415001'),(439,'Karad',9,'415110'),(440,'Wai',9,'412803'),(441,'Mahabaleshwar',9,'412806'),(442,'Phaltan',9,'415523'),(443,'Koregaon',9,'415501'),(444,'Dahiwadi',9,'415508'),(445,'Lonand',9,'415521'),(446,'Medha',9,'415012'),(447,'Vaduj',9,'415506'),(448,'Sangli Gaon',10,'416416'),(449,'Vishrambag',10,'416415'),(450,'Kupwad',10,'416436'),(451,'Miraj Road',10,'416410'),(452,'Market Yard',10,'416416'),(453,'MIDC Sangli',10,'416416'),(454,'Station Road',10,'416416'),(455,'Civil Hospital Area',10,'416416'),(456,'Industrial Area',10,'416416'),(457,'Town Hall Area',10,'416416'),(458,'Shahupuri',11,'416001'),(459,'Rajarampuri',11,'416008'),(460,'Tarabai Park',11,'416003'),(461,'Udyam Nagar',11,'416008'),(462,'Kasba Bawada',11,'416006'),(463,'Rankala Lake',11,'416012'),(464,'Mangalwar Peth',11,'416012'),(465,'Jawahar Nagar',11,'416007'),(466,'Shivaji Udyamnagar',11,'416008'),(467,'Kalamba',11,'416007'),(468,'Saat Rasta',12,'413003'),(469,'Railway Lines',12,'413001'),(470,'Vijapur Road',12,'413004'),(471,'Hotgi Road',12,'413003'),(472,'Market Yard',12,'413005'),(473,'MIDC Solapur',12,'413006'),(474,'Ashok Chowk',12,'413006'),(475,'Shelgi',12,'413002'),(476,'Akkalkot Road',12,'413006'),(477,'Civil Lines',12,'413001'),(478,'Panchavati',13,'422003'),(479,'Gangapur Road',13,'422013'),(480,'College Road',13,'422005'),(481,'Indira Nagar',13,'422009'),(482,'CIDCO',13,'422008'),(483,'Satpur',13,'422007'),(484,'Govind Nagar',13,'422009'),(485,'Dwarka',13,'422011'),(486,'Pathardi Phata',13,'422010'),(487,'Trimbak Road',13,'422007'),(488,'Savedi',14,'414003'),(489,'Kedgaon',14,'414005'),(490,'Mukundnagar',14,'414001'),(491,'Bhingar',14,'414002'),(492,'Burudgaon Road',14,'414001'),(493,'Delhi Gate',14,'414001'),(494,'Maliwada',14,'414001'),(495,'Topkhana',14,'414001'),(496,'MIDC Ahmednagar',14,'414111'),(497,'Station Road',14,'414001'),(498,'Dhule City',15,'424001'),(499,'Deopur',15,'424002'),(500,'MIDC Dhule',15,'424006'),(501,'Walwadi',15,'424005'),(502,'Mohol Road',15,'424001'),(503,'Bhadane',15,'424002'),(504,'Chalisgaon Road',15,'424001'),(505,'Sakri Road',15,'424304'),(506,'Malegaon Road',15,'424001'),(507,'Agra Road',15,'424001'),(508,'Nandurbar City',16,'425412'),(509,'Navapur',16,'425418'),(510,'Shahada',16,'425409'),(511,'Taloda',16,'425413'),(512,'Akkalkuwa',16,'425415'),(513,'Dhadgaon',16,'425414'),(514,'MIDC Area',16,'425412'),(515,'Bus Stand Area',16,'425412'),(516,'Station Road',16,'425412'),(517,'Main Market',16,'425412'),(518,'Jalgaon City',17,'425001'),(519,'MIDC Jalgaon',17,'425003'),(520,'Bhusawal Road',17,'425001'),(521,'Zilla Peth',17,'425001'),(522,'Ganesh Colony',17,'425001'),(523,'Shivaji Nagar',17,'425002'),(524,'Ring Road',17,'425002'),(525,'Mehrun',17,'425002'),(526,'Railway Colony',17,'425001'),(527,'Navipeth',17,'425001'),(528,'CIDCO',18,'431003'),(529,'Waluj',18,'431136'),(530,'Garkheda',18,'431005'),(531,'Kranti Chowk',18,'431001'),(532,'Jalna Road',18,'431005'),(533,'Satara Parisar',18,'431010'),(534,'Mukundwadi',18,'431007'),(535,'Chikalthana',18,'431006'),(536,'Beed Bypass',18,'431005'),(537,'City Chowk',18,'431001'),(538,'Jalna City',19,'431203'),(539,'Old Jalna',19,'431203'),(540,'New Jalna',19,'431203'),(541,'MIDC Jalna',19,'431203'),(542,'Bus Stand Area',19,'431203'),(543,'Station Road',19,'431203'),(544,'Ambad Road',19,'431203'),(545,'Mantha Road',19,'431203'),(546,'Bhokardan Road',19,'431203'),(547,'Civil Lines',19,'431203'),(548,'Beed City',20,'431122'),(549,'MIDC Beed',20,'431122'),(550,'Shivaji Nagar',20,'431122'),(551,'Civil Hospital Area',20,'431122'),(552,'Bus Stand Area',20,'431122'),(553,'Station Road',20,'431122'),(554,'Ring Road',20,'431122'),(555,'Market Yard',20,'431122'),(556,'Georai Road',20,'431122'),(557,'Ambajogai Road',20,'431122'),(558,'Osmanabad City',21,'413501'),(559,'Tuljapur Road',21,'413501'),(560,'MIDC Osmanabad',21,'413501'),(561,'Station Area',21,'413501'),(562,'Bus Stand Area',21,'413501'),(563,'Civil Lines',21,'413501'),(564,'Market Yard',21,'413501'),(565,'Solapur Road',21,'413501'),(566,'Kalamb Road',21,'413501'),(567,'Housing Board',21,'413501'),(568,'Latur City',22,'413512'),(569,'MIDC Latur',22,'413531'),(570,'Ausa Road',22,'413512'),(571,'Renapur Road',22,'413512'),(572,'Udgir Road',22,'413512'),(573,'Civil Lines',22,'413512'),(574,'Bus Stand Area',22,'413512'),(575,'Station Road',22,'413512'),(576,'Market Yard',22,'413512'),(577,'Shivaji Nagar',22,'413512'),(578,'Parbhani City',23,'431401'),(579,'MIDC Parbhani',23,'431401'),(580,'Gangakhed Road',23,'431401'),(581,'Manwath Road',23,'431401'),(582,'Station Area',23,'431401'),(583,'Bus Stand Area',23,'431401'),(584,'Civil Lines',23,'431401'),(585,'Market Yard',23,'431401'),(586,'Jintur Road',23,'431401'),(587,'Housing Colony',23,'431401'),(588,'Hingoli City',24,'431513'),(589,'MIDC Hingoli',24,'431513'),(590,'Basmat Road',24,'431513'),(591,'Kalamnuri Road',24,'431513'),(592,'Bus Stand Area',24,'431513'),(593,'Station Road',24,'431513'),(594,'Civil Lines',24,'431513'),(595,'Market Yard',24,'431513'),(596,'Housing Board',24,'431513'),(597,'Shivaji Nagar',24,'431513'),(598,'Nanded City',25,'431601'),(599,'Vishnupuri',25,'431606'),(600,'CIDCO Nanded',25,'431603'),(601,'Airport Area',25,'431605'),(602,'MIDC Nanded',25,'431603'),(603,'Degloor Road',25,'431601'),(604,'Bhokar Road',25,'431601'),(605,'Station Area',25,'431601'),(606,'Bus Stand Area',25,'431601'),(607,'Civil Lines',25,'431601'),(608,'Amravati City',26,'444601'),(609,'Badnera',26,'444701'),(610,'MIDC Amravati',26,'444607'),(611,'Camp Area',26,'444602'),(612,'Rajapeth',26,'444605'),(613,'VMV Road',26,'444604'),(614,'Bus Stand Area',26,'444601'),(615,'Station Road',26,'444601'),(616,'Civil Lines',26,'444601'),(617,'Gopal Nagar',26,'444606'),(618,'Akola City',27,'444001'),(619,'MIDC Akola',27,'444104'),(620,'Old City',27,'444001'),(621,'New City',27,'444001'),(622,'Civil Lines',27,'444001'),(623,'Bus Stand Area',27,'444001'),(624,'Station Road',27,'444001'),(625,'Market Yard',27,'444001'),(626,'Balapur Road',27,'444001'),(627,'Shivaji Nagar',27,'444001'),(628,'Washim City',28,'444505'),(629,'MIDC Washim',28,'444505'),(630,'Risod Road',28,'444505'),(631,'Mangrulpir Road',28,'444505'),(632,'Bus Stand Area',28,'444505'),(633,'Station Area',28,'444505'),(634,'Civil Lines',28,'444505'),(635,'Market Yard',28,'444505'),(636,'Housing Colony',28,'444505'),(637,'Main Chowk',28,'444505'),(638,'Buldhana City',29,'443001'),(639,'Chikhli Road',29,'443001'),(640,'MIDC Buldhana',29,'443001'),(641,'Bus Stand Area',29,'443001'),(642,'Station Road',29,'443001'),(643,'Civil Lines',29,'443001'),(644,'Market Yard',29,'443001'),(645,'Malkapur Road',29,'443001'),(646,'Housing Board',29,'443001'),(647,'Shivaji Nagar',29,'443001'),(648,'Yavatmal City',30,'445001'),(649,'MIDC Yavatmal',30,'445001'),(650,'Arni Road',30,'445001'),(651,'Darwha Road',30,'445001'),(652,'Bus Stand Area',30,'445001'),(653,'Station Road',30,'445001'),(654,'Civil Lines',30,'445001'),(655,'Market Yard',30,'445001'),(656,'Housing Colony',30,'445001'),(657,'Shivaji Nagar',30,'445001'),(658,'Sitabuldi',31,'440012'),(659,'Dharampeth',31,'440010'),(660,'Sadar',31,'440001'),(661,'Civil Lines',31,'440001'),(662,'Manish Nagar',31,'440015'),(663,'Trimurti Nagar',31,'440022'),(664,'Pratap Nagar',31,'440022'),(665,'Laxmi Nagar',31,'440010'),(666,'Jaripatka',31,'440014'),(667,'Koradi Road',31,'440025'),(668,'Wardha City',32,'442001'),(669,'MIDC Wardha',32,'442001'),(670,'Civil Lines',32,'442001'),(671,'Bus Stand Area',32,'442001'),(672,'Station Road',32,'442001'),(673,'Market Yard',32,'442001'),(674,'Housing Colony',32,'442001'),(675,'Sevagram',32,'442102'),(676,'Arvi Road',32,'442001'),(677,'Pulgaon Road',32,'442001'),(678,'Chandrapur City',33,'442401'),(679,'MIDC Chandrapur',33,'442401'),(680,'Ballarpur Road',33,'442401'),(681,'Civil Lines',33,'442401'),(682,'Bus Stand Area',33,'442401'),(683,'Station Area',33,'442401'),(684,'Market Yard',33,'442401'),(685,'Padoli',33,'442406'),(686,'Ram Nagar',33,'442401'),(687,'Shivaji Nagar',33,'442401'),(688,'Gadchiroli City',34,'442605'),(689,'MIDC Gadchiroli',34,'442605'),(690,'Civil Lines',34,'442605'),(691,'Bus Stand Area',34,'442605'),(692,'Station Road',34,'442605'),(693,'Market Yard',34,'442605'),(694,'Housing Colony',34,'442605'),(695,'Chamorshi Road',34,'442605'),(696,'Desaiganj Road',34,'442605'),(697,'Armori Road',34,'442605'),(698,'Bhandara City',35,'441904'),(699,'MIDC Bhandara',35,'441904'),(700,'Civil Lines',35,'441904'),(701,'Bus Stand Area',35,'441904'),(702,'Station Road',35,'441904'),(703,'Market Yard',35,'441904'),(704,'Housing Colony',35,'441904'),(705,'Tumsar Road',35,'441904'),(706,'Pauni Road',35,'441904'),(707,'Shivaji Nagar',35,'441904'),(708,'Gondia City',36,'441601'),(709,'MIDC Gondia',36,'441601'),(710,'Civil Lines',36,'441601'),(711,'Bus Stand Area',36,'441601'),(712,'Station Road',36,'441601'),(713,'Market Yard',36,'441601'),(714,'Housing Colony',36,'441601'),(715,'Fulchur Road',36,'441601'),(716,'Irrigation Colony',36,'441601'),(717,'Railway Colony',36,'441601');
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `booking_date` datetime NOT NULL,
  `starting_date` date NOT NULL,
  `end_date` date NOT NULL,
  `booking_status` enum('Pending','Confirmed','Cancelled','Completed') DEFAULT 'Pending',
  `payment_status` enum('Pending','Paid') DEFAULT 'Pending',
  PRIMARY KEY (`booking_id`),
  KEY `user_id_fk_idx` (`user_id`),
  KEY `vehicle_id_fk_idx` (`vehicle_id`),
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `vehicle_id_fk` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`vehicle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (101,1,1,'2025-01-20 10:00:00','2025-01-21','2025-01-22','Pending','Pending'),(102,1,2,'2025-01-18 14:30:00','2025-01-19','2025-01-21','Completed','Paid'),(103,1,1,'2025-01-19 09:10:00','2025-01-20','2025-01-22','Cancelled','Pending'),(201,1,1,'2025-01-20 00:00:00','2025-01-21','2025-01-22','Pending','Pending'),(202,1,2,'2025-01-18 00:00:00','2025-01-19','2025-01-21','Completed','Paid'),(203,1,1,'2025-01-19 00:00:00','2025-01-20','2025-01-22','Cancelled','Pending');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_record`
--

DROP TABLE IF EXISTS `booking_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_record` (
  `record_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL,
  `vehicle_status` enum('Booked','Picked','Returned','Cancelled') NOT NULL,
  `action_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`record_id`),
  KEY `fk_br_booking` (`booking_id`),
  CONSTRAINT `fk_br_booking` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_record`
--

LOCK TABLES `booking_record` WRITE;
/*!40000 ALTER TABLE `booking_record` DISABLE KEYS */;
INSERT INTO `booking_record` VALUES (1,201,'Booked','2025-01-20 10:10:00'),(2,201,'Picked','2025-01-21 09:00:00'),(3,201,'Returned','2025-01-22 11:30:00');
/*!40000 ALTER TABLE `booking_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(45) NOT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Mumbai'),(2,'Mumbai Suburban'),(3,'Thane'),(4,'Palghar'),(5,'Raigad'),(6,'Ratnagiri'),(7,'Sindhudurg'),(8,'Pune'),(9,'Satara'),(10,'Sangli'),(11,'Kolhapur'),(12,'Solapur'),(13,'Nashik'),(14,'Ahmednagar'),(15,'Dhule'),(16,'Nandurbar'),(17,'Jalgaon'),(18,'Aurangabad'),(19,'Jalna'),(20,'Beed'),(21,'Osmanabad'),(22,'Latur'),(23,'Parbhani'),(24,'Hingoli'),(25,'Nanded'),(26,'Amravati'),(27,'Akola'),(28,'Washim'),(29,'Buldhana'),(30,'Yavatmal'),(31,'Nagpur'),(32,'Wardha'),(33,'Chandrapur'),(34,'Gadchiroli'),(35,'Bhandara'),(36,'Gondia');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL,
  `payment_method` enum('UPI','Card','NetBanking','Cash') NOT NULL,
  `payment_amount` decimal(10,2) NOT NULL,
  `payment_status` enum('Pending','Success','Failed','Refunded') DEFAULT 'Pending',
  `transaction_id` varchar(100) NOT NULL,
  `payment_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `fk_payment_booking_idx` (`booking_id`),
  CONSTRAINT `fk_payment_booking` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,201,'UPI',1200.00,'Pending','TXN_UPI_001','2025-01-21 09:10:00'),(2,202,'Card',2400.50,'Success','TXN_CARD_002','2025-01-19 10:20:00'),(3,203,'UPI',1800.00,'Pending','TXN_UPI_003','2025-01-20 09:15:00');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL,
  `role_name` varchar(45) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Customer'),(3,'Owner');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `Fname` varchar(45) NOT NULL,
  `Mname` varchar(45) DEFAULT NULL,
  `Lname` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `driving_licence_no` varchar(45) NOT NULL,
  `Addhar_no` varchar(45) NOT NULL,
  `pan_no` varchar(45) DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `area_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `Addhar_no_UNIQUE` (`Addhar_no`),
  UNIQUE KEY `driving_licence_no_UNIQUE` (`driving_licence_no`),
  UNIQUE KEY `pan_no_UNIQUE` (`pan_no`),
  KEY `role_id_fk_idx` (`role_id`),
  KEY `area_id_fk_idx` (`area_id`),
  CONSTRAINT `area_id_fk` FOREIGN KEY (`area_id`) REFERENCES `area` (`area_id`),
  CONSTRAINT `role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'Rohit','Kisan','Gunjal','9730607012','gunjalrohitk9730@gmail.com','MH1620230010665','404610863815','DQOPG2998J','Rohit@1234','Parner',300),(2,1,'Akash','Sanjay','Patil','9404385914','akashpatil385914@gmail.com','MH1020220024797','414711873916','DSTPP6302Q','Akash@2345','Sangali',301),(10,3,'Suraj','Santosh','Patil','9009028790','sp1049725@gamil.com','MHA1121250012667','424812884017','FSQRI3101I','Suraj@3456','Buranpur',302),(11,1,'Pavankumar','Tanaji','Jadhav','9673975997','pavankumartanajijadhav1@gamil.com','MH0920150013668','434913894118','GTRSJ3202J','Pavan@4567','Kolhapur',303),(12,1,'Aditya','Ramesh','Jadkar','7666425291','adinath@gmail.com','MH1320230014669','445014904219','HUSKT321K','aditya@5678','Solapur',304),(13,2,'Shreyash','Babasaheb','Chougale','8080423690','shreyash@gmail.com','MH1420240015670','455115904220','IJKYRP322M','shreyash@6789','Kolhapur',305);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `vehicle_id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `vehicle_type_id` int NOT NULL,
  `Brand` varchar(45) NOT NULL,
  `Model` varchar(45) DEFAULT NULL,
  `Fuel_type` varchar(45) NOT NULL,
  `ac` tinyint DEFAULT '0',
  `status` tinyint DEFAULT NULL,
  `vehicle_number` varchar(45) NOT NULL,
  `vehicle_rc_number` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`vehicle_id`),
  UNIQUE KEY `vehicle_number_UNIQUE` (`vehicle_number`),
  UNIQUE KEY `vehicle_rc_number_UNIQUE` (`vehicle_rc_number`),
  KEY `owner_id_fk_idx` (`owner_id`),
  KEY `vehicle_type_id_fk_idx` (`vehicle_type_id`),
  CONSTRAINT `owner_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `vehicle_type_id_fk` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_type` (`vehicle_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (1,10,1,'Maruti Suzuki','Swift','Petrol',1,1,'MH12AB1234','RC123456','Hatchback 5-seater'),(2,10,1,'Hyundai','i20','Petrol',1,1,'MH13CD5678','RC567890','Premium hatchback'),(3,10,2,'Tata','Nexon','Diesel',1,1,'MH14EF2345','RC246810','Compact SUV'),(4,10,3,'Honda','Activa 6G','Petrol',0,1,'MH15GH1122','RC369121','Scooter 110cc');
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_image`
--

DROP TABLE IF EXISTS `vehicle_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_image` (
  `vehicle_image_id` int NOT NULL AUTO_INCREMENT,
  `vehicle_id` int NOT NULL,
  `image_url` varchar(45) DEFAULT NULL,
  `is_primary` tinyint DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`vehicle_image_id`),
  KEY `vehicle_id_fk_idx` (`vehicle_id`),
  CONSTRAINT `vehicle_id_fk_i` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`vehicle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_image`
--

LOCK TABLES `vehicle_image` WRITE;
/*!40000 ALTER TABLE `vehicle_image` DISABLE KEYS */;
INSERT INTO `vehicle_image` VALUES (1,1,'swift_front.jpg',1,'2025-01-20 10:00:00'),(2,1,'swift_side.jpg',0,'2025-01-20 10:02:00'),(3,1,'swift_rear.jpg',0,'2025-01-20 10:05:00'),(4,2,'creta_front.jpg',1,'2025-01-19 09:15:00'),(5,2,'creta_interior.jpg',0,'2025-01-19 09:18:00'),(6,2,'creta_rear.jpg',0,'2025-01-19 09:20:00'),(7,3,'activa_front.jpg',1,'2025-01-18 08:30:00'),(8,3,'activa_side.jpg',0,'2025-01-18 08:32:00');
/*!40000 ALTER TABLE `vehicle_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_type`
--

DROP TABLE IF EXISTS `vehicle_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_type` (
  `vehicle_type_id` int NOT NULL AUTO_INCREMENT,
  `vehicle_type_name` varchar(45) NOT NULL,
  `Rate` int NOT NULL,
  `Deposit` decimal(10,2) NOT NULL,
  PRIMARY KEY (`vehicle_type_id`),
  UNIQUE KEY `vehicle_type_name_UNIQUE` (`vehicle_type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_type`
--

LOCK TABLES `vehicle_type` WRITE;
/*!40000 ALTER TABLE `vehicle_type` DISABLE KEYS */;
INSERT INTO `vehicle_type` VALUES (1,'Bike Standard',300,0.00),(2,'Scooter Standard',250,0.00),(3,'Hatchback',1000,0.00),(4,'Sedan',1200,0.00),(5,'SUV',1800,0.00),(6,'Luxury Car',3000,0.00),(7,'Bike Sports',450,0.00),(8,'Compact SUV',1500,0.00),(9,'Scooter Electric',300,0.00),(10,'EV Car',1500,0.00);
/*!40000 ALTER TABLE `vehicle_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-20 17:06:17
