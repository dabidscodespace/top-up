import { BsTrophy } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { PiLightning } from "react-icons/pi";
import Banner from "./Banner";
import Button from "./Button";

const Hero = ({ onExploreClick }) => {
  return (
    <div className="mt-12">
      <section className="border-teal w-full overflow-hidden border-b-4 bg-teal-100 text-white transition-colors duration-300 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-4 sm:px-6 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 items-center md:grid-cols-2 md:gap-8">
            {/* LEFT */}
            <div className="order-2 space-y-4 text-center sm:space-y-6 md:order-1 md:text-left">
              <div className="hidden md:block">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-teal-700 bg-linear-to-r from-teal-600 to-teal-700 px-4 py-2 text-white sm:px-6">
                  <PiLightning size={21} className="animate-pulse text-white" />
                  <span className="text-xs font-black tracking-wider sm:text-sm">
                    INSTANT DELIVERY
                  </span>
                </div>
                <h1 className="text-3xl leading-tight font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="from-teal block bg-linear-to-r via-teal-500 to-teal-700 bg-clip-text text-transparent">
                    TOPUP X
                  </span>
                  <span className="mt-2 mb-3 block text-2xl text-gray-900 sm:text-3xl md:text-3xl lg:text-4xl dark:text-white">
                    YOUR ULTIMATE GAMING HUB
                  </span>
                </h1>
                <p className="px-4 text-base leading-relaxed font-semibold text-gray-600 sm:text-lg md:px-0 md:text-xl dark:text-gray-300">
                  Get instant game top-ups, premium gaming gear, and
                  accessories. Best prices, lightning-fast delivery, and
                  unbeatable quality!
                </p>
              </div>
              <div className="flex flex-col flex-wrap justify-center gap-3 px-4 sm:flex-row sm:gap-4 md:justify-start md:px-0">
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
                  bgColor={"dark:bg-gray-800"}
                  border={"border-2"}
                  borderColor={"border-teal"}
                  iconColor={"text-teal"}
                  onClick={onExploreClick}
                />
              </div>
              <div className="">
                <div className="relative flex overflow-hidden sm:hidden">
                  {/* <TextSlider /> */}
                </div>
                <div className="hidden sm:flex sm:justify-center sm:gap-4 sm:pt-6 md:justify-start">
                  <div className="border-teal flex items-center gap-2 rounded-lg border bg-teal-200 px-4 py-2 dark:bg-gray-800">
                    <PiLightning
                      size={20}
                      className="dark:text-teal text-teal-500"
                    />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Fast Delivery
                    </span>
                  </div>
                  <div className="border-teal flex min-w-max items-center gap-2 rounded-lg border bg-teal-200 px-4 py-2 dark:bg-gray-800">
                    <BsTrophy
                      size={20}
                      className="dark:text-teal text-teal-500"
                    />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Best Prices
                    </span>
                  </div>
                  <div className="border-teal flex min-w-max items-center gap-2 rounded-lg border bg-teal-200 px-4 py-2 dark:bg-gray-800">
                    <FaRegStar
                      size={20}
                      className="dark:text-teal text-teal-500"
                    />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Top Quality
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right side */}
            <div className="border-teal order-1 cursor-pointer rounded-4xl border-4 md:order-2">
              <Banner />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
