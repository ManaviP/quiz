// context/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

// Create context for the theme
const ThemeContext = createContext();

// Custom hook to access the theme
export const useTheme = () => useContext(ThemeContext);

// Provider component to wrap your application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Load the theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"; // Default to "light" if not found
    setTheme(savedTheme);
  }, []);

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save theme to localStorage
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
