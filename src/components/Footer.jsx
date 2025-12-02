import { FiFacebook, FiFileText, FiPhone } from "react-icons/fi";
import { IoPaperPlaneOutline, IoShieldOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { PiLightning, PiYoutubeLogo } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { TfiReload, TfiTarget } from "react-icons/tfi";

const Footer = () => {
  return (
    <div className="mb-20 md:mb-0">
      <footer className="relative bg-linear-to-b from-gray-900 via-gray-800 to-black pt-20 pb-8 overflow-hidden border-t-4 border-teal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="group">
              <div className="bg-linear-to-br from-gray-800/90 to-gray-900/90 rounded-lg p-6 border-2 transition-all duration-300 border-teal-600/30 hover:border-teal-600">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-linear-to-b from-teal to-teal-500 rounded-full"></div>
                  <h3 className="text-xl font-black text-white tracking-wider uppercase">
                    <span className="text-teal">SQUAD</span> UP
                  </h3>
                  <PiLightning className="text-teal text-2xl animate-pulse" />
                </div>
                <div className="flex justify-start gap-4">
                  <button className="flex items-center justify-center w-12 h-12 bg-linear-to-br from-teal to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 rounded-tr-xl rounded-bl-xl">
                    <FiFacebook className="text-xl" />
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 bg-linear-to-br from-teal to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 rounded-tr-xl rounded-bl-xl">
                    <PiYoutubeLogo className="text-xl" />
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 bg-linear-to-br from-teal to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 rounded-tr-xl rounded-bl-xl">
                    <IoPaperPlaneOutline className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
            <div className="">
              <div className="bg-linear-to-br from-gray-800/90 to-gray-900/90 rounded-lg p-6 border-2 transition-all duration-300 border-teal-600/30 hover:border-teal-600">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-linear-to-b from-teal to-teal-500 rounded-full"></div>
                  <h3 className="text-xl font-black text-white tracking-wider uppercase">
                    <span className="text-teal">Contact</span> HQ
                  </h3>
                  <TfiTarget className="text-teal text-2xl animate-pulse" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded hover:bg-teal/10 transition-colors duration-200 group">
                    <div className="flex items-center justify-center w-8 h-8 bg-teal-600/20 text-teal-500 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200 rounded-tr-xl rounded-bl-xl">
                      <FiPhone />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">
                      +016139XXXXX
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded hover:bg-teal/10 transition-colors duration-200 group">
                    <div className="flex items-center justify-center w-8 h-8 bg-teal-600/20 text-teal-500 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200 rounded-tr-xl rounded-bl-xl">
                      <MdOutlineMail />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">
                      support@topupx.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded hover:bg-teal/10 transition-colors duration-200 group">
                    <div className="flex items-center justify-center w-8 h-8 bg-teal-600/20 text-teal-500 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200 rounded-tr-xl rounded-bl-xl">
                      <SlLocationPin />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">
                      Ashambosti Kaptai Road, Rangamati-4500
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="bg-linear-to-br from-gray-800/90 to-gray-900/90 rounded-lg p-6 border-2 transition-all duration-300 border-teal-600/30 hover:border-teal-600">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-linear-to-b from-teal to-teal-500 rounded-full"></div>
                  <h3 className="text-xl font-black text-white tracking-wider uppercase">
                    <span className="text-teal">More</span> Information
                  </h3>
                  <IoShieldOutline className="text-teal text-2xl animate-pulse" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded hover:bg-teal/10 transition-colors duration-200 group">
                    <div className="flex items-center justify-center w-8 h-8 bg-teal-600/20 text-teal-500 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200 rounded-tr-xl rounded-bl-xl">
                      <FiFileText />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">
                      Terms & Conditions
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded hover:bg-teal/10 transition-colors duration-200 group">
                    <div className="flex items-center justify-center w-8 h-8 bg-teal-600/20 text-teal-500 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200 rounded-tr-xl rounded-bl-xl">
                      <IoShieldOutline />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">
                      Privacy & Policy
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded hover:bg-teal/10 transition-colors duration-200 group">
                    <div className="flex items-center justify-center w-8 h-8 bg-teal-600/20 text-teal-500 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200 rounded-tr-xl rounded-bl-xl">
                      <TfiReload />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">
                      Refund Policy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-teal to-transparent h-px"></div>
            <div className="text-center pt-8 space-y-2">
              <p className="text-gray-400 font-bold text-sm">
                Copyright © {new Date().getFullYear()}
                <span className="font-black text-teal ml-1">TOPUP X</span>. All
                rights reserved.
              </p>
              <p className="text-gray-500 text-xs">
                Design and Developed with love by{" "}
                <span className="font-black text-teal ml-1">Dabid Marma</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
