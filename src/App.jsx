import { useState } from 'react'
// esse db é uma variável vindo do arquivo do firebase,js
import { db } from './db/firebase'
import { doc, deleteDoc, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { create } from 'zustand'
import { useTarefasStore } from './store/useTarefasStore';
import './style.css'

function App() {

  const { subscribeTodos, loading, error, setLoading } = useTarefasStore

  return (
    <div className="app-container">
      {/*  fragmento <> </> envolve o componente sem alterar a estilização */}

      {/* todo componente dentro do html fica com a primeira letra maiuscula ex.: <Todoslista/> */}

      {/* para por uma classe no react se usa className */}

      <header>
        <h1 className="hero-title">Lista de Tarefas</h1>
        <nav className='hero-nav'>
          <button className='btn-nav' onClick>Cancelar Tarefas</button>
          <button className='btn-nav' onClick>Buscar Tarefas</button>
          <button className='btn-nav' onClick>Deletar Tarefas</button>
        </nav>


      </header>
      <main>
        <input className = "input-text" type="text" />
        <input className='btn-nav' type="submit" value="Add" />
      </main>

    </div>

  )
}

export default App;

