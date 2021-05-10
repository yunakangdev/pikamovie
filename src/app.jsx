import React from 'react';
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
  )
};

export default App;