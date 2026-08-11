import { subscribe } from 'firebase/data-connect'
import { create } from 'zustand'
import { db } from '../db/firebase'
import { onSnapshot, query } from 'firebase/firestore'

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
    //cancelar inscrição. onsnap
    const unsubscribe = onSnapshot(checkTodos,
        (retornoConsulta) => {
            const todos = retornoConsulta.docs.map((documento) => ({
                id: documento.id,
                ...documento.data(),
            }))
            set({ todos, loading: false })
        },
        (erro) => {
            console.error('Erro ao carregar tarefas:', erro)
            set({
                error: 'Não foi possível carregar as tarefas.' + 'Verifique sua conexão e as credenciais no .env.',
                loading: false
            })


        }
    )
    set({ unsubscribe })

}
}))