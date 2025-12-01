import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<Product />} />
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
