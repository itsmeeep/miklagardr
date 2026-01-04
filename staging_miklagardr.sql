-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2026 at 10:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `staging_miklagardr`
--

-- --------------------------------------------------------

--
-- Table structure for table `facility`
--

CREATE TABLE `facility` (
  `facility_id` varchar(100) NOT NULL,
  `facility_name` text NOT NULL,
  `facility_order` int(11) NOT NULL DEFAULT 0,
  `facility_status` int(1) NOT NULL DEFAULT 1,
  `facility_icon` text DEFAULT NULL,
  `facility_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `facility_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `facility`
--

INSERT INTO `facility` (`facility_id`, `facility_name`, `facility_order`, `facility_status`, `facility_icon`, `facility_created_at`, `facility_updated_at`) VALUES
('14153-FACILITY-20260103154241', 'Fasilitas Umum', 4, 1, '', '2026-01-03 08:42:41', '2026-01-03 08:42:41'),
('45396-FACILITY-20260103143255', 'Spesifikasi Tipe Kamar', 1, 1, '', '2026-01-03 07:32:55', '2026-01-03 08:41:43'),
('51057-FACILITY-20260103154304', 'Fasilitas Parkir', 5, 1, '', '2026-01-03 08:43:04', '2026-01-03 08:43:14'),
('72124-FACILITY-20260103154210', 'Fasilitas Kamar Mandi', 3, 1, '', '2026-01-03 08:42:10', '2026-01-03 08:42:10'),
('90449-FACILITY-20260103144633', 'Fasilitas Kamar', 2, 1, '', '2026-01-03 07:46:33', '2026-01-03 08:41:46');

--
-- Triggers `facility`
--
DELIMITER $$
CREATE TRIGGER `trg_create_facility_id` BEFORE INSERT ON `facility` FOR EACH ROW BEGIN
DECLARE v_rand INT;
DECLARE v_date CHAR(14);
DECLARE v_facility_id VARCHAR(255);

SET v_rand = FLOOR(10000 + RAND() * 90000);
SET v_date = DATE_FORMAT(NOW(), '%Y%m%d%H%i%S');
SET v_facility_id = CONCAT(v_rand, '-FACILITY-', v_date);

SET NEW.facility_id = v_facility_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_create_facility_order` BEFORE INSERT ON `facility` FOR EACH ROW BEGIN
DECLARE v_last INT;

SELECT max(facility_order) INTO v_last
from facility;

SET NEW.facility_order = v_last + 1;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `facility_details`
--

CREATE TABLE `facility_details` (
  `facility_details_id` varchar(100) NOT NULL,
  `facility_details_fk_id` varchar(100) NOT NULL,
  `facility_details_name` text NOT NULL,
  `facility_details_status` int(1) NOT NULL DEFAULT 1,
  `facility_details_icon` text DEFAULT NULL,
  `facility_details_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `facility_details_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `facility_details`
--

INSERT INTO `facility_details` (`facility_details_id`, `facility_details_fk_id`, `facility_details_name`, `facility_details_status`, `facility_details_icon`, `facility_details_created_at`, `facility_details_updated_at`) VALUES
('16702-FACILITY-DETAILS-20260103160058', '14153-FACILITY-20260103154241', 'TV', 1, NULL, '2026-01-03 09:00:58', '2026-01-03 09:00:58'),
('22144-FACILITY-DETAILS-20260103160119', '14153-FACILITY-20260103154241', 'Dispenser', 1, NULL, '2026-01-03 09:01:19', '2026-01-03 09:01:19'),
('25021-FACILITY-DETAILS-20260103155952', '14153-FACILITY-20260103154241', 'Parkir Motor', 1, NULL, '2026-01-03 08:59:52', '2026-01-03 08:59:52'),
('25993-FACILITY-DETAILS-20260103155638', '90449-FACILITY-20260103144633', 'Jendela', 1, NULL, '2026-01-03 08:56:38', '2026-01-03 08:56:38'),
('27069-FACILITY-DETAILS-20260103155601', '90449-FACILITY-20260103144633', 'Lemari', 1, NULL, '2026-01-03 08:56:01', '2026-01-03 08:56:01'),
('28078-FACILITY-DETAILS-20260103155714', '90449-FACILITY-20260103144633', 'TV', 1, NULL, '2026-01-03 08:57:14', '2026-01-03 08:57:14'),
('32004-FACILITY-DETAILS-20260103160048', '14153-FACILITY-20260103154241', 'Kulkas', 1, NULL, '2026-01-03 09:00:48', '2026-01-03 09:00:48'),
('33319-FACILITY-DETAILS-20260103155624', '90449-FACILITY-20260103144633', 'Kursi', 1, NULL, '2026-01-03 08:56:24', '2026-01-03 08:56:24'),
('36086-FACILITY-DETAILS-20260103155941', '14153-FACILITY-20260103154241', 'WiFi', 1, NULL, '2026-01-03 08:59:41', '2026-01-03 08:59:41'),
('48827-FACILITY-DETAILS-20260103160010', '14153-FACILITY-20260103154241', 'Dapur', 1, NULL, '2026-01-03 09:00:10', '2026-01-03 09:00:10'),
('60288-FACILITY-DETAILS-20260103155524', '90449-FACILITY-20260103144633', 'Kamar Mandi Dalam', 1, NULL, '2026-01-03 08:55:24', '2026-01-03 08:55:24'),
('63016-FACILITY-DETAILS-20260103155614', '90449-FACILITY-20260103144633', 'AC', 1, NULL, '2026-01-03 08:56:14', '2026-01-03 08:56:14'),
('71444-FACILITY-DETAILS-20260103155543', '90449-FACILITY-20260103144633', 'Air Panas', 1, NULL, '2026-01-03 08:55:43', '2026-01-03 08:55:43'),
('74536-FACILITY-DETAILS-20260103160003', '14153-FACILITY-20260103154241', 'Parkir Mobil', 1, NULL, '2026-01-03 09:00:03', '2026-01-03 09:00:03'),
('75279-FACILITY-DETAILS-20260103155707', '90449-FACILITY-20260103144633', 'Kasur', 1, NULL, '2026-01-03 08:57:07', '2026-01-03 08:57:07'),
('77925-FACILITY-DETAILS-20260103155739', '90449-FACILITY-20260103144633', 'Kipas Angin', 1, NULL, '2026-01-03 08:57:39', '2026-01-03 08:57:39'),
('81624-FACILITY-DETAILS-20260103160110', '14153-FACILITY-20260103154241', 'Mushola', 1, NULL, '2026-01-03 09:01:10', '2026-01-03 09:01:10'),
('87806-FACILITY-DETAILS-20260103155630', '90449-FACILITY-20260103144633', 'Meja', 1, NULL, '2026-01-03 08:56:30', '2026-01-03 08:56:30'),
('88262-FACILITY-DETAILS-20260103160039', '14153-FACILITY-20260103154241', 'Mesin Cuci', 1, NULL, '2026-01-03 09:00:39', '2026-01-03 09:00:39'),
('97170-FACILITY-DETAILS-20260103160128', '14153-FACILITY-20260103154241', 'Ruang Keluarga', 1, NULL, '2026-01-03 09:01:28', '2026-01-03 09:01:28');

--
-- Triggers `facility_details`
--
DELIMITER $$
CREATE TRIGGER `trg_create_facility_detail_id` BEFORE INSERT ON `facility_details` FOR EACH ROW BEGIN
DECLARE v_rand INT;
DECLARE v_date CHAR(14);
DECLARE v_facility_id VARCHAR(255);

SET v_rand = FLOOR(10000 + RAND() * 90000);
SET v_date = DATE_FORMAT(NOW(), '%Y%m%d%H%i%S');
SET v_facility_id = CONCAT(v_rand, '-FACILITY-DETAILS-', v_date);

SET NEW.facility_details_id = v_facility_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pricing_type`
--

CREATE TABLE `pricing_type` (
  `pricing_type_id` varchar(100) NOT NULL,
  `pricing_type_name` text NOT NULL,
  `pricing_type_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `pricing_type_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pricing_type`
--

INSERT INTO `pricing_type` (`pricing_type_id`, `pricing_type_name`, `pricing_type_created_at`, `pricing_type_updated_at`) VALUES
('51392-PRICING-TYPE-20260103164022', 'Mingguan', '2026-01-03 09:40:22', '2026-01-03 09:40:22'),
('69011-PRICING-TYPE-20260103164015', 'Bulanan', '2026-01-03 09:40:15', '2026-01-03 09:40:15'),
('70303-PRICING-TYPE-20260103164030', 'Harian', '2026-01-03 09:40:30', '2026-01-03 09:40:30');

--
-- Triggers `pricing_type`
--
DELIMITER $$
CREATE TRIGGER `trg_create_pricing_type_id` BEFORE INSERT ON `pricing_type` FOR EACH ROW BEGIN
DECLARE v_rand INT;
DECLARE v_date CHAR(14);
DECLARE v_id VARCHAR(255);

SET v_rand = FLOOR(10000 + RAND() * 90000);
SET v_date = DATE_FORMAT(NOW(), '%Y%m%d%H%i%S');
SET v_id = CONCAT(v_rand, '-PRICING-TYPE-', v_date);

SET NEW.pricing_type_id = v_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `room_id` varchar(100) NOT NULL,
  `room_fk_id` varchar(100) NOT NULL,
  `room_code` varchar(10) DEFAULT NULL,
  `room_name` text DEFAULT NULL,
  `room_status` int(11) NOT NULL DEFAULT 1,
  `room_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `room_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `room_fk_id`, `room_code`, `room_name`, `room_status`, `room_created_at`, `room_updated_at`) VALUES
('63723-ROOM-20260103161641', '25408-TENANT-20260103161430', 'GB-01', 'Gumball Room 01', 1, '2026-01-03 09:16:41', '2026-01-03 09:16:41');

--
-- Triggers `room`
--
DELIMITER $$
CREATE TRIGGER `trg_create_room_id` BEFORE INSERT ON `room` FOR EACH ROW BEGIN
DECLARE v_rand INT;
DECLARE v_date CHAR(14);
DECLARE v_id VARCHAR(255);

SET v_rand = FLOOR(10000 + RAND() * 90000);
SET v_date = DATE_FORMAT(NOW(), '%Y%m%d%H%i%S');
SET v_id = CONCAT(v_rand, '-ROOM-', v_date);

SET NEW.room_id = v_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `room_details`
--

CREATE TABLE `room_details` (
  `room_details_id` varchar(100) NOT NULL,
  `room_details_fk_id` varchar(100) NOT NULL,
  `room_details_facility_fk_id` varchar(100) NOT NULL,
  `room_details_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `room_details_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_details`
--

INSERT INTO `room_details` (`room_details_id`, `room_details_fk_id`, `room_details_facility_fk_id`, `room_details_created_at`, `room_details_updated_at`) VALUES
('19481-ROOM-DETAILS-20260103163030', '63723-ROOM-20260103161641', '33319-FACILITY-DETAILS-20260103155624', '2026-01-03 09:30:30', '2026-01-03 09:30:30'),
('30380-ROOM-DETAILS-20260103163030', '63723-ROOM-20260103161641', '25993-FACILITY-DETAILS-20260103155638', '2026-01-03 09:30:30', '2026-01-03 09:30:30'),
('31126-ROOM-DETAILS-20260103163030', '63723-ROOM-20260103161641', '87806-FACILITY-DETAILS-20260103155630', '2026-01-03 09:30:30', '2026-01-03 09:30:30'),
('32508-ROOM-DETAILS-20260103163030', '63723-ROOM-20260103161641', '27069-FACILITY-DETAILS-20260103155601', '2026-01-03 09:30:30', '2026-01-03 09:30:30'),
('38213-ROOM-DETAILS-20260103163030', '63723-ROOM-20260103161641', '71444-FACILITY-DETAILS-20260103155543', '2026-01-03 09:30:30', '2026-01-03 09:30:30'),
('38378-ROOM-DETAILS-20260103163030', '63723-ROOM-20260103161641', '75279-FACILITY-DETAILS-20260103155707', '2026-01-03 09:30:30', '2026-01-03 09:30:30'),
('61401-ROOM-DETAILS-20260103163030', '63723-ROOM-20260103161641', '28078-FACILITY-DETAILS-20260103155714', '2026-01-03 09:30:30', '2026-01-03 09:30:30'),
('67252-ROOM-DETAILS-20260103163030', '63723-ROOM-20260103161641', '77925-FACILITY-DETAILS-20260103155739', '2026-01-03 09:30:30', '2026-01-03 09:30:30'),
('77563-ROOM-DETAILS-20260103163030', '63723-ROOM-20260103161641', '63016-FACILITY-DETAILS-20260103155614', '2026-01-03 09:30:30', '2026-01-03 09:30:30'),
('83201-ROOM-DETAILS-20260103163030', '63723-ROOM-20260103161641', '60288-FACILITY-DETAILS-20260103155524', '2026-01-03 09:30:30', '2026-01-03 09:30:30');

--
-- Triggers `room_details`
--
DELIMITER $$
CREATE TRIGGER `trg_create_room_details_id` BEFORE INSERT ON `room_details` FOR EACH ROW BEGIN
DECLARE v_rand INT;
DECLARE v_date CHAR(14);
DECLARE v_id VARCHAR(255);

SET v_rand = FLOOR(10000 + RAND() * 90000);
SET v_date = DATE_FORMAT(NOW(), '%Y%m%d%H%i%S');
SET v_id = CONCAT(v_rand, '-ROOM-DETAILS-', v_date);

SET NEW.room_details_id = v_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `room_images`
--

CREATE TABLE `room_images` (
  `room_images_id` varchar(100) NOT NULL,
  `room_images_fk_id` varchar(100) NOT NULL,
  `room_images_url` text NOT NULL,
  `room_images_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `room_images_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_images`
--

INSERT INTO `room_images` (`room_images_id`, `room_images_fk_id`, `room_images_url`, `room_images_created_at`, `room_images_updated_at`) VALUES
('14741-ROOM-IMAGES-20260103174258', '63723-ROOM-20260103161641', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png', '2026-01-03 10:42:58', '2026-01-03 10:45:00'),
('81376-ROOM-IMAGES-20260103174258', '63723-ROOM-20260103161641', 'https://images.unsplash.com/photo-1662947190722-5d272f82a526?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29vZ2xlJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D', '2026-01-03 10:42:58', '2026-01-03 10:42:58');

--
-- Triggers `room_images`
--
DELIMITER $$
CREATE TRIGGER `trg_create_room_images_id` BEFORE INSERT ON `room_images` FOR EACH ROW BEGIN
DECLARE v_rand INT;
DECLARE v_date CHAR(14);
DECLARE v_id VARCHAR(255);

SET v_rand = FLOOR(10000 + RAND() * 90000);
SET v_date = DATE_FORMAT(NOW(), '%Y%m%d%H%i%S');
SET v_id = CONCAT(v_rand, '-ROOM-IMAGES-', v_date);

SET NEW.room_images_id = v_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `room_pricing`
--

CREATE TABLE `room_pricing` (
  `room_pricing_id` varchar(100) NOT NULL,
  `room_pricing_fk_id` varchar(100) NOT NULL,
  `room_pricing_type_fk_id` varchar(100) NOT NULL,
  `room_pricing_value` int(11) DEFAULT NULL,
  `room_pricing_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `room_pricing_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_pricing`
--

INSERT INTO `room_pricing` (`room_pricing_id`, `room_pricing_fk_id`, `room_pricing_type_fk_id`, `room_pricing_value`, `room_pricing_created_at`, `room_pricing_updated_at`) VALUES
('13023-ROOM-PRICING-20260103164532', '63723-ROOM-20260103161641', '69011-PRICING-TYPE-20260103164015', 500000, '2026-01-03 09:45:32', '2026-01-03 09:45:32'),
('22147-ROOM-PRICING-20260103164709', '63723-ROOM-20260103161641', '70303-PRICING-TYPE-20260103164030', 50000, '2026-01-03 09:47:09', '2026-01-03 09:47:09'),
('70353-ROOM-PRICING-20260103164637', '63723-ROOM-20260103161641', '51392-PRICING-TYPE-20260103164022', 150000, '2026-01-03 09:46:37', '2026-01-03 09:46:37');

--
-- Triggers `room_pricing`
--
DELIMITER $$
CREATE TRIGGER `trg_create_room_pricing_id` BEFORE INSERT ON `room_pricing` FOR EACH ROW BEGIN
DECLARE v_rand INT;
DECLARE v_date CHAR(14);
DECLARE v_id VARCHAR(255);

SET v_rand = FLOOR(10000 + RAND() * 90000);
SET v_date = DATE_FORMAT(NOW(), '%Y%m%d%H%i%S');
SET v_id = CONCAT(v_rand, '-ROOM-PRICING-', v_date);

SET NEW.room_pricing_id = v_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tenant`
--

CREATE TABLE `tenant` (
  `tenant_id` varchar(100) NOT NULL,
  `tenant_name` text DEFAULT NULL,
  `tenant_description` text DEFAULT NULL,
  `tenant_rules` text DEFAULT NULL,
  `tenant_location` text DEFAULT NULL,
  `tenant_province` text DEFAULT NULL,
  `tenant_city` text DEFAULT NULL,
  `tenant_regency` text DEFAULT NULL,
  `tenant_subdistrict` text DEFAULT NULL,
  `tenant_postalcode` text DEFAULT NULL,
  `tenant_status` int(11) NOT NULL DEFAULT 1,
  `tenant_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `tenant_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tenant`
--

INSERT INTO `tenant` (`tenant_id`, `tenant_name`, `tenant_description`, `tenant_rules`, `tenant_location`, `tenant_province`, `tenant_city`, `tenant_regency`, `tenant_subdistrict`, `tenant_postalcode`, `tenant_status`, `tenant_created_at`, `tenant_updated_at`) VALUES
('25408-TENANT-20260103161430', 'Gumball', 'hehe', 'hihi', '-6.1054739637624325, 106.739249926547', 'Jakarta', 'North Jakarta City', 'Penjaringan', 'Kamal Muara', '14470', 1, '2026-01-03 09:14:30', '2026-01-03 11:16:51');

--
-- Triggers `tenant`
--
DELIMITER $$
CREATE TRIGGER `trg_create_tenant_id` BEFORE INSERT ON `tenant` FOR EACH ROW BEGIN
DECLARE v_rand INT;
DECLARE v_date CHAR(14);
DECLARE v_id VARCHAR(255);

SET v_rand = FLOOR(10000 + RAND() * 90000);
SET v_date = DATE_FORMAT(NOW(), '%Y%m%d%H%i%S');
SET v_id = CONCAT(v_rand, '-TENANT-', v_date);

SET NEW.tenant_id = v_id;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `facility`
--
ALTER TABLE `facility`
  ADD PRIMARY KEY (`facility_id`);

--
-- Indexes for table `facility_details`
--
ALTER TABLE `facility_details`
  ADD PRIMARY KEY (`facility_details_id`);

--
-- Indexes for table `pricing_type`
--
ALTER TABLE `pricing_type`
  ADD PRIMARY KEY (`pricing_type_id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `room_details`
--
ALTER TABLE `room_details`
  ADD PRIMARY KEY (`room_details_id`);

--
-- Indexes for table `room_images`
--
ALTER TABLE `room_images`
  ADD PRIMARY KEY (`room_images_id`);

--
-- Indexes for table `room_pricing`
--
ALTER TABLE `room_pricing`
  ADD PRIMARY KEY (`room_pricing_id`);

--
-- Indexes for table `tenant`
--
ALTER TABLE `tenant`
  ADD PRIMARY KEY (`tenant_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
