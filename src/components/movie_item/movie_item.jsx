import React, { useState } from 'react';
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiOutlineStar, AiOutlineHeart } from "react-icons/ai";
import styles from './movie_item.module.css';

const MovieItem = ({ movie, onMovieClick, onNominateClick }) => {
// const MovieItem = ({ movie, onMovieClick }) => {

  // const { imdbID, Poster, Title, Year, Genre, Country, Runtime, imdbRating, imdbVotes} = movie;
  const { imdbID, Poster, Title, Year} = movie;
  const [isNominated, setIsNominated] = useState(false);

  const handleNoPoster = (e) => {
    e.target.src=process.env.PUBLIC_URL + "./images/no-poster.png";
  }

  const handleNominateClick = (id) => {
    setIsNominated(!isNominated);
    if (isNominated) {
      onNominateClick(id, isNominated);
    } else {
      onNominateClick(id, isNominated);
    }
  }

  return (
    <tr>
      <td className={styles.movie} onClick={() => onMovieClick(imdbID)}>
        <img className={styles.poster} src={Poster} onError={handleNoPoster} alt={Title} />
        <p className={styles.description}>
          <span className={styles.title}>{Title}</span>
          <span className={styles.year}>{Year}</span>
          {/* <span className={styles.others}>{Genre} | {Country} | {Runtime}</span>
          <span className={styles.imdb}>
            <AiOutlineStar /><em className={styles.rating}>{imdbRating !== "N/A"? imdbRating : "no rating"}</em>
            <AiOutlineHeart /><em className={styles.votes}>{imdbVotes !== "N/A"? imdbVotes : "no votes"}</em>
          </span> */}
        </p>
      </td>
      <td className={styles.nominate} onClick={() => handleNominateClick(imdbID)}>
      {/* <td className={styles.nominate}> */}
        <i>
          {
            isNominated ? <FcLike /> : <FcLikePlaceholder />    
          }
        </i>
      </td>
    </tr>
  );
};

export default MovieItem;