import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import styles from './login.module.css';

const Login = ({ authService }) => {
  const history = useHistory();
  const historyState = history?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [userName, setUserName] = useState(historyState && historyState.displayName);
  const [userEmail, setUserEmail] = useState(historyState && historyState.Email);
  // const [nominees, setNominees] = 
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
        // create user info and save it in firebase databse
        goToDashboard(data);
        closeLoginMenu(); 
      });
  }

  const onLogout = () => {
    authService.logout();
    closeLoginMenu();
  }

  // const goToMain = (data) => {
  //   if (data.user && data.user.uid) {
  //     history.push({
  //       pathname: '/',
  //       state: { id: userId,
  //         name: data.user.displayName,
  //         email: data.user.email,
  //         // nominees: ,
  //       },
  //     });
  //   } else {
  //     history.push('/');
  //   }
  //   closeLoginMenu();
  // };

  const goToDashboard = (data) => {
    if (data.user && data.user.uid) {
      history.push({
        pathname: '/dashboard',
        state: { id: userId,
                name: data.user.displayName,
                email: data.user.email,
                // nominees: ,
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
        // setNominees();
      } else {
        // history.push('/');
      }
    });
  });
  
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
};

export default Login;