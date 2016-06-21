# Host: localhost  (Version: 5.6.24)
# Date: 2016-06-21 16:57:25
# Generator: MySQL-Front 5.3  (Build 5.19)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "fluxorecebimento"
#

DROP TABLE IF EXISTS `fluxorecebimento`;
CREATE TABLE `fluxorecebimento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idrecebimento` int(11) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idrecebimento` (`idrecebimento`),
  CONSTRAINT `fluxorecebimento_ibfk_1` FOREIGN KEY (`idrecebimento`) REFERENCES `recebimento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "fluxorecebimento"
#


#
# Structure for table "usuario"
#

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  `ativo` enum('SIM','NAO') DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "usuario"
#


#
# Structure for table "recebimento"
#

DROP TABLE IF EXISTS `recebimento`;
CREATE TABLE `recebimento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) DEFAULT NULL,
  `descricao` varchar(50) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `diaarrecadacao` int(11) DEFAULT NULL,
  `tipo` enum('UNICO','INDETERMINADO') DEFAULT NULL,
  `ativo` enum('SIM','NAO') DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idusuario` (`idusuario`),
  CONSTRAINT `recebimento_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "recebimento"
#


#
# Structure for table "despesa"
#

DROP TABLE IF EXISTS `despesa`;
CREATE TABLE `despesa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) DEFAULT NULL,
  `dataaquisicao` date DEFAULT NULL,
  `diavencimento` int(11) DEFAULT NULL,
  `prestacoes` int(11) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idusuario` (`idusuario`),
  CONSTRAINT `despesa_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "despesa"
#


#
# Structure for table "itemdespesa"
#

DROP TABLE IF EXISTS `itemdespesa`;
CREATE TABLE `itemdespesa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iddespesa` int(11) DEFAULT NULL,
  `descricao` varchar(50) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `iddespesa` (`iddespesa`),
  CONSTRAINT `itemdespesa_ibfk_1` FOREIGN KEY (`iddespesa`) REFERENCES `despesa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "itemdespesa"
#


#
# Structure for table "fluxodespesa"
#

DROP TABLE IF EXISTS `fluxodespesa`;
CREATE TABLE `fluxodespesa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iditemdespesa` int(11) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `iditemdespesa` (`iditemdespesa`),
  CONSTRAINT `fluxodespesa_ibfk_1` FOREIGN KEY (`iditemdespesa`) REFERENCES `despesa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "fluxodespesa"
#

