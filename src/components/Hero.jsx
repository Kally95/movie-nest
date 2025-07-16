import { Box, Text, Container } from "@chakra-ui/react";

export default function Hero() {
  return (
    <Box color="white" py={20}>
      <Container maxW="container.md" textAlign="center">
        <Text lineHeight="1.5" fontWeight="bold" fontSize="2.5rem">
          Discover your next favorite film with <em>MovieNest</em> — your
          personal hub for movie exploration.
        </Text>
      </Container>
    </Box>
  );
}
