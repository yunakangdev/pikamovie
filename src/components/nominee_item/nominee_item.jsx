import React, { memo } from 'react';
import { IoIosClose } from "react-icons/io";
import styles from './nominee_item.module.css';

const NomineeItem = memo(({ nominee, onDeleteClick }) => {
  const { imdbID, Title, Year } = nominee;

  return (
    <>
    {
      nominee &&
      <tr>
        <td className={styles.nominee}>
          <p className={styles.information}>{Title} | {Year}</p>
          <i className={styles.delete} onClick={() => onDeleteClick(imdbID)}><IoIosClose /></i>
        </td>
      </tr>
    }
    </>
  )
});

export default NomineeItem;