import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';
//import { getMovies } from '../../moviesApi';

export default function HomePage() {
  return (
    <main>
      <div>
        <h1 className={css.h1}>Trending Today</h1>
        <MovieList />
      </div>
    </main>
  );
}
