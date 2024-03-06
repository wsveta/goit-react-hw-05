import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li className={css.movieCard} key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.original_title}
              />
              <p className={css.movieTitle}>{movie.original_title}</p>
              <p>{movie.release_date.slice(0,4)}</p>
            </Link>
        </li>
      ))}
    </ul>
  );
}