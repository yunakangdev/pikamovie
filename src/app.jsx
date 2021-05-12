import React from 'react';
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
  )
};

export default App;