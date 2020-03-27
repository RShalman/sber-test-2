import React, { useState, useEffect, useCallback } from 'react';

import S from './module.css';

async function getCurrency(cur) {
  return await fetch(`https://api.exchangeratesapi.io/latest?base=${cur}`)
    .then(resp => resp.json())
    .then(data => data);
}

function getCurRate(arr) {
  const [cur] = arr;
  return cur ? cur.rates.RUB.toFixed(2) : '0.00';
}

const CurrencyTable = ({ history, currency }) => {
  return (
    <>
      <p className={S.header}>{`${currency} / RUB`}</p>
      <p className={S.currentRate}>{getCurRate(history)}</p>
      <ul className={S.historyList}>
        {history.length > 1 &&
          history.slice(1).map((x, i) => (
            <li key={i} className={S.historyEl}>
              {x.rates.RUB.toFixed(2)}
            </li>
          ))}
      </ul>
    </>
  );
};

const App = () => {
  const [historyEUR, setHistoryEUR] = useState([]);
  const [historyUSD, setHistoryUSD] = useState([]);

  const setCurData = useCallback(() => {
    const applyToHistory = (d, prev) =>
      prev.length < 10 ? [d, ...prev] : [d, ...prev.slice(0, 9)];

    getCurrency('USD').then(d =>
      setHistoryUSD(prev => applyToHistory(d, prev))
    );
    getCurrency('EUR').then(d =>
      setHistoryEUR(prev => applyToHistory(d, prev))
    );
  }, []);

  useEffect(() => {
    if (!historyEUR && !historyUSD) {
      setCurData();
    }

    setInterval(() => {
      setCurData();
    }, 10000);
  }, []);

  return (
    <div className={S.app}>
      <div className={S.table}>
        <div className={S.current}>
          <div className={S.tableWrapper}>
            <CurrencyTable history={historyEUR} currency={'EUR'} />
          </div>
          <div className={S.tableWrapper}>
            <CurrencyTable history={historyUSD} currency={'USD'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
