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

  if (loading) return <Loader />;

  return (
    <div
      className="bg-teal/35 px-4 pt-8 pb-16 md:py-16 dark:bg-gray-800"
      ref={ref}
    >
      <div className="mx-auto max-w-7xl">
        <Title text1="Top Up Now" text2="CHOOSE YOUR GAME" />

        {/*  Product grid  */}
        {!loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-6">
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
              <p className="col-span-full text-center text-gray-400">
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
