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

create table pedido (
    cd int primary key AUTO_INCREMENT,
    data date,
    total decimal(10,2)
);

create table item (
    id_produto int,
    id_pedido int,
    qt_produto int,
    obs_produto varchar(100) null,
    foreign key (id_produto) references produtos (cd),
    foreign key (id_pedido) references pedido (cd)

);