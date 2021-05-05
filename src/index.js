import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import Pictamovie from './service/pictamovie';

const pictamovie = new Pictamovie(process.env.REACT_APP_PICTAMOVIE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App pictamovie={pictamovie} />
  </React.StrictMode>,
  document.getElementById('root')
);
