import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game2 from './five'
import Game from './fullGame'
import AI from './aip2'

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AI/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
