import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../movies-api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
 
  useEffect(() => {
    async function getReviews() {
      try {
        setIsLoading(true);
        const reviews = await fetchReviews(movieId);
        setReviews(reviews);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movieId]);
  return (
    <div className={css.reviewsContainer}>
      {reviews.length !== 0 ? (
        <ul className={css.reviews}>
          {reviews.map(({ id, author, content, rating }) => (
            <li className={css.review} key={id}>
              <p className={css.author}>{author}</p>
              <p className={css.rating}>{rating}</p>
              <p className={css.content}>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nothing were found</p>
      )}

      {isLoading && <b>Loading reviews...</b>}
      {error && <b>Something went wrong. Try reloading the page.</b>}
    </div>
  );
}
