import React, { useState } from "react";
import axios from 'axios'
import './styles/app.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

let lista: any = []
let listaFixa: any []

const element = <FontAwesomeIcon icon={faChevronDown} />;
const element2 = <FontAwesomeIcon icon={faCircleCheck} />;

function obterListaApi() {
  axios.get('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos').then(resp => {
    console.log('resposta api =>', resp)
    lista = resp.data
    listaFixa = lista
  }).catch(error => {
    console.log('resp error ===>', error)
  })
}

obterListaApi()

export default function App() {
  const [texto, setTexto] = useState('');

  const [tarefas, setArray]= useState([]);

  // function testeArray()
  
  function handleChange(evento: any) {
    setTexto(evento.target.value);
    console.log('teste ver uma coisa')
  }

  function submitText(val: any) {
    console.log('qualquer coisa:', lista, texto)
    if (texto != '') 
      lista.push({id: (lista.length + 1), title:texto, isDone: false})
      listaFixa = lista
    setTimeout(() => setArray(lista), 100)
    setTimeout(() => setTexto(''), 200)
    console.log('array:', tarefas)
  }

  function CountItems(val: any) {
    console.log('contagem de tarefas')
    lista = lista
  }

  function removeItem(id: string) {
    console.log('remove certo', id)
    lista = lista.filter((el: any) => el.id != id)
    listaFixa = lista
    setTimeout(() => setArray(lista), 100)
  }

  function selecionado(bool: boolean) {
    if (bool) return <FontAwesomeIcon style={{margin: '4px'}} icon={faCircleCheck} />
    else return null
  }

  function selecionarFeito(id: string) {
    lista = lista.reduce((arr: any, el: any) => {
      el.isDone = el.id == id ? true : el.isDone
      if (el) arr.push(el)
        return arr
    }, [])
    listaFixa = lista
    setTimeout(() => setArray(lista), 100)
  }

  function classeRisquinho(bool: boolean) {
    return bool ? {margin: 'auto 10px', textDecoration: 'line-through'} : {margin: 'auto 10px'}
  }

  function faltando() {
    lista = listaFixa.filter((el: any) => !el.isDone)
    setTimeout(() => setArray(lista), 100)
  }

  function concluidos() {
    lista = listaFixa.filter((el: any) => el.isDone)
    setTimeout(() => setArray(lista), 100)
  }

  function todos() {
    lista = listaFixa
    setTimeout(() => setArray(lista), 100)
  }

  function limparConcluidos() {
    listaFixa = listaFixa.filter((el: any) => !el.isDone)
    lista = listaFixa
    setTimeout(() => setArray(lista), 100)
  }

  return (
    <section>
      <div style={{display: 'flex', marginTop: '40px'}}>
        <div style={{ textAlign: "center", width: '900px', margin: 'auto' }}>
          <h1 style={{fontSize: '48px'}}>Todos</h1>

          <div style={{padding: '0 30px'}}>
              <div>
                <div className="input-container">
                  <FontAwesomeIcon icon={faChevronDown} className="input-icon"/>
                  <input 
                      type="text" 
                      style={{width: '100%'}} 
                      value={texto} 
                      onChange={handleChange} 
                      className="input-field"
                      placeholder="O que precisa ser feito?" 
                      onBlur={submitText}/>
                </div>

                <div style={{border: '1px solid #000'}}>
                  <div>
                    <div style={{textAlign:'start'}}>
                      {tarefas.map((item:any) => (
                        <div key={item.id} style={{display: "flex", margin: '5px 0', cursor: 'pointer'}} onClick={() => selecionarFeito(item.id)}>
                          {selecionado(item.isDone)}
                          <p style={classeRisquinho(item.isDone)}>{item.title}</p>
                          <div style={{margin: 'auto'}}></div>
                          <button 
                            style={{height: '25px', margin: 'auto 10px'}} 
                            onClick={() => removeItem(item.id)}>
                              Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{margin: '10px 0'}}>
                    <hr />
                      <div style={{display: 'flex'}}>
                        <div style={{margin: 'auto', cursor: 'pointer'}} onClick={() => faltando()}>Itens faltando ({tarefas.filter((el: any) => !el.isDone).length})</div>
                        <div style={{margin: 'auto', cursor: 'pointer'}} onClick={() => todos()}>Todos</div>
                        <div style={{margin: 'auto', cursor: 'pointer'}} onClick={() => concluidos()}>Concluídos</div>
                        <div style={{margin: 'auto', cursor: 'pointer'}} onClick={() => limparConcluidos()}>Limpar concluídos</div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
