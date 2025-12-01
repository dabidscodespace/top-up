
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Button = ({ border, borderColor, bgColor, textColor, text }) => {
  return (
    <div>
      <Link
        className={`hidden md:block group ${border} ${borderColor} ${bgColor} text-${textColor} px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
      >
        <span className="flex items-center justify-center gap-2">
          {text}
          <FaAngleRight className="text-xl text-white"/>
        </span>
      </Link>
    </div>
  );
};

export default Button;
