window.onload = function (){
    
    const entrar = document.querySelector('#entrar');

    entrar.addEventListener('click', function() {
        const login = document.querySelector('#login');
        const senha = document.querySelector('#senha');
        
        let url = 'php/api.php?login='+login.value+'&senha='+senha.value;

        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(function (json){
                console.log(json.user);
                //Ação
                if(json.erro){
                    alert('Usuário e/ou senha inválidas.');
                } else {
                    localStorage.setItem('nome', json.user.nome);

                    window.location = 'pages/adm.html';
                }
            })
            .catch();
    })
}