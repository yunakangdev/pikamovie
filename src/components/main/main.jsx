import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Search from '../search/search';
import MovieList from '../movie_list/movie_list';
import NomineeList from '../nominee_list/nominee_list';
import MovieModal from '../movie_modal/movie_modal';
import styles from './main.module.css';

const Main = ({ authService, pikamovie, nomineesRepository }) => {
  const history = useHistory();
  const historyState = history?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [movies, setMovies] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [searchResult, setSearchResult] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    if (searchResult === '') {
      pikamovie
        .initialData()
        .then(movies => setMovies(movies));
    }
  }, [pikamovie, searchResult]);

  const search = useCallback((title) => {
    if (title) {
      pikamovie
      .searchByTitle(title)
      .then(movies => {
        if (movies) {
          setSearchResult(`Results for "${title}"`);
          setMovies(movies);
        } else {
          setSearchResult('Oops! We couldn\'t find the movie..try again?');
        }
      });
    } else {
      setSearchResult('');
    }
  }, []);

  const handleNominateClick = useCallback((id, isNominated) => {    
    if (isNominated === true) {
      createOrUpdateNominee(id);
    }
  }, []);

  const createOrUpdateNominee = (id) => {
    pikamovie
      .searchById(id)
      .then(nominatedMovie => {
        setNominees(nominees => {
          if (nominees.some(nominee => nominee.imdbID === nominatedMovie.imdbID) === false) {
            if (!nominees || nominees.length < 5) {
              const updatedNominees = [...nominees, nominatedMovie];
              setNominees(nominees => updatedNominees);
              // can't send userId
              nomineesRepository.saveNominee(userId, nominatedMovie);
            } else {
              setNominees(nominees => nominees);
            }
          } else {
            setNominees(nominees => nominees);
          }
        });
      }
    );
  }

  const deleteNominee = (deletedNominee) => {
    if (nominees.find(nominee => deletedNominee)) {
      setNominees(nominees => {
        const updatedNominees = nominees.filter(nominee => {
          return (nominee.imdbID !== deletedNominee.imdbID);
        });
        setNominees(nominees => setNominees(updatedNominees));
        nomineesRepository.deleteNominee(userId, deletedNominee);
      });
    }
  }

  const openModal = useCallback((id) => {
    pikamovie
      .searchById(id)
      .then(movie => setSelectedMovie(movie));
    setIsModalActive(true);
  }, []);

  const closeModal = () => {
    setIsModalActive(false);
    setSelectedMovie(null);
  }

  return (
    <div className={styles.main}>
      {/* Search */}
      <Search onSearch={search} />

      {/* Search result comment */}
      {
        searchResult === '' &&
        <span className={styles.comment}>{searchResult}</span>
      }
      {
        searchResult &&
        <span className={styles.comment}>{searchResult}</span>
      }

      {/* Movie & Nomination list */}
      <div className={styles.tables}>
        <div className={styles.left}>
          <MovieList movies={movies} nominees={nominees} onMovieClick={openModal} onNominateClick={handleNominateClick} />
        </div>
        <div className={styles.right}>
          <NomineeList nominees={nominees} onDeleteClick={deleteNominee} />
        </div>
      </div>

      {/* Modal */}
      {
        isModalActive && selectedMovie &&
        <MovieModal selectedMovie={selectedMovie}
                    onModalClose={closeModal}
        />
      }
    </div>
    )
  };

export default Main;
