-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2018-10-14 14:39:57
-- 服务器版本： 5.7.23-0ubuntu0.16.04.1
-- PHP Version: 7.0.32-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bbt_emcee2018`
--

-- --------------------------------------------------------

--
-- 表的结构 `man_tone`
--

CREATE TABLE `man_tone` (
  `id` int(11) NOT NULL,
  `tone` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(240) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `man_tone`
--

INSERT INTO `man_tone` (`id`, `tone`, `description`) VALUES
(1, '酸甜正太音', '可可布朗尼、榴莲菠萝蜜、黄焖辣子鸡、红烧排骨酱醋鱼，不如你！全都不如你！'),
(2, '劲爽薄荷音', '希望今晚的梦十二分甜，一分是宁静，一分是惬意。然后梦里有你的声音，十分甜。'),
(3, '清爽校草音', '小哥哥，你可以说一句话吗？我的咖啡忘记放糖了~'),
(4, '帕瓦罗蒂音', '别出声，你这个浑身都是魅力的家伙！你背着我都偷偷干了些什么，不然你的声音怎么这么动听！');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `man_tone`
--
ALTER TABLE `man_tone`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `man_tone`
--
ALTER TABLE `man_tone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
