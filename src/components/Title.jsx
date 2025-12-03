import { BsTrophy } from "react-icons/bs";

const Title = ({ text1, text2 }) => {
  return (
    <div className="mb-8 flex items-center justify-center gap-4 md:mb-12">
      <div className="to-teal h-1 w-16 overflow-hidden rounded-full bg-linear-to-r from-transparent"></div>
      <div className="text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <BsTrophy className="dark:text-teal text-2xl text-teal-600" />
          <h2 className="text-[17px] font-black tracking-tight text-black md:text-3xl dark:text-white">
            {text1}
          </h2>
          <BsTrophy className="dark:text-teal text-2xl text-teal-600" />
        </div>
        <p className="dark:text-teal text-sm font-bold tracking-wider text-teal-600">
          {text2}
        </p>
      </div>
      <div className="to-teal h-1 w-16 overflow-hidden rounded-full bg-linear-to-l from-transparent"></div>
    </div>
  );
};

export default Title;
