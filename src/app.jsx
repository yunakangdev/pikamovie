import { useState, useEffect } from 'react';
import SearchHeader from './components/search_header/search_header';
import MovieList from './components/movie_list/movie_list';
import MovieModal from './components/movie_modal/movie_modal';
import Footer from './components/footer/footer';

const App = ({ pictamovie }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    pictamovie
      .initialData()
      .then(movies => setMovies(movies));
  }, []);

  const search = (title) => {
    pictamovie
      .searchByTitle(title)
      .then(movies => setMovies(movies));
  }

  const openModal = (id) => {
    pictamovie
      .searchById(id)
      .then(movie => setSelectedMovie(movie));
    setIsModalActive(true);
  }

  const closeModal = () => {
    setIsModalActive(false);
    setSelectedMovie(null);
  }

  return (
    <div>
      <SearchHeader onSearch={search} />
      <MovieList movies={movies} onMovieClick={openModal} />
      {
        isModalActive && selectedMovie &&
        <MovieModal movie={selectedMovie} 
                    onModalClose={closeModal} 
        />
      }
      <Footer />
    </div>
  );
}

export default App;
