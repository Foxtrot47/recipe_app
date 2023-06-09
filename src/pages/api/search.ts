import { isValidStringParam } from "../../Helpers";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(404).send("Use GET");
    }

    // You shouldn't await for the response
    // The Scraper will take some time if there are a lot of search results
    try {
      isValidStringParam(req.query.name) &&
        fetch(
          process.env.SCRAPER_API_URL +
            "search?query=" +
            req.query.name +
            "&fetchSinglePage=false"
        );
    } catch (ex) {
      console.log("Failed to ping scraper");
    }

    const clause = {
      where: {
        name: isValidStringParam(req.query.name)
          ? { contains: req.query.name.trim() }
          : undefined,
        nutritionalinfos: {
          some: {
            label: "kcal",
            value:
              (isValidStringParam(req.query.kcal) &&
                req.query.kcal === "gt1500" && {
                  gt: 1500,
                }) ||
              (isValidStringParam(req.query.kcal) &&
                req.query.kcal !== "gt1500" && {
                  lte: kcalValues[req.query.kcal],
                }) ||
              undefined,
          },
        },
        recipecuisines: {
          some: {
            cuisines: {
              name: isValidStringParam(req.query.cuisineTypes)
                ? { contains: req.query.cuisineTypes.trim() }
                : undefined,
            },
          },
        },
        recipediets: {
          some: {
            diets: {
              name: isValidStringParam(req.query.diet)
                ? { contains: req.query.diet.trim() }
                : undefined,
            },
          },
        },
        recipekeywords: {
          some: {
            keywords: {
              name: isValidStringParam(req.query.keywords)
                ? { contains: req.query.keywords.trim() }
                : undefined,
            },
          },
        },
        recipecategories: {
          some: {
            categories: {
              name: isValidStringParam(req.query.mealTypes)
                ? { contains: req.query.mealTypes.trim() }
                : undefined,
            },
          },
        },
        times: {
          totaltime:
            (isValidStringParam(req.query.totaltime) &&
              req.query.totaltime !== "gt60" && {
                lte: totalTimes[req.query.totaltime],
              }) ||
            (isValidStringParam(req.query.totaltime) &&
              req.query.totaltime === "gt60" && { gte: 60 }) ||
            undefined,
        },
        ratings:
          (isValidStringParam(req.query.rating) && {
            avg: { lte: ratingValues[req.query.rating.trim()] },
          }) ||
          (isValidStringParam(req.query.rating) &&
            req.query.rating !== "eq5" && {
              avg: { lte: ratingValues[req.query.rating.trim()] },
            }) ||
          undefined,
        skilllevel: isValidStringParam(req.query.skillLevel)
          ? req.query.skillLevel.trim()
          : undefined,
        yield: isValidStringParam(req.query.yield)
          ? req.query.yield.trim()
          : undefined,
      },
    };
    const recipeCount = await prisma.recipes.count({
      ...clause,
    });

    const recipes = await prisma.recipes.findMany({
      ...clause,
      select: {
        description: true,
        date: true,
        id: true,
        images: true,
        name: true,
        ratings: true,
        recipecuisines: {
          select: {
            cuisines: true,
          },
        },
        slug: true,
        skilllevel: true,
      },
      take: isValidStringParam(req.query.limt) ? Number(req.query.limt) : 20,
      skip: isValidStringParam(req.query.skip) ? Number(req.query.skip) : 0,
    });
    const output = {
      recipes,
      limit: recipes.length,
      skip: isValidStringParam(req.query.skip) ? Number(req.query.skip) : 0,
      total: recipeCount,
    };
    res.json(output);
  } catch (ex) {
    console.error(ex);
    res.status(500).send();
  }
}

const kcalValues = {
  lte250: 250,
  lte500: 500,
  lte750: 750,
  lte1000: 1000,
  lte1500: 1500,
};

const ratingValues = {
  gte1: 1,
  gte2: 2,
  gte3: 3,
  gte4: 4,
};

const totalTimes = {
  lte10: 10,
  lte30: 30,
  lte60: 60,
};
