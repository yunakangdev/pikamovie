import React, { useState, useEffect, memo } from 'react';
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import styles from './movie_item.module.css';

const MovieItem = memo(
  ({ movie, nominees, onMovieClick, onNominateClick }) => {
    const { imdbID, Poster, Title, Year} = movie;
    const [isNominated, setIsNominated] = useState(false);
    const [numNominees, setNumNominees] = useState(0);
  
    const handleNoPoster = (e) => {
      e.target.src=process.env.PUBLIC_URL + "./images/no-poster.png";
    }

    const getNumNominees = () => {
      if (nominees) {
        setNumNominees(nominees.length);
      }
    }
  
    useEffect(() => {
      getNumNominees();
    }, [nominees]);
  
    const handleNominateClick = (id) => {
      if (!isNominated && numNominees < 5) {
        setIsNominated(true);
        onNominateClick(id, true);
      }
    }
    
    return (
      <tr>
        <td className={styles.movie} onClick={() => onMovieClick(imdbID)}>
          <img className={styles.poster} src={Poster} onError={handleNoPoster} alt={Title} />
          <p className={styles.description}>
            <span className={styles.title}>{Title}</span>
            <span className={styles.year}>{Year}</span>
          </p>
        </td>
        <td className={styles.nominate}>
          <i onClick={() => handleNominateClick(imdbID)}>
            {
              isNominated === true ? <FcLike /> : <FcLikePlaceholder />    
            }
          </i>
        </td>
      </tr>
    );
  }
);

export default MovieItem;