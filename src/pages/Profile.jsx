import { useEffect, useState } from "react";
import {
  FiCalendar,
  FiEdit2,
  FiLogOut,
  FiMail,
  FiPackage,
  FiUser,
} from "react-icons/fi";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCustomerOrders } from "../api";
import { useShop } from "../context/ShopContext";

const Profile = () => {
  const { isAuthenticated, user, logout } = useShop();
  const [activeTab, setActiveTab] = useState("info");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Format join date
  const formatJoinDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate days since joining
  const getDaysSinceJoining = (dateString) => {
    if (!dateString) return null;

    const joinDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
    if (user?.display_name) return user.display_name.charAt(0).toUpperCase();
    if (user?.username) return user.username.charAt(0).toUpperCase();
    return "U";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "pending":
      case "on-hold":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "cancelled":
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  return (
    <div className="mt-12">
      <div className="min-h-screen bg-teal-100 bg-linear-to-br px-4 py-8 pb-24 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-2xl">
          {/* Profile Header */}
          <div className="mb-6 rounded-2xl border border-teal-600 bg-teal-300/70 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
            <div className="flex items-center gap-4">
              {/* Avatar with Glow */}
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-teal-700 bg-linear-to-br from-teal-400 to-teal-700 text-2xl font-bold text-white shadow-[0_0_30px_rgba(20,184,166,0.6)] dark:border-teal-400">
                  {getUserInitial()}
                </div>
                {/* Online indicator */}
                <div className="absolute right-1 bottom-1 h-5 w-5 rounded-full border-3 border-gray-800 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
              </div>

              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  {user?.display_name || user?.username || "User"}
                </h1>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  @{user?.username}
                </p>
                <p className="mt-1 text-sm text-teal-800 dark:text-teal-400">
                  {user?.email}
                </p>
              </div>

              <button
                onClick={logout}
                className="rounded-x cursor-pointer border-red-500/30 bg-red-800 p-3 text-white transition-all duration-300 hover:bg-red-600 dark:border dark:bg-red-500/10 dark:text-red-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/20"
              >
                <FiLogOut className="text-xl" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                activeTab === "info"
                  ? "bg-teal-600 text-white shadow-[0_0_20px_rgba(20,184,166,0.5)]"
                  : "border border-teal-600 bg-teal-300 text-gray-800 hover:border-teal-500/50 hover:bg-gray-800 hover:text-white dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:text-teal-400"
              }`}
            >
              <FiUser className="text-lg" />
              Information
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                activeTab === "orders"
                  ? "bg-teal-600 text-white shadow-[0_0_20px_rgba(20,184,166,0.5)]"
                  : "border border-teal-600 bg-teal-300 text-gray-800 hover:border-teal-500/50 hover:bg-gray-800 hover:text-white dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:text-teal-400"
              }`}
            >
              <FiPackage className="text-lg" />
              Orders
            </button>
          </div>

          {/* Tab Content */}
          <div className="overflow-hidden rounded-2xl border border-teal-600 bg-teal-300 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
            {activeTab === "info" && (
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    Personal Information
                  </h2>
                  <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-teal-500/50 bg-teal-800 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-teal-600/30 dark:bg-teal-600/20 dark:text-teal-400">
                    <FiEdit2 />
                    Edit
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Username */}
                  <div className="rounded-xl border border-teal-600 bg-teal-700 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 dark:bg-teal-600/20">
                        <FiUser className="text-white dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-xs tracking-wide text-gray-400 uppercase">
                          Username
                        </p>
                        <p className="font-semibold text-white">
                          {user?.username || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Display Name */}
                  <div className="rounded-xl border border-teal-600 bg-teal-700 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 dark:bg-teal-600/20">
                        <FiUser className="text-white dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-xs tracking-wide text-gray-400 uppercase">
                          Display Name
                        </p>
                        <p className="font-semibold text-white">
                          {user?.display_name || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="rounded-xl border border-teal-600 bg-teal-700 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 dark:bg-teal-600/20">
                        <FiMail className="text-white dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-xs tracking-wide text-gray-400 uppercase">
                          Email
                        </p>
                        <p className="font-semibold text-white">
                          {user?.email || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* First Name */}
                  <div className="rounded-xl border border-teal-600 bg-teal-700 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 dark:bg-teal-600/20">
                        <FiUser className="text-white dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-xs tracking-wide text-gray-400 uppercase">
                          First Name
                        </p>
                        <p className="font-semibold text-white">
                          {user?.first_name || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 dark:bg-teal-600/20">
                        <FiUser className="text-white dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-xs tracking-wide text-gray-400 uppercase">
                          Last Name
                        </p>
                        <p className="font-semibold text-white">
                          {user?.last_name || "N/A"}
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
                <h2 className="mb-6 text-lg font-bold text-gray-800 dark:text-white">
                  Order History
                </h2>

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-12 text-center">
                    <FiPackage className="mx-auto mb-4 text-5xl text-gray-600" />
                    <p className="font-semibold text-gray-400">No orders yet</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Your order history will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-xl border border-gray-700 bg-teal-700 p-4 transition-all duration-300 hover:border-teal-500/50 dark:bg-gray-900/50"
                      >
                        {/* Order Header */}
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 dark:bg-teal-600/20">
                              <FiPackage className="text-white dark:text-teal-400" />
                            </div>
                            <div>
                              <p className="font-bold text-white">
                                #{order.number || order.id}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-white dark:text-gray-400">
                                <FiCalendar className="text-xs" />
                                {new Date(
                                  order.date_created,
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </div>
                            </div>
                          </div>
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${getStatusColor(
                              order.status,
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>

                        {/* Order Items */}
                        <div className="mt-3 border-t border-gray-700 pt-3">
                          {order.line_items?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between py-1 text-sm"
                            >
                              <span className="text-gray-200 dark:text-gray-300">
                                {item.name} x{item.quantity}
                              </span>
                              <span className="font-semibold text-teal-400">
                                ৳{item.subtotal || item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Total */}
                        <div className="mt-3 flex items-center justify-between border-t border-gray-700 pt-3">
                          <span className="font-semibold text-white dark:text-gray-400">
                            Total
                          </span>
                          <span className="text-lg font-bold text-white">
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
