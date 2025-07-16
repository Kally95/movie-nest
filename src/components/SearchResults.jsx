import MovieSectionItem from "./MovieSectionItem";
import LoadingSpinner from "./ui/LoadingSpinner";
import { SimpleGrid, Text } from "@chakra-ui/react";

export default function SearchResults({
  movies,
  loading,
  searchQuery = "",
  fallbackMessage = "No movies found.",
}) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!movies || movies.length === 0) {
    return (
      <Text mt={10} textAlign="center" fontSize="lg">
        {searchQuery
          ? `No results found for "${searchQuery}"`
          : fallbackMessage}
      </Text>
    );
  }

  return (
    <SimpleGrid
      columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
      spacing={6}
      w="100%"
      marginTop="10rem"
    >
      {movies.map((movie) => (
        <MovieSectionItem
          key={movie.id}
          id={movie.id}
          title={movie.title}
          movieImage={movie.backdrop_path}
        />
      ))}
    </SimpleGrid>
  );
}
