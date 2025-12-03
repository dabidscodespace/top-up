import { useEffect, useState } from "react";
import {
  FiCalendar,
  FiEdit2,
  FiLogOut,
  FiMail,
  FiPackage,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCustomerOrders } from "../api";

const Profile = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info"); // "info" or "orders"
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  // Get user data from localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem("user_data");
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  // Fetch orders when orders tab is active
  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await getCustomerOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInitial = () => {
    if (userData?.display_name)
      return userData.display_name.charAt(0).toUpperCase();
    if (userData?.username) return userData.username.charAt(0).toUpperCase();
    return "U";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  return (
    <div className="mt-12">
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-8 pb-24">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4">
              {/* Avatar with Glow */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-teal-400 to-teal-700 flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_30px_rgba(20,184,166,0.6)] border-2 border-teal-400">
                  {getUserInitial()}
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-gray-800 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white">
                  {userData?.display_name || userData?.username || "User"}
                </h1>
                <p className="text-gray-400 text-sm">@{userData?.username}</p>
                <p className="text-teal-400 text-sm mt-1">{userData?.email}</p>
              </div>

              {/* Logout Button */}
              <Link
                to={"/login"}
                onClick={handleLogout}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300"
              >
                <FiLogOut className="text-xl" />
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all duration-300 cursor-pointer ${
                activeTab === "info"
                  ? "bg-teal-600 text-white shadow-[0_0_20px_rgba(20,184,166,0.5)]"
                  : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-teal-500/50  hover:text-teal-400"
              }`}
            >
              <FiUser className="text-lg" />
              Information
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all duration-300 cursor-pointer ${
                activeTab === "orders"
                  ? "bg-teal-600 text-white shadow-[0_0_20px_rgba(20,184,166,0.5)]"
                  : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-teal-500/50 hover:text-teal-400"
              }`}
            >
              <FiPackage className="text-lg" />
              Orders
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden">
            {/* Information Tab */}
            {activeTab === "info" && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white">
                    Personal Information
                  </h2>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600/20 border border-teal-500/50 text-teal-400 hover:bg-teal-600/30 transition-all duration-300 text-sm font-semibold">
                    <FiEdit2 />
                    Edit
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Username */}
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-600/20 flex items-center justify-center">
                        <FiUser className="text-teal-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                          Username
                        </p>
                        <p className="text-white font-semibold">
                          {userData?.username || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Display Name */}
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-600/20 flex items-center justify-center">
                        <FiUser className="text-teal-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                          Display Name
                        </p>
                        <p className="text-white font-semibold">
                          {userData?.display_name || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-600/20 flex items-center justify-center">
                        <FiMail className="text-teal-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                          Email
                        </p>
                        <p className="text-white font-semibold">
                          {userData?.email || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* First Name */}
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-600/20 flex items-center justify-center">
                        <FiUser className="text-teal-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                          First Name
                        </p>
                        <p className="text-white font-semibold">
                          {userData?.first_name || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-600/20 flex items-center justify-center">
                        <FiUser className="text-teal-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                          Last Name
                        </p>
                        <p className="text-white font-semibold">
                          {userData?.last_name || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="p-6">
                <h2 className="text-lg font-bold text-white mb-6">
                  Order History
                </h2>

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <FiPackage className="text-5xl text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-semibold">No orders yet</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Your order history will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-teal-500/50 transition-all duration-300"
                      >
                        {/* Order Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-teal-600/20 flex items-center justify-center">
                              <FiPackage className="text-teal-400" />
                            </div>
                            <div>
                              {/* ✅ Use order.number or order.id */}
                              <p className="text-white font-bold">
                                #{order.number || order.id}
                              </p>
                              <div className="flex items-center gap-1 text-gray-400 text-xs">
                                <FiCalendar className="text-xs" />
                                {/* ✅ Use date_created instead of date */}
                                {new Date(
                                  order.date_created
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </div>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>

                        {/* Order Items */}
                        <div className="border-t border-gray-700 pt-3 mt-3">
                          {/* ✅ Use line_items instead of items */}
                          {order.line_items?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm py-1"
                            >
                              <span className="text-gray-300">
                                {item.name} x{item.quantity}
                              </span>
                              <span className="text-teal-400 font-semibold">
                                {/* ✅ Use subtotal or calculate price */}৳
                                {item.subtotal || item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Total */}
                        <div className="border-t border-gray-700 pt-3 mt-3 flex items-center justify-between">
                          <span className="text-gray-400 font-semibold">
                            Total
                          </span>
                          <span className="text-white font-bold text-lg">
                            ৳{order.total}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
