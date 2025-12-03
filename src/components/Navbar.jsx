// components/Navbar.jsx
import { useState } from "react";
import {
  IoMoonOutline,
  IoSearchOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useShop } from "../context/ShopContext";
import MobileNav from "./MobileNav";
import SearchModal from "./SearchModal";

const Navbar = () => {
  const { isAuthenticated, user, isDarkMode, toggleTheme } = useShop();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Get user initial for avatar
  const getUserInitial = () => {
    if (user?.display_name) return user.display_name.charAt(0).toUpperCase();
    if (user?.username) return user.username.charAt(0).toUpperCase();
    return "U";
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <div>
      <header className="fixed top-0 left-0 z-50 w-full border-b-2 border-teal-600/30 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="via-teal absolute right-0 bottom-0 left-0 h-0.5 bg-linear-to-r from-transparent to-transparent"></div>
          <div className="flex h-16 items-center justify-center md:justify-between">
            {/* Left */}
            <Link
              to={"/"}
              onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={assets.logo}
                    className="h-8 w-8"
                    alt=""
                  />
                </div>
                <div className="relative flex items-center justify-between gap-2">
                  <span className="relative text-xl font-black tracking-wider text-white uppercase">
                    TopUp
                  </span>
                  <span className="text-teal text-xl font-black">X</span>
                  <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-linear-to-r from-teal-600 to-transparent"></div>
                </div>
              </div>
            </Link>

            <div className="hidden items-center gap-6 md:flex">
              {/* Search Button - Opens Modal */}
              <button
                onClick={openSearch}
                className="from-teal flex cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-teal-500/50 bg-linear-to-br to-teal-700 px-4 py-1 font-bold text-white transition-all duration-300 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/20"
              >
                <IoSearchOutline />
                Search
              </button>

              <button
                onClick={toggleTheme}
                className="text-teal cursor-pointer rounded-2xl border border-teal-700 bg-gray-800/50 p-3"
              >
                {isDarkMode ? (
                  <IoMoonOutline className="text-xl text-gray-400" />
                ) : (
                  <IoSunnyOutline className="group-hover:text-teal text-xl text-gray-400" />
                )}
              </button>

              {isAuthenticated ? (
                <Link to={"/profile"} className="group relative">
                  <div className="from-teal flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border-2 border-teal-500 bg-linear-to-br to-teal-700 transition-all duration-300 group-hover:border-teal-400 group-hover:shadow-lg group-hover:shadow-teal-500/30">
                    <span className="text-lg font-bold text-white">
                      {getUserInitial()}
                    </span>
                    <div className="absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-gray-900 bg-green-500"></div>
                  </div>
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileNav isAuthenticated={isAuthenticated} onSearchClick={openSearch} />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </div>
  );
};

export default Navbar;
