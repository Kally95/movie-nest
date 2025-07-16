import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  Heading,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername && trimmedPassword) {
      const success = login(trimmedUsername, trimmedPassword);

      if (success) {
        setError("");
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } else {
      setError("Username and password are required");
    }
  };

  return (
    <Box
      mt="5rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#1E1E1E"
      color="white"
    >
      <Box
        as="form"
        onSubmit={handleLoginSubmit}
        bg="#2A2A2A"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        w={{ base: "90%", sm: "400px" }}
      >
        <Heading size="lg" textAlign="center" mb={6}>
          Sign In
        </Heading>

        <VStack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              bg="#1E1E1E"
              _placeholder={{ color: "#fff", opacity: "50%" }}
              color="white"
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              bg="#1E1E1E"
              _placeholder={{ color: "#fff", opacity: "50%" }}
              color="white"
            />
          </FormControl>
          <Text fontSize="sm" color="red.300">
            {error}
          </Text>
          <Button type="submit" colorScheme="red" width="full">
            Sign In
          </Button>

          <Text fontSize="sm" color="gray.400">
            Don’t have an account?{" "}
            <Link as={RouterLink} to="/sign-up" color="red.300">
              Create one
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
