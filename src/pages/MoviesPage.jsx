import { useState, useEffect, useId } from "react";
import { fetchMovies } from "../movies-api";
import MovieList from "../components/MovieList";
import { toast, Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import { FiSearch } from "react-icons/fi";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParam.get("query");
  const searchBarId = useId();

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (!query) {
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
  }, [query, searchParam.query]);

  return (
    <div>
      <Toaster />
      <div className={css.formWrapper}>
        <form onSubmit={handleSubmitSearch} className={css.searchForm}>
          <input
            className={css.searchInput}
            value={searchParam.query}
            name="searchBar"
            id={searchBarId}
            type="text"
            autoComplete="on"
            placeholder="Search for movies"
            onChange={(e) => setSearchParam({ query: e.target.value })}
          />
          <button className={css.searchBtn} type="submit">
            <FiSearch size={18} />
          </button>
        </form>
      </div>
      {isLoading && <b>Loading movies...</b>}
      {error && <b>Something went wrong. Try reloading the page.</b>}
      <MovieList movies={movies} />
    </div>
  );
}
