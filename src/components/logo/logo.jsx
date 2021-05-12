import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './logo.module.css';

const Logo = memo(() => {
  return (
    <header className={styles.logo}>
      <Link to="/">Pikamovie</Link>
    </header>
  )}
);

export default Logo;