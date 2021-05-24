import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLocading] = useState(false)

  async function fetchBovieshandler() {
    setIsLocading(true)
    const response =await fetch('https://swapi.dev/api/films/')
    const data =await response.json()

    const transformedMovies = data.results.map(movie => {
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        release: movie.release_date
      }
    })
    setMovies(transformedMovies)
    setIsLocading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchBovieshandler}>Fetch Movies</button>
      </section>
      <section>
       {isLoading ? <p>Loading</p> : movies.length > 0 ? <MoviesList movies={movies}/> : <p>found no movies</p> }
      </section>
    </React.Fragment>
  );
}

export default App;
