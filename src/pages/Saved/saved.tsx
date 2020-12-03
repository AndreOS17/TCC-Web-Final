import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

import Header from '../../components/Header/header';
import api from '../../services/api';

import './saved.css';

interface AnalyzeModel {
  ID: number;
  data: string;
  time: number;
  type: string;
}

export default function Saved() {
  const location = useLocation();

  const id = Number(location.pathname.split("/")[2]);

  const [analysis, setAnalysis] = useState([]);

  async function getAnalysis() {
    const response = await api.get("/analises");

    setAnalysis(response.data);
  }

  function FindByID(id: number) {
    const allAnalysis: AnalyzeModel[] = analysis;

    const analyzeInList = allAnalysis.find(e => {
      if (e.ID === id) {
        return e;
      }
    });

    return analyzeInList;
  }

  useEffect(() => {
    getAnalysis();
  }, [])

  const analyze = FindByID(id);

  const graphData = {
    labels: ["Amostra 1", "Amostra 2", "Amostra 3", "Amostra 4", "Amostra 5"],
    datasets: [
      {
        label: 'Resistência Elétrica x Concentração',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,

        // Valores - Retorno do Arduino
        data: [10, 20, 30, 40, 50]
      }
    ]
  }

  return (
    <div id="mainPage" className="container">
      <Header />
      <main className="content">
        <Line
          data={graphData}
          options={{
            title: {
              display: true,
              text: 'Curva de Calibração',
              fontSize: 20
            }
          }}
        />
      </main>
    </div >
  );
}
