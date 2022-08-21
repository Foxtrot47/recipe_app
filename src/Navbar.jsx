import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white text-gray-900 border-gray-200 px-10 pb-2 pt-3 dark:bg-gray-900 fixed top-0 w-full drop-shadow z-10 font-medium dark:text-white">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="flex flex-row gap-x-10 items-center">
          <Link
            to={import.meta.env.VITE_SITE_ROOT}
            className="flex flex-row items-baseline gap-x-2 pb-1"
          >
            <i className="fa-solid fa-burger-cheese text-xl" />
            <span className="text-3xl font-helvetica-neue lowercase">
              Recipes
            </span>
          </Link>
          <div className="justify-between items-center flex w-auto">
            <ul className="flex flex-row gap-x-8 font-medium text text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  to="/"
                  className="text-red-500 border-b-red-500 border-b-4 pb-[16px]"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Category
                </a>
              </li>
              <li>
                <Link
                  to="/search"
                  className="hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Recipes
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex">
          <div className="relative block dark:text-gray-200 font-normal">
            <div className="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none">
              <i className="fa-regular fa-search"></i>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="p-2 pl-10 w-full bg-gray-100 dark:bg-gray-700 placeholder:text-gray-900 placeholder:dark:text-gray-300 hover:placeholder:text-gray-900 dark:hover:placeholder:text-slate-200 rounded-full border border-gray-300 dark:border-gray-800 focus:outline-red-500 shadow-inner"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
