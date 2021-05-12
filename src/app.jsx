import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Route } from 'react-router-dom';
import Logo from './components/logo/logo';
import Login from './components/login/login';
import Main from './components/main/main';
import Dashboard from './components/dashboard/dashboard';
import Footer from './components/footer/footer';
import styles from './app.module.css';

const App = ({ authService, pikamovie, nomineesRepository }) => {
  return (
    <div>
      <BrowserRouter>
        <section className={styles.header}>
          <Logo />
          <Login authService={authService} />
        </section>
        <Route exact path="/"><Main authService={authService} pikamovie={pikamovie} nomineesRepository={nomineesRepository} /></Route>
        <Route path="/dashboard"><Dashboard authService={authService} /></Route>
        <Footer />
      </BrowserRouter>
    </div>
=======
import { Route } from 'react-router-dom';
import Main from './main';
import Dashboard from './components/dashboard/dashboard';
import Footer from './components/footer/footer';
import AuthService from './service/auth_service';
import Pikamovie from './service/pikamovie';
import NomineesRepository from './service/nominees_repository';

const App = () => {
  const authService = new AuthService();
  const pikamovie = new Pikamovie(process.env.REACT_APP_PIKAMOVIE_API_KEY);
  const nomineesRepository = new NomineesRepository();

  return (
    <>
      <Route exact path="/"><Main authService={authService} pikamovie={pikamovie} nomineesRepository={nomineesRepository} /></Route>
      <Route path="/dashboard"><Dashboard authService={authService} /></Route>
      <Footer />
    </>
>>>>>>> 77855722058c54741146c24f3641ff53fc3d11d1
  )
};

export default App;