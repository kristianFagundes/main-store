import {usetarefaStore} from '../store/useTarefasStore'

// 
export default function ItemTarefa({ tarefa }) {
    const changesTodos = usetarefaStore((state) => state.todos)
    const deleteTodos = usetarefaStore((state) => state.deleteTodos)

    return (
}