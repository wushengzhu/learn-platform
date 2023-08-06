-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: 47.94.154.60    Database: learn-platform
-- ------------------------------------------------------
-- Server version	5.6.35

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
-- Table structure for table `org_image`
--

DROP TABLE IF EXISTS `org_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `org_image` (
  `id` varchar(36) NOT NULL,
  `url` text NOT NULL COMMENT '地址',
  `remark` varchar(255) DEFAULT NULL COMMENT 'remark',
  `shopIdForFrontId` varchar(36) DEFAULT NULL,
  `shopIdForRoomId` varchar(36) DEFAULT NULL,
  `shopIdForOtherId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_63d62c57996b1fc20a02e80c508` (`shopIdForFrontId`),
  KEY `FK_8bae051d6ee0069e520df974433` (`shopIdForRoomId`),
  KEY `FK_21c6620c4a108142b673c70697a` (`shopIdForOtherId`),
  CONSTRAINT `FK_21c6620c4a108142b673c70697a` FOREIGN KEY (`shopIdForOtherId`) REFERENCES `shop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_63d62c57996b1fc20a02e80c508` FOREIGN KEY (`shopIdForFrontId`) REFERENCES `shop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_8bae051d6ee0069e520df974433` FOREIGN KEY (`shopIdForRoomId`) REFERENCES `shop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `org_image`
--

LOCK TABLES `org_image` WRITE;
/*!40000 ALTER TABLE `org_image` DISABLE KEYS */;
INSERT INTO `org_image` VALUES ('136d27e0-7c2c-4cf4-8461-1a65e5bdae2c','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1685950480847-16.jpg',NULL,'e03a6e83-bfde-4ce7-b995-4f3ea7d122cf',NULL,NULL),('2c24b2e4-b0f2-472d-a0c3-a0d8218b9988','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1683304657157-14.jpg',NULL,'6710fa26-2602-442a-b8af-5930430f46d5',NULL,NULL),('367dd299-7634-4ed8-94c4-d56f4364122d','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1686332618410-14.jpeg',NULL,NULL,NULL,'2b967e80-f6c0-4cfe-a9c1-1db90a4cb4c8'),('4f30d10b-4255-4e44-ade3-86b889b1ffca','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1683304657157-22.jpeg',NULL,NULL,NULL,'6710fa26-2602-442a-b8af-5930430f46d5'),('7f289b41-c852-4d77-b137-9094cae52fd1','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1686332618410-10.jpg',NULL,'2b967e80-f6c0-4cfe-a9c1-1db90a4cb4c8',NULL,NULL),('92e23052-5d46-4dc3-a42d-89dd770f5870','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1683304657157-16.jpg',NULL,'6710fa26-2602-442a-b8af-5930430f46d5',NULL,NULL),('9d8a1cdd-5844-4985-987a-1f840abac52f','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1686332618410-12.jpg',NULL,NULL,'2b967e80-f6c0-4cfe-a9c1-1db90a4cb4c8',NULL),('c06c56bf-8ec0-499b-afce-3363b7dccb7a','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1685950480847-18.jpg',NULL,NULL,'e03a6e83-bfde-4ce7-b995-4f3ea7d122cf',NULL),('f971ee2d-a656-4c12-8946-c800329625a3','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1683304657157-18.jpg',NULL,NULL,'6710fa26-2602-442a-b8af-5930430f46d5',NULL),('feb9d3b2-6a46-4fd4-8637-d35ad904e104','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1685950480847-20.jpg',NULL,NULL,NULL,'e03a6e83-bfde-4ce7-b995-4f3ea7d122cf');
/*!40000 ALTER TABLE `org_image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-11  0:59:58