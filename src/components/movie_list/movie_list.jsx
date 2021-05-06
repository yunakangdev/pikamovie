import React from 'react';
import styles from './movie_list.module.css';
import MovieItem from '../movie_item/movie_item';

const MovieList = ({ movies, onMovieClick }) => {
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
        {movies.map(movie => <MovieItem key={movie.imdbID} 
                                      movie={movie} 
                                      onMovieClick={onMovieClick}
                                      />)
        }        
      </tbody>
    </table>
  );
};

export default MovieList;