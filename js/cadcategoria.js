let url = '../php/api.php';

UpdateTable();

const btnCadCategoria = document.querySelector('#btn-cadCategoria');
const nmCat = document.querySelector('#nm-cat');

btnCadCategoria.addEventListener('click', function(){
    let form = new FormData();
    form.append('nm-cat', nmCat.value);

    fetch(url, {
        body: form,
        method: 'post'
        })
        .then(function(data){
            return data.text();
        })
        .then(function(data){
            alert(data);
            UpdateTable();
        });
});

function UpdateTable(){
    //BUSCAR OS REGISTROS
    fetch(url + '?listar')
        .then(function(data){
            return data.json();
        })
        .then(function(data){
            // console.table(data);
            let tab = document.querySelector('#listaCategoria');   
            console.log(tab);
            let linha = '';
            
            //CRIANDO AS LINHAS DA TABELA, UMA POR VEZ
            for (i = 0; i < data.length; i++){
                linha += '<tr>';
                linha += '<td>' + data[i].cd + '</td>';
                linha += '<td>' + data[i].nome + '</td>';
                linha += '<td></td>';
                linha += '<td><button class="btn btn-secondary" onclick="Excluir(this)" value="' + data[i].cd + '">Excluir</button></td>';
                linha += '<tr>';
            }
        //INSERINDO LINHAS NA TABELA
        tab.innerHTML = linha;
    });
}

const search = document.getElementById("search");
search.addEventListener('keyup', () => {
    Search();
})

function Search() {
    // Declare variables
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("listaCategoria");
    tr = table.getElementsByTagName("tr");
    
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function Excluir(e) {
    fetch (url + '?delCategoria=' + e.value)
        .then(function(data){
            return data.text();
        })
        .then(function(data){
            alert(data);
            UpdateTable();
        });
}