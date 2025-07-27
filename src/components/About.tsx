import { Link } from 'react-router';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
      <h1 className="text-5xl font-extrabold mb-6 text-purple-700">
        About This App
      </h1>
      <p className="text-xl mb-4 max-w-xl">
        This application was created by{' '}
        <a
          href="https://github.com/Kenny-alive"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 font-semibold underline hover:text-indigo-800 transition"
        >
          Sergey Kudrin
        </a>
        .
      </p>
      <p className="text-lg max-w-lg">
        It is part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline hover:text-indigo-800 transition"
        >
          RS School React Course
        </a>
        .
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
