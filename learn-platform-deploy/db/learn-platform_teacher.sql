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
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `createdBy` varchar(255) DEFAULT NULL COMMENT '创建者',
  `updatedAt` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `updatedBy` varchar(255) DEFAULT NULL COMMENT '修改者',
  `deletedAt` datetime(6) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL COMMENT '删除者',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `photoUrl` varchar(255) DEFAULT NULL COMMENT '照片',
  `teacherTime` int(11) DEFAULT NULL COMMENT '教龄',
  `education` varchar(255) DEFAULT NULL COMMENT '学历',
  `seniority` varchar(255) DEFAULT NULL COMMENT '资历',
  `experience` varchar(255) DEFAULT NULL COMMENT '职业经验',
  `carryPrize` varchar(255) DEFAULT NULL COMMENT '获奖经历',
  `tags` varchar(255) DEFAULT NULL COMMENT '风格标签，以，隔开',
  `shopId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9d664dabc5b79a281bc92f9b106` (`shopId`),
  CONSTRAINT `FK_9d664dabc5b79a281bc92f9b106` FOREIGN KEY (`shopId`) REFERENCES `shop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES ('69f08d4a-fbf3-4ece-8089-4d6a66c65299','2023-05-27 10:28:43','5e57615b-0a02-4a4f-b1b0-085c6eebb5f8','2023-05-27 10:28:43',NULL,NULL,NULL,'李老师','http://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1685181572581-2.jpg',12,'硕士','十年','我在英语教学领域拥有超过十年的经验，包括一对一教学、小班教学以及在线教学。我曾在多个知名的英语教育机构任教，积累了丰富的教学经验。无论是对初学者还是高级学生，我都能提供符合他们需求的教学方案。我深信每个学生都有他们自己独特的学习方式，因此我致力于设计和提供个性化的教学内容。在教学过程中，我不仅注重学生的学习成果，更注重引导他们发现学习的乐趣，培养他们独立学习和解决问题的能力。','在我作为英语教师的职业生涯中，我非常荣幸能获得过多个教学奖项，这些都是对我工作的肯定。我曾获得\"最佳教师奖\"，这是对我专业能力和教学热情的认可。此外，我也曾荣获\"创新教学奖\"，这表明了我在教学方法和学生引导上的创新思维。这些荣誉激励我不断提高自己的教学技巧，为学生提供更优质的教学服务。','高级教师','6710fa26-2602-442a-b8af-5930430f46d5'),('9595b297-3387-4ac1-a746-34b9ba0289ef','2023-05-27 11:35:08','5e57615b-0a02-4a4f-b1b0-085c6eebb5f8','2023-05-27 11:35:08',NULL,NULL,NULL,'杨凤','http://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1685187182742-2.jpeg',20,'硕士','英文教育10年','我在英语教学领域有着近十五年的教学经验，包括在中学和大学等不同的教育阶段教授英语。我熟练掌握多种教学方法和策略，包括互动式教学、分层教学等，并能根据学生的学习需求和特点进行调整。我相信每个学生都是独一无二的，我善于通过个性化的教学方法激发他们的学习热情，帮助他们在学习过程中建立自信，发展批判性思维和解决问题的能力。','在我作为英语教师的职业生涯中，我有幸获得了一些令人骄傲的奖项。其中最值得一提的是，我曾在连续两年的年度教师评选中获得“杰出贡献奖”，这个奖项是对我教学才华和无私付出的一种认可。另外，我还在区域英语教师比赛中获得了“优秀教师奖”，这个奖项体现了我对教育行业的专业精神和对学生的热爱。','省级优秀教师','6710fa26-2602-442a-b8af-5930430f46d5'),('b1fdb169-2d3c-4bbf-b035-663ddc4d67a1','2023-06-09 17:53:42','5e57615b-0a02-4a4f-b1b0-085c6eebb5f8','2023-06-09 17:53:42',NULL,NULL,NULL,'黄老师','https://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1686332618410-25.jpeg',2,'硕士','十年',NULL,NULL,'高级教师','2b967e80-f6c0-4cfe-a9c1-1db90a4cb4c8'),('bc761445-a3ae-4ee6-b0de-c13928020245','2023-05-27 11:26:33','5e57615b-0a02-4a4f-b1b0-085c6eebb5f8','2023-05-27 11:26:33',NULL,NULL,NULL,'高明瑞','http://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/rc-upload-1685186472417-4.jpeg',10,'硕士','小学教育十年','我在英语教学领域有着近十五年的教学经验，包括在中学和大学等不同的教育阶段教授英语。我熟练掌握多种教学方法和策略，包括互动式教学、分层教学等，并能根据学生的学习需求和特点进行调整。我相信每个学生都是独一无二的，我善于通过个性化的教学方法激发他们的学习热情，帮助他们在学习过程中建立自信，发展批判性思维和解决问题的能力。','在我作为英语教师的职业生涯中，我有幸获得了一些令人骄傲的奖项。其中最值得一提的是，我曾在连续两年的年度教师评选中获得“杰出贡献奖”，这个奖项是对我教学才华和无私付出的一种认可。另外，我还在区域英语教师比赛中获得了“优秀教师奖”，这个奖项体现了我对教育行业的专业精神和对学生的热爱。','特级教师','6710fa26-2602-442a-b8af-5930430f46d5'),('e6255bd2-c320-4d1d-955f-149aa657d57a','2023-05-18 18:26:15','babb398f-017c-4f9a-9652-e160f866a1b7','2023-05-18 18:26:15',NULL,NULL,NULL,'魏景峰','http://learn-platform-assets.oss-cn-hangzhou.aliyuncs.com/images/1675624795701.jpeg',10,'硕士','特级教师','中小学教育 10 年','省级优秀教师','金牌教师','6710fa26-2602-442a-b8af-5930430f46d5');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-11  0:59:55