import React from 'react';
import { AiOutlineStar, AiOutlineHeart } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import styles from './movie_modal.module.css';

const MovieModal = ({ selectedMovie, onModalClose }) => {
  const { imdbID, Poster, Title, Year, Genre, Country, Runtime, Actors, Plot, imdbRating, imdbVotes } = selectedMovie;
  
  const handleNoPoster = (e) => {
    e.target.src=process.env.PUBLIC_URL + "./images/no-poster.png";
  }

  return (
    <div className={styles.modal}>
      <div className={styles.outside} onClick={onModalClose}></div>
      <div className={styles.inside}>
        <div className={styles.left}>
          <img className={styles.poster} src={Poster} onError={handleNoPoster} alt={Title} />
        </div>
        <div className={styles.right}>
          <h2 className={styles.title}>{Title} <em>|</em> <em>{Year}</em></h2>
          <p className={[`${styles.description} ${styles.hr}`]}>
            <span>{Genre}</span>
            <span>{Country} <em>|</em> {Runtime}</span>     
          </p>
          <p className={styles.actors}>
            <span><em>{Actors !== "N/A" ? "Actors:" : ""} </em></span>
            <span>{Actors !== "N/A" ? Actors : ""}</span>
          </p>
          <p className={styles.plot}>
            <span><em>{Plot !== "N/A" ? "Plot:" : ""} </em></span>
            <span>{Plot !== "N/A" ? Plot : ""}</span>
          </p>              
          <p className={[`${styles.imdb} ${styles.hr}`]}>
            <i>
              <AiOutlineStar /><em className={styles.rating}>{imdbRating !== "N/A" ? imdbRating : "No rating"}</em> 
            </i>
            <i>
              <AiOutlineHeart /><em className={styles.votes}>{imdbVotes !== "N/A" ? imdbVotes : "No votes"}</em>
            </i>
          </p>
        </div>
        <span><i onClick={onModalClose}><IoIosClose /></i></span>
      </div>
    </div>    
  )
};

export default MovieModal;