import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieReviews } from '../../moviesApi';
import toast, { Toaster } from 'react-hot-toast';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const notify = () => toast.error('Something went wrong. Please, try again!');
  useEffect(() => {
    async function fetchReview() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReview(data.results);
      } catch (error) {
        setError(true);
        notify();
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchReview();
  }, [movieId]);
  return (
    <div className={css.reviews}>
      {loading && <p>Loading...</p>}
      {error && <Toaster />}
      <ul>
        {review.length > 0
          ? review.map(({ id, author, content }) => (
              <li key={id} className={css.review}>
                <h3>Author: {author}</h3>
                <p>{content}</p>
              </li>
            ))
          : "Sorry, there's no reviews."}
      </ul>
    </div>
  );
}
