import { subscribe } from 'firebase/data-connect'
import { create } from 'zustand'
import { db } from '../db/firebase'
import { onSnapshot, query, collection, addDoc } from 'firebase/firestore'

// faz a conexão com a coleção do firebase, no caso a coleção "todos"
const referenciaColecaoTodos = collection(db, 'todos')

// get e set é usado para alterar os objetos (todos, loading, error) da variavel (useTarefaStore)
// get só se usa dentro do useTarefasStore. No arquivo app chamo direto a variável
export const useTarefasStore = create((get, set) => ({
    //aqui dentro estão todas as tarefas do que serão executadas no app
    todos: [],
    loading: true,
    error: null,
    unsubscribe: null,



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

    unsubscribeTodos: () => {

        const { unsubscribe } = get()
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
    }

}))