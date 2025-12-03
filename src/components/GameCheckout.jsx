import { useEffect, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { FiMail, FiPhone } from "react-icons/fi";
import { LuGamepad2 } from "react-icons/lu";
import { TbUser } from "react-icons/tb";
import { toast } from "react-toastify";
import { createAnOrderDirectly } from "../api";
import { useShop } from "../context/ShopContext";

const GameCheckout = ({ selectedVar }) => {
  const { isAuthenticated, navigate } = useShop();

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!isAuthenticated) {
      toast.error("Please login to place an order.");
      navigate("/login");
      return;
    }

    // Check if variation selected
    if (!selectedVar) {
      toast.error("Please select a package first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createAnOrderDirectly(orderForm, selectedVar);

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
    w-full bg-teal-200 dark:bg-gray-700 border-2 rounded-xl px-4 py-3 text-teal-700 dark:text-white font-bold 
    focus:outline-none focus:bg-teal-300/80 dark:focus:bg-gray-600 transition-all   dark:placeholder:text-gray-400 placeholder:text-teal-500
    group-hover:border-teal-500 border-teal-300 dark:border-gray-600 focus:border-teal-400 caret-teal-900 dark:caret-teal
  `;

  const readOnlyInputStyle = `
    w-full bg-teal-800/90 dark:bg-gray-800 focus:outline-none border-2 dark:border-gray-700 rounded-xl px-4 py-3 
    text-teal-400 font-bold cursor-not-allowed
  `;

  return (
    <div>
      {/* Title */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-teal-500 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-teal-200 px-4 text-sm font-black tracking-wider text-teal-600 uppercase dark:bg-gray-800 dark:text-teal-400">
            ENTER YOUR INFORMATION
          </span>
        </div>
      </div>

      {/* User Status */}
      {isAuthenticated ? (
        <div className="mb-6 rounded-xl border-2 border-teal-600 bg-teal-900/30 p-4">
          <p className="text-sm font-bold text-gray-800 dark:text-teal-400">
            ✓ Ordering as{" "}
            <span className="text-teal-700 dark:text-white">
              {orderForm.name}
            </span>
          </p>
          <p className="text-xs text-gray-800 dark:text-gray-400">
            {orderForm.email}
          </p>
        </div>
      ) : (
        <div className="mb-6 rounded-xl border-2 border-red-400 bg-red-900/35 p-4 dark:border-yellow-600 dark:bg-yellow-900/30">
          <p className="text-sm font-bold text-white dark:text-yellow-400">
            ⚠ Please{" "}
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer underline hover:text-red-400 dark:hover:text-yellow-300"
            >
              login
            </button>{" "}
            to place an order.
          </p>
        </div>
      )}

      {/* Order Form */}
      <form className="mb-6 space-y-4" onSubmit={handleSubmit}>
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="group">
            <label className="mb-3 flex items-center gap-2 text-sm font-black tracking-wide text-gray-800 uppercase dark:text-white">
              <TbUser className="dark:text-teal text-lg text-teal-700" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={orderForm.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              readOnly={isAuthenticated}
              className={isAuthenticated ? readOnlyInputStyle : inputStyle}
            />
          </div>

          <div className="group">
            <label className="mb-3 flex items-center gap-2 text-sm font-black tracking-wide text-gray-800 uppercase dark:text-white">
              <FiMail className="dark:text-teal text-lg text-teal-700" />
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={orderForm.email}
              onChange={handleInputChange}
              placeholder="your@gmail.com"
              required
              readOnly={isAuthenticated}
              className={isAuthenticated ? readOnlyInputStyle : inputStyle}
            />
          </div>
        </div>

        {/* Phone & User ID Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="group">
            <label className="mb-3 flex items-center gap-2 text-sm font-black tracking-wide text-gray-800 uppercase dark:text-white">
              <FiPhone className="dark:text-teal text-lg text-teal-700" />
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
            <label className="mb-3 flex items-center gap-2 text-sm font-black tracking-wide text-gray-800 uppercase dark:text-white">
              <LuGamepad2 className="dark:text-teal text-lg text-teal-700" />
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="group">
            <label className="dark:text-teal mb-3 flex items-center gap-2 text-sm font-black tracking-wide text-teal-700 uppercase">
              <LuGamepad2 className="dark:text-teal text-lg text-teal-700" />
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
          {selectedVar && (
            <div className="rounded-xl border-2 border-teal-700 bg-linear-to-r from-teal-900/30 to-teal-900/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black tracking-wide text-teal-700 uppercase dark:text-white">
                  Total Price
                </span>
                <span className="text-2xl font-black text-teal-900 dark:text-teal-400">
                  ৳{selectedVar.price}
                </span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isAuthenticated}
            className={`flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-teal-500 to-teal-600 px-8 py-4 text-lg font-black tracking-wide text-white uppercase transition-all duration-300 hover:from-teal-600 hover:to-teal-700 ${
              isSubmitting || !isAuthenticated
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:scale-105 hover:shadow-xl"
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
