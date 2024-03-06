import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjJjNmQ2YmM3NGRmN2QyZjIxZmU0ZDQ5ZWIzZWE0OSIsInN1YiI6IjY1ZTRkODY3ZmUwNzdhMDE4NTExN2NjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5t6b-6xUJc0RhwRo3Vsx-2W4O08UKCaRrIBM4KeFPjM";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const fetchMovies = async (searchQuery) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        include_adult: false,
        language: "en-US",
        query: searchQuery,
      },
    }
  );
  // return response.data.results;
  return response.data.results.filter((result) =>result.original_language === "en"
);
};

export const fetchTrendingTodayMovies = async () => {
  const response = await axios.get("/trending/movie/day", {
    params: {
      include_adult: false,
      language: "en-US",
    },
  });
  console.log(response.data.results);
  return response.data.results.filter((result) =>result.original_language === "en"
);
  // return response.data.results;
};

export const fetchMovieById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?language=en-US`);
  return response.data;
};
