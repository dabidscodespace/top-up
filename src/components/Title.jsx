import { BsTrophy } from "react-icons/bs";

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
      <div className="h-1 w-16 bg-linear-to-r from-transparent to-teal rounded-full overflow-hidden"></div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BsTrophy className="text-2xl text-teal" />
          <h2 className="text-[17px] md:text-3xl font-black text-white tracking-tight">
            {text1}
          </h2>
          <BsTrophy className="text-2xl text-teal" />
        </div>
        <p className="text-teal font-bold tracking-wider text-sm">{text2}</p>
      </div>
      <div className="h-1 w-16 bg-linear-to-l from-transparent to-teal rounded-full overflow-hidden"></div>
    </div>
  );
};

export default Title;
