import { IoSearchOutline, IoSunnyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import MobileNav from "./MobileNav";

const Navbar = ({ isAuthenticated }) => {
  const userData = JSON.parse(localStorage.getItem("user_data"));

  const getUserInitial = () => {
    if (userData?.display_name)
      return userData.display_name.charAt(0).toUpperCase();
    if (userData?.username) return userData.username.charAt(0).toUpperCase();
    return "U";
  };
  return (
    <div>
      <header className="w-full bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 border-b-2 border-teal-600/30 fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-teal to-transparent"></div>
          <div className="flex items-center justify-center md:justify-between h-16">
            {/* Left */}
            <Link
              to={"/"}
              onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
            >
              <div className="flex items-center gap-2">
                <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={assets.logo}
                    className="w-8 h-8"
                    alt=""
                  />
                </div>
                <div className="flex relative items-center justify-between gap-2">
                  <span className="font-black text-white tracking-wider text-xl uppercase relative">
                    TopUp
                  </span>
                  <span className="font-black text-teal text-xl">X</span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-teal-600 to-transparent"></div>
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <button className="bg-linear-to-br from-teal to-teal-700 rounded-lg flex items-center justify-center border-2 border-teal-500/50 py-1 px-4 gap-3 cursor-pointer font-bold text-white">
                <IoSearchOutline />
                Search
              </button>
              <button className="p-3 rounded-2xl bg-gray-800/50 border border-teal-700 text-teal">
                <IoSunnyOutline size={20} />
              </button>
              {isAuthenticated ? (
                <Link to={"/profile"} className="group relative">
                  <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-teal to-teal-700 flex items-center justify-center border-2 border-teal-500 group-hover:border-teal-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/30 cursor-pointer">
                    <span className="text-white font-bold text-lg">
                      {getUserInitial()}
                    </span>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  </div>
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className="font-medium bg-teal-600 px-4 py-2 rounded-md text-sm text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <MobileNav isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default Navbar;
