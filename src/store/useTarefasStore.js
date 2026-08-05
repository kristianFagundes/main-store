import { create } from 'zustand'

export const useTarefasStore = create
// get e set é usado para alterar os objetos (todos, loading, error) da variavel (useTarefaStore)
((get, set) => ({

    todos: [],
    loading: true,
    error: null,
// get só se usa dentro do store. No arquivo app chamo direto a variável
}))