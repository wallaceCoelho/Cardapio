<?php
header("Acess-Control-Allow-Origin: *");

$conn = new mysqli('localhost', 'root', '', 'sistema');

//LOGIN
if(isset($_GET['email']) && isset($_GET['senha'])) {
    //consulta no banco
    $sql = 'SELECT * FROM user WHERE email ="'.$_GET['email'].'" AND senha ="'.$_GET['senha'].'"';
    $res = $conn -> query($sql);
    
    if($res -> num_rows > 0) {
        $dados['user'] = $res -> fetch_object();//transforma o $res em objeto
        $dados['erro'] = false;
    } else {
        $dados['erro'] = $sql;
    }
    echo json_encode($dados);
}

//CADASTRAR CATEGORIA DE PRODUTOS
if(isset($_POST['nm-cat'])) {

    $sql = 'INSERT INTO categoria (nome) VALUES ("'.$_POST['nm-cat'].'")';
    $res = $conn -> query($sql);

    if($res){
        echo "Cadastrado com sucesso!";
     } else {
        echo "Erro".$conn -> error;
     }
}

//LISTA APRESENTADA DO BANCO DE DADOS DA TABELA CATEGORIA
if(isset($_GET['listar'])){
    $sql = 'SELECT * FROM categoria';
    $res = $conn -> query($sql);
    $dados = [];

    while($categ = $res -> fetch_object()){
        $dados[] = $categ;
    }
    echo json_encode($dados);
}

?>