import { useTarefasStore } from '../store/useTarefasStore'
import ItemTarefa from './itemTarefa'


export default function ListaTarefa() {
  const todos = useTarefasStore((state) => state.todos)
  const loading = useTarefasStore((state) => state.loading)

  if (loading) {
    return <p className="lista-tarefas__status">Carregando tarefas…</p>
  }

  if (todos.length === 0) {
    return (
      <div className="lista-tarefas__vazia">
        <p>Nenhuma tarefa ainda.</p>
        <span>Adicione a primeira usando o campo acima ↑</span>
      </div>
    )
  }

  return (
    <ul className="lista-tarefas">
      {todos.map((todo) => (
        <ItemTarefa key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
