import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getMovies } from '../../moviesApi';

export default function HomePage() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const notify = () => toast.error('Something went wrong. Please, try again!');

  useEffect(() => {
    async function fetchTrends() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovies();
        setTrends(data.results);
      } catch {
        setError(true);
        notify();
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrends();
  }, []);

  return (
    <main>
      <div>
        {loading && <p>Loading...</p>}
        {error && <Toaster />}
        <h1 className={css.h1}>Trending Today</h1>
        <MovieList items={trends} />
      </div>
    </main>
  );
}
