import React, { useRef } from 'react';
import styles from './search_header.module.css';
import { AiOutlineSearch } from "react-icons/ai";

const SearchHeader = ({ onSearch }) => {
  const inputRef = useRef();

  const handleSearch = () => {
    const value = inputRef.current.value;
    onSearch(value);
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }
  
  const onClick = () => {
    handleSearch();
  }

  return (
    <header className={styles.header}>
      <a href="https://Pictamovie.netlify.app">
        <div className={styles.logo}>Pictamovie</div>
      </a>
      <div className={styles.search}>
        <input 
          ref={inputRef}
          className={styles.input} 
          type="search" 
          placeholder="Type a movie title" 
          maxLength="50" 
          onKeyPress={onKeyPress}
          />
        <button className={styles.button} type="submit" onClick={onClick}><AiOutlineSearch /></button>
      </div>
    </header>
  )
};

export default SearchHeader;