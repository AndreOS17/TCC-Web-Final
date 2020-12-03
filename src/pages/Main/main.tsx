import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header/header';
import api from '../../services/api';
import './main.css';

function Main() {

  const [time, setTime] = useState(Number);
  const [repeat, setRepeat] = useState(Number);
  const [name, setName] = useState(String);

  const history = useHistory();

  async function createAnalyze(e: FormEvent) {
    e.preventDefault();
    const tempo = time * repeat + repeat * 10;
    await api.post('analises', { tempo, type: name, data: "2020-09-12" })
      .then(() => {
        alert('Análise Criada!');
        history.push(`/loading/${tempo}`);
      }).catch(() => {
        alert('Erro na criação da Análise!');
      });
  }

  return (
    <div id="mainPage" className="container">
      <Header />
      <main className="content">
        <div className="start">
          <form onSubmit={createAnalyze}>
            <h1>Dados</h1>

            <hr className="line" />

            <label htmlFor="">Tipo de Análise</label>
            <input className="TypeInput" type="text" placeholder="ex. 'Análise de Cromatos'" name="type" id="type"
              value={name} onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <div className="inputs">

              <div className="QA">
                <label htmlFor="quantity">Número de análises</label>
                <input type="number" placeholder="Quantas análises?" name="quantity" id="quantity"
                  value={repeat} onChange={(e) => {
                    if (Number(e.target.value) >= 0 && Number(e.target.value) <= 10) {
                      setRepeat(Number(e.target.value));
                    }
                  }}
                />
              </div>

              {/* <br /><br /> */}

              <div className="TA">
                <label htmlFor="time">Tempo de análise (Segundos)</label>
                <input type="number" min={0} max={600} name="time" id="time"
                  value={time} onChange={(e) => {
                    if (Number(e.target.value) >= 0 && Number(e.target.value) <= 600) {
                      setTime(Number(e.target.value));
                    }
                  }}
                />
              </div>
            </div>
            <button type="submit" className="button" >Iniciar Análise</button>
          </form>

          <div className="Link">
            <p>Ou veja a
              <Link to='/all'> listagem de análises</Link>
            </p>
          </div>

        </div>
      </main>
    </div >
  );
}

export default Main;