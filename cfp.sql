-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.13-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura do banco de dados para cfp
CREATE DATABASE IF NOT EXISTS `cfp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cfp`;


-- Copiando estrutura para tabela cfp.despesa
CREATE TABLE IF NOT EXISTS `despesa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) DEFAULT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `prestacoes` int(11) DEFAULT NULL,
  `dataaquisicao` date DEFAULT NULL,
  `datavencimento` date DEFAULT NULL,
  `ativo` enum('SIM','NAO') DEFAULT 'SIM',
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idusuario` (`idusuario`),
  CONSTRAINT `despesa_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cfp.despesa: ~0 rows (aproximadamente)
DELETE FROM `despesa`;
/*!40000 ALTER TABLE `despesa` DISABLE KEYS */;
INSERT INTO `despesa` (`id`, `idusuario`, `descricao`, `valor`, `quantidade`, `prestacoes`, `dataaquisicao`, `datavencimento`, `ativo`, `datacadastro`, `dataedicao`) VALUES
	(1, 1, 'Tenis', 100.00, 1, 4, '2016-06-30', '2016-10-25', '', '2016-06-30 17:07:20', '2016-10-25 00:00:00');
/*!40000 ALTER TABLE `despesa` ENABLE KEYS */;


-- Copiando estrutura para tabela cfp.despesaparcela
CREATE TABLE IF NOT EXISTS `despesaparcela` (
  `id` int(11) DEFAULT NULL,
  `iddespesa` int(11) DEFAULT NULL,
  `vencimento` int(11) DEFAULT NULL,
  `valor` int(11) DEFAULT NULL,
  KEY `FK_despesaparcela_despesa` (`iddespesa`),
  CONSTRAINT `FK_despesaparcela_despesa` FOREIGN KEY (`iddespesa`) REFERENCES `despesa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='parcelas de cada despesa';

-- Copiando dados para a tabela cfp.despesaparcela: ~0 rows (aproximadamente)
DELETE FROM `despesaparcela`;
/*!40000 ALTER TABLE `despesaparcela` DISABLE KEYS */;
/*!40000 ALTER TABLE `despesaparcela` ENABLE KEYS */;


-- Copiando estrutura para tabela cfp.fluxodespesa
CREATE TABLE IF NOT EXISTS `fluxodespesa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iditemdespesa` int(11) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `iditemdespesa` (`iditemdespesa`),
  CONSTRAINT `fluxodespesa_ibfk_1` FOREIGN KEY (`iditemdespesa`) REFERENCES `despesa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cfp.fluxodespesa: ~0 rows (aproximadamente)
DELETE FROM `fluxodespesa`;
/*!40000 ALTER TABLE `fluxodespesa` DISABLE KEYS */;
/*!40000 ALTER TABLE `fluxodespesa` ENABLE KEYS */;


-- Copiando estrutura para tabela cfp.fluxorecebimento
CREATE TABLE IF NOT EXISTS `fluxorecebimento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idrecebimento` int(11) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idrecebimento` (`idrecebimento`),
  CONSTRAINT `fluxorecebimento_ibfk_1` FOREIGN KEY (`idrecebimento`) REFERENCES `recebimento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cfp.fluxorecebimento: ~0 rows (aproximadamente)
DELETE FROM `fluxorecebimento`;
/*!40000 ALTER TABLE `fluxorecebimento` DISABLE KEYS */;
/*!40000 ALTER TABLE `fluxorecebimento` ENABLE KEYS */;


-- Copiando estrutura para tabela cfp.recebimento
CREATE TABLE IF NOT EXISTS `recebimento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) DEFAULT NULL,
  `descricao` varchar(50) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `dataarrecadacao` date DEFAULT NULL,
  `tipo` enum('UNICO','INDETERMINADO') DEFAULT NULL,
  `ativo` enum('SIM','NAO') DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idusuario` (`idusuario`),
  CONSTRAINT `recebimento_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cfp.recebimento: ~0 rows (aproximadamente)
DELETE FROM `recebimento`;
/*!40000 ALTER TABLE `recebimento` DISABLE KEYS */;
INSERT INTO `recebimento` (`id`, `idusuario`, `descricao`, `valor`, `dataarrecadacao`, `tipo`, `ativo`, `datacadastro`, `dataedicao`) VALUES
	(1, 1, 'Recebimento', 2200.00, '2016-07-01', 'INDETERMINADO', 'SIM', '2016-07-01 08:39:05', NULL);
/*!40000 ALTER TABLE `recebimento` ENABLE KEYS */;


-- Copiando estrutura para tabela cfp.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  `ativo` enum('SIM','NAO') DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cfp.usuario: ~0 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nome`, `usuario`, `senha`, `ativo`, `datacadastro`, `dataedicao`) VALUES
	(1, 'Adelson', 'adelson', '123', 'SIM', '2016-06-30 15:06:39', NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
