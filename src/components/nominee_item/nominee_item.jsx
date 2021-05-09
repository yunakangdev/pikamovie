import React from 'react';
import { IoIosClose } from "react-icons/io";
import styles from './nominee_item.module.css';

const NomineeItem = ({ nominee, onDeleteClick }) => {
  const { imdbID, Title, Year } = nominee;

  return (
    <>
    {
      nominee &&
      <tr>
        <td className={styles.nominee}>
          <p className={styles.information}>{Title} | {Year}</p>
          <i className={styles.delete} onClick={() => onDeleteClick(nominee)}><IoIosClose /></i>
        </td>
      </tr>
    }
    </>
  )
};

export default NomineeItem;