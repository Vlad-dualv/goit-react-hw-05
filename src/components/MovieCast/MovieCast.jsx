import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieCast } from '../../moviesApi';
import toast, { Toaster } from 'react-hot-toast';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const notify = () => toast.error('Something went wrong. Please, try again!');
  useEffect(() => {
    async function fetchCast() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
        notify();
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCast();
  }, [movieId]);

  return (
    <div className={css.cast}>
      {loading && <p>Loading...</p>}
      {error && <Toaster />}
      <ul>
        {cast.length > 0
          ? cast.map(({ id, name, character, profile_path, backdrop_path }) => (
              <li key={id} className={css.actor}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w200${profile_path}`
                      : `https://image.tmdb.org/t/p/w200${backdrop_path}`
                  }
                  alt={name}
                  loading="lazy"
                  width="200"
                />
                <div className={css.wrapper}>
                  <p>{name}</p>
                  <p>
                    Character: <span>{character}</span>
                  </p>
                </div>
              </li>
            ))
          : "Sorry, there's no information about actors."}
      </ul>
    </div>
  );
}
