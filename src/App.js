import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLocading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchBovieshandler() {
    setIsLocading(true)
    setError(null)
    try {
      const response = await fetch('https://swapi.dev/api/films/')
      
      if(!response.ok){
        throw new Error('Something went wrong')
      }
      const data = await response.json()
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
    } catch (e) {
      setError(e.message)
      setIsLocading(false)
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchBovieshandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && !error ? <p>Loading</p> : movies.length > 0  ? <MoviesList movies={movies} /> :  !error && <p>found no movies</p>}
        {!isLoading && error &&<p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
