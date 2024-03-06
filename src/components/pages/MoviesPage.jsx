import { useState, useEffect, useId } from "react";
import { fetchMovies } from "../../movies-api";
import MovieList from "../MovieList";
import { toast, Toaster } from "react-hot-toast";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchBarId = useId();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    if (searchQuery === "") {
      toast("Please enter something");
      return;
    }
    
    setSearchQuery(e.target.elements.searchBar.value);
    e.target.reset();
  };

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        const response = await fetchMovies(searchQuery);
        setMovies(response);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [searchQuery]);

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmitSearch}>
        <input
          name="searchBar"
          id={searchBarId}
          type="text"
          autoComplete="on"
          placeholder="Search for movies"
          onChange={handleSearch}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <b>Loading movies...</b>}
      {error && <b>Something went wrong. Try reloading the page.</b>}
      <MovieList movies={movies} />
    </div>
  );
}
