import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getMovieDetails } from '../../moviesApi.js';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const { movieId } = useParams();
  const notify = () => toast.error('Something went wrong. Please, try again!');
  useEffect(() => {
    async function fetchDetails() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setDetails(data);
      } catch (error) {
        setError(true);
        notify();
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [movieId]);

  const {
    poster_path,
    backdrop_path,
    original_title,
    popularity,
    overview,
    genres,
  } = details;

  return (
    <main className={css.container}>
      <div>
        {loading && <p>Loading...</p>}
        {error && <Toaster />}
        <Link className={css.back} to={location.state?.from || '/movies'}>
          Go back
        </Link>
        <div className={css.movieInfo}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w300${poster_path}`
                : `https://image.tmdb.org/t/p/w300${backdrop_path}`
            }
            loading="lazy"
            alt="Movie Poster"
          />
          <div className={css.infoText}>
            <h1>{original_title}</h1>
            {popularity && <p>User score: {popularity}</p>}
            {overview && <h2>Overview</h2>}
            {overview && <p>{overview}</p>}
            {genres && genres.length > 0 && (
              <div>
                <h2>Genres</h2>
                <ul className={css.genres}>
                  {genres.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className={css.additional}>
          <h3>Additional Information</h3>
          <ul>
            <li>
              <Link to="cast" state={{ from: location.state?.from }}>
                Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" state={{ from: location.state?.from }}>
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
}
