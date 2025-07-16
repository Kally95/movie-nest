import { Card, CardBody, Image, Heading, Box } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function MovieSectionItem({ id, title, movieImage }) {
  return (
    <Card
      width="100%"
      maxW="200px"
      height="320px"
      overflow="hidden"
      textAlign="center"
      shadow="lg"
      bg="#1E1E1E"
      _hover={{
        transform: "scale(1.05)",
      }}
      transition="transform 0.2s ease-in-out"
    >
      <Box height="240px" overflow="hidden" as={RouterLink} to={`/movie/${id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movieImage}`}
          alt={title}
          objectFit="cover"
          height="100%"
          width="100%"
        />
      </Box>
      <CardBody bg="#1E1E1E" color="white">
        <Heading size="sm" textAlign="center">
          {title}
        </Heading>
      </CardBody>
    </Card>
  );
}
