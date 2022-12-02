window.onload = function() {
    let url = '../php/api.php';
    
    const btnCadCategoria = document.querySelector('#btn-cadastrar');
    const nome = document.querySelector('#nome');
    const email = document.querySelector('#email');
    const status = document.querySelector('#id-prod');
    const senha = document.querySelector('#passw');

    btnCadCategoria.addEventListener('click', () => {
        let form = new FormData();
        
        form.append('nome', nome.value);
        form.append('email', email.value);
        form.append('id-prod', status.value);
        form.append('passw', passw.value);

        fetch(url, {
            body: form,
            method: 'post'
        })
        .then(function(data){
            return data.text();
        })
        .then(function(data){
            alert(data);
        });
    });
}