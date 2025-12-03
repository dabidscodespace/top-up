import { FiFacebook, FiFileText, FiPhone } from "react-icons/fi";
import { IoPaperPlaneOutline, IoShieldOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { PiLightning, PiYoutubeLogo } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { TfiReload, TfiTarget } from "react-icons/tfi";

const Footer = () => {
  return (
    <div className="mb-20 md:mb-0">
      <footer className="border-teal relative overflow-hidden border-t-4 bg-linear-to-b from-gray-900 via-gray-800 to-black pt-20 pb-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group">
              <div className="rounded-lg border-2 border-teal-600/30 bg-linear-to-br from-gray-800/90 to-gray-900/90 p-6 transition-all duration-300 hover:border-teal-600">
                <div className="mb-6 flex items-center gap-3">
                  <div className="from-teal h-8 w-1 rounded-full bg-linear-to-b to-teal-500"></div>
                  <h3 className="text-xl font-black tracking-wider text-white uppercase">
                    <span className="text-teal">SQUAD</span> UP
                  </h3>
                  <PiLightning className="text-teal animate-pulse text-2xl" />
                </div>
                <div className="flex justify-start gap-4">
                  <button className="from-teal flex h-12 w-12 transform items-center justify-center rounded-tr-xl rounded-bl-xl bg-linear-to-br to-teal-700 text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:from-teal-500 hover:to-teal-600">
                    <FiFacebook className="text-xl" />
                  </button>
                  <button className="from-teal flex h-12 w-12 transform items-center justify-center rounded-tr-xl rounded-bl-xl bg-linear-to-br to-teal-700 text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:from-teal-500 hover:to-teal-600">
                    <PiYoutubeLogo className="text-xl" />
                  </button>
                  <button className="from-teal flex h-12 w-12 transform items-center justify-center rounded-tr-xl rounded-bl-xl bg-linear-to-br to-teal-700 text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:from-teal-500 hover:to-teal-600">
                    <IoPaperPlaneOutline className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
            <div className="">
              <div className="rounded-lg border-2 border-teal-600/30 bg-linear-to-br from-gray-800/90 to-gray-900/90 p-6 transition-all duration-300 hover:border-teal-600">
                <div className="mb-6 flex items-center gap-3">
                  <div className="from-teal h-8 w-1 rounded-full bg-linear-to-b to-teal-500"></div>
                  <h3 className="text-xl font-black tracking-wider text-white uppercase">
                    <span className="text-teal">Contact</span> HQ
                  </h3>
                  <TfiTarget className="text-teal animate-pulse text-2xl" />
                </div>
                <div className="space-y-3">
                  <div className="hover:bg-teal/10 group flex items-center gap-3 rounded p-2 transition-colors duration-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-tr-xl rounded-bl-xl bg-teal-600/20 text-teal-500 transition-colors duration-200 group-hover:bg-teal-600 group-hover:text-white">
                      <FiPhone />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      +016139XXXXX
                    </span>
                  </div>
                  <div className="hover:bg-teal/10 group flex items-center gap-3 rounded p-2 transition-colors duration-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-tr-xl rounded-bl-xl bg-teal-600/20 text-teal-500 transition-colors duration-200 group-hover:bg-teal-600 group-hover:text-white">
                      <MdOutlineMail />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      support@topupx.com
                    </span>
                  </div>
                  <div className="hover:bg-teal/10 group flex items-center gap-3 rounded p-2 transition-colors duration-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-tr-xl rounded-bl-xl bg-teal-600/20 text-teal-500 transition-colors duration-200 group-hover:bg-teal-600 group-hover:text-white">
                      <SlLocationPin />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      Ashambosti Kaptai Road, Rangamati-4500
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="rounded-lg border-2 border-teal-600/30 bg-linear-to-br from-gray-800/90 to-gray-900/90 p-6 transition-all duration-300 hover:border-teal-600">
                <div className="mb-6 flex items-center gap-3">
                  <div className="from-teal h-8 w-1 rounded-full bg-linear-to-b to-teal-500"></div>
                  <h3 className="text-xl font-black tracking-wider text-white uppercase">
                    <span className="text-teal">More</span> Information
                  </h3>
                  <IoShieldOutline className="text-teal animate-pulse text-2xl" />
                </div>
                <div className="space-y-3">
                  <div className="hover:bg-teal/10 group flex items-center gap-3 rounded p-2 transition-colors duration-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-tr-xl rounded-bl-xl bg-teal-600/20 text-teal-500 transition-colors duration-200 group-hover:bg-teal-600 group-hover:text-white">
                      <FiFileText />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      Terms & Conditions
                    </span>
                  </div>
                  <div className="hover:bg-teal/10 group flex items-center gap-3 rounded p-2 transition-colors duration-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-tr-xl rounded-bl-xl bg-teal-600/20 text-teal-500 transition-colors duration-200 group-hover:bg-teal-600 group-hover:text-white">
                      <IoShieldOutline />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      Privacy & Policy
                    </span>
                  </div>
                  <div className="hover:bg-teal/10 group flex items-center gap-3 rounded p-2 transition-colors duration-200">
                    <div className="flex h-8 w-8 items-center justify-center rounded-tr-xl rounded-bl-xl bg-teal-600/20 text-teal-500 transition-colors duration-200 group-hover:bg-teal-600 group-hover:text-white">
                      <TfiReload />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      Refund Policy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="via-teal absolute inset-0 h-px bg-linear-to-r from-transparent to-transparent"></div>
            <div className="space-y-2 pt-8 text-center">
              <p className="text-sm font-bold text-gray-400">
                Copyright © {new Date().getFullYear()}
                <span className="text-teal ml-1 font-black">TOPUP X</span>. All
                rights reserved.
              </p>
              <p className="text-xs text-gray-500">
                Design and Developed with love by{" "}
                <span className="text-teal ml-1 font-black">Dabid Marma</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
