import Navbar from "./Navbar.jsx";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchData, renderRating } from "./Helpers.jsx";
import serialize from "form-serialize";
import {
  filters,
  dietTypes,
  mealTypes,
  timeFilters,
  cuisineTypes,
  calorieRange,
  difficultyRanges,
  ratingRanges,
  servingRanges,
} from "./SearchData.js";

const Search = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  let resultCount = 0,
    reachedBottom = false,
    resultsDup = null;

  useEffect(() => {
    fetchResults();
  }, [searchParams]);

  const fetchResults = () => {
    const body = {};
    let params = new URLSearchParams(searchParams);
    for (const [key, value] of params.entries()) {
      body[key] = value;
    }
    if (resultCount > 0) body["offset"] = resultCount;
    // Copy the search query to a hidden input field so that it will not get removed on parameter change
    // This is because search query intially came from outside the form and serialize function will not see it
    document.getElementById("queryField").value = body["q"];
    fetchData("search", body, "get", (response) => {
      if (response.status === 200 && response.data !== null) {
        if (resultsDup !== null) {
          response.data = resultsDup.concat(response.data);
        } else reachedBottom = false;
        resultsDup = response.data;
        setResults(response.data);
        resultCount += response.data.length;

        // If results are less than what we normally expect , don't turn on infinite scroll
        if (response.data < 20) reachedBottom = true;
        setLoading(false);
      } else {
        console.log("Fetching resuls from API failed");
      }
    });
  };

  const handleSubmit = () => {
    resultCount = 0;
    reachedBottom = false;
    const data = serialize(document.getElementById("filters"), { hash: true });
    setSearchParams(data);
  };

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom && reachedBottom === false && resultsDup !== null) {
      fetchResults();
    }
  };

  window.addEventListener("scroll", handleScroll, true);

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col mt-14">
        <form
          id="filters"
          className="fixed w-full flex flex-row drop-shadow text-black bg-white px-10 justify-around z-10"
          onClick={handleSubmit}
        >
          {/* Hidden Input field to keep search query intact*/}
          <input type="text" id="queryField" name="q" className="hidden" />
          {Object.keys(filters).map((i) => {
            return (
              <div
                key={i}
                className={`flex flex-row items-center gap-x-2 group py-5 px-6 ${
                  !filters[i]["full-width"] && "relative"
                }`}
              >
                {filters[i].name}
                <i className="fa-solid fa-angle-down group-hover:rotate-180 transition ease-out duration-300"></i>
                <div
                  className={`hidden group-hover:inline-block absolute top-[65px] bg-white drop-shadow-lg py-8 w-72 z-50
                    ${filters[i]["full-width"] && "w-screen"} ${
                    (filters[i].name === "Servings" && "right-0 w-56") ||
                    "left-0"
                  }
                  `}
                >
                  <div
                    className={`grid grid-cols-1 gap-y-4 text-xl gap-x-10 items-center justify-between px-10
                    ${filters[i]["full-width"] && "grid-cols-5"}
                    `}
                  >
                    {(filters[i].name === "Meal type" &&
                      mealTypes.map((type, i) => {
                        return (
                          <div key={i} className="flex flex-row gap-x-4">
                            <input
                              type="checkbox"
                              name="mealtypes"
                              value={type}
                              className="w-5"
                              onClick={handleSubmit}
                            />
                            <p>{type}</p>
                          </div>
                        );
                      })) ||
                      (filters[i].name === "Total Time" &&
                        Object.keys(timeFilters).map((index, i) => {
                          return (
                            <div key={i} className="flex flex-row gap-x-4">
                              <input
                                type="checkbox"
                                name="totalTime"
                                value={index}
                                className="w-5"
                                onClick={handleSubmit}
                              />
                              <p>{timeFilters[index]}</p>
                            </div>
                          );
                        })) ||
                      (filters[i].name === "Diet type" &&
                        dietTypes.map((diet, i) => {
                          return (
                            <div key={i} className="flex flex-row gap-x-4">
                              <input
                                type="checkbox"
                                name="dietType"
                                value={diet}
                                className="w-5"
                                onClick={handleSubmit}
                              />
                              <p>{diet}</p>
                            </div>
                          );
                        })) ||
                      (filters[i].name === "Calories" &&
                        Object.keys(calorieRange).map((index, i) => {
                          return (
                            <div key={i} className="flex flex-row gap-x-4">
                              <input
                                type="checkbox"
                                name="kcal"
                                value={index}
                                className="w-5"
                                onClick={handleSubmit}
                              />
                              <p>{calorieRange[index]}</p>
                            </div>
                          );
                        })) ||
                      (filters[i].name === "Difficulty" &&
                        difficultyRanges.map((difficulty, i) => {
                          return (
                            <div key={i} className="flex flex-row gap-x-4">
                              <input
                                type="checkbox"
                                name="skillLevel"
                                value={difficulty}
                                className="w-5"
                                onClick={handleSubmit}
                              />
                              <p>{difficulty}</p>
                            </div>
                          );
                        })) ||
                      (filters[i].name === "Cuisine" &&
                        cuisineTypes.map((cuisine, i) => {
                          return (
                            <div key={i} className="flex flex-row gap-x-4">
                              <input
                                type="checkbox"
                                name="cuisine"
                                value={cuisine}
                                className="w-5"
                                onClick={handleSubmit}
                              />
                              <p>{cuisine}</p>
                            </div>
                          );
                        })) ||
                      (filters[i].name === "Rating" &&
                        Object.keys(ratingRanges).map((i) => {
                          return (
                            <div key={i} className="flex flex-row gap-x-4">
                              <input
                                type="checkbox"
                                name="rating"
                                value={i}
                                className="w-5"
                                onClick={handleSubmit}
                              />
                              <p>{ratingRanges[i]}</p>
                            </div>
                          );
                        })) ||
                      (filters[i].name === "Servings" &&
                        servingRanges.map((serving, i) => {
                          return (
                            <div key={i} className="flex flex-row gap-x-4">
                              <input
                                type="checkbox"
                                name="yield"
                                value={serving}
                                className="w-5"
                                onClick={handleSubmit}
                              />
                              <p>{serving}</p>
                            </div>
                          );
                        }))}
                  </div>
                </div>
              </div>
            );
          })}
        </form>
        <div className="grid grid-cols-4 gap-10 mt-20 px-24">
          {!loading &&
            results.length > 0 &&
            results.map((recipe, id) => {
              return (
                <Link
                  key={id}
                  to={"/recipes/" + recipe.slug}
                  className="flex flex-col gap-y-6 hover:bg-gray-50 rounded-lg hover:drop-shadow-lg"
                >
                  <img
                    className="drop-shadow-xl filter rounded-lg object-cover object-center h-56"
                    src={recipe.image.url}
                    alt={recipe.image.alt}
                  />
                  <div className="flex flex-col gap-y-2 px-4">
                    <p className="text-xl font-semibold truncate w-full">
                      {recipe.name}
                    </p>
                    <div className="flex flex-row gap-x-2 text-accent">
                      {renderRating(recipe.rating.avg)}
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
      </div>
    </div>
  );
};

export default Search;
