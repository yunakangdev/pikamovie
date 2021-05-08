import { useState, useEffect, memo, useCallback } from 'react';
import SearchHeader from './components/search_header/search_header';
import MovieList from './components/movie_list/movie_list';
import NomineeList from './components/nominee_list/nominee_list';
import MovieModal from './components/movie_modal/movie_modal';
import Footer from './components/footer/footer';
import styles from './app.module.css';
import Login from './components/login/login';
import LoginMenu from './components/login_menu/login_menu';

const App = memo(({ pikamovie, authService }) => {
  const [movies, setMovies] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [searchResult, setSearchResult] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoginActive, setIsLoginActive] = useState(false);
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
      console.log(isNominated === true);
      if (isNominated === true) {
        addNominee(id);
      } else {
        deleteNominee(id);
      }
    }, []);

  const addNominee = (id) => {
    console.log('add');
    pikamovie
      .searchById(id)
      .then(movie => {
        if (!(nominees.find(nominee => nominee.imdbID === movie.id))) {
          setNominees([...nominees, movie]);
        }
      }
    );
  }

  const deleteNominee = (id) => {
    console.log('delete');
    pikamovie
      .searchById(id)
      .then(movie => {
        setNominees(nominees.map((nominee) => nominee.imdbID !== movie.imdbID));
      });
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

  const openLogin = () => {
    setIsLoginActive(true);
  }

  const closeLogin = () => {
    setIsLoginActive(false);
  }

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        {/* Search header */}
        <SearchHeader onSearch={search} />
        {/* Login */}
        <Login authService={authService} onLoginClick={openLogin} />
      </div>

      {/* Search result comment */}
      {
        searchResult === '' &&
        <span className={styles.comment}>{searchResult}</span>
      }
      {
        searchResult &&
        <span className={styles.comment}>{searchResult}</span>
      }

      {/* Movie & Nomination lists */}
      <div className={styles.tables}>
        <div className={styles.left}>
          <MovieList movies={movies} onMovieClick={openModal} onNominateClick={handleNominateClick} />
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

      {/* Login full screen menu */}
      {
        isLoginActive &&
        <LoginMenu onLoginClose={closeLogin} />
      }

      {/* Footer */}
      <Footer />
    </div>
    )
  }
);

export default App;
