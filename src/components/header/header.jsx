import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../login/login'
import styles from './header.module.css';

const Header = memo(
  ({ authService }) => {
    const [isLoginActive, setIsLoginActive] = useState(false);
    
    const openLogin = () => {
      setIsLoginActive(true);
    }
  
    const closeLogin = () => {
      setIsLoginActive(false);
    }
  
    return (
      <header className={styles.header}>
        {/* Logo */}
        <div className={styles.logo}><Link to="/">Pikamovie</Link></div>
  
        {/* Login button */}
        <div className={styles.button} onClick={openLogin}>Login</div>
  
        {/* Login full screen menu */}
        {
          isLoginActive &&
          <Login authService={authService} onLoginClose={closeLogin} />
        }
      </header>
    )
  }
);

export default Header;