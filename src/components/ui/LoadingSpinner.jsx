import { Flex, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
  return (
    <Flex
      w="100%"
      maxW={{ base: "100%", md: "100%", xl: "2400px" }}
      mx="auto"
      justifyContent="center"
    >
      <Spinner color="#E53E3E" size="lg" />
    </Flex>
  );
}
