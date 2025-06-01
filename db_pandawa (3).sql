-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2025 at 05:59 AM
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
-- Database: `db_pandawa`
--

-- --------------------------------------------------------

--
-- Table structure for table `akun`
--

CREATE TABLE `akun` (
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `akun`
--

INSERT INTO `akun` (`username`, `email`, `password`) VALUES
('bian', 'bian@gmail.com', '123');

-- --------------------------------------------------------

--
-- Table structure for table `data_kecamatan`
--

CREATE TABLE `data_kecamatan` (
  `id_kecamatan` int(11) NOT NULL,
  `nama_kecamatan` varchar(100) DEFAULT NULL,
  `gambar` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `area` varchar(15) DEFAULT NULL,
  `posisi_x` float DEFAULT NULL,
  `posisi_y` float DEFAULT NULL,
  `id_komoditas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_kecamatan`
--

INSERT INTO `data_kecamatan` (`id_kecamatan`, `nama_kecamatan`, `gambar`, `deskripsi`, `area`, `posisi_x`, `posisi_y`, `id_komoditas`) VALUES
(1, 'Binakal 123', '/kecamatan/binakal.jpg', 'Binakal adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 7 Km dari ibu kota Kabupaten Bondowoso ke arah barat. Pusat pemerintahannya berada di Desa Binakal.vyiiuv', '39,039', 230, 450, 1),
(2, 'Bondowoso', '/kecamatan/bondowoso.jpg', 'Bondowoso adalah ibu kota Kabupaten Bondowoso yang sekaligus menjadi pusat pemerintahan dan perekonomian dari Kabupaten Bondowoso. Bondowoso juga merupakan sebuah kecamatan yang berada di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. gg', '23,158', 327, 485, 1),
(22, 'Cermee', '/kecamatan/cermee.jpg', 'Cermee adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak 33 Km dari ibu kota Kabupaten Bondowoso dan merupakan salah satu wilayah kecamatan paling timur. Ibu kotanya berada di Desa Cermee', '129,204', 685, 375, 2),
(23, 'Botolinggo', '/kecamatan/botolinggo.jpg', 'Botolinggo adalah sebuah desa di Kecamatan Botolinggo, Kabupaten Bondowoso, Provinsi Jawa Timur.', '127.41', 640, 455, 1),
(24, 'Curahdami', '/kecamatan/curahdami.jpg', 'Curahdami adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 3 Km dari ibu kota Kabupaten Bondowoso ke arah barat. Pusat pemerintahannya berada di Kelurahan Curahdami.', '34.889', 275, 480, 1),
(25, 'Grujugan', '/kecamatan/grujugan.jpg', 'Grujugan adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 7 Km dari ibu kota Kabupaten Bondowoso ke arah barat daya. Pusat pemerintahannya berada di Desa Taman.', '74.447', 250, 555, 1),
(26, 'Jambe Sari', '/kecamatan/jambesari.jpg', 'Jambesari Darus Sholah adalah sebuah kecamatan yang berada di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 10 Km dari ibu kota Kabupaten Bondowoso ke arah selatan. Pusat pemerintahannya berada di Desa Jambesari.', '36.776', 375, 555, 1),
(27, 'Klabang', '/kecamatan/klabang.jpg', 'Klabang adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 19 Km dari ibu kota Kabupaten Bondowoso ke arah timur laut. Pusat pemerintahannya berada di Desa Klabang.', '91.204', 475, 320, 1),
(28, 'Maesan', '/kecamatan/maesan.jpg', 'Maesan merupakan sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 13 Km dari ibu kota Kabupaten Bondowoso ke arah selatan. Pusat pemerintahannya berada di Desa Maesan.', '56.083', 255, 612, 1),
(29, 'Pakem', '/kecamatan/pakem.webp', 'Pakem adalah sebuah kecamatan di Kabupaten Bondowoso, Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 18 Km dari ibu kota Kabupaten Bondowoso ke arah barat. Pusat pemerintahannya berada di desa Patemon. Pakem merupakan kecamatan paling barat di Kabupaten Bondowoso.', '62.082', 180, 448, 1),
(30, 'Prajekan', '/kecamatan/prajekan.jpg', 'Prajekan adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 24 Km dari ibu kota Kabupaten Bondowoso ke arah timur laut. Pusat pemerintahannya berada di Desa Prajekan Lor.', '56.642', 542, 285, 1),
(31, 'Pujer', '/kecamatan/pujer.jpg', 'Pujer adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 12 Km dari ibu kota Kabupaten Bondowoso ke arah tenggara. Pusat pemerintahannya berada di Desa Kejayan.', '39.889', 435, 555, 1),
(32, 'Ijen', '/kecamatan/ijen.jpg', 'Ijen adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekira 53 Km dari ibu kota Kabupaten Bondowoso melalui Tapen dan Sukosari, dan merupakan kecamatan paling timur. Kecamatan Ijen adalah perubahan nama dari Kecamatan Sempol', '207.20', 825, 638, 4),
(33, 'Sukosari', '/kecamatan/sukosari.jpg', 'Sukosari adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 22 Km dari ibu kota Kabupaten Bondowoso ke arah timur. Pusat pemerintahannya berada di Desa Sukosari Lor.', '23.172', 499, 490, 1),
(34, 'Sumber Wringin', '/kecamatan/sumberWringin.jpg', 'Sumberwringin adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 27 Km dari ibu kota Kabupaten Bondowoso ke arah tenggara. Pusat pemerintahannya berada di Desa Sumberwringin. Sumberwringin terletak di lereng Pegunungan Ijen.', '137.947', 640, 585, 1),
(35, 'Tamanan', '/kecamatan/tamanan.jpg', 'Tamanan adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kata Tamanan sendiri berawal dari sebuah kisah kuno yang konon diambil dari sebuah Taman yang ada di desa tersebut. Taman tersebut merupakan sebuah peninggalan Belanda yang pada akhir Tahun 1998 masih bisa dipakai.', '28.151', 348, 605, 1),
(36, 'Tapen', '/kecamatan/tapen.jpg', 'Tapen adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 16 Km dari ibu kota Kabupaten Bondowoso ke arah timur. Pusat pemerintahannya berada di Desa Tapen.', '157.042', 495, 410, 1),
(37, 'Tegalampel', '/kecamatan/tegalampel.jpg', 'Tegalampel adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini hanya berjarak sekitar 2 Km dari ibu kota Kabupaten Bondowoso ke arah utara. Pusat pemerintahannya berada di Desa Sekarputih.', '47.027', 335, 400, 1),
(38, 'Tenggarang', '/kecamatan/tenggarang.jpg', 'Tenggarang adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia.', '25.795', 375, 482, 1),
(39, 'Tlogosari', '/kecamatan/tlogosari.jpg', 'Tlogosari adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 17 Km dari ibu kota Kabupaten Bondowoso ke arah tenggara. Pusat pemerintahannya berada di Desa Pakisan. Wilayah bagian selatan kecamatan Tlogosari terdapat Gunung Raung.', '110.92', 540, 610, 1),
(40, 'Wonosari', '/kecamatan/Wonosari.jpg', 'Wonosari adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 10 Km dari ibu kota Kabupaten Bondowoso ke arah timur. Pusat pemerintahannya berada di Desa Wonosari.', '42.277', 450, 462, 1),
(41, 'Wringin', '/kecamatan/wringin.jpg', 'Wringin adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 16 Km dari ibu kota Kabupaten Bondowoso ke arah barat laut. Pusat pemerintahannya berada di Desa Wringin.', '58.01', 275, 342, 3),
(42, 'Taman Krocok', '/kecamatan/tamanKrocok.jpg', 'Taman Krocok adalah sebuah kecamatan di Kabupaten Bondowoso, Provinsi Jawa Timur, Indonesia. Kecamatan ini berjarak sekitar 12 Km dari ibu kota Kabupaten Bondowoso ke arah timur laut. Pusat pemerintahannya berada di Desa Taman. Kecamatan ini memiliki jumlah penduduk terkecil di kabupaten Bondowoso.', '53.003', 410, 375, 2);

-- --------------------------------------------------------

--
-- Table structure for table `data_penduduk`
--

CREATE TABLE `data_penduduk` (
  `id_penduduk` int(11) NOT NULL,
  `id_kecamatan` int(11) NOT NULL,
  `laju_pertumbuhan` varchar(30) NOT NULL,
  `jml_penduduk` varchar(30) NOT NULL,
  `tahun` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_penduduk`
--

INSERT INTO `data_penduduk` (`id_penduduk`, `id_kecamatan`, `laju_pertumbuhan`, `jml_penduduk`, `tahun`) VALUES
(1, 1, '-2.12%', '17.066', '2025'),
(2, 2, '-1.22%', '76.805', '2025'),
(3, 23, '-2.19%', '29.110', '2025'),
(4, 24, '-0.73%', '34.889', '2025'),
(5, 25, '-0.28%', '38.165', '2025'),
(6, 32, '-2.01%', '12.030', '2025'),
(7, 26, '-2.10%', '36.076', '2025'),
(8, 27, '-1.26%', '18.688', '2025'),
(9, 28, '-0.20%', '42.212', '2025'),
(10, 29, '-2.19%', '23.362', '2025'),
(11, 30, '-1.07%', '25.644', '2025'),
(12, 31, '-1.63%', '40.594', '2025'),
(13, 33, '-0.73%', '15.553', '2025'),
(14, 34, '-1.39%', '35.127', '2025'),
(15, 35, '0.31%', '39.535', '2025'),
(16, 36, '-1.32%', '34.003', '2025'),
(17, 37, '-0.81%', '26.571', '2025'),
(18, 38, '-0.76%', '43.973', '2025'),
(19, 39, '-0.80%', '47.078', '2025'),
(20, 40, '-1.28%', '40.764', '2025'),
(21, 41, '-1.04%', '40.755', '2025'),
(22, 22, '-1.49%', '46.353', '2025'),
(23, 42, '-1.19%', '16.654', '2025');

-- --------------------------------------------------------

--
-- Table structure for table `hasil_panen`
--

CREATE TABLE `hasil_panen` (
  `id_panen` varchar(50) NOT NULL,
  `id_kecamatan` int(11) DEFAULT NULL,
  `id_komoditas` int(11) DEFAULT NULL,
  `tahun_panen` year(4) DEFAULT NULL,
  `produksi` float DEFAULT NULL,
  `luas_panen` float DEFAULT NULL,
  `produktivitas` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hasil_panen`
--

INSERT INTO `hasil_panen` (`id_panen`, `id_kecamatan`, `id_komoditas`, `tahun_panen`, `produksi`, `luas_panen`, `produktivitas`) VALUES
('jagung-binakal', 1, 2, '2025', 2610, 5173, '5.05'),
('jagung-bondowoso', 2, 2, '2025', 561, 100, '5.61'),
('jagung-botolinggo', 23, 2, '2025', 14317, 2598, '5.51'),
('jagung-cermee', 22, 2, '2025', 41389, 7368, '5.62'),
('jagung-curahdami', 24, 2, '2025', 3120, 619, '5.04'),
('jagung-grujugan', 25, 2, '2025', 2211, 407, '5.43'),
('jagung-jambesari', 26, 2, '2025', 1731, 322, '5.38'),
('jagung-klabang', 27, 2, '2025', 13023, 2386, '5.46'),
('jagung-maesan', 28, 2, '2025', 8409, 1557, '5.4'),
('jagung-pakem', 29, 2, '2025', 4804, 1031, '4.66'),
('jagung-prajekan', 30, 2, '2025', 14317, 2598, '5.51'),
('jagung-pujer', 31, 2, '2025', 5390, 966, '5.58'),
('jagung-sukosari', 33, 2, '2025', 4563, 836, '5.46'),
('jagung-sumberwringin', 34, 2, '2025', 6005, 1092, '5.54'),
('jagung-tamanan', 35, 2, '2025', 1835, 330, '5.56'),
('jagung-tamankrocok', 42, 2, '2025', 14283, 2646, '5.4'),
('jagung-tapen', 36, 2, '2025', 7879, 1414, '5.57'),
('jagung-tegalampel', 37, 2, '2025', 3799, 689, '5.51'),
('jagung-tenggarang', 38, 2, '2025', 1744, 315, '5.54'),
('jagung-tlogosari', 39, 2, '2025', 3401, 616, '5.52'),
('jagung-wonosari', 40, 2, '2025', 1930, 348, '5.55'),
('jagung-wringin', 41, 2, '2025', 8849, 1915, '4.62'),
('kelapa-binakal', 1, 7, '2025', 184.8, 0, '0'),
('kelapa-bondowoso', 2, 7, '2025', 147.2, 0, '0'),
('kelapa-botolinggo', 23, 7, '2025', 33.85, 0, '0'),
('kelapa-cermee', 22, 7, '2025', 35.18, 0, '0'),
('kelapa-curahdami', 24, 7, '2025', 262.2, 0, '0'),
('kelapa-grujugan', 25, 7, '2025', 200.53, 0, '0'),
('kelapa-jambesari', 26, 7, '2025', 15.3, 0, '0'),
('kelapa-klabang', 27, 7, '2025', 3.87, 0, '0'),
('kelapa-maesan', 28, 7, '2025', 1579.5, 0, '0'),
('kelapa-pakem', 29, 7, '2025', 68.32, 0, '0'),
('kelapa-prajekan', 30, 7, '2025', 33.85, 0, '0'),
('kelapa-sukosari', 33, 7, '2025', 71, 0, '0'),
('kelapa-sumberwringin', 34, 7, '2025', 35.7, 0, '0'),
('kelapa-tamanan', 35, 7, '2025', 42.5, 0, '0'),
('kelapa-tamankrocok', 42, 7, '2025', 92.85, 0, '0'),
('kelapa-tapen', 36, 7, '2025', 273.6, 0, '0'),
('kelapa-wonosari', 40, 7, '2025', 17.33, 0, '0'),
('kopi-binakal', 1, 4, '2025', 26.38, 0, '0'),
('kopi-botolinggo', 23, 4, '2025', 372.34, 0, '0'),
('kopi-cermee', 22, 4, '2025', 119.71, 0, '0'),
('kopi-curahdami', 24, 4, '2025', 114.12, 0, '0'),
('kopi-grujugan', 25, 4, '2025', 174.91, 0, '0'),
('kopi-ijen', 32, 4, '2025', 853.4, 0, '0'),
('kopi-klabang', 27, 4, '2025', 170.44, 0, '0'),
('kopi-maesan', 28, 4, '2025', 846.43, 0, '0'),
('kopi-pakem', 29, 4, '2025', 172.37, 0, '0'),
('kopi-pujer', 31, 4, '2025', 2.25, 0, '0'),
('kopi-sukosari', 33, 4, '2025', 155, 0, '0'),
('kopi-sumberwringin', 34, 4, '2025', 4902.57, 0, '0'),
('kopi-tamanan', 35, 4, '2025', 9.89, 0, '0'),
('kopi-tamankrocok', 42, 4, '2025', 60.75, 0, '0'),
('kopi-tegalampel', 37, 4, '2025', 6.58, 0, '0'),
('kopi-tlogosari', 39, 4, '2025', 452.1, 0, '0'),
('padi-binakal', 1, 1, '2025', 11842, 2161, '5.48'),
('padi-bondowoso', 2, 1, '2025', 16156, 2577, '6.27'),
('padi-botolinggo', 23, 1, '2025', 18775, 3057, '6.18'),
('padi-cermee', 22, 1, '2025', 23466, 3696, '6.35'),
('padi-curahdami', 24, 1, '2025', 14191, 2627, '5.4'),
('padi-grujugan', 25, 1, '2025', 21452, 3414, '6.28'),
('padi-jambesari', 26, 1, '2025', 19792, 3171, '6.24'),
('padi-klabang', 27, 1, '2025', 23498, 3824, '6.14'),
('padi-maesan', 28, 1, '2025', 15558, 2468, '6.3'),
('padi-pakem', 29, 1, '2025', 13308, 2409, '5.48'),
('padi-prajekan', 30, 1, '2025', 18775, 3057, '6.18'),
('padi-pujer', 31, 1, '2025', 39051, 6098, '6.4'),
('padi-sukosari', 33, 1, '2025', 14313, 2378, '6.02'),
('padi-sumberwringin', 34, 1, '2025', 20794, 3497, '5.95'),
('padi-tamanan', 35, 1, '2025', 26097, 4145, '6.3'),
('padi-tamankrocok', 42, 1, '2025', 8619, 1455, '5.92'),
('padi-tapen', 36, 1, '2025', 40715, 6270, '6.49'),
('padi-tegalampel', 37, 1, '2025', 13700, 2265, '6.05'),
('padi-tenggarang', 38, 1, '2025', 27299, 4211, '6.48'),
('padi-tlogosari', 39, 1, '2025', 38854, 6069, '6.4'),
('padi-wonosari', 40, 1, '2025', 25229, 3914, '6.45'),
('padi-wringin', 41, 1, '2025', 13281, 2447, '5.43'),
('ubi-binakal', 1, 3, '2025', 1714, 75, '22.85'),
('ubi-bondowoso', 2, 3, '2025', 237, 6, '39.5'),
('ubi-botolinggo', 23, 3, '2025', 7312, 275, '26.59'),
('ubi-cermee', 22, 3, '2025', 12227, 524, '23.33'),
('ubi-curahdami', 24, 3, '2025', 890, 44, '20.23'),
('ubi-grujugan', 25, 3, '2025', 3459, 151, '22.91'),
('ubi-jambesari', 26, 3, '2025', 1611, 99, '16.27'),
('ubi-klabang', 27, 3, '2025', 4912, 232, '21.17'),
('ubi-maesan', 28, 3, '2025', 1108, 71, '15.61'),
('ubi-pakem', 29, 3, '2025', 1402, 57, '24.6'),
('ubi-prajekan', 30, 3, '2025', 7312, 275, '26.59'),
('ubi-pujer', 31, 3, '2025', 2566, 112, '22.91'),
('ubi-sukosari', 33, 3, '2025', 1866, 81, '23.04'),
('ubi-sumberwringin', 34, 3, '2025', 1238, 76, '16.29'),
('ubi-tamanan', 35, 3, '2025', 3115, 136, '22.9'),
('ubi-tamankrocok', 42, 3, '2025', 2958, 129, '22.93'),
('ubi-tapen', 36, 3, '2025', 1655, 72, '22.99'),
('ubi-tegalampel', 37, 3, '2025', 1903, 83, '22.93'),
('ubi-tenggarang', 38, 3, '2025', 115, 5, '23'),
('ubi-tlogosari', 39, 3, '2025', 2020, 88, '22.95'),
('ubi-wonosari', 40, 3, '2025', 69, 3, '23'),
('ubi-wringin', 41, 3, '2025', 20440, 884, '23.12');

-- --------------------------------------------------------

--
-- Table structure for table `komoditas`
--

CREATE TABLE `komoditas` (
  `id_komoditas` int(11) NOT NULL,
  `nama_komoditas` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `komoditas`
--

INSERT INTO `komoditas` (`id_komoditas`, `nama_komoditas`) VALUES
(1, 'Padi'),
(2, 'Jagung'),
(3, 'Ubi Kayu'),
(4, 'Kopi'),
(5, 'Tebu'),
(6, 'Tembakau'),
(7, 'Kelapa');

-- --------------------------------------------------------

--
-- Table structure for table `prediksi_panen`
--

CREATE TABLE `prediksi_panen` (
  `id_prediksi` int(11) NOT NULL,
  `id_kecamatan` int(11) NOT NULL,
  `id_komoditas` int(11) NOT NULL,
  `luas_panen` float NOT NULL,
  `rata_rata_produksi` float NOT NULL,
  `tahun` year(4) NOT NULL,
  `hasil_prediksi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prediksi_panen`
--

INSERT INTO `prediksi_panen` (`id_prediksi`, `id_kecamatan`, `id_komoditas`, `luas_panen`, `rata_rata_produksi`, `tahun`, `hasil_prediksi`) VALUES
(1, 1, 1, 2161, 5.48, '2025', 11862),
(2, 2, 1, 2577, 6.27, '2025', 15835),
(3, 22, 1, 3696, 6.35, '2025', 23147),
(4, 23, 1, 0, 0, '2025', 0),
(5, 24, 1, 2627, 5.4, '2025', 14725),
(6, 25, 1, 3414, 6.28, '2025', 21104),
(7, 26, 1, 3171, 6.24, '2025', 19581),
(8, 27, 1, 3824, 6.14, '2025', 23714),
(9, 28, 1, 2468, 6.3, '2025', 15343),
(10, 29, 1, 2409, 5.48, '2025', 13208),
(11, 30, 1, 3057, 6.18, '2025', 18760),
(12, 31, 1, 6098, 6.4, '2025', 39493),
(13, 32, 1, 3097, 6.06, '2025', 18959),
(14, 33, 1, 2378, 6.02, '2025', 14024),
(15, 34, 1, 3497, 5.95, '2025', 21090),
(16, 35, 1, 4145, 6.3, '2025', 26511),
(17, 36, 1, 6270, 6.49, '2025', 40692),
(18, 37, 1, 2265, 6.05, '2025', 13825),
(19, 38, 1, 4211, 6.48, '2025', 26975),
(20, 39, 1, 6069, 6.4, '2025', 38559),
(21, 40, 1, 3914, 6.45, '2025', 25294),
(22, 41, 1, 2447, 5.43, '2025', 13807),
(23, 42, 1, 1455, 5.92, '2025', 8695),
(24, 1, 2, 517, 5.05, '2025', 2635),
(25, 2, 2, 100, 5.61, '2025', 560),
(26, 22, 2, 7368, 5.62, '2025', 41622),
(27, 23, 2, 0, 0, '2025', 0),
(28, 24, 2, 619, 5.04, '2025', 3240),
(29, 25, 2, 407, 5.43, '2025', 2246),
(30, 26, 2, 322, 5.38, '2025', 1681),
(31, 27, 2, 2386, 5.46, '2025', 13028),
(32, 28, 2, 1557, 5.4, '2025', 8441),
(33, 29, 2, 1031, 4.66, '2025', 4929),
(34, 30, 2, 2598, 5.51, '2025', 14182),
(35, 31, 2, 966, 5.58, '2025', 5292),
(36, 32, 2, 2594, 5.45, '2025', 14010),
(37, 33, 2, 836, 5.46, '2025', 4517),
(38, 34, 2, 1092, 5.54, '2025', 6016),
(39, 35, 2, 330, 5.56, '2025', 1768),
(40, 36, 2, 1414, 5.57, '2025', 7742),
(41, 37, 2, 689, 5.51, '2025', 3701),
(42, 38, 2, 315, 5.54, '2025', 1711),
(43, 39, 2, 616, 5.52, '2025', 3408),
(44, 40, 2, 348, 5.55, '2025', 1918),
(45, 41, 2, 1915, 4.62, '2025', 9009),
(46, 42, 2, 2646, 5.4, '2025', 14066),
(47, 1, 3, 75, 22.85, '2025', 1651),
(48, 2, 3, 6, 39.5, '2025', 205),
(49, 22, 3, 524, 23.33, '2025', 12169),
(50, 23, 3, 0, 0, '2025', 0),
(51, 24, 3, 44, 20.23, '2025', 980),
(52, 25, 3, 151, 22.91, '2025', 3382),
(53, 26, 3, 99, 16.27, '2025', 1780),
(54, 27, 3, 232, 21.17, '2025', 4980),
(55, 28, 3, 71, 15.61, '2025', 1230),
(56, 29, 3, 57, 24.6, '2025', 1348),
(57, 30, 3, 275, 26.59, '2025', 6792),
(58, 31, 3, 112, 22.91, '2025', 2601),
(59, 32, 3, 324, 23.2, '2025', 7457),
(60, 33, 3, 81, 23.04, '2025', 1852),
(61, 34, 3, 76, 16.29, '2025', 1368),
(62, 35, 3, 136, 22.9, '2025', 3018),
(63, 36, 3, 72, 22.99, '2025', 1610),
(64, 37, 3, 83, 22.93, '2025', 1882),
(65, 38, 3, 5, 23, '2025', 123),
(66, 39, 3, 88, 22.95, '2025', 1976),
(67, 40, 3, 3, 23, '2025', 69),
(68, 41, 3, 884, 23.12, '2025', 19222),
(69, 42, 3, 129, 22.93, '2025', 2952);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akun`
--
ALTER TABLE `akun`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `data_kecamatan`
--
ALTER TABLE `data_kecamatan`
  ADD PRIMARY KEY (`id_kecamatan`),
  ADD KEY `id_komoditas` (`id_komoditas`);

--
-- Indexes for table `data_penduduk`
--
ALTER TABLE `data_penduduk`
  ADD PRIMARY KEY (`id_penduduk`),
  ADD KEY `id_kecamatan` (`id_kecamatan`);

--
-- Indexes for table `hasil_panen`
--
ALTER TABLE `hasil_panen`
  ADD PRIMARY KEY (`id_panen`),
  ADD KEY `id_kecamatan` (`id_kecamatan`),
  ADD KEY `id_komoditas` (`id_komoditas`);

--
-- Indexes for table `komoditas`
--
ALTER TABLE `komoditas`
  ADD PRIMARY KEY (`id_komoditas`);

--
-- Indexes for table `prediksi_panen`
--
ALTER TABLE `prediksi_panen`
  ADD PRIMARY KEY (`id_prediksi`),
  ADD KEY `id_kecamatan` (`id_kecamatan`),
  ADD KEY `id_komoditas` (`id_komoditas`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_kecamatan`
--
ALTER TABLE `data_kecamatan`
  MODIFY `id_kecamatan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `data_penduduk`
--
ALTER TABLE `data_penduduk`
  MODIFY `id_penduduk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `komoditas`
--
ALTER TABLE `komoditas`
  MODIFY `id_komoditas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `prediksi_panen`
--
ALTER TABLE `prediksi_panen`
  MODIFY `id_prediksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data_kecamatan`
--
ALTER TABLE `data_kecamatan`
  ADD CONSTRAINT `data_kecamatan_ibfk_1` FOREIGN KEY (`id_komoditas`) REFERENCES `komoditas` (`id_komoditas`);

--
-- Constraints for table `data_penduduk`
--
ALTER TABLE `data_penduduk`
  ADD CONSTRAINT `data_penduduk_ibfk_1` FOREIGN KEY (`id_kecamatan`) REFERENCES `data_kecamatan` (`id_kecamatan`);

--
-- Constraints for table `hasil_panen`
--
ALTER TABLE `hasil_panen`
  ADD CONSTRAINT `hasil_panen_ibfk_1` FOREIGN KEY (`id_kecamatan`) REFERENCES `data_kecamatan` (`id_kecamatan`),
  ADD CONSTRAINT `hasil_panen_ibfk_2` FOREIGN KEY (`id_komoditas`) REFERENCES `komoditas` (`id_komoditas`);

--
-- Constraints for table `prediksi_panen`
--
ALTER TABLE `prediksi_panen`
  ADD CONSTRAINT `prediksi_panen_ibfk_1` FOREIGN KEY (`id_kecamatan`) REFERENCES `data_kecamatan` (`id_kecamatan`),
  ADD CONSTRAINT `prediksi_panen_ibfk_2` FOREIGN KEY (`id_komoditas`) REFERENCES `komoditas` (`id_komoditas`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
