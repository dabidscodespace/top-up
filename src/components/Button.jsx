import { FaAngleRight } from "react-icons/fa";

const Button = ({
  to,
  onClick,
  border,
  borderColor,
  bgColor,
  textColor,
  iconColor,
  text,
}) => {
  const classes = `hidden md:block group ${border} ${borderColor} ${bgColor} ${textColor} px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`;

  const iconClass = `text-xl ${iconColor || "text-white"}`;

  const content = (
    <span className="flex items-center justify-center gap-2">
      {text}
      <FaAngleRight className={iconClass} />
    </span>
  );

  return to ? (
    <Link to={to} className={classes} onClick={onClick}>
      {content}
    </Link>
  ) : (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

export default Button;
