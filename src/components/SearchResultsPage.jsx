import { useState } from "react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";
import { Box, Heading, SimpleGrid, Text, Center, Flex } from "@chakra-ui/react";
import useMovieByName from "../hooks/useMovieByName";
import MovieSectionItem from "./MovieSectionItem";
import LoadingSpinner from "./ui/LoadingSpinner";
import Pagination from "./Pagination";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const { movies, loading, error, totalPages } = useMovieByName(
    query,
    currentPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <Center h="50vh">
        <LoadingSpinner size="xl" color="red.500" />
      </Center>
    );
  }

  if (error) {
    return <Text>Error loading search results. Please try again later.</Text>;
  }

  return (
    <Box>
      <Flex alignItems="center" mb={8}>
        <Heading as="h1" size="xl">
          Search Results for: "{query}"
        </Heading>
        <Heading
          as={RouterLink}
          to="/"
          size="lg"
          fontSize="1rem"
          _hover={{ textDecoration: "underline" }}
          ml="auto"
        >
          Back home
        </Heading>
      </Flex>
      {movies.length > 0 ? (
        <>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={8}
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
          {/* 5. Render the Pagination component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <Text>No results found for "{query}".</Text>
      )}
    </Box>
  );
}
