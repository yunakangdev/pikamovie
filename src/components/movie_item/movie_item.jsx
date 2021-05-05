import React from 'react';
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiOutlineStar, AiOutlineHeart } from "react-icons/ai";

import styles from './movie_item.module.css';

const MovieItem = ({ movie }) => {

  const { imdbID, Poster, Title, Year, Genre, Country, Runtime, imdbRating, imdbVotes} = movie;

  return (
    <tr>
      <td className={styles.movie}>
        <img className={styles.poster} src={Poster} alt={Title} />
        <p className={styles.description}>
          <span className={styles.title}>{Title}</span>
          <span className={styles.year}>{Year}</span>
          <span className={styles.others}>{Genre} | {Country} | {Runtime}</span>
          <span className={styles.imdb}>
            <AiOutlineStar /><em className={styles.rating}>{imdbRating !== "N/A"? imdbRating : "no rating"}</em>
            <AiOutlineHeart /><em className={styles.votes}>{imdbVotes !== "N/A"? imdbVotes : "no votes"}</em>
          </span>
        </p>
      </td>
      <td className={styles.nominate}>
        <i>
        <FcLike />
        <FcLikePlaceholder />
        </i>
      </td>
    </tr>
  );
};

export default MovieItem;