import React from 'react';
import styles from './dashboard.module.css';

const Dashboard = (props) => (
  <h1>Dashboard</h1>
);

export default Dashboard;

// import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import styles from './dashboard.module.css';

// const Dashboard = ({ authService }) => {
//   const history = useHistory();
//   const onLogout = () => {
//     authService.logout();
//   };

//   useEffect(() => {
//     authService.onAuthChange(user => {
//       if (!user) {
//         history.push('/');
//       }
//     });
//   });

//   return (
//     <section className={styles.dashboard}>
//       <button onLogout={onLogout}>Logout</button>
//     </section>
//   );
// };

// export default Dashboard;
