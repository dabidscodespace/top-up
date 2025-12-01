import { CgProfile } from "react-icons/cg";
import { FiHome } from "react-icons/fi";
import { IoSearchOutline, IoSunnyOutline } from "react-icons/io5";
import { LuHeadphones } from "react-icons/lu";
import { Link } from "react-router-dom";

const MobileNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-teal-600/50 shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-teal to-transparent"></div>
      <div className="flex items-center justify-around px-2 py-2">
        <Link to={"/"} className="flex flex-col items-center gap-1 group">
          <div className="p-3 rounded-2xl bg-gray-800/50 group-hover:bg-teal/20 transition-all duration-300 border border-gray-700 group-hover:border-teal">
            <FiHome className="text-gray-400  group-hover:text-teal text-xl" />
          </div>

          <span className="text-[10px] font-bold text-gray-400 group-hover:text-teal transition-colors uppercase tracking-wider">
            HOME
          </span>
        </Link>
        <button className="flex flex-col items-center gap-1 group relative">
          <div className="p-3 rounded-2xl bg-gray-800/50 group-hover:bg-teal/20 transition-all duration-300 border border-gray-700 group-hover:border-teal">
            <IoSearchOutline className="text-gray-400  group-hover:text-teal text-xl" />
          </div>
          <span className="text-[10px] font-bold text-gray-400 group-hover:text-teal transition-colors uppercase tracking-wider">
            SEARCH
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 group relative -mt-6">
          <div className="relative p-4 rounded-full bg-linear-to-br from-teal to-teal-700 shadow-2xl shadow-teal-600/50 group-hover:shadow-teal-600/70 transition-shadow duration-300 border-2 border-teal-500">
            <LuHeadphones className="text-white text-2xl" />
          </div>
          <span className="text-[10px] font-bold text-teal uppercase tracking-wider mt-1">
            SUPPORT
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 group relative">
          <div className="p-3 rounded-2xl bg-gray-800/50 group-hover:bg-teal/20 transition-all duration-300 border border-gray-700 group-hover:border-teal">
            <IoSunnyOutline className="text-gray-400  group-hover:text-teal text-xl" />
          </div>
          <span className="text-[10px] font-bold text-gray-400 group-hover:text-teal transition-colors uppercase tracking-wider">
            DARK
          </span>
        </button>
        <Link className="flex flex-col items-center gap-1 group relative">
          <div className="p-3 rounded-2xl bg-gray-800/50 group-hover:bg-teal/20 transition-all duration-300 border border-gray-700 group-hover:border-teal">
            <CgProfile className="text-gray-400  group-hover:text-teal text-xl" />
          </div>
          <span className="text-[10px] font-bold text-gray-400 group-hover:text-teal transition-colors uppercase tracking-wider">
            PROFILE
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
