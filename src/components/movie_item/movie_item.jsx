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

  const getNumNominees = () => {
    if (nominees) {
      setNumNominees(nominees.length);
    }
  }

  useEffect(() => {
    getNumNominees();
  }, [nominees]);

  const getUserInfo = () => {
    const user = authService.getUser();
    let userInfo;
    let id, name, email;

    if (user != null) {
      userInfo = {
        id: user.uid,
        name: user.displayName,
        email: user.email
      };

      return userInfo;
    }
  }

  const getIsNominated = (nomineeId) => {
    const userInfo = getUserInfo();
    let answer;
    // when the user is logged in
    if (userInfo) {
      console.log(`user exists`);
      console.log(`findNominee result: ${nomineesRepository.findNominee(userInfo.id, nomineeId)}`);
      if (!nomineesRepository.findNominee(userInfo.id, nomineeId) && numNominees < 5) {
        console.log(`no movie found`);
        answer = true;
      }
    } else if (!userInfo) {
      console.log(`user doesn't exist`);
      // when the user is not logged in
      if (!isNominated && numNominees < 5) {
        console.log(`no movie found`);
        answer = true;
      }
    }
    return answer; 
  }

  const handleNominateClick = (nomineeId) => {
    // if (!isNominated && numNominees < 5) {
    // 1. if the movie is not nominated (= not in the nominee list in the server)
    // 2. if the nominee list has less than 5 movies (no API in firebase for this)
    if (getIsNominated(nomineeId)) {
      setIsNominated(true);
      onNominateClick(nomineeId, true);
    } else {
      setIsNominated(false);
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