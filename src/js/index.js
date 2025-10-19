const botaoTema = document.getElementById('tema-escuro');
const container = document.getElementById('containerPrincipal');
const body = document.body
const iconeTema = document.querySelector('#tema-escuro img');
const input = document.getElementById('inputTarefa');
const listaTarefas = document.getElementById('listaTarefas');
const mensagemAlerta = document.getElementById('mensagemAlerta');
const contador = document.getElementById('contador');
const btnLimpar = document.getElementById('limparItem');

const tarefas = []

botaoTema.addEventListener('click', () => {
    //Adiciona se não tem, remove se já tem
    body.classList.toggle('tema-escuro');
    container.classList.toggle('tema-escuro')

    iconeTema.src = body.classList.contains('tema-escuro')
    ? './src/imagens/icon-sun.svg'
    : './src/imagens/icon-moon.svg';
});

input.addEventListener('keydown', (event) => {
    //Aqui vai o que acontece quando uma tecla é pressionada
    if (event.key === 'Enter') {
        if(input.value.trim() === '') return;

        if(tarefas.length >=8) {
            mensagemAlerta.style.display = 'block';
            return; //Não adiciona mais
        }

        const tarefa = {
            texto: input.value, //O que o usuário digitou
            feito: false // Se a tarefa está riscada ou não
        };

        tarefas.push(tarefa)//Adicionamos um array
        atualizarLista();
        input.value = ''
    }
});

function atualizarLista() {
    listaTarefas.innerHTML = '';//limpa a lista antes de recriar

    tarefas.forEach((tarefa) => {
        //Aqui dentro, criamos um <li> para cada tarefa
        const li = document.createElement('li');
        li.textContent = tarefa.texto;


        li.addEventListener('click', () => {
            //Aqui vai o que acontece quando a pessoa clica na tarefa
            tarefa.feito = !tarefa.feito;
            atualizarLista();
        });

        if (tarefa.feito) li.classList.add('feito');
        listaTarefas.appendChild(li);
    });

    atualizarContador();
}

function atualizarContador () {
    const total = tarefas.length;// total de tarefas
    const feitas = tarefas.filter(tarefa => tarefa.feito).length;//tarefas feitas
    contador.textContent = `${total} itens | Feitas: ${feitas}`
}

btnLimpar.addEventListener('click', () =>{
    tarefas.length = '';
   atualizarLista();
   mensagemAlerta.style.display = 'none';
});    