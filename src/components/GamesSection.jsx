import { forwardRef, useEffect, useState } from "react";
import { getAllProducts } from "../api";
import GameItem from "./GameItem";
import Loader from "./Loader";
import Title from "./Title";

const GamesSection = forwardRef((props, ref) => {
  const [gameProducts, setGameProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const products = await getAllProducts();

        setGameProducts(products || []);
      } catch (err) {
        console.error("GamesSection – fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="pt-8 pb-16 md:py-16 px-4 bg-gray-800" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <Title text1="Top Up Now" text2="CHOOSE YOUR GAME" />

        {/*  Loader  */}
        {loading && (
          <div className="flex items-center justify-center py-10">
            <Loader />
          </div>
        )}

        {/*  Product grid  */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {gameProducts.length > 0 ? (
              gameProducts.map((item) => (
                <GameItem
                  key={item.id}
                  id={item.id}
                  slug={item.slug}
                  name={item.name}
                  image={item.images?.[0]?.src}
                />
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-full">
                No games available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default GamesSection;
