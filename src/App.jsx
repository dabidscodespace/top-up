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

  // Routes where we hide navbar/footer
  const authRoutes = ["/login"];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <div>
      {!isAuthPage && <Navbar />}

      <ScrollToTop />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/:slug" element={<Product />} />

        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
