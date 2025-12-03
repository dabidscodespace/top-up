const Loader = ({ size = 80, color = "border-teal-500" }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-teal-100 dark:bg-gray-900">
      <div
        className={`inline-block h-${Math.min(size / 4, 24)} w-${Math.min(
          size / 4,
          24,
        )} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${color}`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

export default Loader;
