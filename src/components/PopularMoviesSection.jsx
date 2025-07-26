import usePopularMovies from "../hooks/usePopularMovies";
import MovieSection from "./MovieSection";
import LoadingSpinner from "./ui/LoadingSpinner";
import { Text } from "@chakra-ui/react";

export default function PopularMoviesSection() {
  const { popularMovies, error, loading } = usePopularMovies({});

  if (error) {
    return <Text>Could not load popular movies.</Text>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <MovieSection
      path="popular-movies"
      movies={popularMovies ? popularMovies.slice(0, 5) : []}
      movieSectionLabel="Popular movies 👉"
    />
  );
}
