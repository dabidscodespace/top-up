import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, registerStoreUser } from "../api";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useShop } from "../context/ShopContext";

const Login = () => {
  const { isAuthenticated, login } = useShop();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Local loading state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Toggle between Login and Sign Up
  const toggleMode = () => setIsLoginMode((prev) => !prev);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Clear form
  const resetForm = () => {
    setFormData({ username: "", email: "", password: "" });
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await registerStoreUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account created! Please login.");
      setIsLoginMode(true); // Switch to login mode
      resetForm();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Try different username/email.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Login

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginUser({
        username: formData.username,
        password: formData.password,
      });

      const userData = {
        customer_id: response.customer_id,
        username: response.username,
        email: response.email,
        display_name: response.display_name,
        first_name: response.first_name,
        last_name: response.last_name,
      };

      login(response.token, userData);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid username or password");
    } finally {
      setIsLoading(false);
      resetForm();
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-3">
      <form
        onSubmit={isLoginMode ? handleLogin : handleRegister}
        className="w-full max-w-sm rounded-xl border border-teal-700 bg-gray-800 px-5 py-6 text-white shadow-2xl transition-shadow duration-300 hover:shadow-teal-300/50"
      >
        {/* Logo */}
        <div className="mb-5 flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <img src={assets.logo} className="h-7 w-7" alt="logo" />
            </div>
            <div className="relative">
              <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-linear-to-r from-teal-600 to-transparent"></div>
              <h3 className="text-teal text-3xl font-black">
                <span className="text-white">TOPUP</span> X
              </h3>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-4 text-center text-2xl font-black uppercase">
          {isLoginMode ? "Sign In" : "Sign Up"}
        </h2>

        {/* Form Fields */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
            className="hover:border-teal rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm font-semibold transition-colors duration-300 placeholder:text-gray-400 focus:border-teal-400 focus:bg-gray-600 focus:outline-none"
          />

          {!isLoginMode && (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
              className="hover:border-teal rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm font-semibold transition-colors duration-300 placeholder:text-gray-400 focus:border-teal-400 focus:bg-gray-600 focus:outline-none"
            />
          )}

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            className="hover:border-teal rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm font-semibold transition-colors duration-300 placeholder:text-gray-400 focus:border-teal-400 focus:bg-gray-600 focus:outline-none"
          />

          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-teal-600 py-2 text-base font-black tracking-wide uppercase transition-all duration-200 hover:scale-105 hover:bg-teal-700"
          >
            {isLoginMode ? "Login" : "Create Account"}
          </button>
        </div>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-2 text-xs text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          disabled
          className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-white py-2 text-sm font-semibold text-gray-900 opacity-50"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Toggle Mode Link */}
        <p className="mt-4 text-center text-xs text-gray-400">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={toggleMode}
            className="ml-1 cursor-pointer font-bold text-teal-400 hover:underline"
          >
            {isLoginMode ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
