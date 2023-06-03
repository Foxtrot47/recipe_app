import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { renderRating } from "../Helpers";

const RecipeDataCard = ({ recipeData, dataLoading, error }) => {
  return (
    <Link
      href={"/recipes/" + (!dataLoading ? recipeData.slug : "")}
      className="flex flex-col flex-0 gap-y-6 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg hover:drop-shadow-lg group overflow-hidden"
    >
      <div className="md:h-80 md:max-h-80 relative overflow-hidden">
        {recipeData && !dataLoading ? (
          <Image
            fill={true}
            priority={true}
            className="drop-shadow-xl filter rounded-lg object-cover group-hover:scale-110 group-hover:rotate-2 transition duration-300 ease-in-out"
            src={recipeData.images.url}
            alt={recipeData.images.alt}
          />
        ) : (
          <div className="flex items-center justify-center md:h-80 md:max-h-80 bg-gray-300 rounded dark:bg-gray-700 animate-pulse">
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-none flex-col items-center gap-y-2 px-4 pb-4">
        <div className="text-red-500 font-semibold capitalize">
          {recipeData && !dataLoading ? (
            recipeData.recipecategories && recipeData.recipecategories.length > 0 ? (
              recipeData.recipecategories[0].categories.name
            ) : (
              "Unknown"
            )
          ) : (
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-1 mb-5 animate-pulse"></div>
          )}
        </div>
        <div className="text-2xl flex-none text-center font-semibold truncate w-full">
          {recipeData && !dataLoading ? (
            recipeData.name
          ) : (
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-72 animate-pulse mx-auto mb-3"></div>
          )}
        </div>
        <div className="flex flex-none flex-row gap-x-2 text-sm text-red-500">
          {recipeData && !dataLoading ? (
            renderRating(recipeData.ratings.avg)
          ) : (
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          )}
        </div>
        <div className="md:px-4 h-full w-full text-ellipsis overflow-hidden dark:text-gray-300">
          {recipeData && !dataLoading ? (
            recipeData.description
          ) : (
            <>
              <div className="mx-auto h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-4"></div>
              <div className="mx-auto h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-56 mb-4"></div>
              <div className="mx-auto h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-4"></div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeDataCard;
