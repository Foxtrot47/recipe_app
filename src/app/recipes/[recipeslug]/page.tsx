import Image from "next/image";
import Link from "next/link";
import { Key, Suspense } from "react";

import { renderRating } from "../../../Helpers";
import { fetchJsonBySlug } from "../../../lib/prisma";
import { mealTypesSmall } from "../../../SearchData";
import ReviewDataComponent from "./ReviewDataComponent";
import SimiliarRecipesComponent from "./SimiliarRecipesComponent";

async function getData(recipeslug: string) {
  const recipeData = await fetchJsonBySlug(recipeslug);

  return {
    recipeData
  };
}

export default async function Page({
  params,
}: {
  params: { recipeslug: string };
}) {
  const { recipeData } = await getData(params.recipeslug);

  return (
    <div className="flex flex-col gap-y-6 mt-14">
      <div className="flex flex-col gap-y-4 relative justify-center items-center bg-red-500 h-56 md:h-72 text-white font-medium text-center">
        <div className="w-full">
          <Image
            alt={recipeData.images.alt}
            src={recipeData.images.url}
            fill={true}
            priority={true}
            className="object-cover object-center w-full relative opacity-10 h-auto"
          />
        </div>
        <div className="text-3xl md:text-4xl font-helvetica-neue font-semibold px-4">
          {recipeData.name}
        </div>
        <div className="text-lg md:flex md:flex-row gap-x-2 items-center z-0 text-gray-300 font-regular">
          <Link href="/" className="hover:text-gray-100">
            <i className="fa-solid fa-home"></i>
            &nbsp;Home&nbsp;
            <i className="fa-regular fa-angle-right text-sm"></i>
          </Link>
          {recipeData.recipecategories[0] && (
            <Link
              href={`/search?mealTypes=${recipeData.recipecategories[0].categories.name}`}
              className="hover:text-gray-100"
            >
              &nbsp;
              {recipeData.recipecategories[0].categories.name}
              &nbsp;
              <i className="fa-regular fa-angle-right text-sm" />
            </Link>
          )}
          <p className="text-gray-100">{recipeData.name}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-6 px-4 md:px-20">
        <div className="flex flex-col gap-y-1">
          <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-6 p-2 mb-1">
            {/* {recipeData && recipeData.author && (
              <div className="text-gray-500 dark:text-gray-100 flex flex-row gap-x-1 items-center">
                <i className="text-red-500 font-bold fa-solid fa-user"></i>
                <span className="text-gray-500 dark:text-gray-400">By</span>
                {recipeData.author}
              </div>
            )} */}
            {recipeData.recipecuisines.length > 0 && (
              <div className="text-gray-500 dark:text-gray-100 flex flex-row gap-x-1">
                <i className="text-red-500 font-bold fa-solid fa-bell-concierge"></i>
                <span className="text-gray-500 dark:text-gray-400">
                  Cuisine:
                </span>
                {recipeData.recipecuisines.map((cu, index: Key) => (
                  <span key={index}>{cu.cuisines.name},</span>
                ))}
              </div>
            )}
            {recipeData.recipecategories.length > 0 && (
              <div className="text-gray-500 dark:text-gray-100 flex flex-row gap-x-1">
                <i className="text-red-500 font-bold fa-solid fa-book"></i>
                <span className="text-gray-500 dark:text-gray-400">
                  Category:
                </span>
                {recipeData.recipecategories.map((cat, index: Key) => (
                  <span key={index}>{cat.categories.name},</span>
                ))}
              </div>
            )}

            {recipeData.recipediets.length > 0 && (
              <div className=" flex flex-row gap-x-4">
                {recipeData.recipediets.map((recipediet, index: Key) => (
                  <div
                    key={index}
                    className="flex flex-row gap-x-2 items-center whitespace-normal"
                  >
                    {(recipediet.diets.display === "diary-free" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M22.1 21.5L2.4 1.7L1.1 3L6.1 8C5.1 10.3 4.5 12.8 4.5 14.5C4.5 18.6 7.9 22 12 22C14.2 22 16.2 21 17.6 19.5L20.8 22.7L22.1 21.5M19.5 14.5C19.5 10.4 16.1 2 12 2C10.5 2 9.1 3.1 7.9 4.7L19.3 16.1C19.4 15.6 19.5 15.1 19.5 14.5Z" />
                      </svg>
                    )) ||
                      (recipediet.diets.display === "gluten-free" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="text-red-500"
                          stroke="currentColor"
                          fontSize={19}
                        >
                          <path d="M11.96,1.21C11.3,2.76 10.64,4.31 10.65,5.82C10.66,6.42 10.77,7 10.94,7.62C10.86,7.46 10.77,7.31 10.67,7.17C9.83,6 8.17,5 6.5,4C6.5,4.8 6.5,5.59 6.68,6.36L13,12.68V10.7C14.5,9.8 15.92,8.88 16.67,7.83C17.5,6.67 17.5,5.33 17.5,4C15.83,5 14.17,6 13.33,7.17C13.23,7.31 13.15,7.45 13.07,7.59C13.25,6.96 13.36,6.32 13.35,5.69C13.34,4.18 12.65,2.69 11.96,1.21M3.28,5.5L2,6.77L6.64,11.41C6.75,12 6.95,12.55 7.33,13.08C8.08,14.13 9.5,15.05 11,15.95V18.23L10.67,17.67C9.83,16.5 8.17,15.5 6.5,14.5C6.5,15.83 6.5,17.17 7.33,18.33C8.08,19.38 9.5,20.3 11,21.2V23H13V21.2C13.74,20.76 14.45,20.31 15.07,19.84L18.73,23.5L20,22.22C14,16.23 9.1,11.32 3.28,5.5M17.5,9.25C15.83,10.25 14.17,11.25 13.33,12.42L13.12,12.79L15,14.66C15.67,14.16 16.27,13.64 16.67,13.08C17.5,11.92 17.5,10.58 17.5,9.25M17.5,14.5C16.93,14.84 16.38,15.18 15.85,15.53L17.29,16.97C17.5,16.17 17.5,15.33 17.5,14.5Z" />
                        </svg>
                      )) ||
                      (recipediet.diets.display === "vegan" && (
                        <i className="fa-solid fa-circle-check text-red-500"></i>
                      )) ||
                      (recipediet.diets.display === "healthy" && (
                        <i className="fa-solid fa-heart text-red-500"></i>
                      ))}
                    {recipediet.diets.display !== "Vegetarian"}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <div className="w-full h-56 md:h-[450px] relative">
              <Image
                fill={true}
                className="object-cover object-center rounded"
                src={recipeData.images.url}
                alt={recipeData.images.alt}
                priority={true}
              />
            </div>

            <div className="flex flex-row gap-x-6 absolute bottom-3 md:bottom-5 left-3 md:left-5 y-0 bg-white">
              {recipeData.recipediets.find(
                (recipediet) =>
                  recipediet.diets.display == "Vegetarian" ||
                  recipediet.diets.display == "Vegan"
              ) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="text-green-veg w-10 md:w-12"
                  fill="currentColor"
                >
                  <path d="M20 4V20H4V4H20M22 2H2V22H22V2M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="text-[#9d380c] w-10 md:w-12"
                  fill="currentColor"
                >
                  <path d="M20 4V20H4V4H20M22 2H2V22H22V2M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6Z" />
                </svg>
              )}
            </div>
            <div className="absolute top-3 md:top-5 left-3 md:left-5 border border-black bg-white px-2 py-1">
              <div className="flex flex-row gap-x-2 md:text-lg text-black">
                {renderRating(recipeData.ratings.avg)}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 place-items-center gap-y-4 rounded bg-gray-100 dark:bg-gray-700 px-2 py-4 md:px-16">
            <div className="flex flex-row gap-x-4 items-center">
              <i className="fa-duotone fa-hat-chef text-4xl text-red-500"></i>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Difficulty</span>
                <span className="text-gray-400">
                  {recipeData.skilllevel || "N/A"}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 items-center">
              <i className="fa-duotone fa-family text-4xl text-red-500"></i>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Servings</span>
                <span className="text-gray-400">
                  {recipeData.yield || "N/A"}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 items-center">
              <i className="fa-duotone fa-knife-kitchen text-4xl text-red-500"></i>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Prep Time</span>
                <span className="text-gray-400">
                  {recipeData.times.preptime}m
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 items-center">
              <i className="fa-duotone fa-bowl-rice text-4xl text-red-500"></i>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Cook Time</span>
                <span className="text-gray-400">
                  {recipeData.times.cooktime}m
                </span>
              </div>
            </div>
          </div>
          <div className="py-4 text-lg">{recipeData.description}</div>
          <div className="grid grid-col-1 md:grid-cols-2 gap-x-4">
            <div className="flex flex-col">
              <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
                <p className="text-2xl md:text-3xl font-medium">Ingredients</p>
                <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-32 md:w-40">
                  &nbsp;
                </span>
              </div>
              <div className="flex flex-col gap-y-2 my-10">
                {recipeData.ingredientgroups.map(
                  (ingredientgroup, index: Key) => (
                    <div key={index}>
                      {ingredientgroup.heading && (
                        <p className="text-2xl py-4">
                          {ingredientgroup.heading}
                        </p>
                      )}
                      <div className="text-lg flex flex-col px-4 gap-y-4">
                        <ul className="list-disc">
                          {ingredientgroup.ingredients.map(
                            (ingredient, index: Key) => (
                              <li key={index}>
                                {ingredient.quantitytext} {}
                                {ingredient.ingredienttext}
                                {ingredient.note}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
                <p className="text-2xl md:text-3xl font-medium">Instructions</p>
                <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-32 md:w-40">
                  &nbsp;
                </span>
              </div>
              <div className="flex flex-col gap-y-9 my-10">
                {recipeData.instructions.map((instruction, id: number) => (
                  <div key={instruction.id} className="flex flex-row gap-x-4">
                    <div className="h-10 pr-4 py-1 border-r-red-500 border-r-2 flex items-center text-2xl flex-none">
                      Step {id + 1}
                    </div>
                    <p className="text-lg pt-1 whitespace-pre-wrap">
                      {instruction.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
              <p className="text-2xl md:text-3xl font-medium">
                <i className="fa-solid fa-wheat text-red-500 text-xl mr-2"></i>
                Nutrional Info
              </p>
              <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-44 md:w-56">
                &nbsp;
              </span>
            </div>
            <div className="grid grid-cols-8 gap-x-32 md:gap-x-32 py-8 overflow-x-scroll md:overflow-visible">
              {recipeData.nutritionalinfos.map((nutrition, index: Key) => (
                <div
                  key={index}
                  className="flex flex-col gap-x-4 bg-gray-200 dark:bg-gray-600 items-center px-14 py-6 rounded-full"
                >
                  <p className="text-lg pt-1 whitespace-pre-wrap">
                    {nutrition.value}
                    {nutrition.suffix}
                  </p>
                  <span className="text-lg capitalize font-semibold dark:text-gray-200">
                    {nutrition.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Suspense>
            <ReviewDataComponent recipeId={recipeData.id} />
          </Suspense>
        </div>
        <div className="flex flex-col md:w-1/4 flex-none h-full">
          <Suspense>
            <SimiliarRecipesComponent recipeId={recipeData.id} />
          </Suspense>
          <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-4">
            <p className="text-2xl font-medium">Recipe Categories</p>
            <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[3px] w-48">
              &nbsp;
            </span>
          </div>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col w-16 px-2 pt-4 gap-y-4 text-xl text-gray-600 dark:text-gray-200 mb-4">
              {mealTypesSmall.map((category, id) => (
                <Link
                  key={id}
                  className="flex flex-row gap-x-2"
                  href={`/search?mealTypes=${category}`}
                >
                  <i className="fa-solid fa-circle-arrow-right text-red-500"></i>
                  <p> {category}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
