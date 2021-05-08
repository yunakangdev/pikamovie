import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthService from './service/auth_service';
import Pikamovie from './service/pikamovie';
import App from './app';
import Dashboard from './components/dashboard/dashboard';
import './index.css';

const authService = new AuthService();
const pikamovie = new Pikamovie(process.env.REACT_APP_PIKAMOVIE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/"><App pikamovie={pikamovie} authService={authService} /></Route>
      <Route path="/dashboard"><Dashboard /></Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
