import { Box, Image, Text, VStack } from "@chakra-ui/react";
import defaultPic from "../assets/defaultPic.jpg";

export default function CastItem({ character, name, picture }) {
  return (
    <Box
      w="120px"
      p={2}
      borderRadius="md"
      boxShadow="md"
      _hover={{ transform: "scale(1.05)" }}
      transition="transform 0.2s"
      textAlign="center"
    >
      <Image
        src={picture ? `https://image.tmdb.org/t/p/w500${picture}` : defaultPic}
        alt={name}
        borderRadius="md"
        objectFit="cover"
        w="100%"
        h="160px"
        mb={2}
      />
      <VStack spacing={0}>
        <Text fontWeight="bold" fontSize="sm" noOfLines={1}>
          {name}
        </Text>
        <Text fontSize="xs" noOfLines={2}>
          {character}
        </Text>
      </VStack>
    </Box>
  );
}
