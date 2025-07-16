import { Flex, Text, Heading } from "@chakra-ui/react";
import MovieSection from "./MovieSection";

export default function WatchListSection({ watchlist }) {
  if (!watchlist || watchlist.length === 0) {
    return (
      <Flex
        w="100%"
        className="watchlist-empty-message"
        flexDirection="column"
        alignItems="center"
        p="2rem"
        mt="5rem"
      >
        <Heading>Your watchlist is empty 🫣</Heading>
        <Text>
          Search for a film and click the heart icon to add it to your
          watchlist.
        </Text>
      </Flex>
    );
  }
  return (
    <MovieSection
      path="watchlist"
      movies={watchlist.slice(0, 5)}
      movieSectionLabel="Watchlist 🎬"
    />
  );
}
