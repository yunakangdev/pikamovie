import { useState, useEffect } from 'react';
import MovieList from './components/movie_list/movie_list';
import './app.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://www.omdbapi.com/?s=midnight&type=movie&apikey=b2a58f20", requestOptions)
    .then(response => response.json())
    .then(result => setMovies(result.Search))
    .catch(error => console.log('error', error));
  }, []);

  return <MovieList movies={movies} />;
}

export default App;
