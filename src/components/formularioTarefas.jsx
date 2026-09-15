import { useState } from 'react'
import { useTarefasStore } from '../store/useTarefasStore'


export default function formsTodos() {
    const [title, setTitle] = useState('')
    // enviando
    const [sending, setSending] = useState(false)
    const addTodos = useTarefasStore((state) => state.addTodos)

    // async funciona junto com await, que é uma função do javascript que espera a execução de uma função assíncrona. No caso, estou esperando a execução da função addTodos, que é uma função assíncrona que adiciona uma nova tarefa no firebase. Como é uma tarefa que depende de uma resposta do firebase, ela usa o await pra esperar a resposta do firebase antes de continuar a execução do código. 


    // O event.preventDefault() é uma função do javascript que impede o comportamento padrão do formulário, que é recarregar a página. No caso, estou usando o event.preventDefault() pra impedir que a página recarregue quando o usuário clicar no botão de enviar o formulário.

    // enviar
    async function toSendTodos(event) {
        event.preventDefault()
        // .trim() é uma função do javascript que remove os espaços em branco do inicio e do final de uma string.
        if (!title.trim() || sending) return

        setSending(true)
        await addTodos(title)
        setTitle('')
        setSending(false)
    }

    return (
        <form className="formulario-tarefas" onSubmit={toSendTodos}>
            <input
                type="text"
                placeholder="O que você precisa fazer?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
                type="submit"
                className="formulario-tarefas__botao"
                disabled={!title.trim() || sending}>
                {sending ? 'Adicionando...' : 'Adicionar'}
            </button>
        </form>
    )
}