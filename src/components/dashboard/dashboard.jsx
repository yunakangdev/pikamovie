import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

    </div>
  )
};

export default Dashboard;
