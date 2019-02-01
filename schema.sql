CREATE DATABASE sql_lint_test;

USE sql_lint_test;

DROP TABLE IF EXISTS sql_lint_test.`city`;

CREATE TABLE sql_lint_test.`city` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;


INSERT INTO sql_lint_test.city VALUES
(1, 'Koowno'),
(2, 'Wilna'),
(3, 'Smorgoni'),
(4, 'Moiodexno'),
(5, 'Gloubokoe'),
(6, 'Minsk'),
(7, 'Studienska'),
(8, 'Polotzk'),
(9, 'Bobr'),
(10, 'Witebsk'),
(11, 'Orscha'),
(12, 'Mohilow'),
(13, 'Smolensk'),
(14, 'Dorogobouge'),
(15, 'Wixma'),
(16, 'Chjat'),
(17, 'Mojaisk'),
(18, 'Moscou'),
(19, 'Tarantino'),
(20, 'Malo-Jarosewii');"
