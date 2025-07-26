import { Flex, Container, ChakraProvider } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import useMovieByName from "../hooks/useMovieByName";

export default function RootLayout() {
  const [movieName, setMovieName] = useState("");
  const navigate = useNavigate();
  const { movies, loading, error } = useMovieByName(movieName);
  const handleSearch = (e) => {
    setMovieName(e.target.value);
  };

  return (
    <ChakraProvider>
      <Flex
        w="100%"
        maxW={{ base: "100%", md: "100%", xl: "2400px" }}
        mx="auto"
        px={{ base: 4, md: 8, xl: 12 }}
        py={8}
        minH="100vh"
        bg="#1E1E1E"
        color="white"
        flexDirection="column"
      >
        <Navbar />
        <Container maxW="container.xl" pt={4}>
          <Outlet
            context={{ movies, loading, error, movieName, handleSearch }}
          />
        </Container>
      </Flex>
    </ChakraProvider>
  );
}
