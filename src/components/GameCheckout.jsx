import { useEffect, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { FiMail, FiPhone } from "react-icons/fi";
import { LuGamepad2 } from "react-icons/lu";
import { TbUser } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAnOrderDirectly } from "../api";

const GameCheckout = ({ selectedVariation }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [orderForm, setOrderForm] = useState({
    customer_id: "",
    name: "",
    email: "",
    phone: "",
    userId: "",
    zoneId: "",
  });

  // Load user data on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = JSON.parse(localStorage.getItem("user_data") || "{}");

    if (token && userData.customer_id) {
      setIsLoggedIn(true);
      setOrderForm((prev) => ({
        ...prev,
        customer_id: userData.customer_id,
        name: userData.display_name || userData.username || "",
        email: userData.email || "",
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetGameFields = () => {
    setOrderForm((prev) => ({
      ...prev,
      phone: "",
      userId: "",
      zoneId: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if logged in
    if (!isLoggedIn) {
      toast.error("Please login to place an order.");
      navigate("/login");
      return;
    }

    // Check if variation selected
    if (!selectedVariation) {
      toast.error("Please select a package first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createAnOrderDirectly(orderForm, selectedVariation);

      if (order?.id) {
        toast.success(`Order #${order.id} placed successfully!`);
        resetGameFields();
      } else {
        toast.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Order failed:", error);
      toast.error("Error creating order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input styles
  const inputStyle = `
    w-full bg-gray-700 border-2 rounded-xl px-4 py-3 text-white font-bold 
    focus:outline-none focus:bg-gray-600 transition-all placeholder:text-gray-400 
    group-hover:border-teal-500 border-gray-600 focus:border-teal-400
  `;

  const readOnlyInputStyle = `
    w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-4 py-3 
    text-teal-400 font-bold cursor-not-allowed
  `;

  return (
    <div>
      {/* Title */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-600"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-800 px-4 text-sm font-black text-teal-400 uppercase tracking-wider">
            ENTER YOUR INFORMATION
          </span>
        </div>
      </div>

      {/* User Status */}
      {isLoggedIn ? (
        <div className="bg-teal-900/30 border-2 border-teal-600 rounded-xl p-4 mb-6">
          <p className="text-sm text-teal-400 font-bold">
            ✓ Ordering as <span className="text-white">{orderForm.name}</span>
          </p>
          <p className="text-xs text-gray-400">{orderForm.email}</p>
        </div>
      ) : (
        <div className="bg-yellow-900/30 border-2 border-yellow-600 rounded-xl p-4 mb-6">
          <p className="text-sm text-yellow-400 font-bold">
            ⚠ Please{" "}
            <button
              onClick={() => navigate("/login")}
              className="underline hover:text-yellow-300 cursor-pointer"
            >
              login
            </button>{" "}
            to place an order.
          </p>
        </div>
      )}

      {/* Order Form */}
      <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-black text-white mb-3 uppercase tracking-wide">
              <TbUser className="text-lg text-teal" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={orderForm.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              readOnly={isLoggedIn}
              className={isLoggedIn ? readOnlyInputStyle : inputStyle}
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-black text-white mb-3 uppercase tracking-wide">
              <FiMail className="text-lg text-teal" />
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={orderForm.email}
              onChange={handleInputChange}
              placeholder="your@gmail.com"
              required
              readOnly={isLoggedIn}
              className={isLoggedIn ? readOnlyInputStyle : inputStyle}
            />
          </div>
        </div>

        {/* Phone & User ID Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-black text-white mb-3 uppercase tracking-wide">
              <FiPhone className="text-lg text-teal" />
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={orderForm.phone}
              onChange={handleInputChange}
              placeholder="01XXX-XXXXXX"
              required
              className={inputStyle}
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-black text-white mb-3 uppercase tracking-wide">
              <LuGamepad2 className="text-lg text-teal" />
              User ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="userId"
              value={orderForm.userId}
              onChange={handleInputChange}
              placeholder="Enter your User ID"
              required
              className={inputStyle}
            />
          </div>
        </div>

        {/* Zone ID Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-black text-white mb-3 uppercase tracking-wide">
              <LuGamepad2 className="text-lg text-teal" />
              Zone ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="zoneId"
              value={orderForm.zoneId}
              onChange={handleInputChange}
              placeholder="Enter your Zone ID"
              required
              className={inputStyle}
            />
          </div>
        </div>

        {/* Price & Submit */}
        <div className="space-y-4">
          {selectedVariation && (
            <div className="bg-linear-to-r from-teal-900/30 to-teal-900/30 border-2 border-teal-700 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-white uppercase tracking-wide">
                  Total Price
                </span>
                <span className="text-2xl font-black text-teal-400">
                  ৳{selectedVariation.price}
                </span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isLoggedIn}
            className={`w-full bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-black text-lg uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-3 ${
              isSubmitting || !isLoggedIn
                ? "opacity-60 cursor-not-allowed"
                : "hover:scale-105 hover:shadow-xl cursor-pointer"
            }`}
          >
            <CgShoppingCart className="text-2xl" />
            {isSubmitting ? "Placing Order..." : "Proceed to Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameCheckout;
