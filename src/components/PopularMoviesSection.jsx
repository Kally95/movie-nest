import usePopularMovies from "../hooks/usePopularMovies";
import MovieSection from "./MovieSection";
import LoadingSpinner from "./ui/LoadingSpinner";

export default function PopularMoviesSection() {
  const [popularMovies, error, loading] = usePopularMovies({ limit: 5 });

  if (error) {
    throw error;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <MovieSection
      path="popular-movies"
      movies={popularMovies.slice(0, 5)}
      movieSectionLabel="Popular movies 👉"
    />
  );
}
