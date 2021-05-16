import React, { memo } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Search from '../search/search';
import MovieList from '../movie_list/movie_list';
import NomineeList from '../nominee_list/nominee_list';
import MovieModal from '../movie_modal/movie_modal';
import styles from './main.module.css';

const Main = memo(({ authService, pikamovie, nomineesRepository }) => {
  const history = useHistory();
  const historyState = history?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [movies, setMovies] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [numNominees, setNumNominees] = useState(0);
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
  
  useEffect(() => {
    if (!userId) {
      if (nominees) {
        setNumNominees(nominees.length);
        setNominees(prev => setNominees(nominees));
      }
    }

  const stopSync = nomineesRepository.syncNominees(userId, (userId, nominees) => {
    setUserId(userId);
    setNominees(prev => setNominees(nominees));
  });
    return () => stopSync();
  }, [userId, nominees, nomineesRepository]);
  
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
  }, [pikamovie]);

  const getUserInfo = () => {
    const user = authService.getUser();
    let userInfo;

    if (user != null) {
      userInfo = {
        id: user.uid,
        name: user.displayName,
        email: user.email
      };
      return userInfo;
    }
  }

  const createOrUpdateNominee = (nomineeId) => {
    pikamovie
      .searchById(nomineeId)
      .then(nominatedMovie => {
        setNominees(nominees => {
          if (nominees && !(Array.from(nominees).find(nominee => nominee.imdbID === nominatedMovie.imdbID))) {
            if (nominees.length < 5) {
              const updatedNominees = [...nominees, nominatedMovie];
              setNominees(prev => setNominees(updatedNominees));

              const userInfo = getUserInfo();
              if (userInfo) {
                nomineesRepository.saveNominee(userInfo.id, nominatedMovie);
              }
            } 
          } else {
            setNominees(nominatedMovie);

            const userInfo = getUserInfo();
            if (userInfo) {
              nomineesRepository.saveNominee(userInfo.id, nominatedMovie);
            }
          }
        });
      }
    );
  }

  const deleteNominee = (deletedNomineeId) => {
    if (nominees && nominees.find(nominee => nominee.imdbID === deletedNomineeId)) {
      setNominees(nominees => {
        const updatedNominees = nominees.filter(nominee => {
          return (nominee.imdbID !== deletedNomineeId);
        });
        setNominees(nominees => setNominees(updatedNominees));

        const userInfo = getUserInfo();
        if (userInfo) {
          nomineesRepository.deleteNominee(userInfo.id, deletedNomineeId);
        }
      });
    }
  }

  const handleNominateClick = (nomineeId, isNominated) => {    
    const user = authService.getUser();
    if (user !== null) {
      if (isNominated) {
        createOrUpdateNominee(nomineeId);
      } else {
        deleteNominee(nomineeId);
      }

    } else if (user === null) {  
      if (isNominated) {
        createOrUpdateNominee(nomineeId);
      } else {
        deleteNominee(nomineeId);
      } 
    }
  }

  const openModal = useCallback((id) => {
    pikamovie
      .searchById(id)
      .then(movie => setSelectedMovie(movie));
    setIsModalActive(true);
  }, [pikamovie]);

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
          <MovieList authService={authService} movies={movies} nominees={nominees} onMovieClick={openModal} onNominateClick={handleNominateClick} nomineesRepository={nomineesRepository} />
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
  });

export default Main;