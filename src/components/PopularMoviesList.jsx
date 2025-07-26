import { useState } from "react";
import MovieSectionItem from "./MovieSectionItem";
import LoadingSpinner from "./ui/LoadingSpinner";
import { SimpleGrid, Text, Box, Flex, Heading } from "@chakra-ui/react";
import Pagination from "./Pagination";
import usePopularMovies from "../hooks/usePopularMovies";

export default function PopularMoviesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { popularMovies, totalPages, error, loading } = usePopularMovies({
    page: currentPage,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !popularMovies || popularMovies.length === 0) {
    return (
      <Text mt={10} textAlign="center" fontSize="lg">
        {error ? "Could not fetch movies." : "No popular movies found."}
      </Text>
    );
  }

  return (
    <Box w="100%" mt="5rem">
      <Heading mb={8}>Popular Movies</Heading>
      <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={6} mb={6}>
        {popularMovies.map((movie) => (
          <MovieSectionItem key={movie.id} movie={movie} />
        ))}
      </SimpleGrid>

      <Flex justify="center" mt={4}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Flex>
    </Box>
  );
}
