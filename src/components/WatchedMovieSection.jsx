import MovieSection from "./MovieSection";
import { Flex, Text, Heading } from "@chakra-ui/react";

export default function WatchedMovieSection({ watchedList }) {
  if (!watchedList || watchedList.length === 0) {
    return (
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        p="2rem"
        mt="5rem"
      >
        <Heading>Your watched list is empty 👀</Heading>
        <Text>
          Search for a film and click the eye icon to add it to your watched
          list.
        </Text>
      </Flex>
    );
  }
  return (
    <MovieSection
      path="watched-movies"
      movies={watchedList.slice(0, 5)}
      movieSectionLabel="Watched movies ✅"
    />
  );
}
