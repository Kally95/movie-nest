import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import MovieSectionItem from "./MovieSectionItem";
import Pagination from "./Pagination";
import usePagination from "../hooks/usePagination";
import { useWatchlistContext } from "../context/WatchlistContext";
import { Flex, Heading, Text, Box, SimpleGrid } from "@chakra-ui/react";

export default function Watchlist() {
  const { watchlist } = useWatchlistContext();
  const { currentPage, totalPages, currentData, handlePageChange } =
    usePagination(watchlist, 10);

  if (watchlist.length === 0) {
    return (
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        p="2rem"
        mt="5rem"
      >
        <Heading>Your watchlist is empty</Heading>
        <Text>
          Search for a film and click the heart icon to add it to your
          watchlist.
        </Text>
      </Flex>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Box w="100%" mt="5rem">
        <Heading mb={8}>My Watchlist</Heading>
        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
          spacing={6}
          mb={6}
        >
          {currentData.map((movie) => (
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
    </ErrorBoundary>
  );
}
