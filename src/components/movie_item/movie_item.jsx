import React, { memo, useState } from 'react';
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import styles from './movie_item.module.css';

const MovieItem = memo(
  ({ movie, onMovieClick, onNominateClick }) => {
    const { imdbID, Poster, Title, Year} = movie;
    const [isNominated, setIsNominated] = useState(false);
  
    const handleNoPoster = (e) => {
      e.target.src=process.env.PUBLIC_URL + "./images/no-poster.png";
    }
  
    const handleNominateClick = (id) => {
      const switchedIsNominated = !isNominated;
      setIsNominated(switchedIsNominated);
      if (switchedIsNominated === true) {
        onNominateClick(id, true);
      } else {
        onNominateClick(id, false);
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