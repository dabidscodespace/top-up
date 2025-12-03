import { Link } from "react-router-dom";

const GameItem = ({ slug, name, id, image }) => {
  return (
    <Link
      to={`/product/${slug}`}
      key={id}
      className="group hover:border-teal relative w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-gray-300 bg-teal-100 text-left shadow-md transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="absolute inset-0 bg-linear-to-br from-orange-600/0 to-orange-600/0 transition-all duration-300 group-hover:from-teal-600/10 group-hover:to-teal-600/5"></div>
      <div className="relative flex flex-col items-center p-4">
        <div className="mb-3 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-teal-50 to-teal-100 transition-transform duration-300 group-hover:scale-105 dark:from-gray-700 dark:to-gray-600">
          <img
            src={image}
            decoding="async"
            loading="lazy"
            className="h-full w-full object-contain p-2"
            alt=""
          />
        </div>
        <span className="group-hover:text-teal text-center text-sm leading-tight font-black text-gray-800 uppercase transition-colors dark:text-white">
          {name}
        </span>
      </div>
    </Link>
  );
};

export default GameItem;
