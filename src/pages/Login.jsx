import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, registerStoreUser } from "../api";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Local loading state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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

      // Store auth token
      localStorage.setItem("auth_token", response.token);

      // Store user data (including customer_id for orders)
      const userData = {
        customer_id: response.customer_id,
        username: response.username,
        email: response.email,
        display_name: response.display_name,
        first_name: response.first_name,
        last_name: response.last_name,
      };
      localStorage.setItem("user_data", JSON.stringify(userData));

      console.log("Logged in user:", userData);

      // Notify App that login was successful
      onLoginSuccess();

      toast.success(`Welcome, ${response.display_name || response.username}!`);
      navigate("/");
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
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-3">
      <form
        onSubmit={isLoginMode ? handleLogin : handleRegister}
        className="w-full max-w-sm bg-gray-800 border border-teal-700 rounded-xl shadow-2xl hover:shadow-teal-300/50 transition-shadow duration-300 px-5 py-6 text-white"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <img src={assets.logo} className="w-7 h-7" alt="logo" />
            </div>
            <div className="relative">
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-teal-600 to-transparent"></div>
              <h3 className="font-black text-3xl text-teal">
                <span className="text-white">TOPUP</span> X
              </h3>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-center mb-4 uppercase">
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
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm font-semibold placeholder:text-gray-400 focus:bg-gray-600 focus:border-teal-400 hover:border-teal transition-colors duration-300 focus:outline-none"
          />

          {!isLoginMode && (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm font-semibold placeholder:text-gray-400 focus:bg-gray-600 focus:border-teal-400 hover:border-teal transition-colors duration-300 focus:outline-none"
            />
          )}

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm font-semibold placeholder:text-gray-400 focus:bg-gray-600 focus:border-teal-400 hover:border-teal transition-colors duration-300 focus:outline-none"
          />

          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 rounded-lg py-2 font-black text-base uppercase tracking-wide transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            {isLoginMode ? "Login" : "Create Account"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-2 text-gray-400 text-xs">or</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          disabled
          className="flex items-center justify-center gap-2 bg-white text-gray-900 w-full py-2 rounded-lg font-semibold text-sm cursor-not-allowed opacity-50"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Toggle Mode Link */}
        <p className="text-center text-xs mt-4 text-gray-400">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={toggleMode}
            className="text-teal-400 font-bold ml-1 hover:underline cursor-pointer"
          >
            {isLoginMode ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
