import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import NomineeList from '../nominee_list/nominee_list';
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

  // const getUserInfo = () => {
  //   console.log(`get user info`);

  //   const user = authService.getUser();
  //   let uid, name, email;

  //   if (user != null) {
  //     uid = user.uid;
  //     name = user.displayName;
  //     email = user.email;

  //     // causes too many re-renders
  //     // setUserId(uid);
  //     // setUserName(name);
  //     // setUserEmail(email);
      
  //     console.log(uid);
  //     console.log(name);
  //     console.log(email);
  //   }
  // }

  // make a function that display a user's info + nominee list
  // authService.getUser();

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

        {/* Nomination */}
        {/* <NomineeList /> */}
        {/* {
          nominees &&
          
        } */}
        {
          !nominees &&
          <> You haven't nominated any movies yet. </>
        }
      </div>
    </div>
  )
};

export default Dashboard;
