import React, { useState, useEffect, memo } from 'react';
import NomineeItem from '../nominee_item/nominee_item';
import styles from './nominee_list.module.css';

const NomineeList = memo(({ nominees, onDeleteClick }) => {
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
      <>
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
            {/* Nomination list */}
            {
              nominees &&
              nominees.map(nominee => <NomineeItem key={nominee.imdbID} 
                                                  nominee={nominee}
                                                  onDeleteClick={onDeleteClick}
              />)
            }
          </tbody>
        </table>
        {/* Nomination list comment */}
        {
          numNominees === 0 &&
          <span className={styles.comment}>Please choose nominees up to 5!</span>
        }
        {
          numNominees >= 5 &&
          <span className={styles.comment}>Thank you for choosing all 5 nominees!</span>
        }
      </>
    )
  }
);

export default NomineeList;