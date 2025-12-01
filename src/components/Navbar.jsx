import { IoSearchOutline, IoSunnyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <div>
      <header className="w-full bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 border-b-2 border-teal-600/30  top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-teal to-transparent"></div>
          <div className="flex items-center justify-center md:justify-between h-16">
            {/* Left */}
            <Link>
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
                <div className="flex items-center justify-between gap-2">
                  <span className="font-black text-white tracking-wider text-xl uppercase relative">
                    TopUp
                  </span>
                  <span className="font-black text-teal text-xl">X</span>
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <button className="bg-linear-to-br from-teal to-teal-700 rounded-lg flex items-center justify-center border-2 border-teal-500/50 py-1 px-4 gap-3 cursor-pointer font-bold text-white">
                <IoSearchOutline />
                Search
              </button>
              <button className="relative p-3 rounded-2xl bg-gray-800/50 border border-teal-700 text-teal">
                <IoSunnyOutline size={20} />
              </button>
              <button className="font-medium bg-teal-600 px-4 py-2 rounded-md text-sm text-white">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileNav />
    </div>
  );
};

export default Navbar;
