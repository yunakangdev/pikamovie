import React, { useState, useEffect, memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import styles from './login.module.css';

const Login = memo(({ authService }) => {
  const history = useHistory();
  const historyState = history?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [userName, setUserName] = useState(historyState && historyState.displayName);
  const [userEmail, setUserEmail] = useState(historyState && historyState.email);
  const [isLoginMenuActive, setIsLoginMenuActive] = useState(false);
  
  const openLoginMenu = () => {
    setIsLoginMenuActive(true);
  }

  const closeLoginMenu = () => {
    setIsLoginMenuActive(false);
  }

  const onLogin = (event) => {
    authService
      .login(event.currentTarget.textContent)
      .then(data => {
        setUserId(data.user.uid);
        setUserName(data.user.displayName);
        setUserEmail(data.user.email);
        goToDashboard(() => goToDashboard(data));
        closeLoginMenu(); 
      });
  }

  const onLogout = useCallback(() => {
    authService.logout();
    setUserId('');
    setUserName('');
    setUserEmail('');
    closeLoginMenu();
    history.push('/');
  });

  const goToDashboard = (data) => {
    if (data.user && data.user.uid) {
      history.push({
        pathname: '/dashboard',
        state: 
        { id: userId,
          name: data.user.displayName,
          email: data.user.email,
        },
      });
    } else {
      history.push('/dashboard');
    }
    closeLoginMenu();
  };

  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
        setUserEmail(user.email);
      } else {
        setUserId('');
        setUserName('');
        setUserEmail('');
      }
    });
  }, [authService, userId, userName, userEmail, history]);
  
  return (
    <section className={styles.login}>
      {/* Login button */}
      <div className={styles.button} onClick={openLoginMenu}>Login</div>

      {/* Login full screen menu */}
      {
        isLoginMenuActive &&
        <div className={styles.menu}>
          <ul className={styles.nav}>
            <li className={styles.google} onClick={onLogin}>Google</li>
            <li className={styles.github} onClick={onLogin}>Github</li>
            <span className={styles.dashboard} onClick={goToDashboard}>Account</span>
            <span className={styles.line}>|</span>
            <span className={styles.logout} onClick={onLogout}>Log out</span>
          </ul>
          <i className={styles.close} onClick={closeLoginMenu}><IoIosClose /></i>
        </div>
      }
    </section>
  )
});

export default Login;