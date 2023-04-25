import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import CarouselComponent from "@/components/CarouselComponent.js";
import { fetchData, renderRating } from "@/Helpers.js";
import { mealTypesSmall } from "@/SearchData.js";

const Home = () => {
  const [randomRecipeData, setRandomRecipeData] = useState(null);
  const [carouselRecipeData, setCarouselRecipeData] = useState([]);
  const [additionalRecipeData, setAdditionalRecipeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResults] = useState(null);
  const router = useRouter();
  const carousselRecipeId = [
    666164, 236556, 760127, 771380, 339180, 243740, 728908,
  ];
  const additionalRecipesIds = [761176, 687363, 238164, 744140];

  useEffect(() => {
    fetchData("random", { limit: 6 }, "get", (response) => {
      if (response.status === 200 && response.data !== null) {
        setRandomRecipeData(response.data);
        setLoading(false);
      } else {
        console.log("Fetching recipies from API failed");
      }
    });
    // Fetching caroussel recipes
    carousselRecipeId.map((id) => {
      fetchData("recipebyid", { id: id }, "get", (response) => {
        if (response.status === 200 && response.data !== null) {
          setCarouselRecipeData((carouselRecipeData) => [
            ...carouselRecipeData,
            response.data,
          ]);
        } else {
          console.log("Fetching recipies from API failed");
        }
      });
    });
    // Fetching additional recipes
    additionalRecipesIds.map((index) => {
      fetchData("recipebyid", { id: index }, "get", (response) => {
        if (response.status === 200 && response.data !== null) {
          setAdditionalRecipeData((additionalRecipeData) => [
            ...additionalRecipeData,
            response.data,
          ]);
        } else {
          console.log("Fetching recipies from API failed");
        }
      });
    });
  }, []);

  const doAutoComplete = async () => {
    const query = document.getElementById("searchfield").value;
    if (query === "") setSearchResults(null);
    fetchData("autocomplete", { q: query }, "get", (response) => {
      if (response.status === 200 && response.data !== null) {
        setSearchResults(response.data);
      }
    });
  };

  const gotoSearch = (event) => {
    if (event.key === "Enter") router.push("/search?q=" + event.target.value);
  };

  return (
    <div className="flex flex-col h-full gap-y-8">
      {/* Hero Section */}
      <div className="flex-none mt-10 w-full h-96 md:h-[25rem] flex justify-center items-center">
        <img
          className="object-cover object-center w-full h-full fade-to-bottom brightness-75"
          src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2019/09/ranna-wordpress-theme-radiustheme.com-4-1240x578.jpg"
        />
        <div className="absolute w-full items-center flex flex-col gap-y-4">
          <p className="text-5xl md:text-6xl font-semibold text-white font-playfair-display drop-shadow-xl filter">
            Find a Recipe
          </p>
          <span className="w-10/12 md:w-2/5 bg-white dark:bg-gray-800 flex flex-row items-center text-xl opacity-80 drop-shadow-xl filter rounded-lg">
            <i className="fa-solid fa-magnifying-glass px-4 text-red-500 absolute"></i>
            <input
              id="searchfield"
              className="pl-11 py-4 w-full dark:bg-[#1d1e26] border-0 focus:border-gray-700 focus:ring-gray-900 caret-red-500 rounded-lg dark:placeholder:text-white dark:text-white text-lg"
              type="text"
              placeholder="Search for recipes"
              onInput={doAutoComplete.bind()}
              onKeyDown={gotoSearch}
              autoComplete="off"
            />
          </span>
          {searchResult !== null && searchResult.length > 0 && (
            <div className="absolute top-[135px] md:top-36 bg-white dark:bg-gray-800 rounded z-10 flex flex-col gap-y-2 p-2 opacity-95 drop-shadow-xl filter w-10/12 md:w-2/5 text-lg">
              {searchResult.map((recipe, id) => {
                return (
                  <Link
                    key={id}
                    href={`/recipes/${recipe.slug}`}
                    className="flex flex-row gap-x-4 items-center hover:bg-red-500 drop-shadow rounded"
                  >
                    <Image width={64} height={64} src={recipe.image.url} className="rounded" />
                    <p key={id}>{recipe.name}</p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* Rest of body */}
      <div className="px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-x-2 md:gap-x-10 gap-y-6 text-center">
        {!loading &&
          randomRecipeData.map((recipe, id) => {
            return (
              <Link
                key={id}
                href={"/recipes/" + recipe.slug}
                className="flex flex-col flex-0 gap-y-6 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg hover:drop-shadow-lg group overflow-hidden"
              >
                <div className="md:h-80 md:max-h-80 overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    priority={true}
                    className="drop-shadow-xl filter rounded-lg object-cover group-hover:scale-110 group-hover:rotate-2 transition duration-300 ease-in-out"
                    src={recipe.image.url}
                    alt={recipe.image.alt}
                  />
                </div>
                <div className="flex flex-none flex-col items-center gap-y-2 px-4 pb-4">
                  <p className="text-red-500 font-semibold capitalize">
                    {recipe.category.length > 0
                      ? recipe.category[0]
                      : "Unknown"}
                  </p>
                  <p className="text-2xl flex-none font-semibold truncate w-full">
                    {recipe.name}
                  </p>
                  <div className="flex flex-none flex-row gap-x-2 text-sm text-red-500">
                    {renderRating(recipe.rating.avg)}
                  </div>
                  <p className="md:px-4 h-full w-full text-ellipsis overflow-hidden dark:text-gray-300">
                    {recipe.description}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
      <div className="px-4 md:px-12">
        <div className="border-b border-gray-400 dark:border-gray-500 relative pb-2">
          <p className="text-3xl font-medium">Trending Recipes</p>
          <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[3px] w-60">
            &nbsp;
          </span>
        </div>
      </div>
      <div className="mt-0 px-4 md:px-8 h-full flex-none flex flex-col gap-y-10">
        <CarouselComponent recipes={carouselRecipeData} />
        <div className="flex flex-col md:flex-row gap-y-5 md:gap-x-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            {additionalRecipeData.map((recipe, id) => {
              return (
                <Link
                  key={id}
                  href={"/recipes/" + recipe.slug}
                  className="flex flex-col gap-y-6 hover:bg-gray-100 dark:hover:bg-gray-600 hover:drop-shadow-lg rounded-lg"
                >
                    <Image
                      className="drop-shadow-xl filter rounded-lg object-cover object-center h-80 w-auto"
                      src={recipe.image.url}
                      alt={recipe.image.alt}
                      width={370}
                      height={330}
                    />
                  <div className="flex flex-col items-center gap-y-2 pb-6 text-center">
                    <p className="text-red-500 font-semibold">
                      {recipe.category.length > 0
                        ? recipe.category[0]
                        : "Unknown"}
                    </p>
                    <p className="text-2xl font-semibold">{recipe.name}</p>
                    <div className="flex flex-row gap-x-2 text-sm text-red-500">
                      {renderRating(recipe.rating.avg)}
                    </div>
                    <p className="md:px-2 text-gray-600 dark:text-gray-300">
                      {recipe.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col gap-y-4 md:w-80 flex-none">
            <div className="border-b border-gray-400 dark:border-gray-500 relative pb-2 mb-4">
              <p className="text-2xl font-medium">Latest Recipes</p>
              <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[3px] w-14">
                &nbsp;
              </span>
            </div>
            <div className="flex flex-col gap-y-6">
              {additionalRecipesIds.map((id) => {
                return (
                  <div
                    key={id}
                    className="flex flex-row gap-x-4 hover:bg-gray-100 dark:hover:bg-gray-600 hover:drop-shadow rounded-lg"
                  >
                    <div className="flex-none ">
                      <Image
                        className="object-cover object-center w-36 h-36 rounded-lg"
                        width={144}
                        height={144}
                        src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2019/09/ranna_wordpress_theme_radiustheme.com_1-530x338.jpg"
                        alt="pizza"
                      />
                    </div>
                    <div className="flex flex-col gap-y-4 relative mt-4">
                      <span className="text-red-500 font-semibold -top-1.5 absolute">
                        Dinner
                      </span>
                      <p className="font-semibold text-lg whitespace-normal mt-6">
                        Lorem ipsum dolor sit amet jkjskfskfj
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-b border-gray-400 dark:border-gray-500 relative pb-2 mt-4">
              <p className="text-2xl font-medium">Recipe Categories</p>
              <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[3px] w-14">
                &nbsp;
              </span>
            </div>
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col w-16 px-2 pt-4 gap-y-4 text-xl text-gray-600 dark:text-gray-200 mb-4">
                {mealTypesSmall.map((category, id) => {
                  return (
                    <Link
                      key={id}
                      className="flex flex-row gap-x-2"
                      href={"/search?mealTypes=" + category}
                    >
                      <i className="fa-solid fa-circle-arrow-right text-red-500"></i>
                      <p> {category}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
