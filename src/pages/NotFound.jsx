const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
    <h1 className="text-5xl font-black mb-4">404</h1>
    <p className="text-lg mb-6">The page you’re looking for doesn’t exist.</p>
    <a
      href="/"
      className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-lg transition"
    >
      Go Back Home
    </a>
  </div>
);

export default NotFound;
