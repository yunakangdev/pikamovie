import React, { memo } from 'react';
import { IoIosClose } from "react-icons/io";
import styles from './login_menu.module.css';

const LoginMenu = memo(({ onLoginClose }) => {
  return (
    <div className={styles.login}>
      <ul className={styles.menu}>
        <li className={styles.google}>Google</li>
        <li className={styles.github}>Github</li>
      </ul>
      <i className={styles.close} onClick={onLoginClose}><IoIosClose /></i>
    </div>
  )}
);

export default LoginMenu;