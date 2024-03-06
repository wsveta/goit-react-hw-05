import MovieList from "../MovieList";
import { useEffect, useState } from "react";
import { fetchTrendingTodayMovies } from "../../movies-api";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetchTrendingTodayMovies();
        setMovies(response);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      {isLoading && <b>Loading movies...</b>}
      {error && <b>Something went wrong. Try reloading the page.</b>}
      <MovieList movies={movies} />
    </div>
  );
}
