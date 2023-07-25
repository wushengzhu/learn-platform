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
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `createdBy` varchar(255) DEFAULT NULL COMMENT '创建者',
  `updatedAt` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `updatedBy` varchar(255) DEFAULT NULL COMMENT '修改者',
  `deletedAt` datetime(6) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL COMMENT '删除者',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '名称',
  `type` varchar(255) NOT NULL DEFAULT 'time' COMMENT '卡类型',
  `time` int(11) NOT NULL DEFAULT '0' COMMENT '上课次数',
  `validityDay` int(11) NOT NULL DEFAULT '0' COMMENT '有效期',
  `courseId` varchar(36) DEFAULT NULL,
  `shopId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0b739c2e3573cc62ea799ba3e1d` (`courseId`),
  KEY `FK_2ddfcd5175843e1beae28b7e5df` (`shopId`),
  CONSTRAINT `FK_0b739c2e3573cc62ea799ba3e1d` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_2ddfcd5175843e1beae28b7e5df` FOREIGN KEY (`shopId`) REFERENCES `shop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES ('2eef5697-be81-4ecd-a9d8-8322524578ca','2023-05-28 06:30:21','5e57615b-0a02-4a4f-b1b0-085c6eebb5f8','2023-05-28 06:30:21','5e57615b-0a02-4a4f-b1b0-085c6eebb5f8',NULL,NULL,'2 周写作冲刺班','time',10,1,'befc60be-8292-4a82-ac31-d3e54c1b8c68','6710fa26-2602-442a-b8af-5930430f46d5'),('5e77eff4-21c3-48a7-b61a-dee662490e8c','2023-06-09 17:55:22','5e57615b-0a02-4a4f-b1b0-085c6eebb5f8','2023-06-09 17:55:22',NULL,NULL,NULL,'2次体验卡','time',2,100,'fa73f3f5-da6a-4ef4-9aa5-b9e8b81d96c4','2b967e80-f6c0-4cfe-a9c1-1db90a4cb4c8'),('e2ae3b9d-6e44-466d-bf6b-4d27e2a19a35','2023-05-04 19:03:10','5e57615b-0a02-4a4f-b1b0-085c6eebb5f8','2023-05-04 19:03:10',NULL,NULL,NULL,'一节体验课','time',1,30,'35e642aa-e4f7-4016-8785-b7e8175a198c','6710fa26-2602-442a-b8af-5930430f46d5'),('ed778458-b830-4235-8586-513b58766bd1','2023-05-28 08:31:26','5e57615b-0a02-4a4f-b1b0-085c6eebb5f8','2023-05-05 00:23:12','5e57615b-0a02-4a4f-b1b0-085c6eebb5f8',NULL,NULL,'2 周阅读理解冲刺班','duration',0,14,'befc60be-8292-4a82-ac31-d3e54c1b8c68','6710fa26-2602-442a-b8af-5930430f46d5');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-11  0:59:59