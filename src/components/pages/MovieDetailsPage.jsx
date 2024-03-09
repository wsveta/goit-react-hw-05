import { Outlet, NavLink, useParams, useLocation } from "react-router-dom";
import { useEffect, useState, Suspense, useRef } from "react";
import { fetchMovieById } from "../../movies-api";
import css from "./MovieDetailsPage.module.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

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
    <div className={css.container}>
      <NavLink className={css.backBtn} to={backLinkRef.current}><IoArrowBackCircleOutline size={30}/>Go back</NavLink>
      {movie && (
        <div className={css.movieDetailsContainer}>
          <img
            width="250"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <div>
            <h1>
              {movie.title} <span>({movie.release_date.slice(0, 4)})</span>
            </h1>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
            <h3>Genres:</h3>
            <ul className={css.genres}>
              {movie.genres.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
            <h3 className={css.subtitles}>User Score: <span>{movie.vote_average}</span></h3>
            <h3 className={css.subtitles}>
              Runtime: <span>{movie.runtime}</span>
            </h3>
            <h3 className={css.subtitles}>
              Status: <span>{movie.status}</span>
            </h3>
          </div>
        </div>
      )}
        <p>Additional information</p>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      {isLoading && <b>Loading details...</b>}
      {error && <b>Something went wrong. Try reloading the page.</b>}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
