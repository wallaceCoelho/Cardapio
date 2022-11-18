window.onload = function (){
    
    const entrar = document.querySelector('#entrar');

    entrar.addEventListener('click',  function() {
        const login = document.querySelector('#email');
        const senha = document.querySelector('#senha');
        
        let url = '../php/api.php?email='+login.value+'&senha='+senha.value;

        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(function (json){
                //Ação
                if(json.erro){
                    alert('Usuário e/ou senha inválidas.');
                } else {
                    localStorage.setItem('nome', json.user.nome);

                    window.location = '../pages/adm.html';
                }
            })
            .catch();
    })
}