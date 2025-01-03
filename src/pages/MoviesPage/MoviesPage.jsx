import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { getMoviesWithSearch } from '../../moviesApi';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('query') || '';
  const notify = () => toast.error('Something went wrong. Please, try again!');

  useEffect(() => {
    if (!search) {
      return;
    }
    async function searchMovies() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMoviesWithSearch(search);
        setMovies(data.results);
      } catch (error) {
        setError(true);
        notify();
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    searchMovies();
  }, [search]);

  const handleSearch = async search => {
    setSearchParams({ query: search });
    setMovies([]);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <Toaster />}
      {movies.length > 0 && <MovieList items={movies} />}
    </div>
  );
}
