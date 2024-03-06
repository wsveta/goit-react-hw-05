import { useEffect, useState } from "react";
import { fetchCast } from "../movies-api";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setIsLoading(true);
        const cast = await fetchCast(movieId);
        setCast(cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getCast();
  }, [movieId]);
  return (
    <div>
      <ul>
        {cast.map(({ id, original_name, profile_path, character }) => (
          <li key={id}>
            <img width="25%" src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt={original_name} />
            <p>{original_name}</p>
            <p>Character: <span>{character}</span></p>
          </li>
        ))}
      </ul>
      {isLoading && <b>Loading movies...</b>}
      {error && <b>Something went wrong. Try reloading the page.</b>}
    </div>
  );
}
