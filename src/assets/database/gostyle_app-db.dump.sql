/* CREATE DATABASE  IF NOT EXISTS `gostyle_app-db` */
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gostyle_app-db
-- ------------------------------------------------------
-- Server version	8.0.23

--
-- Table structure for table `coupon`
--

CREATE TABLE IF NOT EXISTS `coupon` (
  `id` INTEGER PRIMARY KEY,
  `description` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `validUntil` datetime NOT NULL,
  `coupon` varchar(255) NOT NULL
);

--
-- Table structure for table `historic`
--

CREATE TABLE IF NOT EXISTS `historic` (
  `couponId` INTEGER NOT NULL,
  `scannedAt` datetime NOT NULL,
  `lastScanned` datetime NOT NULL,
  `scannedBy` INTEGER DEFAULT NULL,
  PRIMARY KEY (`couponId`, `scannedBy`),
  FOREIGN KEY (`scannedBy`) REFERENCES `user` (`id`),
  FOREIGN KEY (`couponId`) REFERENCES `coupon` (`id`)
);
--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` INTEGER PRIMARY KEY,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
);

-- Dump completed on 2021-03-30 10:48:40

-- DATA FIXTURES (TO REMOVE IN PROD)

-- User Fixtures (only for relation with history)
INSERT or IGNORE INTO user(id, username, password) VALUES (1, 'test', 'test');
INSERT or IGNORE INTO user(id, username, password) VALUES (2, 'admin', 'pass');
INSERT or IGNORE INTO user(id, username, password) VALUES (3, 'user', '123');

-- Coupon Fixtures
INSERT OR IGNORE INTO coupon(id,description,brand,validUntil,coupon) VALUES (1, 'Remise 25% sur tout le magasin. Voir conditions générales du coupon.', 'H&M', '2021-03-31', 'http://gostyle-api.example.com/storage/coupon/8486ad15-7127-4715-b3d2-31c5ce3aec79');
INSERT OR IGNORE INTO coupon(id,description,brand,validUntil,coupon) VALUES (2, '10€ sur la gamme Carrefour Discount. Hypermarché et Supermarché Carrefour', 'Carrefour', '2021-05-15', 'http://gostyle-api.example.com/storage/coupon/90c4d44d-79d2-4e8f-9e71-a40f18170e8e');
INSERT OR IGNORE INTO coupon(id,description,brand,validUntil,coupon) VALUES (3, '5€ à valoir pour un montant minimum de 100€ d''achats (hors promotions en cours, non cumulable avec une remise du même type).', 'Bershka', '2021-06-07', 'http://gostyle-api.example.com/storage/coupon/6f084c34-5411-44bf-bf16-6396830ca8f4');
INSERT OR IGNORE INTO coupon(id,description,brand,validUntil,coupon) VALUES (4, '25% de bonus sur le rachat de vos jeux, offert en bons d''achats (pour un maximum de 10€ supplémentaire, uniquement sur des jeux de moins de 3 mois acheté dans un Micromania partenaire)', 'Micromania', '2021-04-22', 'http://gostyle-api.example.com/storage/coupon/020a3c13-7d03-470c-91dc-643482b6907e');

-- Historic Fixtures

INSERT OR IGNORE INTO historic(couponId, scannedAt, lastScanned, scannedBy) VALUES (1, '2021-01-01', '2021-01-01', 1);
INSERT OR IGNORE INTO historic(couponId, scannedAt, lastScanned, scannedBy) VALUES (3, '2021-02-01', '2021-02-02', 1);
INSERT OR IGNORE INTO historic(couponId, scannedAt, lastScanned, scannedBy) VALUES (2, '1999-01-01', '2021-01-01', 1);
INSERT OR IGNORE INTO historic(couponId, scannedAt, lastScanned, scannedBy) VALUES (4, '2021-01-01', '2021-01-01', 2);
