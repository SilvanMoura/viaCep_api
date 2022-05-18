const cep = $('#cep')
const logradouro = $('#logradouro')[0];
const bairro = $('#bairro')[0];
const localidade = $('#localidade')[0];
const uf = $('#uf')[0];

const cleanForm = (endereco) =>{
    logradouro.value = '';
    bairro.value = '';
    localidade.value = '';
    uf.value = '';
}

const fillForm = (endereco) =>{
    logradouro.value = endereco.logradouro;
    bairro.value = endereco.bairro;
    localidade.value = endereco.localidade;
    uf.value = endereco.uf;
}

if(cep.html.length <= 1){
    setInterval(() => {
        cep.val().length <= 1 ? cleanForm() : ''
    }, 100);
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
    cleanForm();

    const openModal = ()=>{
        $('.modal-container').removeClass('display-none');
        $('.modal-container').addClass('display-flex');
    }
    
    const newCep = cep.val().replace("-","");
    const url = `https://viacep.com.br/ws/${newCep}/json/`;

    if (cepValido(newCep)){
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')){
            openModal();
            $('.message').html('Não foi possível encontrar o CEP, tente novamente!');

        }else {
            fillForm(endereco);
        }

    }else{
        openModal();
        $('.message').html('CEP incorreto, tente novamente!');
    }
     
}

$('#button').click(pesquisarCep);

$('.close').click(
    ()=>{
        $('.modal-container').toggleClass('display-none');
    }
);