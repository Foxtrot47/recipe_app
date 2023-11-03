"use client";

import serialize from "form-serialize";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { SetStateAction, useCallback, useEffect, useState } from "react";

import Pagination from "../../components/Pagination";
import { DOTS, usePagination } from "../../components/usePagination";
import { renderRating } from "../../Helpers";
import { filters } from "../../SearchData";

let PageSize = 20;

const Search = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // For resetting page number on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, currentPage]);

  const fetchResults = async () => {
    if (Object.keys(searchParams).length < 1) return;

    const params = new URLSearchParams(searchParams);

    if (currentPage > 1)
      params.set("skip", (currentPage * PageSize - PageSize).toString());

    const fetchResponse = await fetch(`/api/search?${params}`);
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
    const params = new URLSearchParams(data);
    router.push(pathname + "?" + params.toString());
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
                    md:fixed md:w-full md:flex md:flex-row md:px-10 md:justify-around md:h-auto md:-top-2 md:z-10
                    fixed h-screen w-screen flex-col overscroll-contain z-30
                    transition ease-in-out duration-700 top-0
                    ${
                      filterButtonClicked
                        ? "flex translate-y-0"
                        : "translate-y-full"
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
            <div
              key={i}
              className={
                "items-center gap-x-2 group py-5 px-6 text-xl justify-between grid grid-cols-2 md:flex md:flex-row " +
                (!filters[i]["full-width"] && "md:relative")
              }
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
              <div
                className={
                  "hidden md:group-hover:block absolute bg-white dark:bg-gray-600 drop-shadow-lg py-8 z-20 gap-y-2 top-[64px] h-max " +
                  (filters[i]["full-width"] ? "w-screen " : "w-72 ") +
                  (filters[i].name === "Servings"
                    ? "md:right-0 w-44 "
                    : "md:left-0")
                }
              >
                <div
                  className={`text-xl gap-x-10 items-center justify-between px-10
                              grid gap-y-4 grid-cols-1 
                              ${filters[i]["full-width"] && "grid-cols-5"}
                  `}
                >
                  {filters[i].data.map((filterItem, id) => {
                    return (
                      <div
                        key={id}
                        className="flex flex-row gap-x-4 dark:text-gray-400 dark:hover:text-gray-200 items-center"
                      >
                        <input
                          type="checkbox"
                          name={filters[i].slug}
                          value={
                            typeof filterItem !== "object"
                              ? filterItem
                              : Object.keys(filterItem)[0]
                          }
                          className="w-5 accent-red-500"
                          onChange={handleSubmit}
                        />
                        <p>
                          {typeof filterItem !== "object"
                            ? filterItem
                            : Object.values(filterItem)[0]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
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
