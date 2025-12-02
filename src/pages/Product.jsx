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
    // Split name by dash, plus sign, or parentheses — adjust as needed
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
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader size={56} color="border-teal" />
      </div>
    );

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Product not found.
      </div>
    );
  return (
    <div className="mt-12 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {/* ===== Product Header ===== */}
        <div className="bg-gray-800 rounded-2xl shadow-xl border-2 border-teal-800 overflow-hidden mb-6 relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-teal-400 to-teal-600" />
          <div className="absolute top-0 right-0 w-2 h-full bg-linear-to-b from-teal-400 to-teal-600" />
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <div className="text-xs font-black text-teal tracking-wider mb-1">
                  INSTANT DELIVERY
                </div>
                <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                  {product?.name}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Package Selection ===== */}
        <div className="bg-gray-800 rounded-2xl shadow-xl border-2 border-teal-800 p-6 md:p-8 mb-6 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal-900/50 rounded-lg flex items-center justify-center">
              <FiPackage className="text-2xl text-teal" />
            </div>
            <div className="text-lg md:text-xl font-black text-white uppercase tracking-wide">
              SELECT YOUR PACKAGE
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
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
                  className={`group relative p-4 rounded-xl border-2
        ${
          isSelected
            ? "border-teal-400 bg-teal-800/40"
            : "border-gray-700 bg-gray-700 hover:border-teal-500"
        }
        transition-colors duration-200 overflow-hidden cursor-pointer text-start`}
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* Left side — text */}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-extrabold text-white leading-tight">
                        {main}
                      </h3>
                      {bonus && (
                        <span className="text-xs font-bold text-gray-300 mt-0.5">
                          {bonus}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-teal-300">
                        ৳ {v.price}
                      </span>
                    </div>

                    {/* Right side — image */}
                    <div className="shrink-0 w-12 h-12">
                      <img
                        src={v.image?.src || product.images?.[0]?.src}
                        alt={main}
                        className="object-contain w-full h-full"
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
