import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthService from './service/auth_service';
import Pikamovie from './service/pikamovie';
import App from './app';
import Dashboard from './components/dashboard/dashboard';
import './index.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';

const authService = new AuthService();
const pikamovie = new Pikamovie(process.env.REACT_APP_PIKAMOVIE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header authService={authService} />
      <Route exact path="/"><App pikamovie={pikamovie} authService={authService} /></Route>
      <Route path="/dashboard"><Dashboard authService={authService} /></Route>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
