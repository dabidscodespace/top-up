import { useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { FiMail, FiPhone } from "react-icons/fi";
import { LuGamepad2 } from "react-icons/lu";
import { TbUser } from "react-icons/tb";
import { toast } from "react-toastify";
import { createAnOrderDirectly } from "../api";

const GameCheckout = ({ selectedVar }) => {
  const [loading, setLoading] = useState(false);
  const [checkOutData, setCheckOutData] = useState({
    name: "",
    email: "",
    phone: "",
    userId: "",
    zoneId: "",
  });

  const handleChange = (e) => {
    setCheckOutData({ ...checkOutData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedVar) {
      toast.error("Please select a package first");
      return;
    }

    setLoading(true);
    try {
      const order = await createAnOrderDirectly(checkOutData, selectedVar);

      if (order?.id) {
        toast.success(`Order #${order.id} placed successfully`);
      } else {
        toast.success("Failed to create order. Please try again.");
      }
    } catch (err) {
      console.error("Order creation failed:", err);
      toast.error("Error creating order.");
    } finally {
      setLoading(false);
    }

    setCheckOutData({ name: "", email: "", phone: "", userId: "", zoneId: "" });
  };

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

      {/* Form */}
      <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group">
            <label
              htmlFor="name"
              className="flex items-center gap-2 text-sm font-black text-white mb-3 uppercase tracking-wide"
            >
              <TbUser className="text-lg text-teal" />
              FULL NAME
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full bg-gray-700 border-2 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:bg-gray-600 transition-all placeholder:text-gray-400 group-hover:border-teal-500 border-gray-600 focus:border-teal-400"
              placeholder="Enter your full name"
              name="name"
              value={checkOutData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="group">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-black text-gray-900 dark:text-white mb-3 uppercase tracking-wide"
            >
              <FiMail className="text-lg text-teal" />
              EMAIL ADDRESS
              <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={checkOutData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border-2 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:bg-gray-600 transition-all placeholder:text-gray-400 group-hover:border-teal-500 border-gray-600 focus:border-teal-400"
              placeholder="your@gmail.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group">
            <label
              htmlFor="phone"
              className="flex items-center gap-2 text-sm font-black text-white mb-3 uppercase tracking-wide"
            >
              <FiPhone className="text-lg text-teal" />
              Mobile / Whatsapp Number
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="phone"
              value={checkOutData.phone}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border-2 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:bg-gray-600 transition-all placeholder:text-gray-400 group-hover:border-teal-500 border-gray-600 focus:border-teal-400"
              placeholder="01XXX-XXXXXX"
            />
          </div>
          <div className="group">
            <label
              htmlFor="userid"
              className="flex items-center gap-2 text-sm font-black text-white mb-3 uppercase tracking-wide"
            >
              <LuGamepad2 className="text-lg text-teal" />
              USER ID
              <span className="text-red-500">*</span>
            </label>
            <input
              name="userId"
              value={checkOutData.userId}
              onChange={handleChange}
              required
              type="text"
              className="w-full bg-gray-700 border-2 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:bg-gray-600 transition-all placeholder:text-gray-400 group-hover:border-teal-500 border-gray-600 focus:border-teal-400"
              placeholder="Enter your User ID"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group">
            <label
              htmlFor="zoneid"
              className="flex items-center gap-2 text-sm font-black text-white mb-3 uppercase tracking-wide"
            >
              <LuGamepad2 className="text-lg text-teal" />
              ZONE ID
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="zoneId"
              value={checkOutData.zoneId}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border-2 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:bg-gray-600 transition-all placeholder:text-gray-400 group-hover:border-teal-500 border-gray-600 focus:border-teal-400"
              placeholder="Enter your Zone ID"
            />
          </div>
        </div>

        <div className="space-y-4">
          {selectedVar ? (
            <div className="bg-linear-to-r from-teal-900/30 to-teal-900/30 border-2 border-teal-700 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-white uppercase tracking-wide">
                  Total price
                </span>
                <span className="text-2xl font-black text-teal-400">
                  ৳{selectedVar.price}
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-black text-lg uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            <CgShoppingCart className="text-2xl" />
            {loading ? "Placing Order..." : "Proceed to Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameCheckout;
