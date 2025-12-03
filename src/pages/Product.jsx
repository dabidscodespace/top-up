import { useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getProductAndVariations } from "../api";
import GameCheckout from "../components/GameCheckout";
import Loader from "../components/Loader";

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVar, setSelectedVar] = useState(null);

  const parseName = (name = "") => {
    const parts = name
      .split(/[-()]/)
      .map((s) => s.trim())
      .filter(Boolean);
    return {
      main: parts[0] || name,
      bonus: parts[1] || "",
    };
  };

  const scrollToForm = () => {
    const form = document.getElementById("gameform");
    if (form) {
      const headerHeight = 80;
      const y =
        form.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { product, variations } = await getProductAndVariations(slug);
        setProduct(product);
        setVariations(variations);
        console.log(product);
        console.log(variations);
      } catch (err) {
        console.error("Product page error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (!product)
    return (
      <div className="flex min-h-screen items-center justify-center bg-teal-100 text-white dark:bg-gray-900">
        Product not found.
      </div>
    );
  return (
    <div className="mt-12 min-h-screen bg-teal-100 bg-linear-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8">
        {/* ===== Product Header ===== */}
        <div className="bg-teal/20 relative mb-6 overflow-hidden rounded-2xl border-2 border-teal-800 shadow-xl dark:bg-gray-800">
          <div className="absolute top-0 left-0 h-full w-2 bg-linear-to-b from-teal-400 to-teal-600" />
          <div className="absolute top-0 right-0 h-full w-2 bg-linear-to-b from-teal-400 to-teal-600" />
          <div className="p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div>
                <div className="dark:text-teal mb-1 text-xs font-black tracking-wider text-teal-700">
                  INSTANT DELIVERY
                </div>
                <h1 className="text-2xl font-black tracking-tight text-gray-800 md:text-4xl dark:text-white">
                  {product?.name}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Package Selection ===== */}
        <div className="relative mb-6 overflow-hidden rounded-2xl border-2 border-teal-800 bg-teal-200 p-6 shadow-xl md:p-8 dark:bg-gray-800">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-teal/40 flex h-10 w-10 items-center justify-center rounded-lg dark:bg-teal-900/50">
              <FiPackage className="dark:text-teal text-2xl text-teal-700" />
            </div>
            <div className="text-lg font-black tracking-wide text-gray-800 uppercase md:text-xl dark:text-white">
              SELECT YOUR PACKAGE
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {variations.map((v) => {
              const isSelected = selectedVar?.id === v.id;
              const nameText = v.attributes?.[0]?.option || "Package";
              const { main, bonus } = parseName(nameText);

              return (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVar(v);
                    scrollToForm();
                  }}
                  className={`group relative rounded-xl border-2 p-4 ${
                    isSelected
                      ? "border-teal-400 bg-teal-300 dark:bg-teal-800/40"
                      : "border-teal-500 hover:border-teal-700 dark:border-gray-700 dark:bg-gray-700"
                  } cursor-pointer overflow-hidden text-start transition-colors duration-200`}
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* Left side — text */}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base leading-tight font-extrabold text-gray-800 dark:text-white">
                        {main}
                      </h3>
                      {bonus && (
                        <span className="mt-0.5 text-xs font-bold text-gray-600 dark:text-gray-300">
                          {bonus}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-teal-700 dark:text-teal-300">
                        ৳ {v.price}
                      </span>
                    </div>

                    {/* Right side — image */}
                    <div className="h-12 w-12 shrink-0">
                      <img
                        src={v.image?.src || product.images?.[0]?.src}
                        alt={main}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div id="gameform">
            <GameCheckout selectedVar={selectedVar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
