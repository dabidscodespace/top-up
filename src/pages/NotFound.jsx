const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
    <h1 className="mb-4 text-5xl font-black">404</h1>
    <p className="mb-6 text-lg">The page you’re looking for doesn’t exist.</p>
    <a
      href="/"
      className="rounded-lg bg-teal-600 px-6 py-3 font-bold text-white transition hover:bg-teal-700"
    >
      Go Back Home
    </a>
  </div>
);

export default NotFound;
