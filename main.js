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
//Delete (Função que irá deletar os dados do cliente):
const deleteCliente = (cliente) => {
        const dadosCliente = readCliente()
        dadosCliente.splice(index, 1)
        setLocalStorage(dadosCliente)
}

//Update (Função que irá receber e carregar os novos dados do cliente):
const updateCliente = (index, cliente) => {
    const dadosCliente = readCliente()
    dadosCliente[index] = cliente
    setLocalStorage(dadosCliente)
}

//Read (Função que irá ler os dados do cliente):
const readCliente = () => getLocalStorage()

//Create (Função que irá enviar os dados do cliente):
const createCliente  = (cliente) => {
    const dadosCliente = getLocalStorage()
    dadosCliente.push (cliente)
    setLocalStorage(dadosCliente)
    
}

//Interação com o usuário:
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
        closeModal()
        
    }
}

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
            <button type="button" class="button green">editar</button>
            <button type="button" class="button red">excluir</button>
        </td> 
    `
    document.querySelector('#tableCliente tbody').appendChild(newLinha)
}

const carregarDados = () => {
    const dadosCliente = readCliente()
    dadosCliente.forEach(createLinha)
}     

carregarDados()


//Eventos:    
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveCliente)