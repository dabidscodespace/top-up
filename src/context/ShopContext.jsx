// context/ShopContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const navigate = useNavigate();

  // ═══════════════════════════════════════════════════════════
  // AUTH STATE
  // ═══════════════════════════════════════════════════════════

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // ═══════════════════════════════════════════════════════════
  // THEME STATE
  // ═══════════════════════════════════════════════════════════

  const [isDarkMode, setIsDarkMode] = useState(true);

  // ═══════════════════════════════════════════════════════════
  // INITIALIZE ON LOAD
  // ═══════════════════════════════════════════════════════════

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }

    // Check theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // ═══════════════════════════════════════════════════════════
  // AUTH FUNCTIONS
  // ═══════════════════════════════════════════════════════════

  const login = (token, userData) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_data", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    toast.success(`Welcome, ${userData.display_name || userData.username}!`);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setIsAuthenticated(false);
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  // ═══════════════════════════════════════════════════════════
  // THEME FUNCTION
  // ═══════════════════════════════════════════════════════════

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // ═══════════════════════════════════════════════════════════
  // CONTEXT VALUE
  // ═══════════════════════════════════════════════════════════

  const value = {
    // Auth
    isAuthenticated,
    user,
    login,
    logout,
    navigate,

    // Theme
    isDarkMode,
    toggleTheme,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within ShopProvider");
  }
  return context;
};
