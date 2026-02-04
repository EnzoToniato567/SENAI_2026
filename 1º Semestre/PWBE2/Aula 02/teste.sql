DROP DATABASE IF EXISTS teste;

CREATE DATABASE teste;

USE teste;

CREATE TABLE lista (
	id INT AUTO_INCREMENT PRIMARY KEY, 
    item VARCHAR(50) NOT NULL UNIQUE,
	valor DECIMAL(5, 2) NOT NULL
);

INSERT INTO lista (item, valor)
VALUE ("Item 1", 10.50);

INSERT INTO lista (item, valor)
VALUE ("Item 2", 156.89);