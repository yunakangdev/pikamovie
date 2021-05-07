import React, { useState, useEffect } from 'react';
import styles from './nominee_list.module.css';

const NomineeList = ({ nominees, onDeleteClick }) => {
  const [numNominees, setNumNominees] = useState(0);

  const getNumNominees = () => {
    if (nominees) {
      setNumNominees(nominees.length);
    }
  }

  useEffect(() => {
    getNumNominees();
  }, [nominees]);

  return (
    <table className={styles.nominees}>
      <colgroup>
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>Nomination</th>
        </tr>
      </thead>
      <tbody>
        {
          nominees &&
          nominees.map(nominee => <nomineeItem key={nominee.imdbID} 
                                              nominee={nominee}
                                              onDeleteClick={onDeleteClick}
          />)
        }
        {
          numNominees === 0 &&
          <h2 className={styles.comment}>Please choose nominees up to 5!</h2>
        }
        {
          numNominees >= 5 &&
          <h2 className={styles.comment}>Thank you for choosing all 5 nominees!</h2>
        }
      </tbody>
    </table>
  )
};

export default NomineeList;