import React from 'react';
import ReactDOM from 'react-dom';
import AuthService from './service/auth_service';
import Pikamovie from './service/pikamovie';
import NomineesRepository from './service/nominees_repository';
import App from './app';
import './base.css';

const authService = new AuthService();
const pikamovie = new Pikamovie(process.env.REACT_APP_PIKAMOVIE_API_KEY);
const nomineesRepository = new NomineesRepository();

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} pikamovie={pikamovie} nomineesRepository={nomineesRepository} />
  </React.StrictMode>,
  document.getElementById('root')
);