import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import Pikamovie from './service/pikamovie';

const pikamovie = new Pikamovie(process.env.REACT_APP_PIKAMOVIE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App pikamovie={pikamovie} />
  </React.StrictMode>,
  document.getElementById('root')
);
