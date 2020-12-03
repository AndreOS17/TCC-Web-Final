import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header/header';
import api from '../../services/api';

import './all.css';

interface AnalyzeModel {
  ID: number;
  data: string;
  time: number;
  type: string;
}

export default function All() {
  const [analysis, setAnalysis] = useState([] as AnalyzeModel[]);

  async function getAnalysis() {
    const response = await api.get("/analises");

    setAnalysis(response.data);
  }

  useEffect(() => {
    getAnalysis();
    console.log(analysis);
  }, [])


  return (
    <div id="mainPage" className="container">
      <Header />
      <main className="content">
        {analysis.map((e: AnalyzeModel) => {
          return (
            <Link className="AnalyzeCard" key={e.ID} to={`/saved/${e.ID}`}>
              <h1>{e.type}</h1>
              <h1>{e.ID}</h1>
            </Link>
          );
        })}
      </main>
    </div >
  );
}