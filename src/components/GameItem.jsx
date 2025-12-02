import { Link } from "react-router-dom";

const GameItem = ({ slug, name, id, image }) => {
  return (
    <Link
      to={`/product/${slug}`}
      key={id}
      className="group relative bg-gray-800 rounded-2xl border-2 border-gray-700 hover:border-teal shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden w-full text-left cursor-pointer"
    >
      <div className="absolute inset-0 bg-linear-to-br from-orange-600/0 to-orange-600/0 group-hover:from-teal-600/10 group-hover:to-teal-600/5 transition-all duration-300"></div>
      <div className="relative p-4 flex flex-col items-center">
        <div className="w-full aspect-square mb-3 flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
          <img
            src={image}
            decoding="async"
            loading="lazy"
            className="object-contain w-full h-full p-2"
            alt=""
          />
        </div>
        <span className="font-black text-center text-white text-sm leading-tight group-hover:text-teal transition-colors uppercase">
          {name}
        </span>
      </div>
    </Link>
  );
};

export default GameItem;
