window.onload = function() {

    let url = '../php/api.php';  
    const cat = document.querySelector('#id-cat');

    UpdateTable();

    function UpdateTable(){
        //BUSCAR OS REGISTROS
        fetch(url + '?listar')
        .then(function(data){
            return data.json();
        })
        .then(function(data){
            // console.table(data);
            const tab = document.querySelector('#listaCategoria');   
            let linha = '';
            
            //CRIANDO AS LINHAS DA TABELA, UMA POR VEZ
            for (i = 0; i < data.length; i++){
                linha += '<option value="'+data[i].cd+'">';
                linha += data[i].nome;
                linha += '</option>';
            }
            
            //INSERINDO LINHAS NA TABELA
            cat.innerHTML = linha;
        });
    }

    // INSERIR PRODUTO NO BANCO DE DADOS
    const btnProduto = document.querySelector("#btn-produto");
    const nmProd = document.querySelector('#nm-prod');
    const valor = document.querySelector('#valor');
    const foto = document.querySelector('#foto');
    const desc = document.querySelector('#descricao');
    const id_cat = document.querySelector('#id-cat');

    btnProduto.addEventListener('click', () => {
        let form = new FormData();
        
        form.append('nm-prod', nmProd.value);
        form.append('valor', valor.value);
        form.append('foto', foto.files[0]);// fazer upload da foto
        form.append('descricao', desc.value);
        form.append('id-cat', id_cat.value);

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

    // MECANISMO DE BUSCA
    const search = document.getElementById("search");
    search.addEventListener('keyup', () => {
        Search();
    })

    function Search() {
        // Declare variables
        let input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        table = document.getElementById("listaProdutos");
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
}