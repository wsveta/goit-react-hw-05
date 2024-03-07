import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../movies-api";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {movieId} = useParams();

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
    <div>
      {reviews.length !== 0 ? (
        <ul>
        {reviews.map(({ id, author, content, rating }) => (
          <li key={id}>
            <p>{author}</p>
            <p>{rating}</p>
            <p>{content}</p>
          </li>
        ))}
      </ul>
      ) : <p>Nothing were found</p>}

      {isLoading && <b>Loading reviews...</b>}
      {error && <b>Something went wrong. Try reloading the page.</b>}
    </div>
  );
}
