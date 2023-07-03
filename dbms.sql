-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2023 at 09:30 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbms`
--
CREATE DATABASE IF NOT EXISTS `dbms` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `dbms`;

-- --------------------------------------------------------

--
-- Table structure for table `abhay`
--

DROP TABLE IF EXISTS `abhay`;
CREATE TABLE `abhay` (
  `trip_id` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `abhay`
--

INSERT INTO `abhay` (`trip_id`) VALUES
('TXYZ'),
('TPQR'),
('T456');

-- --------------------------------------------------------

--
-- Table structure for table `akshay`
--

DROP TABLE IF EXISTS `akshay`;
CREATE TABLE `akshay` (
  `trip_id` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `akshay`
--

INSERT INTO `akshay` (`trip_id`) VALUES
('T123'),
('T456');

-- --------------------------------------------------------

--
-- Table structure for table `aman`
--

DROP TABLE IF EXISTS `aman`;
CREATE TABLE `aman` (
  `trip_id` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aman`
--

INSERT INTO `aman` (`trip_id`) VALUES
('T456');

-- --------------------------------------------------------

--
-- Table structure for table `bhushan`
--

DROP TABLE IF EXISTS `bhushan`;
CREATE TABLE `bhushan` (
  `trip_id` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `c_userid` varchar(25) NOT NULL,
  `c_mail` varchar(30) DEFAULT NULL,
  `c_name` varchar(30) DEFAULT NULL,
  `password` varchar(25) DEFAULT NULL,
  `c_mobile` varchar(13) DEFAULT NULL,
  `current` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`c_userid`, `c_mail`, `c_name`, `password`, `c_mobile`, `current`) VALUES
('abhay', 'abhay1234@gmail.com', 'Abhay', '1234', '9878766754', 0),
('ak', 'abc@123', 'Akash', 'ak', '8262963989', 0),
('akak', 'abc@123', 'ak', 'iop', '8262963989', 0),
('Akshay', 'akshay@123', 'Akshay', 'akshay', '8262963990', 0),
('aman', 'aman@123', 'Aman', '1234', '9960383720', 0),
('bhushan', 'bhushan@123', 'Bhushan', 'bhushan', '9359781969', 0),
('megha', 'megha@123', 'Megha', '1234', '9359781969', 0),
('sample', 'sample@123', 'sample', '1234', '9960383720', 0);

-- --------------------------------------------------------

--
-- Table structure for table `managers`
--

DROP TABLE IF EXISTS `managers`;
CREATE TABLE `managers` (
  `m_userid` varchar(25) NOT NULL,
  `m_mail` varchar(30) DEFAULT NULL,
  `m_name` varchar(30) DEFAULT NULL,
  `m_mobile` varchar(13) DEFAULT NULL,
  `m_state` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `managers`
--

INSERT INTO `managers` (`m_userid`, `m_mail`, `m_name`, `m_mobile`, `m_state`) VALUES
('user123', 'user123@example.com', 'John Doe', '1234567890', 'Active'),
('user1234', 'user1234@example.com', 'Robert Anderson', '4321098765', 'Active'),
('user789', 'user789@example.com', 'Michael Johnson', '8765432109', 'Active'),
('userabc', 'userabc@example.com', 'Emily Davis', '7654321098', 'Active'),
('userpqr', 'userpqr@example.com', 'Sarah Thompson', '5432109876', 'Active'),
('userxyz', 'userxyz@example.com', 'David Wilson', '6543210987', 'Inactive');

-- --------------------------------------------------------

--
-- Table structure for table `sample`
--

DROP TABLE IF EXISTS `sample`;
CREATE TABLE `sample` (
  `trip_id` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sample`
--

INSERT INTO `sample` (`trip_id`) VALUES
('T123');

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
CREATE TABLE `trips` (
  `trip_id` varchar(25) NOT NULL,
  `st_city` varchar(30) DEFAULT NULL,
  `ed_city` varchar(30) DEFAULT NULL,
  `st_date` date DEFAULT NULL,
  `ed_date` date DEFAULT NULL,
  `m_userid` varchar(25) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`trip_id`, `st_city`, `ed_city`, `st_date`, `ed_date`, `m_userid`, `amount`) VALUES
('T456', 'Aurangabad', 'Agra', '2023-07-01', '2023-07-05', 'user123', 1000),
('T123', 'Mumbai', 'Pune', '2023-07-08', '2023-07-05', 'user123', 500),
('T789', 'Delhi', 'Jaipur', '2023-07-10', '2023-07-15', 'user789', 1500),
('TABC', 'Kolkata', 'Chennai', '2023-07-20', '2023-07-25', 'userabc', 2000),
('TPQR', 'Bangalore', 'Hyderabad', '2023-07-30', '2023-08-04', 'userpqr', 1200),
('TXYZ', 'Lucknow', 'Varanasi', '2023-08-08', '2023-08-12', 'userxyz', 1800),
('T999', 'Mumbai', 'Pune', '2023-08-15', '2023-08-20', 'user1234', 1600);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`c_userid`);

--
-- Indexes for table `managers`
--
ALTER TABLE `managers`
  ADD PRIMARY KEY (`m_userid`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD KEY `m_userid` (`m_userid`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `trips`
--
ALTER TABLE `trips`
  ADD CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`m_userid`) REFERENCES `managers` (`m_userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
