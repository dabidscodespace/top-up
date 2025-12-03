import { FiUser } from "react-icons/fi";
import { IoSearchOutline, IoSunnyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import MobileNav from "./MobileNav";

const Navbar = ({ isAuthenticated, onLogOut }) => {
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
                <div className="group relative">
                  <div className="p-3 rounded-full bg-teal-600 flex items-center justify-center text-lg text-white cursor-pointer">
                    <FiUser />
                  </div>
                  <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-5 ">
                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-gray-900 text-teal-700 rounded border-teal border-2">
                      <Link
                        to={"/profile"}
                        className="cursor-pointer hover:text-teal"
                      >
                        My Profile
                      </Link>
                      <Link
                        to={"/login"}
                        onClick={onLogOut}
                        className="cursor-pointer hover:text-teal"
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>
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
      <MobileNav />
    </div>
  );
};

export default Navbar;
