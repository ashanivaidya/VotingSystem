-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: fose_project
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `candidateList`
--

DROP TABLE IF EXISTS `candidateList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidateList` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cand_election_id` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidateList`
--

LOCK TABLES `candidateList` WRITE;
/*!40000 ALTER TABLE `candidateList` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidateList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electionInfo`
--

DROP TABLE IF EXISTS `electionInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electionInfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `election_id` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `start_MM` varchar(45) NOT NULL,
  `start_DD` varchar(45) NOT NULL,
  `start_YYYY` varchar(45) NOT NULL,
  `end_MM` varchar(45) NOT NULL,
  `end_DD` varchar(45) NOT NULL,
  `end_YYYY` varchar(45) NOT NULL,
  `precinct_list_id` varchar(45) NOT NULL,
  `candidate_list_id` varchar(45) NOT NULL,
  `position` varchar(45) NOT NULL,
  `candidates` varchar(45) NOT NULL,
  `precincts` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electionInfo`
--

LOCK TABLES `electionInfo` WRITE;
/*!40000 ALTER TABLE `electionInfo` DISABLE KEYS */;
INSERT INTO `electionInfo` VALUES (11,'2xoKs','Test','Iowa','05','04','2022','05','06','2022','hkgvjhb','BZ2fv','US President','Candidate 1, Candidate 2','P1, P2');
/*!40000 ALTER TABLE `electionInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `precinctList`
--

DROP TABLE IF EXISTS `precinctList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `precinctList` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prec_election_id` varchar(45) NOT NULL,
  `precinct_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `precinctList`
--

LOCK TABLES `precinctList` WRITE;
/*!40000 ALTER TABLE `precinctList` DISABLE KEYS */;
/*!40000 ALTER TABLE `precinctList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `precincts`
--

DROP TABLE IF EXISTS `precincts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `precincts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `precMan_id` varchar(45) NOT NULL,
  `Precinct` varchar(45) NOT NULL,
  `Zipcode` varchar(45) NOT NULL,
  `Plus_4_Start` varchar(45) NOT NULL,
  `Plus_4_End` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `precincts`
--

LOCK TABLES `precincts` WRITE;
/*!40000 ALTER TABLE `precincts` DISABLE KEYS */;
INSERT INTO `precincts` VALUES (1,'1234','P1','52240','0000','3000'),(2,'1234','P1','52241','5000','9999'),(3,'5678','P2','52240','3001','9999'),(4,'5678','P2','52241','0000','4999');
/*!40000 ALTER TABLE `precincts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userInfo`
--

DROP TABLE IF EXISTS `userInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userInfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `drivingLicense` varchar(45) DEFAULT NULL,
  `passportNo` varchar(45) DEFAULT NULL,
  `emailId` varchar(45) DEFAULT NULL,
  `userType` varchar(45) DEFAULT NULL,
  `failedLoginAttempts` int DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `Token` varchar(100) DEFAULT NULL,
  `pendingApproval` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COMMENT='\n';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userInfo`
--

LOCK TABLES `userInfo` WRITE;
/*!40000 ALTER TABLE `userInfo` DISABLE KEYS */;
INSERT INTO `userInfo` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,'bclark@uiowa.edu','precMan',0,'bclark','pp',NULL,NULL),(2,NULL,NULL,NULL,NULL,NULL,NULL,'jdoe@uiowa.edu','voter',0,'jdoe','pp',NULL,NULL),(3,NULL,NULL,NULL,NULL,NULL,NULL,'mleyda@uiowa.edu','admin',0,'mleyda','pp','kIZPBUamH4kOBZLrwatt',NULL);
/*!40000 ALTER TABLE `userInfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-04 20:06:41
