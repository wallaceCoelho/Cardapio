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
//CADASTRAR PRODUTOS
else if(isset($_POST['id-cat'])) {

    $destino = '../media/'.$_FILES['foto']['name'];
    $sql = 'INSERT INTO produtos (nome, descricao, valor, foto, id_categoria) 
            VALUES ("'.$_POST['nm-prod'].'", "'.$_POST['descricao'].'", "'.$_POST['valor'].'", "'.$destino.'", "'.$_POST['id-cat'].'")';
    
    if(move_uploaded_file($_FILES['foto']['tmp_name'], $destino)){
        $res = $conn -> query($sql);
    
        if($res){
            echo "Cadastrado com sucesso!";
        } else {
            echo "Erro".$conn -> error;
        }
    } else {
        echo "Erro ao salvar foto!";
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

if(isset($_GET['listarProduto'])){
    $sql = 'SELECT * FROM produtos';
    $res = $conn -> query($sql);
    $dados = [];

    while($categ = $res -> fetch_object()){
        $dados[] = $categ;
    }
    echo json_encode($dados);
}

?>