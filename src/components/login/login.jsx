import React from 'react';
import styles from './login.module.css';

const Login = ({ authService, onLoginClick }) => {
  return (
    <section className={styles.login} onClick={ onLoginClick }>
      <h3>Login</h3>
    </section>
  )
}

export default Login;