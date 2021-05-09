import React from 'react';
import styles from './dashboard.module.css';

const Dashboard = ({ authService }) => {
  return (
    <div className={styles.dashboard}>
      {/* if logged in, show dashboard (email, saved movies) */}

      {/* if not logged in, display "Please login" */}
    </div>
  )
};

export default Dashboard;
