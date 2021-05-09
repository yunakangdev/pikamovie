import React, { memo, useRef } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import styles from './search.module.css';

const Search = memo(({ onSearch }) => {
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
    )
  }
);

export default Search;