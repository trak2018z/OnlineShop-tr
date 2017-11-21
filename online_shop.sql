-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 21 Lis 2017, 08:14
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
  `userId` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `items` text CHARACTER SET utf8 NOT NULL,
  `total` varchar(255) CHARACTER SET utf8 NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `orders`
--

INSERT INTO `orders` (`id`, `userId`, `name`, `email`, `items`, `total`, `status`) VALUES
(1, 2, 'user1', 'user1@user.pl', '{\"0\":{\"id\":\"11\",\"name\":\"Banany\",\"weight\":\"0.2\",\"description\":\"S\\u0142odkie o pe\\u0142nym smaku.\",\"price\":\"0.75\",\"qty\":\"1\"}}', '0.75', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `weight` varchar(255) CHARACTER SET utf8  NOT NULL,
  `description` text CHARACTER SET utf8 NOT NULL,
  `price` varchar(255) CHARACTER SET utf8 NOT NULL,
  `thumb` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `products`
--

INSERT INTO `products` (`id`, `name`, `weight`, `description`, `price`, `thumb`) VALUES
(1, 'Banany', '0.2', 'Słodkie o pełnym smaku.', '0.75', 'banan.jpg'),
(2, 'Cytryny', '1', 'Soczyste i orzeźwiające, świetne do napojów', '8.99', 'cytryna.jpg'),
(3, 'Mandarynki', '1', 'Soczyste i aromatyczne o wyrazistym smaku.', '3.99', 'mandarynki.jpg'),
(4, 'Grejpfrut czerwony', '0.4', 'Słodko-kwaśny.', '4.49', 'grejpfrut_czerwony.jpg'),
(5, 'Jabłka', '1', 'Jabłka polskie Ligol lekko kwaśne twarde.', '2.99', 'jablka ligol.jpg'),
(6, 'Gruszka zielona', '1', 'Słodka i soczysta.', '5.90', 'gruszka zielona.jpg'),
(7, 'Winogrona białe', '1', 'Słodkie i chrupiące.', '9.99', 'winogrona biale.jpg'),
(8, 'Winogrona czerwone', '1', 'Winogrona czerwone', '10.99', 'winogrona_rozowe.jpg'),
(9, 'Arbuz', '2', 'Soczysty i orzeźwiający.', '4,99', 'arbuz.jpg'),
(10, 'Melon', '2', 'Słodki orzeźwiający o kremowym miąższu.', '7.99', 'melon.jpg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `role` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `password`) VALUES
(1, 'admin', 'admin@admin.pl', 'admin', '$2y$10$fzR0YsPv20rZGaNkPqGdmOZduAY4pNqpaO1ZwatlguDyNpLoKEpKy'),
(2, 'user1', 'user1@user.pl', 'user', '$2y$10$NvHfLWOvSfMuK2OWZJJ4ruphL8VhspfkCAjOoMe1j5cM7On4oXBD6');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
