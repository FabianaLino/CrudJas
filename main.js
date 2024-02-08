'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')


const temporarioCliente = {
    Empresa: "Mia",
    Email: "fabi@lino.com.br",
    Telefone: "11123459789",
    Contato: "Fabiana",
    Laudos: "LTCAT",
    Revisão: "20/01/2025",
    Treinamentos: "Sem treinamento",
    Técnico: "Júnior Santos"
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

//Eventos:    
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)