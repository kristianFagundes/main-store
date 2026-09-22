import { subscribe } from 'firebase/data-connect'
import { create } from 'zustand'
import { db } from '../db/firebase'
import { onSnapshot, query, collection, addDoc, serverTimestamp, doc, deleteDoc, updateDoc} from 'firebase/firestore'


// Aqui ficam armazenadas todas as funções que serão usadas no app, como adicionar, atualizar e deletar tarefas. Que são dos ZUSTAND e do FIREBASE. O ZUSTAND é uma biblioteca de gerenciamento de estado para React, e o FIREBASE é uma plataforma de desenvolvimento de aplicativos que oferece serviços como banco de dados em tempo real, autenticação e hospedagem.



// faz a conexão com a coleção do firebase, no caso a coleção "todos"
const referenciaColecaoTodos = collection(db, 'todos')

// get e set é usado para alterar os objetos (todos, loading, error) da variavel (useTarefaStore)
// get só se usa dentro do useTarefasStore. No arquivo app chamo direto a variável
export const useTarefasStore = create((set, get) => ({
    //aqui dentro estão todas as tarefas do que serão executadas no app
    todos: [],
    erro: null,
    loading: true,
    unsubscribe: null,
    limparErro: null,


    //inscrever tarefa
    SubscribeTodos: () => {
        set({ loading: true, error: null })
        //consultar tarefa do firebase, e ordena por data de criação
        const checkTodos = query(referenciaColecaoTodos)
        //cancelar inscrição. onsnapshot é uma função do firebase que permite ver alterações em tempo real em uma coleção ou documento.
        const unsubscribe = onSnapshot(checkTodos,
            (retornoConsulta) => {
                // map é uma função do javascript que percorre um array e retorna um novo array com os valores alterados. No caso, estou percorrendo o retorno da consulta e retornando um novo array com os dados das tarefas.
                const todos = retornoConsulta.docs.map((documento) => ({
                    // id é o id do documento no firebase, e data() é uma função do firebase que retorna os dados do documento.
                    id: documento.id,
                    // ...documento.data() é uma função do javascript que retorna todos os dados do documento, e o operador spread (...) é usado para espelhar os dados do documento em um novo objeto.
                    ...documento.data(),
                }))
                set({ todos, loading: false })
            },
            // error é uma função do javascript que é chamada quando ocorre um erro na consulta. No caso, estou setando o estado de error para uma mensagem de erro e setando o estado de loading para false.
            (erro) => {
                console.error('Erro ao carregar tarefas:', erro)
                set({
                    error: 'Não foi possível carregar as tarefas.' + 'Verifique sua conexão e as credenciais no .env.',
                    loading: false,
                })


            }
        )

        set({ unsubscribe })

    },

    //cancelar tarefas. unsubscribe é uma função do firebase que cancela a inscrição em uma coleção ou documento.
    unsubscribeTodos: () => {

        const { unsubscribe } = get();
        if (unsubscribe) unsubscribe()
    },

    // Adicionar nova tarefa
    addTodos: async (title) => {
        // Limpar o título e verificar se está vazio
        const clearTitle = title.trim()
        if (!clearTitle) return

        // try catch é uma função do javascript que é usada para tratar erros. No caso, estou tentando adicionar uma nova tarefa no firebase, e se ocorrer um erro, estou setando o estado de error para uma mensagem de erro.
        try { 
            await addDoc(referenciaColecaoTodos, {
                title: clearTitle,
                completed: false,
                created: serverTimestamp(),

            })
        } catch (erro) {
            console.error('Erro ao adicionar tarefa:', erro)
            set({erro:'Não foi possível adicionar tarefa.'})
        }
    },
    // atualizar tarefa. updateDoc é uma função do firebase que atualiza um documento em uma coleção. 
    // essa parte do codigo é referente a caixa de check que marca a tarefa como concluída ou não concluída. O id é o id do documento no firebase, e completed é o estado da tarefa (concluída ou não concluída).
    changeTodos: async (id, completed) => {
        try {
            const tarefaRef = doc(db, 'todos', id)
            await updateDoc(tarefaRef, { completed: !completed })
        }
        catch (erro) {
            console.error('Erro ao atualizar tarefa:', erro)
            set({ erro: 'Não foi possível atualizar a tarefa.' })
        }       
      
    },

     // deletar tarefa. deleteDoc é uma função do firebase que deleta um documento em uma coleção. O id é o id do documento no firebase.

    deleteTodos: async (id) => {
        try {
            const tarefaRef = doc(db, 'todos', id)
            await deleteDoc(tarefaRef)
        } catch (erro) {
            console.error('Erro ao deletar tarefa:', erro)
            set({ erro: 'Não foi possível deletar a tarefa.' })
        } 
    },
    limparErro: () => set({ erro: null }),
      
}))