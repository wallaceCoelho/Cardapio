create database sistema;
use sistema;
CREATE TABLE user (
    cd INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(20),
    status VARCHAR(20)
);

insert into user values (null, "Wallace", "wacoelho.dev@gmail.com", '12345', 'on');

create table categoria(
    cd int primary key AUTO_INCREMENT,
    nome varchar(100)
);