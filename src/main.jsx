import React from 'react';
import { useState, useEffect, memo, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Search from './components/search/search';
import MovieList from './components/movie_list/movie_list';
import NomineeList from './components/nominee_list/nominee_list';
import MovieModal from './components/movie_modal/movie_modal';
import styles from './main.module.css';
import { IoIosClose } from "react-icons/io";

const Main = memo(({ authService, pikamovie, nomineesRepository }) => {
  const [movies, setMovies] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [searchResult, setSearchResult] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const history = useHistory();
  const historyState = history?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);

  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push('/');
      }
    });
  });

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
      addNominee(id);
    }
  }, []);

  const addNominee = (id) => {
    pikamovie
      .searchById(id)
      .then(movie => {
        setNominees(nominees => {
          if (nominees.some(nominee => nominee.imdbID === movie.imdbID) === false) {
            if (!nominees || nominees.length < 5) {
              const updated = [...nominees, movie];
              setNominees(updated);

              // add the movie to the firebase database
              nomineesRepository.saveNominee(userId, movie.imdbID);

            } else {
              setNominees(nominees);
            }
          } else {
            setNominees(nominees);
          }
        });
      }
    );
  }

  const deleteNominee = (deletedNominee) => {
    if (nominees.find(nominee => deletedNominee)) {
      setNominees(nominees => {
        const updated = nominees.filter(nominee => {
          return (nominee.imdbID !== deletedNominee.imdbID);
        });
        setNominees(updated);
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

  const openLoginMenu = () => {
    setIsLoginActive(true);
  }

  const closeLoginMenu = () => {
    setIsLoginActive(false);
  }

  const goToDashboard = (userId) => {
    if (userId) {
      history.push({
        pathname: '/dashboard',
        state: { id: userId },
      });
      closeLoginMenu();
    }
  };

  const goToMain = (userId) => {
    history.push({
      pathname: '/',
      state: { id: userId }
    });
    closeLoginMenu();
  }

  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.textContent)
      .then(data => {
        // setUserId(data.user.uid);
        closeLoginMenu();
        goToDashboard(data.user.uid);
      });
  }

  const onLogout = (event) => {
    authService.logout();
    closeLoginMenu();
    goToMain(userId);
  }

  return (
    <div className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        {/* Logo */}
        <div className={styles.logo}><Link to="/">Pikamovie</Link></div>

        {/* Login button */}
        <div className={styles.button} onClick={openLoginMenu}>Login</div>

        {/* Login full screen menu */}
        {
          isLoginActive &&
          <div className={styles.login}>
            <ul className={styles.menu}>
              <li className={styles.google} onClick={onLogin}>Google</li>
              <li className={styles.github} onClick={onLogin}>Github</li>
              <span className={styles.dashboard} onClick={goToDashboard}>Account</span>
              <span className={styles.line}>|</span>
              <span className={styles.logout} onClick={onLogout}><Link to="/">Log out</Link></span>
              {/* <span className={styles.logout} onClick={onLogout}>Log out</span> */}
            </ul>
            <i className={styles.close} onClick={closeLoginMenu}><IoIosClose /></i>
          </div>
        }
      </header>

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
  }
);

export default Main;
