import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/header/header';
import Main from './main';
import Dashboard from './components/dashboard/dashboard';
import Footer from './components/footer/footer';

const App = ({ authService, pikamovie, nomineesRepository }) => {

  return (
    <>
      <Header authService={authService} nomineesRepository={nomineesRepository}/>
      <Route exact path="/"><Main pikamovie={pikamovie} nomineesRepository={nomineesRepository} /></Route>
      <Route path="/dashboard"><Dashboard authService={authService} /></Route>
      <Footer />
    </>
  )
};

export default App;