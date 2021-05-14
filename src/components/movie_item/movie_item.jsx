import React, { useState, useEffect, memo } from 'react';
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import styles from './movie_item.module.css';

const MovieItem = ({ authService, movie, nominees, onMovieClick, onNominateClick, nomineesRepository }) => {
  const { imdbID, Poster, Title, Year} = movie;
  const [isNominated, setIsNominated] = useState(false);
  const [numNominees, setNumNominees] = useState(0);

  const handleNoPoster = (e) => {
    e.target.src=process.env.PUBLIC_URL + "./images/no-poster.png";
  }
  
  useEffect(() => {
    nominees && setNumNominees(nominees.length);
    nominees && (nominees.some(nominee => nominee.imdbID === imdbID)) ? setIsNominated(true) : setIsNominated(false);
  }, [nominees]);

  const getCanBeNominated = (nomineeId) => {
    const isNomineeFound = Array.from(nominees).some(nominee => nominee.imdbID === nomineeId);
  
    if (!isNomineeFound && numNominees < 5) {
      setIsNominated(true);
      return true;
    } else if (!isNomineeFound && numNominees >= 5) {
      setIsNominated(false);
      return false;
    } else if (isNomineeFound && isNominated) {
      setIsNominated(false);
      return false;
    }
  }
  
  const handleNominateClick = (nomineeId) => {
    if (getCanBeNominated(nomineeId)) {
      onNominateClick(nomineeId, true);
    } else {
      onNominateClick(nomineeId, false);
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
};

export default MovieItem;