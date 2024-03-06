import { useState, useEffect, useId, useMemo } from "react";
import { fetchMovies } from "../../movies-api";
import MovieList from "../MovieList";
import { toast, Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParam.get("query");
  const searchBarId = useId();

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (query === null) {
      toast("Please enter something");
      return;
    }

    setSearchParam({ query: e.target.elements.searchBar.value });
    e.target.reset();
  };

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        const response = await fetchMovies(query);
        setMovies(response);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [query, searchParam]);

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmitSearch}>
        <input
          value={query !== null ? query : ""}
          name="searchBar"
          id={searchBarId}
          type="text"
          autoComplete="on"
          placeholder="Search for movies"
          onChange={(e) => setSearchParam({ query: e.target.value })}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <b>Loading movies...</b>}
      {error && <b>Something went wrong. Try reloading the page.</b>}
      <MovieList movies={movies} />
    </div>
  );
}
