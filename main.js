'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearCampos()
    document.getElementById('modal').classList.remove('active')
} 

const getLocalStorage = () => JSON.parse(localStorage.getItem('dadosCliente')) ?? []
const setLocalStorage = (dadosCliente) => localStorage.setItem('dadosCliente', JSON.stringify(dadosCliente))


//  CRUD - CREATE READ UPDAE DELETE
//Create (Função que irá enviar os dados do cliente):
const createCliente  = (cliente) => {
    const dadosCliente = getLocalStorage()
    dadosCliente.push (cliente)
    setLocalStorage(dadosCliente)
    
}

//Read (Função que irá ler os dados do cliente):
const readCliente = () => getLocalStorage()

//Update (Função que irá receber e carregar os novos dados do cliente):
const updateCliente = (index, cliente) => {
    const dadosCliente = readCliente()
    dadosCliente[index] = cliente
    setLocalStorage(dadosCliente)
}

//Delete (Função que irá deletar os dados do cliente):
const deleteCliente = (cliente) => {
        const dadosCliente = readCliente()
        dadosCliente.splice(index, 1)
        setLocalStorage(dadosCliente)
}

//Interação com o usuário:
//Traz os campos vazios, verifica se os campos foram preenchidos de forma valida e salva cliente com os dados preenchidos:
const camposValidos = () => {
    return document.getElementById('form').reportValidity()
}

const clearCampos = () => {
    const campos = document.querySelectorAll('.modal-campos')
    campos.forEach(campo => campo.value = "") 
}

const saveCliente = ()=> {
    if (camposValidos()){
        const cliente = {
        empresa: document.getElementById('empresa').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        contato: document.getElementById('contato').value,
        laudos: document.getElementById('laudos').value,    
        revisao: document.getElementById('revisao').value,
        treinamentos: document.getElementById('treinamentos').value,
        responsavel: document.getElementById('responsavel').value
        }
        createCliente(cliente)  
        carregarDados()
        closeModal()
        
    }
}

//Cria uma nova linha para baixo, a cada novo cliente cadastrado e traz os dados preenchidos do novo cliente:
const createLinha = (cliente) => {
    const newLinha = document.createElement('tr')
    newLinha.innerHTML = `
        <td>${cliente.empresa}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.contato}</td>
        <td>${cliente.laudos}</td>
        <td>${cliente.revisao}</td>
        <td>${cliente.treinamentos}</td>
        <td>${cliente.responsavel}</td>
        <td> 
            <button type="button" class="button green" id="edit">Editar</button> 
            <button type="button" class="button red" id="delete">Excluir</button>
        </td> 
    `
    document.querySelector('#tableCliente tbody').appendChild(newLinha)
}

const clearTable = () => {
    const linhas = document.querySelectorAll('#tableCliente tbody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha))
}

const carregarDados = () => {
    const dadosCliente = readCliente()
    clearTable()
    dadosCliente.forEach(createLinha)
}     

carregarDados()

//Aqui poderia ser adicionado um (data-action) na linha (button) do (td) acima, para destinguir qual botão está sendo chamando.
//Mas optei por adicionar um id= para cada um deles (id="edit" / id="delete")
const editarDeletar = (evento) => {
    if (evento.target.type == 'button') {
        console.log (evento.target.id)
    }
    
}

//Eventos:    
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveCliente)

document.querySelector('#tableCliente tbody')    
    .addEventListener('click', editarDeletar)
