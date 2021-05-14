import React, { memo } from 'react';
import MovieItem from '../movie_item/movie_item';
import styles from './movie_list.module.css';

const MovieList = memo(
  ({ authService, movies, nominees, onMovieClick, onNominateClick, nomineesRepository }) => {
    return (
      <table className={styles.movies}>
        <colgroup>
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Nominate</th>
          </tr>
        </thead>
        <tbody>
          {
            movies.map(movie => <MovieItem key={movie.imdbID} 
                                          authService={authService}
                                          movie={movie} 
                                          nominees={nominees}
                                          onMovieClick={onMovieClick}
                                          onNominateClick={onNominateClick}
                                          nomineesRepository={nomineesRepository}
            />)
          }        
        </tbody>
      </table>
    );
  }
);

export default MovieList;