import { isValidStringParam } from "../../Helpers";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(404).send("Use GET");
    }

    const { limit, recipeid, skip } = req.query;

    if (!recipeid || recipeid == null) {
      return res.status(404).send("Must specify recipeid");
    }

    if (!isValidStringParam(recipeid)) {
      return res.status(404).send("Invalid recipeid");
    }

    const similiarRecipes = await prisma.similarrecipes.findMany({
      select: {
        similiarrecipeid: true,
      },
      where: {
        recipeid: Number(recipeid),
      },
    });

    const similiarRecipesIds = similiarRecipes.map(
      (recipe) => recipe.similiarrecipeid
    );

    const count = await prisma.recipes.count({
      where: {
        id: { in: similiarRecipesIds },
      },
    });

    const recipes = await prisma.recipes.findMany({
      select: {
        description: true,
        id: true,
        images: true,
        name: true,
        ratings: true,
        slug: true,
        skilllevel: true,
      },
      where: {
        id: { in: similiarRecipesIds },
      },
      skip: isValidStringParam(skip) ? Number(skip) : 0,
      take: isValidStringParam(limit) ? Number(limit) : 5,
    });

    const output = {
      recipes,
      limit: recipes.length,
      skip: isValidStringParam(skip) ? Number(skip) : 0,
      total: count,
    };
    return res.json(output);
  } catch (ex) {
    console.error(ex);
    return res.status(500).send();
  }
}
