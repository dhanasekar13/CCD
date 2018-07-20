-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2018 at 10:16 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ccd`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignenquiry`
--

CREATE TABLE `assignenquiry` (
  `id` int(11) NOT NULL,
  `mode` varchar(5) NOT NULL,
  `clientName` varchar(20) NOT NULL,
  `duedate` date NOT NULL,
  `followup` varchar(20) NOT NULL,
  `assgnerId` varchar(20) NOT NULL,
  `assEngineerId` varchar(20) NOT NULL,
  `quote` int(5) NOT NULL DEFAULT '0',
  `refno` varchar(29) NOT NULL,
  `revison` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assignenquiry`
--

INSERT INTO `assignenquiry` (`id`, `mode`, `clientName`, `duedate`, `followup`, `assgnerId`, `assEngineerId`, `quote`, `refno`, `revison`) VALUES
(55, 'S', 'new clieny', '2018-12-02', 'Once a Day', 'sa01', 'sa02', 1, '1819S003', 'R0'),
(56, 'S', 'new clieny', '2018-12-02', 'Once a Day', 'sa01', 'sa02', 0, '1819S003', 'R1'),
(57, 'S', 'PILLOW MATTERS', '2015-12-04', 'Once a Day', 'sa01', 'sa02', 0, '1819S004', 'R0'),
(58, 'S', 'abc india', '5555-12-31', 'Twice a Day', 'sa01', 'sa01', 0, '1819S005', 'R0');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(10) NOT NULL,
  `Cname` varchar(20) NOT NULL,
  `PhneNumber` int(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `details` varchar(50) NOT NULL,
  `CPerson` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `Cname`, `PhneNumber`, `email`, `details`, `CPerson`) VALUES
(19, 'new clieny', 2147483647, 'fakhdfkja@fnajhfk,xiokm', 'for the best induastries in the city', 'dhanasekar'),
(20, 'PILLOW MAT', 2147483647, 'MAIL2DHANASEKAR13@GMAIL.COM', 'FOR DETAILS OF EXTRA ', 'ANAND'),
(21, 'abc india', 0, 'lj', 'for providing gener', '978798');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `empid` varchar(10) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `sign` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `empid`, `Name`, `password`, `sign`) VALUES
(1, 'sa01', 'dhanasekar', '123123', ''),
(2, 'sa02', 'dans', '123123', ''),
(3, 'sa03', 'sales1', '123123', ''),
(4, 'sa04', 'sales2', '123123', ''),
(5, 'sa09', 'dans', '123123', 'f:/application/ccd/project/dans.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `projectenquiryregsiter`
--

CREATE TABLE `projectenquiryregsiter` (
  `Type` varchar(4) NOT NULL,
  `RefNo` varchar(20) NOT NULL,
  `Revision` varchar(4) NOT NULL,
  `Responsibility` varchar(30) NOT NULL,
  `CName` varchar(10) NOT NULL,
  `CPerson` varchar(15) NOT NULL,
  `Mode` varchar(15) NOT NULL,
  `EnqDate` date NOT NULL,
  `DueDate` date NOT NULL,
  `ReasonForLate` varchar(50) NOT NULL,
  `ProDetails` varchar(50) NOT NULL,
  `Feasible` varchar(5) NOT NULL,
  `OfferDate` date NOT NULL,
  `Currency` varchar(5) NOT NULL,
  `Value` int(20) NOT NULL,
  `ValueInCurrency` varchar(50) NOT NULL,
  `FollowUpBy` varchar(5) NOT NULL,
  `Remarks` varchar(10) NOT NULL,
  `ReasonForLossOfOrder` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `projectenquiryregsiter`
--

INSERT INTO `projectenquiryregsiter` (`Type`, `RefNo`, `Revision`, `Responsibility`, `CName`, `CPerson`, `Mode`, `EnqDate`, `DueDate`, `ReasonForLate`, `ProDetails`, `Feasible`, `OfferDate`, `Currency`, `Value`, `ValueInCurrency`, `FollowUpBy`, `Remarks`, `ReasonForLossOfOrder`) VALUES
('S', '1819S001', 'R0', '', '', '', '', '0000-00-00', '0000-00-00', '', '', '', '0000-00-00', '', 0, '', '', '', ''),
('P', '1819P001', 'R0', '', '', '', '', '0000-00-00', '0000-00-00', '', '', '', '0000-00-00', '', 0, '', '', '', ''),
('S', '1819S002', 'R0', 'dans', 'one  ne', '', 'Tender', '2018-07-20', '1255-12-02', '', '', '', '0000-00-00', '', 0, '', '', '', ''),
('S', '1819S003', 'R0', 'dans', 'new clieny', 'dhanasekar', 'Tender', '2018-07-20', '2018-12-02', '', 'for the best induastries in the city', '', '0000-00-00', '', 0, '', '', '', ''),
('S', '1819S003', 'R1', 'dans', 'new clieny', '', 'Tender', '2018-07-20', '2018-12-02', '', '', '', '0000-00-00', '', 0, '', '', '', ''),
('S', '1819S004', 'R0', 'dans', 'PILLOW MAT', 'ANAND', 'Tender', '2018-07-20', '2015-12-04', '', 'FOR DETAILS OF EXTRA ', '', '0000-00-00', '', 0, '', '', '', ''),
('S', '1819S005', 'R0', 'dhanasekar', 'abc india', '978798', 'Project', '2018-07-20', '5555-12-31', '', 'for providing gener', '', '0000-00-00', '', 0, '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignenquiry`
--
ALTER TABLE `assignenquiry`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD UNIQUE KEY `CCode` (`id`),
  ADD UNIQUE KEY `empid` (`empid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignenquiry`
--
ALTER TABLE `assignenquiry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
