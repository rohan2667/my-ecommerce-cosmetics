import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  const login = (email) => {
    if (email === "guest@example.com") {
      setIsGuest(true);
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
      setIsGuest(false);
    }
    setUserEmail(email);
    localStorage.setItem("authUser", email); // optional
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsGuest(false);
    setUserEmail(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isGuest, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};




