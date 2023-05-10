import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [searchinputTapped, setSearchInputTapped] = useState(false);
  const [searchInputEnabled, setSearchInputEnabled] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      setSearchInputEnabled(false);
    } else {
      setSearchInputEnabled(true);
    }
  }, [router]);
  const gotoSearch = (e) => {
    if (e.key === "Enter") {
      router.push(`/search?q=${e.target.value}`);
      setSearchInputTapped(false);
    }
  };

  return (
    <nav className="bg-white text-gray-900 border-gray-200 px-5 md:px-10 pb-2 pt-3 dark:bg-gray-900 fixed top-0 w-full drop-shadow z-20 font-medium dark:text-white">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="flex flex-row gap-x-10 items-center">
          <Link
            id="brand-container"
            href="/"
            className="flex flex-row items-baseline gap-x-2 pb-1"
          >
            <i className="fa-solid fa-burger-cheese text-xl" />
            <span className="text-3xl font-helvetica-neue lowercase">
              Recipes
            </span>
          </Link>
          <div className="justify-between items-center w-auto hidden md:flex">
            <ul className="flex flex-row gap-x-8 font-medium text text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  href="/"
                  className="text-red-500 border-b-red-500 border-b-4 pb-[16px]"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Recipes
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden md:block">
          {searchInputEnabled && (
            <div className="relative block dark:text-gray-200 font-normal">
              <div className="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none">
                <i className="fa-regular fa-search"></i>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="p-2 pl-10 w-full bg-gray-100 dark:bg-gray-700 placeholder:text-gray-900 placeholder:dark:text-gray-300 hover:placeholder:text-gray-900 dark:hover:placeholder:text-slate-200 rounded-full border border-gray-300 dark:border-gray-800 focus:outline-red-500 shadow-inner"
                placeholder="Search..."
                onKeyDown={gotoSearch}
              />
            </div>
          )}
        </div>
        <div className="md:hidden flex flex-row gap-x-10 items-center dark:text-gray-200 font-normal">
          {searchInputEnabled && (
            <button
              type="button"
              id="mobile-search-button"
              onClick={() => setSearchInputTapped(true)}
            >
              <i className="fa-regular fa-search" />
            </button>
          )}
          {searchinputTapped && (
            <div
              id="mobile-searchbar"
              className="left-0 absolute w-full h-full flex flex-row gap-x-5 items-center dark:bg-gray-900 dark:text-gray-200 px-4 font-normal z-20"
            >
              <div className="flex absolute top-[19px] pl-4 pointer-events-none">
                <i className="fa-regular fa-search"></i>
              </div>
              <input
                type="text"
                id="mobile-search-input"
                className="p-2 pl-10 w-full bg-gray-100 dark:bg-gray-700 placeholder:text-gray-900 placeholder:dark:text-gray-300 hover:placeholder:text-gray-900 dark:hover:placeholder:text-slate-200 rounded-full border border-gray-300 dark:border-gray-800 focus:outline-red-500 shadow-inner"
                placeholder="Search..."
                // Disabling rule because this is a mobile-only input
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                onKeyDown={gotoSearch}
              />
              <button type="button" onClick={() => setSearchInputTapped(false)}>
                <i className="fa-regular fa-arrow-right-from-bracket" />
              </button>
            </div>
          )}
          <div className="group">
            <button id="mobile-hamburger-button" type="button">
              <i className="fa-regular fa-bars" />
            </button>
            <div
              id="mobile-hamburger-panel"
              className="top-0 right-0 absolute hidden justify-end p-2 group-hover:flex"
            >
              <div className="absolute flex flex-col gap-y-4 py-6 px-8 pr-32 text-lg rounded-lg backdrop-blur-3xl dark:bg-gray-800 drop-shadow-lg">
                <Link href="/" className="text-red-500" aria-current="page">
                  Home
                </Link>

                <Link href="/categories" className="">
                  Category
                </Link>

                <Link href="/search" className="">
                  Recipes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute left-0 bg-black transition ease-in-out duration-50 z-10
          ${
            searchinputTapped
              ? "bg-opacity-80 h-screen w-screen"
              : "bg-opacity-0 h-0 w-0"
          }`}
      ></div>
    </nav>
  );
};

export default Navbar;
