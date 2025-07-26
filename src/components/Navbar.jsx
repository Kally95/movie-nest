// Navbar.jsx

import { Flex, Box, Button, Heading, Avatar } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";

export default function Navbar() {
  const { isLoggedIn, logout, user } = useAuth();
  return (
    <Flex bg="#1E1E1E" mt="1rem" alignItems="center" width="100%" gap={4}>
      <Box flex="1">
        <Flex justifyContent="flex-start">
          <Heading>
            <RouterLink to="/">MovieNest</RouterLink>
          </Heading>
        </Flex>
      </Box>

      <Box flex="1">
        <Flex gap={4} alignItems="center" justifyContent="flex-end">
          {isLoggedIn ? (
            <>
              <Button as={RouterLink} to="/watchlist" colorScheme="red">
                Watchlist
              </Button>
              <Button as={RouterLink} to="/watched-movies" colorScheme="red">
                Watched
              </Button>
              <Button
                as={RouterLink}
                to="/"
                onClick={logout}
                variant="outline"
                color="white"
                borderColor="white"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Log out
              </Button>
              <DropdownMenu
                avatar={
                  <Avatar
                    size="lg"
                    name={user.username}
                    src={user.displayPicture}
                  />
                }
              />
            </>
          ) : (
            <Button as={RouterLink} to="/sign-in" colorScheme="red">
              Sign In
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
