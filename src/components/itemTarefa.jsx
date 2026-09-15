import { usetarefaStore } from '../store/useTarefasStore'

// 
export default function ItemTarefa({ tarefa }) {
    const changesTodos = usetarefaStore((state) => state.changeTodos)
    const deleteTodos = usetarefaStore((state) => state.deleteTodos)

    return (
        /* aqui no class name foi usado uma lógica para adicionar a classe completed caso a tarefa esteja concluída, e caso não esteja concluída, não adiciona a classe completed. Isso é feito usando o operador ternário, que é uma forma de escrever um if else em uma linha.
        item-tarefa é o padrao do componente.
    
        */
              <li type="button" className={`item-tarefa ${tarefa.completed ? 'completed' : ''}`}>
            <button className="btn-check" onClick={() => changesTodos(tarefa.id, tarefa.completed)} aria-label={tarefa.completed ? 'Marcar como pendente' : 'Marcar como concluída'}>
                {tarefa.completed ? '✔' : ' '} 
            
            </button>

            <span className="tarefa-title">{tarefa.title}</span>

            <button type="button" className="btn-delete" onClick={() => deleteTodos(tarefa.id)} aria-label="Deletar tarefa">Remover</button>

        </li>




    )
}