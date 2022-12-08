<?php
header("Acess-Control-Allow-Origin: *");

$conn = new mysqli('localhost', 'root', '', 'sistema');

//LOGIN
if(isset($_GET['login']) && isset($_GET['senha'])) {
    //consulta no banco
    $sql = 'SELECT * FROM user WHERE email="'.$_GET['login'].'" AND senha="'.$_GET['senha'].'"';
    $res = $conn -> query($sql);
    
    if($res -> num_rows > 0) {
        $dados['user'] = $res -> fetch_object();//transforma o $res em objeto
        $dados['erro'] = false;
    } else {
        $dados['erro'] = $sql;
    }
    echo json_encode($dados);
}

// CADASTRO USUÁRIO
else if(isset($_POST['email']) && isset($_POST['passw']) && $_POST['id-prod'] != 'Status'){ 

    $sql = 'INSERT INTO user (nome, email, senha, status) 
            VALUES ("'.$_POST['nome'].'", "'.$_POST['email'].'", "'.$_POST['passw'].'", "'.$_POST['id-prod'].'")';
    $res = $conn -> query($sql);

    if($res){
        echo "Cadastrado com sucesso!";
        } else {
        echo "Erro".$conn -> error;
        }
}

//CADASTRAR CATEGORIA DE PRODUTOS
else if(isset($_POST['nm-cat'])) {

    $sql = 'INSERT INTO categoria (nome) VALUES ("'.$_POST['nm-cat'].'")';
    $res = $conn -> query($sql);

    if($res){
        echo "Cadastrado com sucesso!";
     } else {
        echo "Erro".$conn -> error;
     }
}

//CADASTRAR PEDIDOS
else if(isset($_POST['produto'])) {

    $sql = 'INSERT INTO item (id_produto, id_pedido, qt_produto) VALUES ("'.$_POST['nm-cat'].'")';
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

//LISTA DE PRODUTOS
if(isset($_GET['listarProduto'])){
    $sql = 'SELECT * FROM produtos';

    if ($_GET['listarProduto'] > 0){
        $sql .= ' WHERE id_categoria ='.$_GET['listarProduto'];
    }
    $res = $conn -> query($sql);
    $dados = [];

    while($categ = $res -> fetch_object()){
        $dados[] = $categ;
    }
    echo json_encode($dados);
}

// EXCLUIR CATEGORIA DE PRODUTO
if(isset($_GET['delCategoria'])){
    $sql = 'DELETE FROM categoria WHERE cd='.$_GET['delCategoria'];
    $res = $conn -> query($sql);

    if($res){
        echo "Excluído com sucesso!";
    } else {
        echo "Erro ao excluir: \n\nExistem produtos vínculados";
    }
}
?>