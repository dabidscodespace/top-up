import { FiHome, FiLogIn } from "react-icons/fi";
import { IoSearchOutline, IoSunnyOutline } from "react-icons/io5";
import { LuHeadphones } from "react-icons/lu";
import { Link } from "react-router-dom";

const MobileNav = ({ isAuthenticated}) => {
const userData = JSON.parse(localStorage.getItem("user_data"));

  const getUserInitial = () => {
    if (userData?.display_name) return userData.display_name.charAt(0).toUpperCase();
    if (userData?.username) return userData.username.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-teal-600/50 shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-teal to-transparent"></div>
      <div className="flex items-center justify-around px-2 py-2">
        {/* Home */}
        <Link to="/" className="flex flex-col items-center gap-1 group">
          <div className="p-3 rounded-2xl bg-gray-800/50 group-hover:bg-teal/20 transition-all duration-300 border border-gray-700 group-hover:border-teal">
            <FiHome className="text-gray-400 group-hover:text-teal text-xl" />
          </div>
          <span className="text-[10px] font-bold text-gray-400 group-hover:text-teal transition-colors uppercase tracking-wider">
            HOME
          </span>
        </Link>

        {/* Search */}
        <button className="flex flex-col items-center gap-1 group relative">
          <div className="p-3 rounded-2xl bg-gray-800/50 group-hover:bg-teal/20 transition-all duration-300 border border-gray-700 group-hover:border-teal">
            <IoSearchOutline className="text-gray-400 group-hover:text-teal text-xl" />
          </div>
          <span className="text-[10px] font-bold text-gray-400 group-hover:text-teal transition-colors uppercase tracking-wider">
            SEARCH
          </span>
        </button>

        {/* Support */}
        <button className="flex flex-col items-center gap-1 group relative -mt-6">
          <div className="relative p-4 rounded-full bg-linear-to-br from-teal to-teal-700 shadow-2xl shadow-teal-600/50 group-hover:shadow-teal-600/70 transition-shadow duration-300 border-2 border-teal-500">
            <LuHeadphones className="text-white text-2xl" />
          </div>
          <span className="text-[10px] font-bold text-teal uppercase tracking-wider mt-1">
            SUPPORT
          </span>
        </button>

        {/* Theme */}
        <button className="flex flex-col items-center gap-1 group relative">
          <div className="p-3 rounded-2xl bg-gray-800/50 group-hover:bg-teal/20 transition-all duration-300 border border-gray-700 group-hover:border-teal">
            <IoSunnyOutline className="text-gray-400 group-hover:text-teal text-xl" />
          </div>
          <span className="text-[10px] font-bold text-gray-400 group-hover:text-teal transition-colors uppercase tracking-wider">
            DARK
          </span>
        </button>

        {/* ✅ Conditional Login/Profile with Avatar */}
        {isAuthenticated ? (
          <Link
            to="/profile"
            className="flex flex-col items-center gap-1 group relative"
          >
            {/* User Avatar with Initial */}
            <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-teal to-teal-700 flex items-center justify-center border-2 border-teal-500 group-hover:border-teal-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/30">
              <span className="text-white font-bold text-sm">
                {getUserInitial()}
              </span>
            </div>
            <span className="text-[10px] font-bold text-teal transition-colors uppercase tracking-wider">
              PROFILE
            </span>
            {/* Online indicator */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </Link>
        ) : (
          <Link
            to="/login"
            className="flex flex-col items-center gap-1 group relative"
          >
            <div className="p-3 rounded-2xl bg-gray-800/50 group-hover:bg-teal/20 transition-all duration-300 border border-gray-700 group-hover:border-teal">
              <FiLogIn className="text-gray-400 group-hover:text-teal text-xl" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 group-hover:text-teal transition-colors uppercase tracking-wider">
              LOGIN
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MobileNav;
