import { FiHome, FiLogIn } from "react-icons/fi";
import {
  IoMoonOutline,
  IoSearchOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { LuHeadphones } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const MobileNav = ({onSearchClick}) => {
  const { isAuthenticated, user, isDarkMode, toggleTheme } = useShop();

  const getUserInitial = () => {
    if (user?.display_name) return user.display_name.charAt(0).toUpperCase();
    if (user?.username) return user.username.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-teal-600/50 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl md:hidden">
      <div className="via-teal absolute top-0 right-0 left-0 h-0.5 bg-linear-to-r from-transparent to-transparent"></div>

      <div className="flex items-center justify-around px-2 py-2">
        {/* Home */}
        <Link to="/" className="group flex flex-col items-center gap-1">
          <div className="group-hover:bg-teal/20 group-hover:border-teal rounded-2xl border border-gray-700 bg-gray-800/50 p-3 transition-all duration-300">
            <FiHome className="group-hover:text-teal text-xl text-gray-400" />
          </div>
          <span className="group-hover:text-teal text-[10px] font-bold tracking-wider text-gray-400 uppercase transition-colors">
            HOME
          </span>
        </Link>

        {/* Search */}
        <button onClick={onSearchClick} className="group relative flex cursor-pointer flex-col items-center gap-1">
          <div className="group-hover:bg-teal/20 group-hover:border-teal rounded-2xl border border-gray-700 bg-gray-800/50 p-3 transition-all duration-300">
            <IoSearchOutline className="group-hover:text-teal text-xl text-gray-400" />
          </div>
          <span className="group-hover:text-teal text-[10px] font-bold tracking-wider text-gray-400 uppercase transition-colors">
            SEARCH
          </span>
        </button>

        {/* Support */}
        <button className="group relative -mt-6 flex cursor-pointer flex-col items-center gap-1">
          <div className="from-teal relative rounded-full border-2 border-teal-500 bg-linear-to-br to-teal-700 p-4 shadow-2xl shadow-teal-600/50 transition-shadow duration-300 group-hover:shadow-teal-600/70">
            <LuHeadphones className="text-2xl text-white" />
          </div>
          <span className="text-teal mt-1 text-[10px] font-bold tracking-wider uppercase">
            SUPPORT
          </span>
        </button>

        <button
          onClick={toggleTheme}
          className="group relative flex cursor-pointer flex-col items-center gap-1"
        >
          <div className="group-hover:bg-teal/20 group-hover:border-teal rounded-2xl border border-gray-700 bg-gray-800/50 p-3 transition-all duration-300">
            {isDarkMode ? (
              <IoMoonOutline className="text-xl text-gray-400" />
            ) : (
              <IoSunnyOutline className="group-hover:text-teal text-xl text-gray-400" />
            )}
          </div>
          <span className="group-hover:text-teal text-[10px] font-bold tracking-wider text-gray-400 uppercase transition-colors">
            {isDarkMode ? "LIGHT" : "DARK"}
          </span>
        </button>

        {isAuthenticated ? (
          <Link
            to="/profile"
            className="group relative flex flex-col items-center gap-1"
          >
            <div className="from-teal flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-teal-500 bg-linear-to-br to-teal-700 transition-all duration-300 group-hover:border-teal-400 group-hover:shadow-lg group-hover:shadow-teal-500/30">
              <span className="text-sm font-bold text-white">
                {getUserInitial()}
              </span>
            </div>
            <span className="text-teal text-[10px] font-bold tracking-wider uppercase transition-colors">
              PROFILE
            </span>
            {/* Online indicator */}
            <div className="absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-gray-900 bg-green-500"></div>
          </Link>
        ) : (
          <Link
            to="/login"
            className="group relative flex flex-col items-center gap-1"
          >
            <div className="group-hover:bg-teal/20 group-hover:border-teal rounded-2xl border border-gray-700 bg-gray-800/50 p-3 transition-all duration-300">
              <FiLogIn className="group-hover:text-teal text-xl text-gray-400" />
            </div>
            <span className="group-hover:text-teal text-[10px] font-bold tracking-wider text-gray-400 uppercase transition-colors">
              LOGIN
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MobileNav;
