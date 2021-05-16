import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './dashboard.module.css';

const Dashboard = ({ authService }) => {
  const history = useHistory();
  const historyState = history?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [userName, setUserName] = useState(historyState && historyState.name);
  const [userEmail, setUserEmail] = useState(historyState && historyState.email);
  const [nominees, setNominees] = useState(historyState && historyState.nominees);

  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
        setUserEmail(user.email);
      }
    })
  }); 

  return (
    <div className={styles.dashboard}>
      <div className={styles.account}>
        <h3 className={styles.title}>My Account</h3>
        Welcome,
        {!userName && <> please login!</>}
        {userName && [` `, userName, `!`]}
        <br />
        {userEmail}
      </div>
      <div className={styles.nomination}>
        <h3 className={styles.title}>Nomination</h3>
        {
          !nominees &&
          <> You haven't nominated any movies yet. </>
        }
      </div>
    </div>
  )
};

export default Dashboard;
