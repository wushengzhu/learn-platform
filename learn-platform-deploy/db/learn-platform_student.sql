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
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `createdBy` varchar(255) DEFAULT NULL COMMENT '创建者',
  `updatedAt` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `updatedBy` varchar(255) DEFAULT NULL COMMENT '修改者',
  `deletedAt` datetime(6) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL COMMENT '删除者',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '昵称',
  `tel` varchar(255) DEFAULT NULL COMMENT '手机号',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `account` varchar(255) NOT NULL COMMENT '账户',
  `openid` varchar(255) DEFAULT NULL COMMENT 'openid',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('1eb8479c-2c2b-46c0-bf19-909d065d1597','2023-07-07 23:14:42',NULL,'2023-07-07 23:14:42',NULL,NULL,NULL,'',NULL,NULL,'ff91204834e08c7b4cf0fd5399cc659e','yk77477',NULL),('6585822a-436d-44ce-9452-163738bf6cd7','2023-06-12 07:10:34',NULL,'2023-06-12 07:10:34',NULL,NULL,NULL,'',NULL,NULL,'9e5bf319ab629ae76e5227a1bf35aeb9','hello12345',NULL),('a3ab730a-e253-4b37-b599-a2c6731bc922','2023-06-05 03:41:53',NULL,'2023-06-05 03:41:53',NULL,NULL,NULL,'',NULL,NULL,'7c0acc4c6b75605cf12d2e1fc8f4fb42','2222w2222',NULL),('babb398f-017c-4f9a-9652-e160f866a1b7','2023-06-02 19:38:33',NULL,'2023-04-17 15:21:20',NULL,NULL,NULL,'黑石','19828738899','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/1685730917398.jpg','494cdf1722f768a87a7b324dad0ebb1e','black123','oDs6gwVdlvZhV2N3RIJKereAktKY'),('c0eabf36-533d-463b-8a3a-3bbf12a526f9','2023-07-09 05:15:54',NULL,'2023-07-08 21:15:11',NULL,NULL,NULL,'szy','18526689936','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/1688879752847.jpg','aa11d0059521e44b256fd3290e1cb675','szy123',NULL),('dcd24692-23b8-423d-afb3-5ff2719b7cde','2023-07-04 15:26:20',NULL,'2023-06-05 07:17:26',NULL,NULL,NULL,'苏彧','15179628743','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/1688484379545.jpeg','6db6776fac6a6a3f92bf4e4e8b46a287','yh971109','oDs6gwQYeNz9eelGOV7nb6lH3qsM');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-11  0:59:56