CREATE DATABASE sql_lint_test;

USE sql_lint_test;

DROP TABLE IF EXISTS sql_lint_test.`teams`;

CREATE TABLE sql_lint_test.`teams` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `team` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
