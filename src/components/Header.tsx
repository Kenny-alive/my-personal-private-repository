import { Link } from 'react-router';

function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-6 shadow-md flex justify-between items-center px-8">
      <h1 className="text-3xl font-extrabold tracking-wide">
        React: Routing and Hooks
      </h1>
      <nav>
        <Link
          to="/about"
          className="
            text-white
            text-2xl
            font-extrabold
            rounded-md
            px-6
            py-3
            border-2
            border-white
            shadow-lg
            hover:bg-white
            hover:text-indigo-700
            transition
            duration-300
            ease-in-out
            select-none
            active:scale-95
          "
        >
          About
        </Link>
      </nav>
    </header>
  );
}

export default Header;
