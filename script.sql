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

create table produtos (
    cd int primary key AUTO_INCREMENT,
    nome varchar(100),
    descricao varchar(200),
    valor decimal(10,2),
    foto varchar(100),
    id_categoria int,
    foreign key (id_categoria) references categoria(cd)
);