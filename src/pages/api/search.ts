import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(404).send("Use GET");
    }

    // You shouldn't await for the response
    // The Scraper will take some time if there are lot of search results
    if (req.query.name !== "")
      fetch(
        process.env.SCRAPER_API_URL +
          "search?query=" +
          req.query.name +
          "&fetchSinglePage=false"
      );

    const kcalValues = {
      lte250: 250,
      lte500: 500,
      lte750: 750,
      lte1000: 1000,
      lte1500: 1500
    };

    const totalTimes = {
      lte10: 10,
      lte30: 30,
      lte60: 60,
    };

    const recipes = await prisma.recipes.findMany({
      where: {
        name: isValidParam(req.query.name)
          ? { contains: req.query.name.trim() }
          : undefined,
        nutritionalinfos: {
          some: {
              label: "kcal",
              value: (
                isValidParam(req.query.kcal) && 
                req.query.kcal === "gt1500" && {
                  gt: 1500 
                }
              ) || 
              (isValidParam(req.query.kcal) &&
              req.query.kcal !== "gt1500" && { lte: kcalValues[req.query.kcal] }) ||
            undefined,
          }
        },
        recipecuisines: {
          some: {
            cuisines: {
              name: isValidParam(req.query.cuisineTypes)
                ? { contains: req.query.cuisineTypes.trim() }
                : undefined,
            },
          },
        },
        recipediets: {
          some: {
            diets: {
              name: isValidParam(req.query.diet)
                ? { contains: req.query.diet.trim() }
                : undefined,
            },
          },
        },
        recipekeywords: {
          some: {
            keywords: {
              name: isValidParam(req.query.keywords)
                ? { contains: req.query.keywords.trim() }
                : undefined,
            },
          },
        },
        recipecategories: {
          some: {
            categories: {
              name: isValidParam(req.query.mealTypes)
                ? { contains: req.query.mealTypes.trim() }
                : undefined,
            },
          },
        },
        times: {
          totaltime:
            (isValidParam(req.query.totaltime) &&
              req.query.totaltime !== "gt60" && {
                lte: totalTimes[req.query.totaltime],
              }) ||
            (isValidParam(req.query.totaltime) &&
              req.query.totaltime === "gt60" && { gte: 60 }) ||
            undefined,
        },
        ratings: isValidParam(req.query.rating)
          ? { avg: { lte: req.query.rating.trim() } }
          : undefined,
        skilllevel: isValidParam(req.query.skillLevel)
          ? req.query.skillLevel.trim()
          : undefined,
        yield: isValidParam(req.query.yield)
          ? req.query.yield.trim()
          : undefined,
      },
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
      take: isValidParam(req.query.limt) ? req.query.limt : 20,
    });
    res.json(recipes);
  } catch (ex) {
    console.error(ex);
    res.status(500).send();
  }
}

const isValidParam = (param) =>
  typeof param === "string" &&
  param !== undefined &&
  param !== null &&
  param.trim() !== "";
