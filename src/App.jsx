import { useEffect } from 'react'
// esse db é uma variável vindo do arquivo do firebase,js
import { db } from './db/firebase'
import { doc, deleteDoc, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { create } from 'zustand'
import { useTarefasStore } from './store/useTarefasStore';

import './style.css'
import Cabecalho from './components/cabecalho';
import ListaTarefa from './components/listaTarefa';
import FormularioTarefas from './components/formularioTarefas';

export default function App() {

  const { todos,erro,limparErro, SubscribeTodos, unsubscribeTodos,  } = useTarefasStore()

  useEffect(() => {
    SubscribeTodos()
    return () => unsubscribeTodos()
  }, [SubscribeTodos, unsubscribeTodos])

  const completedTodos = todos.filter((todo) => todo.completed).length


  return (
    <div className="aplicativo">
      {/*  fragmento <> </> envolve o componente sem alterar a estilização */}

      {/* todo componente dentro do html fica com a primeira letra maiuscula ex.: <Todoslista/> */}

      {/* para por uma classe no react se usa className */}
      <div className="aplicativo__cartao">
      <Cabecalho total={todos.length} concluidas={completedTodos}/>

      { erro && (
        <div className='aplicativo__erro' role="alert">
          <span>{erro}</span>
          <button type='button' onClick={limparErro} aria-label='fechar aviso'>x</button>
        </div>
      )}

      <FormularioTarefas/>
      <ListaTarefa/>
      </div>
       <p className="aplicativoo__rodape">
        Projeto didático - React - Zustand + Firebase Firestore
       </p>
     </div>

    
  )
}



