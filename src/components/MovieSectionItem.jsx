import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/image";

export default function MovieSectionItem({ movie }) {
  const imageUrl = getImageUrl(movie.backdrop_path || movie.poster_path);

  return (
    <Link to={`/movie/${movie.id}`}>
      <VStack
        spacing={2}
        align="stretch"
        _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
      >
        <Box borderRadius="md" overflow="hidden" shadow="lg">
          <Image src={imageUrl} alt={movie.title} objectFit="cover" />
        </Box>
        <Text fontWeight="bold" noOfLines={1} textAlign="center">
          {movie.title}
        </Text>
      </VStack>
    </Link>
  );
}
