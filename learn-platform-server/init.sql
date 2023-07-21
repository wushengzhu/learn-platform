USE test;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '名称',
  `age` int(11) NOT NULL DEFAULT '0' COMMENT '年龄'
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 