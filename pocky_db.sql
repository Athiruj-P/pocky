-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2020 at 09:32 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pocky_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `ac_id` int(3) NOT NULL,
  `ac_username` varchar(255) NOT NULL,
  `ac_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`ac_id`, `ac_username`, `ac_password`) VALUES
(1, '60160116', '1'),
(2, '60210135', '1'),
(3, '60160000', '60160000@pocky'),
(4, '60160169', '1'),
(5, 'test01', '1'),
(6, '60160025', '1'),
(7, '1', '1'),
(8, '2', '2'),
(9, '3', '3'),
(10, 'tiger', '1'),
(11, 'peam', '1'),
(12, 'jib', '1'),
(13, 'แดง', '1'),
(14, 'undefined', 'undefined'),
(15, '4', '4');

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `cur_id` int(3) NOT NULL,
  `cur_name` varchar(30) NOT NULL,
  `cur_name_abb` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`cur_id`, `cur_name`, `cur_name_abb`) VALUES
(1, 'Thailand - Baht', 'THB'),
(2, 'USA - Dollar', 'USD'),
(3, 'Japan - Yen', 'JPY'),
(4, 'Canada - Dollar', 'CAD');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `tran_id` int(3) NOT NULL,
  `tran_name` varchar(60) NOT NULL,
  `tran_type` int(1) NOT NULL COMMENT 'type = 1 คือ  income; type = 2 คือ  expenditure',
  `tran_amount` float NOT NULL,
  `tran_date` datetime NOT NULL,
  `tran_wal_id` int(3) NOT NULL,
  `tran_status` varchar(1) NOT NULL DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`tran_id`, `tran_name`, `tran_type`, `tran_amount`, `tran_date`, `tran_wal_id`, `tran_status`) VALUES
(1, 'in', 1, 1000, '2020-03-08 00:34:40', 5, 'Y'),
(2, 'ex', 2, 760, '2020-03-08 00:34:54', 5, 'Y'),
(3, 'ex', 2, 760, '2020-03-08 00:35:15', 5, 'Y'),
(4, 'ex 100', 2, 100, '2020-03-08 02:34:19', 5, 'Y'),
(5, 'ex 10', 2, 10, '2020-03-09 01:18:59', 5, 'Y'),
(6, 'in 100', 1, 100, '2020-03-09 01:21:35', 5, 'Y'),
(7, 'in 1000', 1, 1000, '2020-03-09 01:23:46', 5, 'Y'),
(8, 'ex 100', 2, 100, '2020-03-09 01:25:29', 5, 'Y'),
(9, 'in 200', 1, 200, '2020-03-09 01:26:53', 5, 'Y'),
(10, 'in 200', 1, 200, '2020-03-09 01:40:37', 5, 'Y'),
(11, 'ex 700', 2, 700, '2020-03-09 01:46:25', 5, 'Y'),
(12, 'in 1000', 1, 1000, '2020-03-09 01:52:38', 5, 'Y'),
(13, 'ex 970', 2, 970, '2020-03-09 01:54:39', 5, 'Y'),
(14, 'in 900', 1, 900, '2020-03-09 01:58:01', 5, 'Y'),
(15, 'ex 100', 2, 100, '2020-03-09 02:15:31', 5, 'Y'),
(16, 'ex 850', 2, 850, '2020-03-09 02:20:18', 5, 'Y'),
(17, 'in 101', 1, 101, '2020-03-09 02:21:03', 7, 'Y'),
(18, 'in 1000', 1, 1000, '2020-03-09 13:06:22', 5, 'Y'),
(19, 'ex 113', 2, 113, '2020-03-09 13:14:09', 5, 'Y'),
(20, 'in 1234', 1, 1234, '2020-03-09 13:24:39', 5, 'Y'),
(21, 'ex 500 naja', 2, 500, '2020-03-09 17:09:13', 5, 'Y'),
(22, 'in 1000 naja', 1, 1000, '2020-03-09 18:13:58', 5, 'Y'),
(23, 'ข้าว 1000 ใช้เยอะจัง', 2, 1000, '2020-03-09 21:40:47', 5, 'Y'),
(24, 'ค่าเรียนเก่ง', 1, 2000, '2020-03-09 21:44:05', 5, 'Y'),
(25, 'รื 1000', 1, 1000, '2020-03-09 21:54:35', 1, 'Y'),
(26, 'เงินเข้า เพราะเรียนดี 1000', 1, 1000, '2020-03-09 21:55:00', 1, 'Y'),
(27, 'ขนมอร่อยจัง 500', 2, 500, '2020-03-09 21:56:24', 1, 'Y'),
(28, 'กินอีกละ', 2, 50, '2020-03-09 21:56:46', 5, 'N'),
(29, 'ขนมจากญี่ปุ่น', 2, 500, '2020-03-09 21:57:56', 1, 'Y'),
(30, 'เงินค่าหมอ เพราะไปญี่ปุ่น', 1, 10000, '2020-03-09 22:00:38', 1, 'Y'),
(31, 'ป่วย COVID - 19', 2, 11000, '2020-03-09 22:05:30', 1, 'Y'),
(32, 'รวยอีกแล้ว', 1, 20000, '2020-03-09 22:11:03', 1, 'Y'),
(33, 'ขนม ๆ', 2, 5000, '2020-03-09 22:13:00', 1, 'Y'),
(34, 'เที่ยวอู่ฮั่น', 2, 8000, '2020-03-09 22:15:31', 1, 'Y'),
(35, 'หาหมอ เกือบตาย', 2, 7000, '2020-03-09 22:17:33', 1, 'Y'),
(36, 'ค่าคนเก่ง ไม่ตายจาก covid-19', 1, 10000, '2020-03-09 22:18:35', 1, 'Y'),
(37, 'ค่าคือใคร =>ข้า<= ต่างหาก', 1, 20000, '2020-03-09 22:21:59', 1, 'Y'),
(38, 'งงละสิ อิอิอิอิ', 2, 10000, '2020-03-09 22:22:25', 1, 'Y'),
(39, 'นวดแก้ปวดเมื่อยเท้า', 2, 1000, '2020-03-09 22:31:33', 1, 'Y'),
(40, 'ex 1000', 2, 1000, '2020-03-09 22:39:47', 1, 'Y'),
(41, 'เศษเงิน อิอิ', 2, 5000, '2020-03-09 22:51:30', 1, 'Y'),
(42, 'เงินนี้ Macbook naja', 1, 60000, '2020-03-09 22:54:02', 5, 'Y'),
(43, 'ก่อนซื้อ Mac ไปเที่ยวก่อนละกัน', 2, 50000, '2020-03-09 22:56:31', 5, 'Y'),
(44, 'wow 10', 1, 10, '2020-03-10 01:00:43', 1, 'N'),
(45, 'Initial balance', 1, 100, '2020-03-10 01:36:27', 10, 'Y'),
(46, 'Initial balance', 1, 100, '2020-03-10 01:41:23', 11, 'Y'),
(47, 'เงินค่าพิศวาส...!', 1, 500, '2020-03-10 13:44:37', 1, 'Y'),
(48, 'WOW', 1, 100000, '2020-03-10 13:45:31', 8, 'Y'),
(49, 'Initial balance', 1, 100, '2020-03-10 14:23:58', 12, 'Y'),
(50, 'snack 10', 2, 10, '2020-03-10 14:25:35', 12, 'N'),
(51, 'Initial balance', 1, 100, '2020-03-10 14:26:03', 13, 'Y'),
(52, 'Covid-19', 2, 50, '2020-03-10 14:26:28', 13, 'Y'),
(53, 'Initial balance', 1, 1000, '2020-03-10 16:38:46', 14, 'Y'),
(54, 'รวย อิอิ', 2, 500, '2020-03-10 16:39:30', 14, 'Y'),
(55, 'Initial balance', 1, 9000, '2020-03-10 16:40:38', 15, 'Y'),
(56, 'ค่าหาหมอ ติด covid-19', 2, 5000, '2020-03-10 16:41:11', 15, 'Y'),
(57, 'ex 50', 2, 50, '2020-03-10 17:03:42', 1, 'N'),
(58, 'in 50', 1, 50, '2020-03-10 17:06:41', 1, 'N'),
(59, 'Initial balance', 1, 100000, '2020-03-10 17:50:14', 16, 'Y'),
(60, 'ไปเที่ยวอู่ฮั่น', 2, 20000, '2020-03-10 17:51:28', 16, 'Y'),
(61, 'ไปหาหมอเพราะติด covie-19', 2, 60000, '2020-03-10 17:52:02', 16, 'N'),
(62, 'หมดตัว', 2, 30000, '2020-03-10 17:52:28', 16, 'Y'),
(63, 'ขโมยมา', 1, 8000, '2020-03-10 17:54:04', 16, 'Y'),
(64, 'ปล้นธนาคาร อิอิ', 1, 90000.5, '2020-03-10 17:54:52', 16, 'N'),
(65, '', 2, 55000, '2020-03-10 19:53:18', 8, 'Y'),
(66, '', 2, 999999, '2020-03-10 19:53:40', 8, 'Y'),
(67, 'Initial balance', 1, 1e19, '2020-03-10 19:54:34', 17, 'Y'),
(68, 'Initial balance', 1, 10000, '2020-03-10 20:51:07', 18, 'Y'),
(69, 'Initial balance', 1, 100, '2020-03-10 20:52:19', 19, 'Y'),
(70, 'ไปเที่ยวอู่ฮั่น', 2, 2000, '2020-03-10 20:53:33', 18, 'Y'),
(71, 'ค่าหาหมอเพราะติด covid-19', 2, 3000, '2020-03-10 20:54:04', 18, 'N'),
(72, 'Initial balance', 1, 100000, '2020-03-11 10:36:48', 20, 'Y'),
(73, 'Initial balance', 1, 200, '2020-03-11 10:41:40', 21, 'Y'),
(74, 'ขนม', 2, 300, '2020-03-11 10:43:16', 20, 'Y'),
(75, 'ขโมยมา', 1, 100, '2020-03-11 10:43:44', 20, 'Y'),
(76, 'Initial balance', 1, 100, '2020-03-15 00:46:46', 22, 'Y'),
(77, 'Initial balance', 1, 50000, '2020-03-15 00:47:13', 23, 'Y'),
(78, 'Initial balance', 1, 300, '2020-03-15 00:47:31', 24, 'Y'),
(79, 'ex 80k', 2, 8000, '2020-03-15 01:10:31', 16, 'Y'),
(80, 'Initial balance', 1, 100, '2020-03-15 01:10:52', 25, 'Y'),
(81, 'Initial balance', 1, 1000, '2020-03-15 01:14:11', 26, 'Y'),
(82, 'Initial balance', 1, 100, '2020-03-15 01:21:40', 27, 'Y'),
(83, 'Initial balance', 1, 100, '2020-03-15 01:23:52', 28, 'Y'),
(84, 'Initial balance', 1, 1000, '2020-03-15 02:57:05', 29, 'Y'),
(85, '5555', 2, 555, '2020-03-15 03:18:05', 16, 'N'),
(86, 'Initial balance', 1, 1000, '2020-03-15 03:25:07', 30, 'Y'),
(87, '', 2, 0, '2020-03-15 04:41:19', 26, 'N'),
(88, 'ex 10', 2, 10, '2020-03-15 04:48:23', 26, 'N');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `wal_id` int(3) NOT NULL,
  `wal_name` varchar(30) NOT NULL,
  `wal_money` float NOT NULL,
  `wal_ac_id` int(3) NOT NULL,
  `wal_cur_id` int(3) NOT NULL,
  `wal_status` varchar(1) NOT NULL DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`wal_id`, `wal_name`, `wal_money`, `wal_ac_id`, `wal_cur_id`, `wal_status`) VALUES
(1, '60160116', 13500, 1, 1, 'Y'),
(2, 'wallet02', 150, 1, 2, 'Y'),
(3, 'wallet01020304', 250, 1, 1, 'N'),
(4, 'โปรดระวัง แบงค์ลอกข้อสอบ 5555', 1000, 1, 1, 'N'),
(5, 'ค่า Macbook 2019', 13671, 1, 1, 'Y'),
(6, 'true', 77755, 2, 1, 'Y'),
(7, 'test naja', 101, 1, 1, 'Y'),
(8, 'test01111', -954999, 7, 1, 'N'),
(9, 'wall 2', 1000, 8, 1, 'Y'),
(10, 'myFirstWallet', 0, 9, 2, 'Y'),
(11, '2nd wallet', 100, 9, 2, 'N'),
(12, '1st wallet', 100, 10, 2, 'Y'),
(13, '2nd wallet', 50, 10, 2, 'N'),
(14, '1st wallet - peam', 500, 11, 1, 'Y'),
(15, '2nd wallet', 4000, 11, 1, 'Y'),
(16, 'flook', 50000, 7, 1, 'Y'),
(17, 'undefined', 1e19, 7, 2, 'N'),
(18, '1st wallet', 8000, 12, 1, 'Y'),
(19, '2nd wallet', 100, 12, 2, 'N'),
(20, 'เขียว', 99800, 13, 1, 'Y'),
(21, 'แดง', 200, 13, 1, 'N'),
(22, 'use wallet', 100, 7, 2, 'Y'),
(23, 'JPY wallet', 50000, 7, 3, 'Y'),
(24, 'CAD wallet', 300, 7, 4, 'Y'),
(25, '2nd wallet TH', 100, 7, 1, 'N'),
(26, '3rd wallet', 1000, 7, 1, 'Y'),
(27, '2nd USD', 100, 7, 2, 'Y'),
(28, '2nd CAD', 100, 7, 4, 'Y'),
(29, '1st wallet', 1000, 15, 1, 'Y'),
(30, 'test0100101', 1000, 15, 2, 'N');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ac_id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`cur_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`tran_id`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`wal_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `ac_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `cur_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `tran_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `wal_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
