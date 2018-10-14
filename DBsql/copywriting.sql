-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2018-10-14 14:38:50
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
-- 表的结构 `copywriting`
--

CREATE TABLE `copywriting` (
  `id` int(11) NOT NULL,
  `copywriting` text COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `copywriting`
--

INSERT INTO `copywriting` (`id`, `copywriting`) VALUES
(1, '你知道我的缺点是什么吗？是缺点你'),
(2, '我是九你是三，除了你还是你'),
(3, '你知道你和星星有什么区别吗？星星在天上，你在我心里'),
(4, '这是我的手背，这是我的脚背，你是我的宝贝'),
(5, '甜有100种方式，吃糖，蛋糕，还有每天98次的想你'),
(6, '从今以后我只能称呼你为您了，因为，你在我心上'),
(7, '莫文蔚的阴天，孙燕姿的雨天，周杰伦的晴天，都不如你和我聊天'),
(8, '你有没有闻到什么烧焦的味道?那是我的心在燃烧'),
(9, '你上辈子一定是碳酸饮料吧，不然为什么我一看到你就能开心得冒泡'),
(10, '我要超级酷，但是如果你和我聊天的话，我可以不酷那么一小会儿'),
(11, '山有木兮木有枝,心悦君兮君不知'),
(12, '在万千人之中我也能一眼便认出你，因为别人走在路上，你走在我心上'),
(13, '最近有谣言说我喜欢你，我要澄清一下，那不是谣言'),
(14, '我还是喜欢你，像小时候吃辣条，不看日期'),
(15, '我生在南方，活在南方，栽在你手里，总算是去过不一样的地方');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `copywriting`
--
ALTER TABLE `copywriting`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `copywriting`
--
ALTER TABLE `copywriting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
