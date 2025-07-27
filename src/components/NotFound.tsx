import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
      <h1 className="text-6xl font-extrabold mb-4 text-red-600">
        404 — Page Not Found
      </h1>
      <p className="text-2xl max-w-lg">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="
          mt-4
          inline-flex
          items-center
          text-indigo-700
          text-lg
          font-semibold
          px-5
          py-2
          border-2
          border-indigo-700
          rounded-full
          hover:bg-indigo-700
          hover:text-white
          transition
          duration-300
          ease-in-out
          active:scale-95
        "
      >
        <span className="mr-2 text-2xl">←</span>
        Back to App
      </Link>
    </div>
  );
}
