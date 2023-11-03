"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import CarouselComponent from "../components/CarouselComponent";
import RecipeDataCard from "../components/RecipeCard";
import SearchBox from "../components/SearchBox";
import { renderRating } from "../Helpers";
import { mealTypesSmall } from "../SearchData";

const Home = () => {
  const [randomRecipeData, setRandomRecipeData] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  const [carouselRecipeData, setCarouselRecipeData] = useState([]);
  const [additionalRecipeData, setAdditionalRecipeData] = useState([]);

  const [randomDataLoading, setRandomDataLoading] = useState(true);
  const [carouselDataLoading, setCarouselDataLoading] = useState(true);
  const [additionalDataLoading, setAdditionalDataLoading] = useState(true);

  const [searchResult, setSearchResults] = useState(null);
  const router = useRouter();
  const carouselRecipeSlugs = [
    "pecan-mince-pie",
    "chunky-vegetable-brown-rice-soup",
    "orange-fennel-wild-rice-salad",
    "pork-shoulder-braised-black-vinegar-rice-wine-pickled-chillies",
    "prawn-cakes-cucumber-peanut-relish",
    "lamb-dopiaza-broccoli-rice",
  ];
  const additionalRecipeSlugs = [
    "mincemeat-shortbread-squares",
    "chicken-mushroom-risotto",
    "congee-soy-eggs",
    "korean-style-fried-rice",
    "quinoa-stir-fried-winter-veg",
    "quinoa-stir-fried-winter-veg",
  ];

  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch("/api/random?limit=6");
        let result = await response.json();
        if (response.status !== 200 || result === null) throw "api failure";
        setRandomRecipeData(result);
      } catch (ex) {
        setError(true);
        console.error("Failed to fetch random recipe data");
      }

      try {
        carouselRecipeSlugs.map(async (slug) => {
          let response = await fetch(`/api/recipebyslug?slug=${slug}`);
          let result = await response.json();
          console.log(result.result);
          if (response.status === 200 && result !== null) {
            setCarouselRecipeData((carouselRecipeData) => [
              ...carouselRecipeData,
              result.result,
            ]);
          } else {
            throw "api failure";
          }
        });
      } catch (ex) {
        setError(true);
        console.log("Fetching carousel recipies from API failed");
      }

      try {
        additionalRecipeSlugs.map(async (slug) => {
          let response = await fetch(`/api/recipebyslug?slug=${slug}`);
          let result = await response.json();
          if (response.status === 200 && result !== null) {
            setAdditionalRecipeData((additionalRecipeData) => [
              ...additionalRecipeData,
              result.result,
            ]);
          } else {
            throw "api failure";
          }
        });
      } catch (ex) {
        setError(true);
        console.log("Fetching additional recipies from API failed");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (randomRecipeData != null && randomRecipeData[0] != 0) {
      setRandomDataLoading(false);
    }
  }, [randomRecipeData]);

  useEffect(() => {
    if (carouselRecipeData != null && carouselRecipeData.length > 0) {
      setCarouselDataLoading(false);
    }
  }, [carouselRecipeData]);

  useEffect(() => {
    if (additionalRecipeData != null && additionalRecipeData[0] != 0) {
      setAdditionalDataLoading(false);
    }
  }, [additionalRecipeData]);


  return (
    <div className="flex flex-col h-full gap-y-8">
      {/* Hero Section */}
      <div className="flex-none mt-10 w-full h-96 md:h-[25rem] flex justify-center items-center">
        <img
          className="object-cover object-center w-full h-full fade-to-bottom brightness-75"
          src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2019/09/ranna-wordpress-theme-radiustheme.com-4-1240x578.jpg"
          alt="cover picture"
        />
        <div className="absolute w-full items-center flex flex-col gap-y-4">
          <p className="text-5xl md:text-6xl font-semibold text-white font-playfair-display drop-shadow-xl filter">
            Find a Recipe
          </p>
          <SearchBox />
        </div>
      </div>
      {/* Rest of body */}
      <div className="px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-x-2 md:gap-x-10 gap-y-6 text-center">
        {randomRecipeData.map((recipe, id) => (
          <RecipeDataCard
            key={"recommended_recipe_" + id}
            recipeData={recipe}
            dataLoading={randomDataLoading}
            error={error}
          />
        ))}
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
        {!carouselDataLoading && (
          <CarouselComponent recipes={carouselRecipeData} />
        )}
        <div className="flex flex-col md:flex-row gap-y-5 md:gap-x-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full w-3/4">
            {additionalRecipeData.map((recipe, id) => (
              <RecipeDataCard
                key={"additional_recipe_" + id}
                recipeData={recipe}
                dataLoading={additionalDataLoading}
                error={error}
              />
            ))}
          </div>
          <div className="flex flex-col gap-y-4 md:w-80 flex-none">
            <div className="border-b border-gray-400 dark:border-gray-500 relative pb-2 mb-4">
              <p className="text-2xl font-medium">Latest Recipes</p>
              <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[3px] w-14">
                &nbsp;
              </span>
            </div>
            <div className="flex flex-col gap-y-6">
              {additionalRecipeSlugs.map((recipe, id) => {
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
