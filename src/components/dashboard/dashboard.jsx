import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NomineeList from '../nominee_list/nominee_list';
import styles from './dashboard.module.css';

const Dashboard = ({ authService }) => {
  const history = useHistory();
  useEffect(() => {
    authService.onAuthChange(user => {
      if (!user) {
        history.push('/');
      }
    })
  })

  return (
    <div className={styles.dashboard}>
      <div className={styles.account}>
        <h2 className={styles.title}>My Account</h2>
      </div>
      <div className={styles.nomination}>
        <h2 className={styles.title}>Nomination</h2>
        <NomineeList />
      </div>
    </div>
  )
};

export default Dashboard;
