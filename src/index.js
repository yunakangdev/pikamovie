import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import Pikamovie from './service/pikamovie';
import AuthService from './service/auth_service';

const authService = new AuthService();
const pikamovie = new Pikamovie(process.env.REACT_APP_PIKAMOVIE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App pikamovie={pikamovie} authService={authService} />
  </React.StrictMode>,
  document.getElementById('root')
);
