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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '昵称',
  `desc` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `tel` varchar(255) DEFAULT NULL COMMENT '手机号',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `code` varchar(255) DEFAULT NULL COMMENT '验证码',
  `codeCreateTimeAt` datetime DEFAULT NULL COMMENT '验证码生成时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('5cfcbcf4-9914-4476-8ded-5e7bd49b3dd7','龙傲天','明天艺术培训中心','18612055774','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1685950480847-28.jpg',NULL,NULL),('5dc9e240-78bf-4ea8-8ae8-1c8498c9f70e','','','18318266985',NULL,NULL,NULL),('5e57615b-0a02-4a4f-b1b0-085c6eebb5f8','','','19357227510','http://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1685179460528-2.jpeg','1011','2023-07-09 16:29:19'),('5fe23f65-396b-43ea-b3b3-d921a35b001b','','','15179628743',NULL,NULL,NULL),('ae9c26ce-8190-4360-8a03-5df3aa9d1b38','','','18312738232',NULL,NULL,NULL),('b5c3987b-a806-42bc-a97f-e672c8c2b0b3','','','13677589641',NULL,NULL,NULL),('df5394b9-2665-4341-9356-ece89d60b352','','','18128367372',NULL,NULL,NULL),('edd03585-dec4-4f36-b2ef-32b4fe2e5f2c','','','18526689936',NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-11  1:00:00