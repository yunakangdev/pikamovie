import { useState, useEffect } from 'react';
import SearchHeader from './components/search_header/search_header';
import MovieList from './components/movie_list/movie_list';

function App({ pictamovie }) {
  const [movies, setMovies] = useState([]);

  const search = (query) => {
    pictamovie
      .search(query)
      .then(movies => setMovies(movies));
  }
  
  useEffect(() => {
    pictamovie
      .initialData()
      .then(movies => setMovies(movies));
  }, []);

  return (
    <div>
      <SearchHeader onSearch={search} />
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
