import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from '../../components/Header/header';

import './loading.css';

export default function Loading() {
  const location = useLocation();

  const time = Number(location.pathname.split("/")[2]);

  const [timeLeft, setTimeLeft] = useState(time);
  const [timeLeftP, setTimeLeftP] = useState(0);
  const [timesUp, setTimesUp] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(() => {
        setTimeLeftP(((time - (timeLeft - 1)) * 100) / time);
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      setTimesUp(true);
    }
  }, [timeLeft, time]);

  return (
    <div id="mainPage" className="container">
      <Header />
      <main className="content">
        <div className="loading">
          <hr />
          {!timesUp ?
            <h1>Aguarde {timeLeft} segundos</h1>
            :
            <h1>Processando</h1>
          }
          <br />
          {!timesUp ?
            <div className="loadingBar">
              <CircularProgress variant="static" color="inherit"
                size='5rem' thickness={4}
                value={timeLeftP}
              />
            </div>
            :
            <div className="loadingBar">
              <CircularProgress variant="indeterminate" color="inherit"
                size='5rem' thickness={4}
              />
            </div>
          }
          <hr />
        </div>
      </main>
    </div >
  );
}
