-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: handshake-2.cmnzxnadxz9j.us-west-1.rds.amazonaws.com    Database: handshake_production
-- ------------------------------------------------------
-- Server version	5.7.26

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `CompanyProfiles`
--

DROP TABLE IF EXISTS `CompanyProfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CompanyProfiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `description` text,
  `contactInformation` text,
  `profilePicPath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CompanyProfiles`
--

LOCK TABLES `CompanyProfiles` WRITE;
/*!40000 ALTER TABLE `CompanyProfiles` DISABLE KEYS */;
INSERT INTO `CompanyProfiles` VALUES (4,'Tesla','Fremont, California, United States of America','2020-03-13 18:27:14','2020-03-13 18:28:19',4,'Tesla is accelerating the world’s transition to sustainable energy. We design, manufacture, sell and service the world’s best solar technology, energy storage systems, and electric vehicles, providing customers the opportunity to generate, store and consume energy entirely sustainably. Tesla is committed to hiring and developing top talent from around the world for any given discipline. Based in California, Tesla’s workforce spans across four continents. We work to build an inclusive environment in which all people, regardless of gender, race, religion, or background, can come to do their best work. Our world-class teams operate with a non-conventional philosophy of inter-disciplinary collaboration. Each member of the team is expected to challenge and to be challenged, to create, and to innovate. We’re tackling the world’s most difficult and important problems—and we wouldn’t succeed without our shared passion for making the world a better place.','Website http://www.tesla.com Email info@tesla.com',NULL);
/*!40000 ALTER TABLE `CompanyProfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EducationDetails`
--

DROP TABLE IF EXISTS `EducationDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EducationDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentProfileId` int(11) NOT NULL,
  `collegeName` varchar(255) DEFAULT NULL,
  `collegeLocation` varchar(255) DEFAULT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `yearOfPassing` int(11) DEFAULT NULL,
  `currentCgpa` float DEFAULT NULL,
  `highestDegree` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EducationDetails`
--

LOCK TABLES `EducationDetails` WRITE;
/*!40000 ALTER TABLE `EducationDetails` DISABLE KEYS */;
INSERT INTO `EducationDetails` VALUES (1,1,'San Jose State University','San Jose','Masters','Computer Engineering',2021,3.85,1,'2020-03-13 18:48:35','2020-03-13 18:48:35');
/*!40000 ALTER TABLE `EducationDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EventRegistrations`
--

DROP TABLE IF EXISTS `EventRegistrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EventRegistrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventId` int(11) NOT NULL,
  `studentProfileId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EventRegistrations`
--

LOCK TABLES `EventRegistrations` WRITE;
/*!40000 ALTER TABLE `EventRegistrations` DISABLE KEYS */;
INSERT INTO `EventRegistrations` VALUES (1,1,1,'2020-03-13 18:51:17','2020-03-13 18:51:17');
/*!40000 ALTER TABLE `EventRegistrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyProfileId` int(11) NOT NULL,
  `eventName` varchar(255) DEFAULT NULL,
  `description` text,
  `time` datetime DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `eligibility` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (1,4,'Python Development Conference','REAC/TS is an Oak Ridge Institute for Science and Education facility with the mission to strengthen the medical response to radiological and nuclear incidents. REAC/TS has recently partnered with NASA to provide specialized knowledge for the medical community and emergency planners in the area around the upcoming Mars Rover Launch. ORISE is hosting a research-based challenge for undergraduate students to research a partner supporting NASA’s upcoming Mars 2020 Launch, learn about the partner’s capabilities, and discuss why that partner is necessary for the mission. Your research could win you a $5,000 scholarship! The deadline for this competition is March 31st, 2020, and winners will be announced in early May.','2020-04-30 10:10:00','Fremont, California, United States of America','All','2020-03-13 18:31:40','2020-03-13 18:31:40'),(2,4,'Hardware Design Conference','REAC/TS is an Oak Ridge Institute for Science and Education facility with the mission to strengthen the medical response to radiological and nuclear incidents. REAC/TS has recently partnered with NASA to provide specialized knowledge for the medical community and emergency planners in the area around the upcoming Mars Rover Launch. ORISE is hosting a research-based challenge for undergraduate students to research a partner supporting NASA’s upcoming Mars 2020 Launch, learn about the partner’s capabilities, and discuss why that partner is necessary for the mission. Your research could win you a $5,000 scholarship! The deadline for this competition is March 31st, 2020, and winners will be announced in early May.','2020-04-15 10:10:00','Mountain View','Electrical Engineering','2020-03-13 18:33:31','2020-03-13 18:33:31');
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExperienceDetails`
--

DROP TABLE IF EXISTS `ExperienceDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExperienceDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentProfileId` int(11) NOT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `companyLocation` varchar(255) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `workDescription` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExperienceDetails`
--

LOCK TABLES `ExperienceDetails` WRITE;
/*!40000 ALTER TABLE `ExperienceDetails` DISABLE KEYS */;
INSERT INTO `ExperienceDetails` VALUES (1,1,'EMC2','Software Developer','3500 Deer Creek Road, Palo Alto, California 94304, United States','2020-03-05','2020-03-13','Working as a software developer','2020-03-13 18:49:04','2020-03-13 18:49:04');
/*!40000 ALTER TABLE `ExperienceDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `JobApplications`
--

DROP TABLE IF EXISTS `JobApplications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `JobApplications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jobPostingId` int(11) NOT NULL,
  `studentProfileId` int(11) NOT NULL,
  `resumePath` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_tag` (`jobPostingId`,`studentProfileId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JobApplications`
--

LOCK TABLES `JobApplications` WRITE;
/*!40000 ALTER TABLE `JobApplications` DISABLE KEYS */;
INSERT INTO `JobApplications` VALUES (1,1,1,'1_1_resume.pdf','Pending','2020-03-13 18:35:49','2020-03-13 18:35:49'),(2,3,1,'3_1_resume.pdf','Reviewed','2020-03-13 18:50:35','2020-03-13 18:52:45');
/*!40000 ALTER TABLE `JobApplications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `JobPostings`
--

DROP TABLE IF EXISTS `JobPostings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `JobPostings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyProfileId` int(11) NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `postingDate` datetime NOT NULL,
  `applicationDeadline` date NOT NULL,
  `location` varchar(255) NOT NULL,
  `salary` varchar(255) NOT NULL,
  `jobDescription` text NOT NULL,
  `jobCategory` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JobPostings`
--

LOCK TABLES `JobPostings` WRITE;
/*!40000 ALTER TABLE `JobPostings` DISABLE KEYS */;
INSERT INTO `JobPostings` VALUES (1,4,'Performance Engineering Intern','2020-03-13 00:00:00','2020-03-31','3500 Deer Creek Road, Palo Alto, California 94304, United States','$5000/month','REAC/TS is an Oak Ridge Institute for Science and Education facility with the mission to strengthen the medical response to radiological and nuclear incidents. REAC/TS has recently partnered with NASA to provide specialized knowledge for the medical community and emergency planners in the area around the upcoming Mars Rover Launch. ORISE is hosting a research-based challenge for undergraduate students to research a partner supporting NASA’s upcoming Mars 2020 Launch, learn about the partner’s capabilities, and discuss why that partner is necessary for the mission. Your research could win you a $5,000 scholarship! The deadline for this competition is March 31st, 2020, and winners will be announced in early May.','Internship','2020-03-13 18:30:01','2020-03-13 18:30:01'),(2,4,'Quality Assurance Engineer','2020-03-13 00:00:00','2020-04-30','Fremont, California, United States of America','$5000/month','REAC/TS is an Oak Ridge Institute for Science and Education facility with the mission to strengthen the medical response to radiological and nuclear incidents. REAC/TS has recently partnered with NASA to provide specialized knowledge for the medical community and emergency planners in the area around the upcoming Mars Rover Launch. ORISE is hosting a research-based challenge for undergraduate students to research a partner supporting NASA’s upcoming Mars 2020 Launch, learn about the partner’s capabilities, and discuss why that partner is necessary for the mission. Your research could win you a $5,000 scholarship! The deadline for this competition is March 31st, 2020, and winners will be announced in early May.','Full Time','2020-03-13 18:30:49','2020-03-13 18:30:49'),(3,4,'Software Engineering Intern','2020-03-13 00:00:00','2020-04-30','Fremont, California, United States of America','$5000/month','REAC/TS is an Oak Ridge Institute for Science and Education facility with the mission to strengthen the medical response to radiological and nuclear incidents. REAC/TS has recently partnered with NASA to provide specialized knowledge for the medical community and emergency planners in the area around the upcoming Mars Rover Launch. ORISE is hosting a research-based challenge for undergraduate students to research a partner supporting NASA’s upcoming Mars 2020 Launch, learn about the partner’s capabilities, and discuss why that partner is necessary for the mission. Your research could win you a $5,000 scholarship! The deadline for this competition is March 31st, 2020, and winners will be announced in early May.','Internship','2020-03-13 18:32:27','2020-03-13 18:32:27');
/*!40000 ALTER TABLE `JobPostings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20200217185310-create-user.js'),('20200217185447-create-student-profile.js'),('20200217185544-create-company-profile.js'),('20200217202317-add_user_id_to_student_and_company__profile.js'),('20200224023224-add_more_columns_to_company_profile.js'),('20200224024609-add_more_columns_to_student_profile.js'),('20200224033304-create-experience-detail.js'),('20200224034028-create-education-detail.js'),('20200226214513-create-job-posting.js'),('20200301032042-create-job-application.js'),('20200302193217-create-event.js'),('20200303032059-create-event-registration.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StudentProfiles`
--

DROP TABLE IF EXISTS `StudentProfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StudentProfiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `currentCollegeName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `dob` date DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `careerObjective` text,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `skillSet` text,
  `profilePicPath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StudentProfiles`
--

LOCK TABLES `StudentProfiles` WRITE;
/*!40000 ALTER TABLE `StudentProfiles` DISABLE KEYS */;
INSERT INTO `StudentProfiles` VALUES (1,'Ronald','Weasley','San Jose State University','2020-03-13 18:34:15','2020-03-13 18:49:32',5,NULL,NULL,NULL,NULL,'I am a Computer Science Engineer with two years of experience in Research and Product development for Mindtree’s Short Range Wireless IP, currently pursuing my Masters in Software Engineering. I am passionate about latest technologies and looking to gain the necessary knowledge and training to begin a career in Cloud and Data Science. I am also a public speaker, vocalist and lyricist who is possessed by a love for cooking.',NULL,'Java,Python',NULL),(2,'Draco ','Malfoy','San Jose State University','2020-03-13 18:34:50','2020-03-13 18:34:50',6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `StudentProfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emailId` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailId` (`emailId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (4,'tesla@tesla.com','6b442108e168fa96835bf27612a1cc0404eb03abfa4670e4056736e7b66b3e3b','T2qVFvnA6J5K6lCpupkCPA==','Company','2020-03-13 18:27:14','2020-03-13 18:27:14'),(5,'RonaldWeasley@sjsu.edu','c096a02588d46c64f77f3373033ed2acb229a92ee45367e3753109e34db09aae','9jVdh8NNk8AUse+RZhaRug==','Student','2020-03-13 18:34:15','2020-03-13 18:34:15'),(6,'Draco.Malfoy@sjsu.edu','f2c6d424bbf0947589e61c2be530962bc25495d431c5ba8431112c5dcb6f92e7','AM4HAySwPKo9g/NWZr2ssA==','Student','2020-03-13 18:34:50','2020-03-13 18:34:50');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-09 14:13:20
