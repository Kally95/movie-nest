import { useParams } from "react-router-dom";
import {
  Flex,
  AspectRatio,
  Heading,
  Text,
  Image,
  Box,
  Badge,
  Icon,
} from "@chakra-ui/react";
import usePopularMovies from "../hooks/useMovieById";
import LoadingSpinner from "./ui/LoadingSpinner";
import { HiHeart } from "react-icons/hi";
import useGetCastById from "../hooks/useGetCastById";
import CastItemSection from "./CastItemSection";
import useGetTrailerById from "../hooks/useGetTrailerById";
import { useWatchlistContext } from "../context/WatchlistContext";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useWatchedListContext } from "../context/WatchedContext";
import { useAuth } from "../context/AuthContext";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, error, loading] = usePopularMovies(id);
  const [creditsData] = useGetCastById(id);
  const [trailer] = useGetTrailerById(id);
  const { toggleWatchlist, watchlist } = useWatchlistContext();
  const { toggleWatchedList, watchedList } = useWatchedListContext();
  const { isLoggedIn } = useAuth();
  const trailerInfo = trailer.results?.find(
    (t) => t.type === "Trailer" && t.site === "YouTube"
  );

  const ytKey = trailerInfo?.key;
  const releaseYear = movie.release_date?.split("-")[0] ?? "Unknown";
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);
  const isWatched = watchedList.some((m) => m.id === movie.id);

  if (!id) {
    return <Text>No movie ID provided</Text>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!movie) {
    return <Text>No movie found</Text>;
  }

  return (
    <>
      <Flex mt="5rem" width="100%" mb="3rem">
        <Box position="relative">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            borderRadius="md"
            objectFit="cover"
            maxW="500px"
            alt={movie.title}
          />

          {isLoggedIn && (
            <Box
              position="absolute"
              top={3}
              right={3}
              display="flex"
              flexDirection="column"
              gap={3}
            >
              {isInWatchlist ? (
                <Icon
                  as={HiHeart}
                  boxSize={8}
                  cursor="pointer"
                  color="#E53E3E"
                  onClick={() => toggleWatchlist(movie)}
                />
              ) : (
                <Icon
                  as={HiHeart}
                  boxSize={8}
                  cursor="pointer"
                  onClick={() => toggleWatchlist(movie)}
                />
              )}

              {isWatched ? (
                <Icon
                  as={IoEye}
                  boxSize={8}
                  color="#E53E3E"
                  cursor="pointer"
                  onClick={() => toggleWatchedList(movie)}
                />
              ) : (
                <Icon
                  as={IoEyeOff}
                  boxSize={8}
                  cursor="pointer"
                  onClick={() => toggleWatchedList(movie)}
                />
              )}
            </Box>
          )}
        </Box>

        <Flex
          flexDirection="column"
          pl={5}
          w="100%"
          justifyContent="space-between"
        >
          <Box>
            <Heading>
              {movie.title} ({releaseYear})
            </Heading>
            <Flex gap={2} mt={2} wrap="wrap">
              {movie.genres?.map((genre) => (
                <Badge key={genre.id} colorScheme="red">
                  {genre.name}
                </Badge>
              ))}
            </Flex>
          </Box>

          <Box>
            <Heading>Overview</Heading>
            <Text>{movie.overview}</Text>
          </Box>

          <Box>
            <Text fontSize="m">
              Rating: {Math.floor(movie.vote_average)}/10 rated by{" "}
              {movie.vote_count} people.
            </Text>
          </Box>
        </Flex>
      </Flex>

      {creditsData && creditsData.cast ? (
        <CastItemSection cast={creditsData.cast} />
      ) : (
        <LoadingSpinner />
      )}
      {trailerInfo ? (
        <Flex mt="3rem">
          <AspectRatio w="100%" ratio={16 / 9}>
            <iframe
              title={movie.title}
              src={`https://www.youtube.com/embed/${ytKey}`}
              allowFullScreen
            />
          </AspectRatio>
        </Flex>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
