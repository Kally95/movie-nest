import { useWatchedListContext } from "../context/WatchedContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import MovieSection from "./MovieSection";
import { Flex, Text, Heading } from "@chakra-ui/react";
export default function WatchedMoviesList() {
  const { watchedList } = useWatchedListContext();
  if (watchedList.length === 0 || !watchedList) {
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
      <MovieSection movieSectionLabel={"Watched Movies"} movies={watchedList} />
    </ErrorBoundary>
  );
}
