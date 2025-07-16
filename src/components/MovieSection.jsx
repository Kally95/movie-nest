import { SimpleGrid, Box, Text, Flex } from "@chakra-ui/react";
import MovieSectionItem from "./MovieSectionItem";
import { Link } from "react-router-dom";

export default function MovieSection({ movieSectionLabel, movies, path = "" }) {
  return (
    <Box px={6} maxW="100%" mx="auto" mt="5rem">
      <Flex justify="space-between" align="center" mb={4} width="100%">
        <Text fontSize="lg" fontWeight="bold">
          <Link to={path}>{movieSectionLabel}</Link>
        </Text>
        {path !== "" && (
          <Link to={path}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="blue.400"
              cursor="pointer"
            >
              See all...
            </Text>
          </Link>
        )}
      </Flex>
      <Flex justify="center">
        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
          spacing={8}
          width="fit-content"
          mx="auto"
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
      </Flex>
    </Box>
  );
}
