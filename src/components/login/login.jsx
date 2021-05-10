// import React, { useState, useEffect } from 'react';
// import { IoIosClose } from "react-icons/io";
// import { Link, useHistory } from 'react-router-dom';
// import styles from './login.module.css';

// const Login = ({ authService, onLoginClose, nomineesRepository }) => {
//   const history = useHistory();
//   const historyState = history?.location?.state;
//   const [userId, setUserId] = useState(historyState && historyState.id);



  
//   return (
//     <div className={styles.login}>
//       <ul className={styles.menu}>
//         <li className={styles.google} onClick={onLogin}>Google</li>
//         <li className={styles.github} onClick={onLogin}>Github</li>
//         <span className={styles.dashboard} onClick={onLoginClose}><Link to="/dashboard">Account</Link></span>
//         <span className={styles.line}>|</span>
//         <span className={styles.logout} onClick={onLogout}><Link to="/">Log out</Link></span>
//       </ul>
//       <i className={styles.close} onClick={onLoginClose}><IoIosClose /></i>
//     </div>
//   )
// };

// export default Login;