// components/SearchModal.jsx
import { useEffect, useRef, useState } from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  // Fetch products when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchProducts();
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setSearchQuery("");
      setFilteredProducts([]);
      setHasSearched(false);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts(50);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setHasSearched(true);

    if (!query.trim()) {
      setFilteredProducts([]);
      setHasSearched(false);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-gray-900/50 px-4 pt-20 backdrop-blur-sm dark:bg-black/70"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="animate-slideUp w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-300/50 dark:border-teal-500/30 dark:bg-gray-900 dark:shadow-teal-500/10"
      >
        {/* Search Header */}
        <div className="relative border-b border-gray-200 dark:border-teal-500/30">
          <div className="flex items-center px-4 py-3">
            <IoSearchOutline className="mr-3 text-xl text-teal-600 dark:text-teal-500" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-lg text-gray-900 placeholder-gray-500 outline-none dark:text-white dark:placeholder-gray-400"
            />
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <IoCloseOutline className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <LoadingState />
          ) : hasSearched && filteredProducts.length === 0 ? (
            <NoResults query={searchQuery} />
          ) : filteredProducts.length > 0 ? (
            <div className="p-4">
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Found {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""} for "{searchQuery}"
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClose={onClose}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            </div>
          ) : (
            <RecentSearches onSearch={handleSearch} />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 text-sm text-gray-400 dark:border-teal-500/30 dark:text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                ↵
              </kbd>
              to select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                esc
              </kbd>
              to close
            </span>
          </div>
          <span className="text-teal-600 dark:text-teal-500">
            {products.length} products
          </span>
        </div>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, onClose, searchQuery }) => {
  const highlightMatch = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span
          key={i}
          className="bg-teal-100 text-teal-700 dark:bg-teal-500/30 dark:text-teal-300"
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      onClick={onClose}
      className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all duration-300 hover:border-teal-500/50 hover:bg-white hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-teal-500/50 dark:hover:bg-gray-800"
    >
      {/* Product Image */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
        {product.images?.[0]?.src ? (
          <img
            src={product.images[0].src}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400 dark:text-gray-500">
            <IoSearchOutline className="text-2xl" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium text-gray-900 transition-colors group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
          {highlightMatch(product.name)}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-bold text-teal-600 dark:text-teal-400">
            ${product.price || "0.00"}
          </span>
          {product.type && (
            <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs text-teal-700 capitalize dark:bg-teal-500/20 dark:text-teal-300">
              {product.type}
            </span>
          )}
        </div>
      </div>

      {/* Arrow */}
      <div className="text-gray-400 transition-colors group-hover:text-teal-600 dark:text-gray-500 dark:group-hover:text-teal-400">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
};

// Loading State Component
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600 dark:border-teal-500/30 dark:border-t-teal-500"></div>
    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
  </div>
);

// No Results Component
const NoResults = ({ query }) => (
  <div className="flex flex-col items-center justify-center px-4 py-12">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
      <IoSearchOutline className="text-3xl" />
    </div>
    <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
      No products found
    </h3>
    <p className="text-center text-gray-600 dark:text-gray-400">
      No results for "
      <span className="text-teal-600 dark:text-teal-400">{query}</span>". Try
      searching with different keywords.
    </p>
  </div>
);

// Recent Searches Component
const RecentSearches = ({ onSearch }) => {
  const popularSearches = [
    "Mobile Legends",
    "Free Fire",
    "PUBG",
    "Valorant",
    "Genshin Impact",
    "Steam Wallet",
  ];

  return (
    <div className="p-4">
      <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-400">
        Popular Searches
      </p>
      <div className="flex flex-wrap gap-2">
        {popularSearches.map((term) => (
          <button
            key={term}
            onClick={() => onSearch(term)}
            className="rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-all hover:border-teal-500/50 hover:bg-teal-50 hover:text-teal-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-teal-500/50 dark:hover:bg-teal-500/20 dark:hover:text-teal-300"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchModal;
