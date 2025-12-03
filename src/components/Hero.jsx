import { BsTrophy } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { PiLightning } from "react-icons/pi";
import Banner from "./Banner";
import Button from "./Button";

const Hero = ({ onExploreClick }) => {
  return (
    <div className="mt-12">
      <section className="w-full bg-gray-900 text-white overflow-hidden border-b-4 border-teal transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 items-center">
            {/* LEFT */}
            <div className="text-center md:text-left space-y-4 sm:space-y-6 order-2 md:order-1">
              <div className="hidden md:block">
                <div className="inline-flex mb-4 items-center gap-2 bg-linear-to-r from-teal-600 to-teal-700 text-white px-4 sm:px-6 py-2 rounded-full border-2 border-teal-700">
                  <PiLightning size={21} className="animate-pulse text-white" />
                  <span className="text-xs sm:text-sm font-black tracking-wider">
                    INSTANT DELIVERY
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  <span className="block bg-linear-to-r from-teal via-teal-500 to-teal-700 bg-clip-text text-transparent">
                    TOPUP X
                  </span>
                  <span className="block text-2xl sm:text-3xl md:text-3xl lg:text-4xl mb-3 mt-2 text-gray-900 dark:text-white">
                    YOUR ULTIMATE GAMING HUB
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-300 leading-relaxed px-4 md:px-0">
                  Get instant game top-ups, premium gaming gear, and
                  accessories. Best prices, lightning-fast delivery, and
                  unbeatable quality!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start px-4 md:px-0">
                <Button
                  text={"GAMING GADGETS"}
                  textColor={"text-white"}
                  bgColor={
                    "bg-linear-to-r from-teal-600 via-teal-500 to-teal-600"
                  }
                  border={"border-2"}
                  borderColor={"border-transparent"}
                />
                <Button
                  text={"GAME COIN TOP-UP"}
                  textColor={"text-teal"}
                  bgColor={"bg-gray-800"}
                  border={"border-2"}
                  borderColor={"border-teal"}
                  onClick={onExploreClick}
                />
              </div>
              <div className="">
                <div className="sm:hidden relative flex overflow-hidden">
                  {/* <TextSlider /> */}
                </div>
                <div className="hidden sm:flex sm:gap-4 sm:justify-center md:justify-start sm:pt-6">
                  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-teal">
                    <PiLightning size={20} className="text-teal" />
                    <span className="text-sm font-bold text-gray-300">
                      Fast Delivery
                    </span>
                  </div>
                  <div className="flex gap-2 items-center bg-gray-800 px-4 py-2 rounded-lg border border-teal min-w-max">
                    <BsTrophy size={20} className="text-teal" />
                    <span className="text-sm font-bold text-gray-300">
                      Best Prices
                    </span>
                  </div>
                  <div className="flex gap-2 items-center bg-gray-800 px-4 py-2 rounded-lg border border-teal min-w-max">
                    <FaRegStar size={20} className="text-teal" />
                    <span className="text-sm font-bold text-gray-300">
                      Top Quality
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right side */}
            <div className="order-1 md:order-2 border-4 border-teal rounded-4xl cursor-pointer">
              <Banner />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
