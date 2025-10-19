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
        if (input.value.trim() === '') return;

        if (tarefas.length >= 8) {
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

    tarefas.forEach((tarefa, index) => {
        //Aqui dentro, criamos um <li> para cada tarefa
        const li = document.createElement('li');

        //Span com o texto da tarefa
        const textoTarefa = document.createElement('span');
        textoTarefa.textContent = tarefa.texto;
        textoTarefa.style.cursor = 'pointer';
        if(tarefa.feito) textoTarefa.classList.add('feito');

        //Menu de três pontinhos
        const menu = document.createElement('span');
        menu.textContent = '⋮';
        menu.style.float = 'right';
        menu.style.cursor = 'pointer';

        //Opção de excluir
        const excluir = document.createElement('span');
        excluir.textContent = 'Excluir';
        excluir.style.display = 'none';
        excluir.style.marginLeft = '5px';
        excluir.style.color = 'red';
        excluir.style.cursor = 'pointer';

        //Adiciona tudo no li
        li.appendChild(textoTarefa);
        li.appendChild(menu);
        li.appendChild(excluir);

        //li marcar e desmarcar
        li.addEventListener('click', (e) => {
            if (e.target !== menu && e.target !== excluir) {
                tarefa.feito = !tarefa.feito;
                atualizarLista();
            }
        });

        //Mostrar/ocultar opção excluir 
        menu.addEventListener('click', (e) => {
            e.stopPropagation(); // para não disparar clique no li
            excluir.style.display = excluir.style.display === 'none' ? 'inline' : 'none';
        });

        //Ação de excluir 
        excluir.addEventListener('click', (e) => {
            e.stopPropagation();
            tarefas.splice(index, 1); //remove do array
            atualizarLista();
        });

        listaTarefas.appendChild(li);
    });

    atualizarContador();

    mensagemAlerta.style.display = tarefas.length >= 8 ? 'block' : 'none';
}

function atualizarContador() {
    const total = tarefas.length;// total de tarefas
    const feitas = tarefas.filter(tarefa => tarefa.feito).length;//tarefas feitas
    contador.textContent = `${total} itens | Feitas: ${feitas}`
}

btnLimpar.addEventListener('click', () => {
    tarefas.length = 0;
    atualizarLista();
    mensagemAlerta.style.display = 'none';
});    