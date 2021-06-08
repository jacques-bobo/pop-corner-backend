-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 08 juin 2021 à 01:35
-- Version du serveur :  5.7.23
-- Version de PHP :  7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pop_corner`
--

-- --------------------------------------------------------

--
-- Structure de la table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `username` text COLLATE utf8_bin NOT NULL,
  `email` text COLLATE utf8_bin NOT NULL,
  `password` text COLLATE utf8_bin NOT NULL,
  `city` int(11) NOT NULL,
  `vegetarian` tinyint(1) NOT NULL,
  PRIMARY KEY (`customerID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `customers`
--

INSERT INTO `customers` (`customerID`, `username`, `email`, `password`, `city`, `vegetarian`) VALUES
(1, 'jacques', 'jacquesbonnand@yahoo.fr', '1234', 92190, 1),
(2, 'paul', 'test@gmail.com', '1234', 92190, 0),
(3, 'luc', 'bob@gmail.com', '1234', 44000, 0),
(4, 'jaco', 'jacquesbonnand@yahoo.fr', '1234', 92190, 0);

-- --------------------------------------------------------

--
-- Structure de la table `customer_popcorn`
--

DROP TABLE IF EXISTS `customer_popcorn`;
CREATE TABLE IF NOT EXISTS `customer_popcorn` (
  `customerID` int(11) NOT NULL,
  `popcornID` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `customer_midle` (`customerID`),
  KEY `midle_popcorn` (`popcornID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `customer_popcorn`
--

INSERT INTO `customer_popcorn` (`customerID`, `popcornID`, `id`) VALUES
(1, 1, 1),
(3, 1, 4),
(1, 16, 18),
(4, 16, 19);

-- --------------------------------------------------------

--
-- Structure de la table `partners`
--

DROP TABLE IF EXISTS `partners`;
CREATE TABLE IF NOT EXISTS `partners` (
  `partnerID` int(11) NOT NULL AUTO_INCREMENT,
  `username` text COLLATE utf8_bin NOT NULL,
  `email` text COLLATE utf8_bin NOT NULL,
  `password` text COLLATE utf8_bin NOT NULL,
  `city` int(11) NOT NULL,
  PRIMARY KEY (`partnerID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `partners`
--

INSERT INTO `partners` (`partnerID`, `username`, `email`, `password`, `city`) VALUES
(1, 'Au bon petit pain', 'jacquesbonnand92@gmail.com', '1234', 92190),
(2, 'Kebab 15e', 'kab@gmail.com', '1234', 75015);

-- --------------------------------------------------------

--
-- Structure de la table `popcorns`
--

DROP TABLE IF EXISTS `popcorns`;
CREATE TABLE IF NOT EXISTS `popcorns` (
  `popcornID` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_bin NOT NULL,
  `type` text COLLATE utf8_bin NOT NULL,
  `nb_customers` int(11) NOT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `partnerID` int(11) NOT NULL,
  PRIMARY KEY (`popcornID`),
  KEY `partner_popcorn` (`partnerID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `popcorns`
--

INSERT INTO `popcorns` (`popcornID`, `name`, `type`, `nb_customers`, `description`, `partnerID`) VALUES
(1, 'free food', 'vegetarian', 0, 'free meal for everyone', 2),
(15, 'New tacos king gratuit !!', 'tacos', 0, 'This is a new free tacos offer for the first 10 persons to come to our shop !', 1),
(16, 'New tacos king gratuit !!', 'tacos', 2, 'This is a new free tacos offer for the first 10 persons to come to our shop !', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `customer_popcorn`
--
ALTER TABLE `customer_popcorn`
  ADD CONSTRAINT `customer_midle` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `midle_popcorn` FOREIGN KEY (`popcornID`) REFERENCES `popcorns` (`popcornID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `popcorns`
--
ALTER TABLE `popcorns`
  ADD CONSTRAINT `partner_popcorn` FOREIGN KEY (`partnerID`) REFERENCES `partners` (`partnerID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
