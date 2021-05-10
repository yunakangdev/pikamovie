import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import AuthService from './service/auth_service';
// import Pikamovie from './service/pikamovie';
// import NomineesRepository from './service/nominees_repository';
import App from './app';
import './index.css';

// const authService = new AuthService();
// const nomineesRepository = new NomineesRepository();
// const pikamovie = new Pikamovie(process.env.REACT_APP_PIKAMOVIE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);