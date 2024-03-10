import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

const Navigation = lazy(() => import("./Navigation/Navigation"));
const HomePage = lazy(() => import("../pages/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage"));
const MovieCast = lazy(() => import("./MovieCast.jsx"))
const MovieReviews = lazy(() => import("./MovieReviews.jsx"))
const NotFoundPage = lazy(() => import("../pages/NotFoundPage.jsx"))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
export default App;
