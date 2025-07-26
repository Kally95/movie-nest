import { useWatchedListContext } from "../context/WatchedContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import MovieSectionItem from "./MovieSectionItem";
import Pagination from "./Pagination";
import usePagination from "../hooks/usePagination";
import { Flex, Text, Heading, Box, SimpleGrid } from "@chakra-ui/react";

export default function WatchedMoviesList() {
  const { watchedList } = useWatchedListContext();
  const { currentPage, totalPages, currentData, handlePageChange } =
    usePagination(watchedList, 10);

  if (watchedList.length === 0) {
    return (
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        p="2rem"
        mt="5rem"
      >
        <Heading>Your watched list is empty</Heading>
        <Text>
          Search for a film and click the eye icon to add it to your watched
          list.
        </Text>
      </Flex>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Box w="100%" mt="5rem">
        <Heading mb={8}>Watched Movies</Heading>
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
