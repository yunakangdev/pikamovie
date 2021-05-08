import React, { memo } from 'react';
import styles from './footer.module.css';

const Footer = memo(
  () => {
    return (
      <div className={styles.footer}>
        © 2021 <em>Pikamovie</em> · Built by <em>JEAN KANG</em>
      </div>
    )
  }
);

export default Footer;