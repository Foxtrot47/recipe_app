import Navbar from "./Navbar.jsx";
import { useEffect, useState } from "react";

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

const Recipe = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  useEffect(() => {
    if (searchParams === undefined) return;
    let endPoint = "search";
    let body = {};
    searchParams.forEach((param, key) => {
      body[key] = param;
    });
  }, [searchParams]);

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col gap-y-6 mt-14">
        <form className="flex flex-row drop-shadow text-black bg-white px-10 justify-around relative">
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
                  className={`hidden group-hover:inline-block absolute top-[65px] bg-white drop-shadow-lg py-8 w-72
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
                              className="w-5"
                            />
                            <p>{type}</p>
                          </div>
                        );
                      })) ||
                      (filters[i].name === "Total Time" &&
                        Object.keys(timeFilters).map((index) => {
                          return (
                            <div key={i} className="flex flex-row gap-x-4">
                              <input
                                type="checkbox"
                                name="totalTime"
                                className="w-5"
                              />
                              <p>{timeFilters[index]}</p>
                            </div>
                          );
                        })) ||
                      (filters[i].name === "Diet type" &&
                        dietTypes.map((diet) => {
                          return (
                            <div key={i} className="flex flex-row gap-x-4">
                              <input
                                type="checkbox"
                                name="dietType"
                                className="w-5"
                              />
                              <p>{diet}</p>
                            </div>
                          );
                        })) ||
                      (filters[i].name === "Calories" &&
                        Object.keys(calorieRange).map((index) => {
                          return (
                            <div key={i} className="flex flex-row gap-x-4">
                              <input
                                type="checkbox"
                                name="maxCalorie"
                                className="w-5"
                              />
                              <p>{calorieRange[index]}</p>
                            </div>
                          );
                        })) ||
                      (filters[i].name === "Difficulty" &&
                        difficultyRanges.map((difficulty) => {
                          return (
                            <div key={i} className="flex flex-row gap-x-4">
                              <input
                                type="checkbox"
                                name="difficulty"
                                className="w-5"
                              />
                              <p>{difficulty}</p>
                            </div>
                          );
                        })) ||
                      (filters[i].name === "Cuisine" &&
                        cuisineTypes.map((cuisine) => {
                          return (
                            <div key={i} className="flex flex-row gap-x-4">
                              <input
                                type="checkbox"
                                name="cuisine"
                                className="w-5"
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
                                className="w-5"
                              />
                              <p>{ratingRanges[i]}</p>
                            </div>
                          );
                        })) ||
                      (filters[i].name === "Servings" &&
                        servingRanges.map((serving) => {
                          return (
                            <div key={i} className="flex flex-row gap-x-4">
                              <input
                                type="checkbox"
                                name="servings"
                                className="w-5"
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
      </div>
    </div>
  );
};

export default Recipe;
