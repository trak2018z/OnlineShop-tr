-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 25 Paź 2017, 21:33
-- Wersja serwera: 10.1.28-MariaDB
-- Wersja PHP: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `online_shop`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `items` text NOT NULL,
  `total` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `orders`
--

INSERT INTO `orders` (`id`, `userId`, `name`, `email`, `items`, `total`, `status`) VALUES
(1, 1, 'Adrian', 'foo@bar.com', 'Flovent HFA|eros. Proin ultrices. Duis volutpat nunc sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt|2.82|1.69|3|Amoxicillin|lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem ac risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis|7.98|0.85|2', '68.42', 0),
(2, 1, 'Adrian', 'foo@bar.com', 'Digoxin|magna. Praesent interdum ligula eu enim. Etiam imperdiet dictum magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit|1.7|1.94|5', '19.45', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `products`
--

INSERT INTO `products` (`id`, `name`, `weight`, `description`, `price`) VALUES
(1, 'Amlodipine Besylate', '1.64', 'ante dictum cursus. Nunc mauris elit, dictum eu, eleifend nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in felis. Nulla tempor augue ac', '0.03'),
(2, 'Warfarin Sodium', '0.6', 'id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus', '3.4'),
(3, 'Flovent HFA', '1.69', 'eros. Proin ultrices. Duis volutpat nunc sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt', '2.82'),
(4, 'Proair HFA', '1.62', 'volutpat. Nulla dignissim. Maeprices ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maeprices malesuada fringilla est. Mauris eu turpis. Nulla aliquet.', '7.96'),
(5, 'Amoxicillin', '0.85', 'lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem ac risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maeprices iaculis', '7.98'),
(6, 'Suboxone', '1.97', 'cursus in, hendrerit consectetuer, cursus et, magna. Praesent interdum ligula eu enim. Etiam imperdiet dictum magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis,', '5.11'),
(7, 'Digoxin', '1.94', 'magna. Praesent interdum ligula eu enim. Etiam imperdiet dictum magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit', '1.7'),
(8, 'Simvastatin', '0.19', 'libero est, congue a, aliquet vel, vulputate eu, odio. Phasellus at', '2.33'),
(10, 'Nowy Produkt', '12', 'Nasz nowy produkt', '432');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`) VALUES
(1, 'Ulla', 'enim.consequat@luctusetultrices.net', 'user'),
(2, 'Zelenia', 'cursus.Nunc@dolor.com', 'user'),
(3, 'Jenna', 'et@urna.com', 'user'),
(4, 'Rose', 'faucibus@sitamet.edu', 'user'),
(5, 'Sade', 'ultrices.posuere@malesuadaiderat.co.uk', 'user'),
(6, 'Carlos', 'magna.Cras@mauris.com', 'user'),
(7, 'Chancellor', 'magnis.dis@tristiquesenectus.net', 'user'),
(8, 'Angela', 'blandit.mattis.Cras@convallis.net', 'user'),
(9, 'Christine', 'placerat.Cras@ipsum.com', 'user'),
(10, 'Bethany', 'Nunc.mauris.sapien@Sednuncest.edu', 'user'),
(11, 'Quintessa', 'nulla@fermentumfermentum.net', 'user'),
(12, 'Elaine', 'arcu.Nunc.mauris@nonegestas.org', 'user'),
(13, 'Macaulay', 'In@Integervulputate.ca', 'user'),
(14, 'Justina', 'at.risus.Nunc@augueidante.net', 'user'),
(15, 'Chloe', 'mi.ac.mattis@nec.com', 'user'),
(16, 'Sheila', 'a.purus@quam.ca', 'user'),
(17, 'Cairo', 'a.magna.Lorem@uteros.co.uk', 'user'),
(18, 'Molly', 'felis@ametanteVivamus.edu', 'user');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
