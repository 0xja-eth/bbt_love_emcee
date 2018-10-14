-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2018-10-14 14:39:37
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
-- 表的结构 `girl_tone`
--

CREATE TABLE `girl_tone` (
  `id` int(11) NOT NULL,
  `tone` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(240) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `girl_tone`
--

INSERT INTO `girl_tone` (`id`, `tone`, `description`) VALUES
(1, '奶酪娃娃音', '糟糕，是心动的感觉！如果风吹过星星会有声音，那一定是你的声音！'),
(2, '霸道总裁音', '想嗅着睡衣上太阳与洗衣液的香味，在银色窗帘的掩映下，和你的声音缓缓入睡。'),
(3, '邻家少女音', '你的声音就像春风吹过泸沽湖，秋雨浸润九寨沟。'),
(4, '套马汉子音', '喜欢风喜欢雨，喜欢大雾喜欢你……的声音。');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `girl_tone`
--
ALTER TABLE `girl_tone`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `girl_tone`
--
ALTER TABLE `girl_tone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
