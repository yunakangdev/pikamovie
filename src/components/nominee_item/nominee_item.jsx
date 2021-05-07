import React from 'react';
import { IoIosClose } from "react-icons/io";
import styles from './nominee_item.module.css';

const NomineeItem = ({ nominee, onDeleteClick }) => {
  const { imdbID, Title, Year } = nominee;

  return (
    <tr>
      <td className={styles.nominee}>
        <span className={styles.information}>{Title} | {Year}</span>
        <i className={styles.delete} onClick={() => onDeleteClick(imdbID)}><IoIosClose /></i>
      </td>
    </tr>
  )
}

export default NomineeItem;