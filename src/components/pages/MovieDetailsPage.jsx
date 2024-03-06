import { Outlet, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById } from "../../movies-api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        const response = await fetchMovieById(movieId);
        setMovie(response);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [movieId]);
  return (
    <div>
      {movie && (
        <div className={css.movieDetailsContainer}>
          <img
            width="250"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt=""
          />
          <div>
            <h1>
              {movie.title} <span>({movie.release_date.slice(0, 4)})</span>
            </h1>
            <p>User Score: {movie.vote_average}</p>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <ul>
              {movie.genres.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
            <p>
              Runtime: <span>{movie.runtime}</span>
            </p>
            <p>
              Status: <span>{movie.status}</span>
            </p>
          </div>
        </div>
      )}
      <div>
        {" "}
        <p>Additional inforamtion</p>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </div>
      {isLoading && <b>Loading movies...</b>}
      {error && <b>Something went wrong. Try reloading the page.</b>}
      <Outlet />
    </div>
  );
}
