"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";

import { renderRating } from "../Helpers";

const carouselProps = () => ({
  showArrows: true,
  showStatus: false,
  showIndicators: false,
  showThumbs: false,
  infiniteLoop: true,
  autoPlay: false,
  stopOnHover: false,
  swipeable: true,
  dynamicHeight: false,
  useKeyboardArrows: true,
});

const carouselClasses =
  "bg-white dark:bg-gray-600 rounded-full md:py-4 md:px-6 py-2 px-4 font-bold drop-shadow-xl filter absolute z-10 text-red-500 top-28 md:top-1/2";

export default function CarouselComponent({
  carouselRecipeSlugs,
}: CarouselComponentProps) {
  const [carouselRecipeData, setCarouselRecipeData] = useState([]);
  useEffect(() => {
    carouselRecipeSlugs.map(async (slug: string) => {
      let response = await fetch(`/api/recipebyslug?slug=${slug}`);
      let result = await response.json();

      if (response.status === 200 && result !== null) {
        setCarouselRecipeData((carouselRecipeData) => [
          ...carouselRecipeData,
          result.result,
        ]);
      }
    });
  }, [carouselRecipeSlugs]);

  return (
    <Carousel
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className={`left-5 ${carouselClasses}`}
          >
            &lt;
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className={`right-5 ${carouselClasses}`}
          >
            &gt;
          </button>
        )
      }
      {...carouselProps()}
    >
      {carouselRecipeData &&
        carouselRecipeData.map((recipe) => (
          <Link
            href={`/recipes/${recipe.slug}`}
            key={recipe.id}
            className="block w-full relative group overflow-visible h-72 md:h-[35rem]"
          >
            <Image
              fill={true}
              className="filter object-cover object-center w-full rounded-xl shadow-xl"
              src={recipe.images.url}
              alt={recipe.name}
            />
            <div className="bottom-0 md:absolute md:top-auto inset-x-0 h-full flex flex-col w-full md:w-auto gap-y-4 justify-end items-center">
              <div className="md:bg-white md:dark:bg-gray-700 px-4 md:px-10 py-6 flex flex-col gap-y-2 md:gap-y-4 items-center w-full md:w-auto transition duration-300 ease-in-out md:translate-y-24 md:group-hover:translate-y-0">
                {recipe.recipecategories.length > 0 && (
                  <p className="text-red-500 font-semibold">
                    {recipe.recipecategories[0].categories.name}
                  </p>
                )}
                <p className="text-lg md:text-3xl font-semibold">
                  {recipe.name}
                </p>
                <div className="flex flex-row gap-x-2 text-sm text-red-500">
                  {renderRating(recipe.ratings.avg)}
                </div>
                <p className="whitespace-normal md:w-[500px] text-center">
                  {recipe.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </Carousel>
  );
}

interface CarouselComponentProps {
  carouselRecipeSlugs: string[];
}
