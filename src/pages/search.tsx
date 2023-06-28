import { Listbox, Transition } from "@headlessui/react";
import serialize from "form-serialize";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Fragment, SetStateAction, useEffect, useState } from "react";

import Pagination from "../components/Pagination";
import { DOTS, usePagination } from "../components/usePagination";
import { renderRating } from "../Helpers";
import { filters } from "../SearchData";

let PageSize = 20;

const Search = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  // For resetting page number on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [router.query]);

  useEffect(() => {
    setLoading(true);
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, currentPage]);

  const fetchResults = async () => {
    if (Object.keys(router.query).length < 1) return;

    // Serialize the query parameters
    let queryParams = router.query;

    const additionalParams: Record<string, string> = {};
    if (currentPage > 1)
      additionalParams.skip = (currentPage * PageSize - PageSize).toString();

    if (queryParams.name && queryParams.name != "")
      setSearchQuery(queryParams.name.toString());

    queryParams = {
      ...queryParams,
      ...additionalParams,
    };
    const serializedParams = queryString.stringify(queryParams);

    const fetchResponse = await fetch(`/api/search?${serializedParams}`);
    const fetchResult = await fetchResponse.json();
    if (fetchResponse.status === 200 && fetchResult.recipes !== null) {
      setResults(fetchResult.recipes);
      setResultCount(fetchResult.total);
      setLoading(false);
    } else {
      console.log("Fetching resuls from API failed");
    }
  };

  const handleSubmit = () => {
    setResults(null);
    setResultCount(0);
    setCurrentPage(1);
    const data = serialize(document.getElementById("filters"), { hash: true });
    router.query = data;
    router.push(router);
    setFilterButtonClicked(false);
  };

  const handleFilterButtonTap = (state) => {
    setFilterButtonClicked(state);
  };

  return (
    <div className="flex flex-col mt-[62px]">
      <button
        className="md:hidden py-4 flex flex-row gap-x-2 justify-center text-xl text-black bg-white drop-shadow dark:bg-gray-600 dark:text-gray-100 z-10"
        onClick={() => handleFilterButtonTap(true)}
      >
        <i className="fa-solid fa-bars-filter text-red-500"></i>
        Filters
      </button>
      <form
        id="filters"
        className={`drop-shadow text-black bg-white dark:bg-gray-600 dark:text-gray-100
                    md:flex md:flex-row md:px-10 md:justify-around fixed md:static h-screen md:h-max
                    w-screen md:w-auto flex-col overscroll-contain z-30 md:z-10 transition ease-in-out duration-700
                    ${
                      filterButtonClicked
                        ? "flex translate-y-0"
                        : "translate-y-full md:translate-y-0"
                    }
                  `}
      >
        <div className="md:hidden grid grid-cols-3 mb-5 dark:bg-gray-800 py-4 p-6 text-2xl">
          <button
            type="button"
            onClick={() => setFilterButtonClicked(false)}
            className="text-left"
          >
            <i className="fa-solid fa-circle-xmark text-xl" />
          </button>
          <p className="justify-self-center">Filters</p>
        </div>
        {/* Hidden Input field to keep search query intact*/}
        <input
          type="text"
          id="queryField"
          name="name"
          className="hidden"
          value={searchQuery}
          readOnly
        />
        {Object.keys(filters).map((i) => {
          return (
            <>
              {/* Mobile Select Menu Start */}
              <div
                key={i}
                className="items-center gap-x-2 group py-5 px-6 text-xl justify-between grid grid-cols-2 md:hidden"
              >
                {filters[i].name}
                <i className="hidden md:block fa-solid fa-angle-down group-hover:rotate-180 transition ease-out duration-300"></i>

                <select
                  className="md:hidden rounded-lg bg-gray-800 focus:border-red-500 focus:ring-0"
                  name={filters[i].slug}
                >
                  <option value="">Any</option>
                  {filters[i].data.map((filterItem, id) => {
                    return (
                      <option
                        key={id}
                        value={
                          typeof filterItem !== "object"
                            ? filterItem
                            : Object.keys(filterItem)[0]
                        }
                        onChange={handleSubmit}
                      >
                        {typeof filterItem !== "object"
                          ? filterItem
                          : Object.values(filterItem)[0]}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* Mobile Select Menu End */}

              <Listbox as="div" className="hidden md:block" >
                <div>
                  <Listbox.Button className="relative w-full cursor-default rounded-lg text-xl py-4 pl-4 pr-10 text-left hover:text-red-500">
                    <span className="block">{filters[i].name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <i
                        className="hidden md:block fa-solid fa-angle-down group-hover:rotate-180 transition ease-out duration-300"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-96 w-auto overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {filters[i].data.map((filterItem, id) => (
                        <Listbox.Option
                          key={id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? "bg-red-100 text-black dark:text-white dark:bg-red-500" : "text-gray-900 dark:text-gray-200"
                            }`
                          }
                          value={filterItem}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {typeof filterItem !== "object"
                                  ? filterItem
                                  : Object.values(filterItem)[0]}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600 dark:text-red-400">
                                  <i
                                    className="h-5 w-5 fa-solid fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </>
          );
        })}

        <input
          className="md:hidden py-4 bg-gray-800 mx-4 border-gray-900 border rounded-full active:bg-gray-700 drop-shadow-xl"
          type="button"
          value="Submit"
          onClick={handleSubmit}
        />
      </form>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pt-6 md:pt-24 px-4 md:px-24">
        {!loading &&
          results.length > 0 &&
          results.map((recipe, id) => {
            return (
              <Link
                key={id}
                href={"/recipes/" + recipe.slug}
                className="flex flex-col gap-y-6 hover:bg-white dark:hover:bg-gray-600 rounded-lg hover:drop-shadow-lg"
              >
                <Image
                  className="drop-shadow-xl filter rounded-lg object-cover object-center h-56 w-auto"
                  width={224}
                  height={224}
                  src={recipe.images.url}
                  alt={recipe.images.alt}
                />
                <div className="flex flex-col gap-y-2 px-4">
                  <p className="text-xl font-semibold truncate w-full dark:text-white">
                    {recipe.name}
                  </p>
                  <div className="flex flex-row gap-x-2 text-red-500">
                    {renderRating(recipe.ratings.avg)}
                  </div>
                  <div className="flex flex-row gap-x-2 text-sm"></div>
                  <p className="h-12 mb-4 w-full text-ellipsis overflow-hidden">
                    {recipe.description}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
      {!loading && results && resultCount > 0 && (
        <div className="flex w-full justify-center my-6">
          <Pagination
            currentPage={currentPage}
            totalCount={resultCount}
            pageSize={PageSize}
            onPageChange={(page: SetStateAction<number>) =>
              setCurrentPage(page)
            }
          />
        </div>
      )}
    </div>
  );
};

export default Search;
