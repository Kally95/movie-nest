import usePopularMovies from "../hooks/usePopularMovies";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import MovieSection from "./MovieSection";
import LoadingSpinner from "./ui/LoadingSpinner";
export default function PopularMoviesList() {
  const [popularMovies, error, loading] = usePopularMovies();

  if (error) {
    throw error;
  }
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <MovieSection
          movieSectionLabel={"Popular Movies 🍿"}
          movies={popularMovies}
        />
      )}
    </ErrorBoundary>
  );
}
