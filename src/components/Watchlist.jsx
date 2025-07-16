import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import MovieSection from "./MovieSection";
import { useWatchlistContext } from "../context/WatchlistContext";
import { Flex, Heading, Text } from "@chakra-ui/react";

export default function Watchlist() {
  const { watchlist } = useWatchlistContext();

  if (watchlist.length === 0 || !watchlist) {
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
          Search for a film and click the heart icon to add it to your watched
          list.
        </Text>
      </Flex>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MovieSection movieSectionLabel={"Watchlist"} movies={watchlist} />
    </ErrorBoundary>
  );
}
