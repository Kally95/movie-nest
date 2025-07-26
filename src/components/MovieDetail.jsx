import { useParams, useNavigate } from "react-router-dom";
import {
  Flex,
  AspectRatio,
  Heading,
  Text,
  Image,
  Box,
  Badge,
  Icon,
  Button,
} from "@chakra-ui/react";
import useMovieById from "../hooks/useMovieById";
import LoadingSpinner from "./ui/LoadingSpinner";
import { HiHeart, HiArrowLeft } from "react-icons/hi";
import CastItemSection from "./CastItemSection";
import useGetCastById from "../hooks/useGetCastById";
import useGetTrailerById from "../hooks/useGetTrailerById";
import { useWatchlistContext } from "../context/WatchlistContext";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useWatchedListContext } from "../context/WatchedContext";
import { useAuth } from "../context/AuthContext";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Correctly destructure the objects from all hooks
  const { movie, error: movieError, loading: movieLoading } = useMovieById(id);
  const { creditsData, loading: castLoading } = useGetCastById(id);
  const { trailer, loading: trailerLoading } = useGetTrailerById(id);

  const { toggleWatchlist, watchlist } = useWatchlistContext();
  const { toggleWatchedList, watchedList } = useWatchedListContext();
  const { isLoggedIn } = useAuth();

  // 2. Check for loading state from all hooks
  if (movieLoading || castLoading || trailerLoading) {
    return <LoadingSpinner />;
  }

  if (movieError || !movie) {
    return <Text>Movie not found.</Text>;
  }

  // 3. Safely access nested properties
  const trailerInfo = trailer?.results?.find(
    (t) => t.type === "Trailer" && t.site === "YouTube"
  );

  const ytKey = trailerInfo?.key;
  const releaseYear = movie.release_date?.split("-")[0] ?? "Unknown";
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);
  const isWatched = watchedList.some((m) => m.id === movie.id);

  return (
    <Box mt="5rem">
      <Button
        leftIcon={<HiArrowLeft />}
        onClick={() => navigate(-1)}
        mb={6}
        variant="outline"
        bg="#e53e3e"
        color="white"
        borderColor="none"
      >
        Back
      </Button>

      <Flex width="100%" mb="3rem">
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
              <Icon
                as={HiHeart}
                boxSize={8}
                cursor="pointer"
                color={isInWatchlist ? "#E53E3E" : "white"}
                onClick={() => toggleWatchlist(movie)}
              />
              <Icon
                as={isWatched ? IoEye : IoEyeOff}
                boxSize={8}
                cursor="pointer"
                color={isWatched ? "#E53E3E" : "white"}
                onClick={() => toggleWatchedList(movie)}
              />
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

      {creditsData?.cast ? (
        <CastItemSection cast={creditsData.cast} />
      ) : (
        <Text>Cast information not available.</Text>
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
        <Text mt={4}>Trailer not available.</Text>
      )}
    </Box>
  );
}
