import { Flex, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import useMovieByName from "../hooks/useMovieByName";
import { useNavigate } from "react-router-dom";

export default function RootLayout() {
  const [movieName, setMovieName] = useState("");
  const [movies, loading, error] = useMovieByName(movieName);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setMovieName(e.target.value);
    navigate("/");
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
        <Navbar handleSearch={handleSearch} movieName={movieName} />
        <Container maxW="container.xl" pt={4}>
          <Outlet context={{ movies, loading, error, movieName }} />
        </Container>
      </Flex>
    </ChakraProvider>
  );
}
