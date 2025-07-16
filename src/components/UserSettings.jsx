import {
  Box,
  Avatar,
  Flex,
  VStack,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import FileUploader from "./FileUploader";
import { useAuth } from "../context/AuthContext";

export default function UserSettings() {
  const { user, updateUsername } = useAuth();

  if (!user) return <div>Please log in to see your settings.</div>;
  console.log(user.password);
  return (
    <Flex mt="5rem">
      <Box position="relative">
        <Avatar src={user.displayPicture} size="xl" mb="1rem" />
        <FileUploader />
      </Box>
      <VStack spacing={4}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={user.username}
            onChange={(e) => updateUsername(e.target.value)}
            bg="#1E1E1E"
            _placeholder={{ color: "#fff", opacity: "50%" }}
            color="white"
          />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={user.password}
            placeholder="Enter your password"
            bg="#1E1E1E"
            _placeholder={{ color: "#fff", opacity: "50%" }}
            color="white"
          />
        </FormControl>
      </VStack>
    </Flex>
  );
}
