import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Profile from "./pages/Profile";

const App = () => {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Is user logged in?

  // Routes where we hide navbar/footer
  const authRoutes = ["/login"];
  const isAuthPage = authRoutes.includes(location.pathname);

  // ═══════════════════════════════════════════════════════════
  // CHECK AUTH ON APP LOAD
  // ═══════════════════════════════════════════════════════════

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsAuthenticated(!!token); // Convert to boolean
  }, []);

  // Called after successful login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Called when user clicks logout
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setIsAuthenticated(false);
  };

  // ═══════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════

  return (
    <div>
      {!isAuthPage && (
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      )}

      <ScrollToTop />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/:slug" element={<Product />} />

        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />

        <Route path="/profile" element={<Profile handleLogout={handleLogout}/>} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
