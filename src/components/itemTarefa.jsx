import { useTarefasStore } from '../store/useTarefasStore'

// 
export default function ItemTarefa({ todo }) {
    const changesTodos = useTarefasStore((state) => state.changeTodos)
    const deleteTodos = useTarefasStore((state) => state.deleteTodos)

    return (
        /* aqui no class name foi usado uma lógica para adicionar a classe completed caso a tarefa esteja concluída, e caso não esteja concluída, não adiciona a classe completed. Isso é feito usando o operador ternário, que é uma forma de escrever um if else em uma linha.
        item-tarefa é o padrao do componente.
    
        */
              <li type="button" className={`item-tarefa ${todo.completed ? 'completed' : ''}`}>
            <button className="btn-check" onClick={() => changesTodos(todo.id, todo.completed)} aria-label={todo.completed ? 'Marcar como pendente' : 'Marcar como concluída'}>
                {todo.completed ? '✔' : ' '} 
            
            </button>

            <span className="tarefa-title">{todo.title}</span>

            <button type="button" className="btn-delete" onClick={() => deleteTodos(todo.id)} aria-label="Deletar tarefa">Remover</button>

        </li>




    )
}