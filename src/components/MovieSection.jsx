import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MovieSectionItem from "./MovieSectionItem";

export default function MovieSection({ movies, movieSectionLabel, path }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <Box w="100%" my={8}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="lg">
          {movieSectionLabel}
        </Heading>
        {path && (
          <Text as={Link} to={path} color="red.400" fontWeight="bold">
            See all
          </Text>
        )}
      </Flex>
      <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={6}>
        {movies.map((movie) => (
          <MovieSectionItem key={movie.id} movie={movie} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
