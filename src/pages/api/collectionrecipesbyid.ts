import { isValidStringParam } from "../../Helpers";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(404).send("Use GET");
    }

    if (!req.query.collectionid || req.query.collectionid == null) {
      return res.status(404).send("Must specify collectionid");
    }

    if (!isValidStringParam(req.query.collectionid)) {
      return res.status(404).send("Invalid collectionid");
    }

    // You shouldn't await for the response
    // The Scraper will take some time if there are a lot of search results
    try {
      fetch(
        process.env.SCRAPER_API_URL +
          "search?query=" +
          req.query.name +
          "&fetchSinglePage=false"
      );
    } catch (ex) {
      console.log("Failed to ping scraper");
    }

    const recipeCount = await prisma.collectionrecipes.count({
      where: {
        collectionid: Number(req.query.collectionid),
      },
    });

    const recipes = await prisma.recipes.findMany({
      ...selectBlock,
      where: {
        collectionrecipes: {
          every: {
            collectionid: Number(req.query.collectionid),
          },
        },
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
    return res.json(output);
  } catch (ex) {
    console.error(ex);
    return res.status(500).send();
  }
}

const selectBlock = {
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
};
