import { useAuth } from "../context/AuthContext";
import { Box } from "@chakra-ui/react";

export default function FileUploader() {
  const { updateDisplayPicture } = useAuth();

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        updateDisplayPicture(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <Box>
      <input type="file" onChange={handleFileChange} />
    </Box>
  );
}
