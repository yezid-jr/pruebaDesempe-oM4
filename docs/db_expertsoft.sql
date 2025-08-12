CREATE DATABASE ExpertSoft;
USE ExpertSoft;

--
-- Table structure for table `estado_transaccion`
--
DROP TABLE IF EXISTS `estado_transaccion`;
CREATE TABLE `estado_transaccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

--
-- Dumping data for table `estado_transaccion`
--
LOCK TABLES `estado_transaccion` WRITE;
INSERT INTO `estado_transaccion` VALUES
(1,'Pendiente'),
(2,'Fallida'),
(3,'Completada');

--
-- Table structure for table `clientes`
--
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero_identificacion` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `telefono` varchar(100) DEFAULT NULL,
  `correo_electronico` varchar(200) DEFAULT NULL,
  `plataforma_utilizada` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

--
-- Table structure for table `transacciones`
--
DROP TABLE IF EXISTS `transacciones`;
CREATE TABLE `transacciones` (
  `id` VARCHAR(100) NOT NULL,
  `fecha_hora` datetime DEFAULT NULL,
  `monto` int(11) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `tipo` varchar(100) DEFAULT NULL,
  `id_estado` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_id_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado_transaccion` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);


--
-- Table structure for table `facturas`
--
DROP TABLE IF EXISTS `facturas`;
CREATE TABLE `facturas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(100) NOT NULL,
  `periodo` varchar(200) DEFAULT NULL,
  `monto` int(11) NOT NULL,
  `monto_pagado` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_transaccion` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_facturas_clientes` (`id_cliente`),
  KEY `fk_facturas_transacciones` (`id_transaccion`),
  CONSTRAINT `fk_facturas_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_facturas_transacciones` FOREIGN KEY (`id_transaccion`) REFERENCES `transacciones` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);
