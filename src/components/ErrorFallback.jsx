import { Flex, Heading } from "@chakra-ui/react";

export default function ErrorFallback({ error }) {
  return (
    <Flex
      w="100%"
      maxW={{ base: "100%", md: "100%", xl: "2400px" }}
      mx="auto"
      justifyContent="center"
      align="center"
      minH="200px"
    >
      <Heading color="red.500">
        {error?.message || "An unexpected error occurred."}
      </Heading>
    </Flex>
  );
}
