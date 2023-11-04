import Image from "next/image";
import Link from "next/link";
import { Key } from "react";

import { renderRating } from "../../../Helpers";
import prisma from "../../../lib/prisma";

async function getSimiliarRecipesData(recipeId: string) {

  const similiarRecipes = await prisma.similarrecipes.findMany({
    select: {
      similiarrecipeid: true,
    },
    where: {
      recipeid: Number(recipeId),
    },
  });

  const similiarRecipesIds = similiarRecipes.map(
    (recipe) => recipe.similiarrecipeid
  );

  const recipes = await prisma.recipes.findMany({
    select: {
      id: true,
      images: true,
      name: true,
      ratings: true,
      slug: true,
    },
    where: {
      id: { in: similiarRecipesIds },
    },
    take: 5,
  });

  return { similiarRecipes: recipes };
}

export default async function ReviewData({ recipeId }) {
  const { similiarRecipes } = await getSimiliarRecipesData(recipeId);

  return (
    <>
      <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mb-6">
        <p className="text-2xl font-medium">Similiar Recipes</p>
        <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[3px] w-44">
          &nbsp;
        </span>
      </div>
      <div className="flex flex-col gap-y-4 mb-4">
        {similiarRecipes !== undefined &&
          similiarRecipes.map((recipe, id: Key) => (
            <Link
              key={id}
              className="flex flex-row gap-x-4 w-full pr-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 hover:drop-shadow"
              href={"/recipes/" + recipe.slug}
            >
              <div className="flex-none">
                <Image
                  width={96}
                  height={96}
                  className="object-cover object-center h-24 rounded-lg"
                  src={recipe.images.url}
                  alt={recipe.images.alt}
                />
              </div>
              <div className="flex flex-col justify-around place-content-start">
                <p className="text-lg font-semibold text-clip overflow-hidden w-50">
                  {recipe.name}
                </p>
                <div className="flex flex-row gap-x-2 text-red-500 text-sm">
                  {renderRating(recipe.ratings.avg)}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
