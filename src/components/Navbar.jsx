import {
  Flex,
  Box,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  Heading,
} from "@chakra-ui/react";
import { SearchIcon, Avatar } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";

export default function Navbar({ handleSearch, movieName }) {
  const { isLoggedIn, logout, user } = useAuth();
  return (
    <Flex
      bg="#1E1E1E"
      justifyContent="space-between"
      mt="1rem"
      alignItems="center"
    >
      <Box>
        <Heading>
          <RouterLink to="/">MovieNest</RouterLink>
        </Heading>
      </Box>
      <Box>
        <InputGroup size="md" maxW="400px">
          <Input
            id="search"
            type="text"
            value={movieName}
            onChange={handleSearch}
            placeholder="Search movie..."
            variant="outline"
            bg="#1E1E1E"
            _placeholder={{ color: "#ffff;" }}
          />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box>
        {isLoggedIn ? (
          <Flex gap={4} alignItems="center">
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
          </Flex>
        ) : (
          <Button as={RouterLink} to="/sign-in" colorScheme="red">
            Sign In
          </Button>
        )}
      </Box>
    </Flex>
  );
}
