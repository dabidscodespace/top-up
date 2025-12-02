import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Button = ({
  to,
  onClick,
  border,
  borderColor,
  bgColor,
  textColor,
  text,
}) => {
  const classes = `hidden md:block group ${border} ${borderColor} ${bgColor} ${textColor} px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        <span className="flex items-center justify-center gap-2">
          {text}
          <FaAngleRight className="text-xl text-white" />
        </span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      <span className="flex items-center justify-center gap-2">
        {text}
        <FaAngleRight className="text-xl text-white" />
      </span>
    </button>
  );
};

export default Button;
