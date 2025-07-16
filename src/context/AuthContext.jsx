import { createContext, useContext, useEffect, useState } from "react";
import { validUsers } from "../auth/credentials";
import defaultPic from "../assets/defaultPic.jpg";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && savedUser !== "undefined") {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username, password) => {
    const foundUser = validUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      const loggedInUser = {
        username: foundUser.username,
        displayPicture: defaultPic,
      };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateDisplayPicture = (image) => {
    console.log(image);
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, displayPicture: image };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const updateUsername = (newUsername) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, username: newUsername };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        updateDisplayPicture,
        updateUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
