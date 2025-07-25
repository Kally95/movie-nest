import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MovieSectionItem from "../components/MovieSectionItem";

export default function SearchWithDropdown({
  movieName,
  handleSearch,
  movies,
  loading,
}) {
  const navigate = useNavigate();
  const hasSearchQuery = movieName.trim() !== "";
  const hasMovies = movies && movies.length > 0;
  const showDropdown = hasSearchQuery && hasMovies;

  return (
    <Box position="relative" w={{ base: "100%", md: "600px" }} mx="auto">
      <InputGroup size="lg">
        <Input
          id="search"
          type="text"
          value={movieName}
          onChange={handleSearch}
          placeholder="Search for a film..."
          variant="outline"
          bg="gray.700"
          _placeholder={{ color: "gray.400" }}
          focusBorderColor="red.500"
        />
        <InputRightElement>
          {loading ? (
            <Spinner color="red.500" />
          ) : (
            <SearchIcon color="gray.400" />
          )}
        </InputRightElement>
      </InputGroup>

      {showDropdown && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          right="0"
          bg="gray.800"
          mt={2}
          borderRadius="md"
          shadow="lg"
          zIndex="dropdown"
          overflow="hidden"
        >
          <VStack spacing={2} align="stretch" p={2}>
            {movies.slice(0, 5).map((movie) => (
              <MovieSectionItem
                key={movie.id}
                id={movie.id}
                title={movie.title}
                movieImage={movie.backdrop_path}
              />
            ))}

            {movies.length > 5 && (
              <RouterLink
                to={`/search-results?query=${encodeURIComponent(movieName)}`}
              >
                <Box
                  p={3}
                  textAlign="center"
                  fontWeight="bold"
                  color="red.400"
                  _hover={{ bg: "gray.700" }}
                  cursor="pointer"
                  borderRadius="md"
                >
                  <Text>See all {movies.length} results</Text>
                </Box>
              </RouterLink>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
}
