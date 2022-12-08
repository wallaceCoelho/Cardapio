let url = '../php/api.php';


//BUSCAR OS REGISTROS PRIMEIRO DROPDOWN
fetch(url + '?listar')
    .then(function(data){
        return data.json();
    })
    .then(function(data){   
        const cat = document.querySelector('#categoria');
        let linha = '<option>Categorias</option>';
        
        //CRIANDO AS LINHAS DA TABELA, UMA POR VEZ
        for (i = 0; i < data.length; i++){;
            linha += '<option value="'+data[i].cd+'">';
            linha += data[i].nome;
            linha += '</option>';
        }
        
        //INSERINDO LINHAS NA TABELA
        cat.innerHTML = linha;

    });

// DROPDOWN PRODUTOS
fetch(url + '?listarProduto')
    .then(function(data){
        return data.json();
    })
    .then(function(data){
        const tab = document.querySelector('#produto');
        let linha = '<option>Produtos</option>';
    
        //CRIANDO AS LINHAS DA TABELA, UMA POR VEZ
        for (i = 0; i < data.length; i++){;
            linha += '<option value="'+data[i].cd+'">';
            linha += data[i].nome;
            linha += '</option>';
        }
        
            //INSERINDO LINHAS NA TABELA
        tab.innerHTML = linha;
    });

const categ = document.querySelector('#categoria');

categ.addEventListener('change', function(e) {

    codCategoria = e.target.value;

    fetch(url + '?listarProduto=' + codCategoria)
        .then(function(data){
            return data.json();
        })
        .then(function(data){
            const tab = document.querySelector('#produto');
            let linha = '<option>Produtos</option>';
         
            //CRIANDO DROPDOWN, UMA POR VEZ
            for (i = 0; i < data.length; i++){;
                linha += '<option nome="' + data[i].nome + '" valor="' + data[i].valor + '" foto="' + data[i].foto + '" value="' + data[i].cd + '">';
                linha += data[i].nome;
                linha += '</option>';
            }
            
            //INSERINDO LINHAS NA TABELA
            tab.innerHTML = linha;
        });
})

const btnAdd = document.querySelector('#btnAdd');
const quant = document.querySelector('#quant');
const obs = document.querySelector('#obs');
const produto = document.querySelector('#produto');
const resumo = document.querySelector('#resumo');

btnAdd.addEventListener('click', function() {

    let url = 'http://localhost/cardapio';
    
    let foto = url + produto.options[produto.selectedIndex].getAttribute('foto');
    let nome = produto.options[produto.selectedIndex].getAttribute('nome');
    let valor = produto.options[produto.selectedIndex].getAttribute('valor');
  
    let item = '<tr class="align-middle">';
        item += '<td><img src="' + foto + '" width="10px"></td>';
        item += '<td>' + nome + '</td>';
        item += '<td>' + quant.value +'</td>';
        item += '<td>' + obs.value +'</td>';
        item += '<td>' + valor +'</td>';
        item += '<td>' + (quant.value * parseFloat(valor)) +'</td>';
        item += '<td>' + obs.value +'</td>';
        item += '</tr>';

        AddItem(produto.value, nome, quant.value, obs.value, foto, valor);
        resumo.innerHTML += item;
})

function AddItem(cd, nome, qts, obs, foto, valor){
    let novo = {
        cd: cd,
        nome: nome,
        qts: qts,
        obs: obs,
        valor: valor,
        foto: foto
    };

    let dados = localStorage.pedido;
    if (!dados){
        dados = [];
    } else {
        dados = JSON.parse(dados);
    }   

    let total = dados.length;
    let existe = false;

    for (let i = 0; i < total; i++){

        if (dados[i].cd == novo.cd){
            let atual = parseInt(dados[i].qts);
            let nova = parseInt(novo.qts);
            dados[i].qts = nova + atual;
            existe = true;
        }
    }

    if (!existe){
        dados.push(novo);
    }

    localStorage.setItem('pedido', JSON.stringify(dados));

    let form = new FormData();
    form.append('produto', produto);

    fetch(url, {
        body: form,
        method: 'post'
        })
        .then(function(dados){
            return dados.text();
        })
        .then(function(dados){
            alert(dados);
        });
}
//CARREGAMENTO
window.onload = function() {
    let dados = localStorage.pedido;
    let resumo = document.querySelector('#resumo');

    if(dados){
        dados = JSON.parse(dados);
        let total = dados.length;
        let item = '';

        for(let i = 0; i < total; i++){
            item += '<tr class="align-middle">';
            item += '<td><img src="' + dados[i].foto + '" width="100%"></td>';
            item += '<td>' + dados[i].nome + '</td>';
            item += '<td>' + dados[i].qts + '</td>';
            item += '<td>' + dados[i].obs + '</td>';
            item += '<td>' + dados[i].valor +'</td>';
            item += '<td>' + (parseFloat(dados[i].qts) * parseFloat(dados[i].valor)) + '</td>';
            item += '<td><button class="btn btn-primary" id="btn-excluir">Excluir</button></td>';
            item += '</tr>';
        }
        resumo.innerHTML += item;
    }
    const btnExcluir = document.querySelector('#btn-excluir');

    btnExcluir.addEventListener('click', function(){
        let dados = localStorage.pedido;
        if (!dados){
            dados = [];
        } else {
            dados = JSON.parse(dados);
        }   
    
        let total = dados.length;
    
        for (let i = 0; i < total; i++){
    
            if (dados[i].qts > 0){
                let atual = parseInt(dados[i].qts);
                dados[i].qts = atual - 1;
            }
        }
        localStorage.setItem('pedido', JSON.stringify(dados));
    })
};


