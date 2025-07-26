import { Button, Flex, Text } from "@chakra-ui/react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Flex align="center" justify="center" mt={8}>
      <Button
        onClick={handlePrevious}
        isDisabled={currentPage === 1}
        colorScheme="red"
        variant="outline"
        mr={4}
      >
        Previous
      </Button>
      <Text>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        onClick={handleNext}
        isDisabled={currentPage === totalPages}
        colorScheme="red"
        variant="outline"
        ml={4}
      >
        Next
      </Button>
    </Flex>
  );
}
