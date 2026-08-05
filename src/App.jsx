import { useState } from 'react'
// esse db é uma variável vindo do arquivo do firebase,js
import { db } from './db/firebase'
import { doc, deleteDoc, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { create } from 'zustand'
import { useTarefasStore } from './store/useTarefasStore';
import './style.css'

function App() {

  const {subscribeTodos, loading, error, setLoading} = useTarefasStore 

  return (
    <>
    {/*  fragmento <> </> envolve o componente sem alterar a estilização */}

    {/* todo componente dentro do html fica com a primeira letra maiuscula ex.: <Todoslista/> */}

   {/* para por uma classe no react se usa className */}

    <header>
      <h1 className="hero-title">Lista de Tarefas</h1>
    </header>
    <main>
      <input type="text"/>
      <input type="submit" value="Add"/>
    </main>

   </>
   
  )
}

export default App;

    {/*
     if ternário:

     condição antes do ? é a condição que vai ser testada, se for true executa o que está depois do ? e antes do : , se for false executa o que está depois do :

     error !== null ? <p>Carregando...</p> : error ? <p>{error}</p> : <TodosLista/>

    
    
    */}
