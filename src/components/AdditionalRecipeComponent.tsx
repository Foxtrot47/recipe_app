import { Key } from "react";

import { fetchJsonBySlug } from "../lib/prisma";
import RecipeDataCard from "./RecipeCard";

async function getData(additionalRecipeSlugs: string[]) {
  return Promise.all(
    additionalRecipeSlugs.map(async (slug) => {
      const newData = await fetchJsonBySlug(slug);
      return newData;
    })
  );
}

export default async function AdditionalRecipeComponent({
  additionalRecipeSlugs,
}: AdditionalRecipeProps) {
  const additionalRecipeData = await getData(additionalRecipeSlugs);
  let error = false;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full w-3/4">
      {additionalRecipeData.map((recipe, id: Key) => {
        return (
          <RecipeDataCard
            key={"additional_recipe_" + id}
            recipeData={recipe}
            dataLoading={false}
            error={error}
          />
        );
      })}
    </div>
  );
}

interface AdditionalRecipeProps {
  additionalRecipeSlugs: string[];
}
