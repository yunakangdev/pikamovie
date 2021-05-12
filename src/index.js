import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import AuthService from './service/auth_service';
import Pikamovie from './service/pikamovie';
import NomineesRepository from './service/nominees_repository';
=======
import { BrowserRouter } from 'react-router-dom';
// import AuthService from './service/auth_service';
// import Pikamovie from './service/pikamovie';
// import NomineesRepository from './service/nominees_repository';
>>>>>>> 77855722058c54741146c24f3641ff53fc3d11d1
import App from './app';
import './base.css';

<<<<<<< HEAD
const authService = new AuthService();
const pikamovie = new Pikamovie(process.env.REACT_APP_PIKAMOVIE_API_KEY);
const nomineesRepository = new NomineesRepository();

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} pikamovie={pikamovie} nomineesRepository={nomineesRepository} />
=======
// const authService = new AuthService();
// const nomineesRepository = new NomineesRepository();
// const pikamovie = new Pikamovie(process.env.REACT_APP_PIKAMOVIE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
>>>>>>> 77855722058c54741146c24f3641ff53fc3d11d1
  </React.StrictMode>,
  document.getElementById('root')
);