DROP DATABASE IF EXISTS escola_teste;
CREATE DATABASE escola_teste;

USE escola_teste;

CREATE TABLE turmas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    capacidade INT NOT NULL
);

CREATE TABLE alunos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    matricula INT NOT NULL,
    turmasId INT,
    FOREIGN KEY (turmasId) REFERENCES turmas(id)
);