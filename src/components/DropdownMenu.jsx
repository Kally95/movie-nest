import { Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function DropdownMenu({ avatar }) {
  const menuItemProps = {
    bg: "#1e1e1e",
    color: "white",
    _hover: { bg: "#333" },
    _focus: { bg: "#333" },
  };

  return (
    <Menu>
      <MenuButton>{avatar}</MenuButton>
      <Portal>
        <MenuList bg="#1e1e1e" color="white" border="1px solid #333">
          <Link to="/settings">
            <MenuItem {...menuItemProps}>Settings</MenuItem>
          </Link>
        </MenuList>
      </Portal>
    </Menu>
  );
}
