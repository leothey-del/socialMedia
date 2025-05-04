import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token) {
      if (userData && userData !== "undefined") {
        try {
          const parsedUser = JSON.parse(userData);
          setIsLoggedIn(true);
          setUser(parsedUser);
        } catch (error) {
          console.error("Failed to parse user data from localStorage:", error);
          // Optional: clear bad data
          localStorage.removeItem("userData");
        }
      } else {
        console.warn("No valid user data found in localStorage.");
        setIsLoggedIn(true); // still logged in if token exists
      }
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("authToken", token);
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
    } else {
      console.warn("No user data provided to save!");
      localStorage.removeItem("userData");
    }
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
