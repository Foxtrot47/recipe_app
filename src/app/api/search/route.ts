import { NextRequest, NextResponse } from "next/server";

import { isValidStringParam } from "../../../Helpers";
import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");
    const kcal = searchParams.get("kcal");
    const cuisineTypes = searchParams.get("cuisineTypes");
    const diet = searchParams.get("diet");
    const mealTypes = searchParams.get("mealTypes");
    const totaltime = searchParams.get("totaltime");
    const keywords = searchParams.get("keywords");
    const rating = searchParams.get("rating");
    const skillLevel = searchParams.get("skillLevel");
    const yieldCount = searchParams.get("yield");
    const limit = searchParams.get("limt");
    const skip = searchParams.get("skip");

    // You shouldn't await for the response
    // The Scraper will take some time if there are a lot of search results
    try {
      isValidStringParam(name) &&
        fetch(
          process.env.SCRAPER_API_URL +
            "search?query=" +
            name +
            "&fetchSinglePage=false"
        );
    } catch (ex) {
      console.log("Failed to ping scraper");
    }

    const clause = {
      where: {
        name: isValidStringParam(name)
          ? { contains: name.trim() }
          : undefined,
        nutritionalinfos: {
          some: {
            label: "kcal",
            value:
              (isValidStringParam(kcal) &&
                kcal === "gt1500" && {
                  gt: 1500,
                }) ||
                
              (isValidStringParam(kcal) &&
                kcal !== "gt1500" && {
                  lte: kcalValues[kcal],
                }) ||
              undefined,
          },
        },
        recipecuisines: {
          some: {
            cuisines: {
              name: isValidStringParam(cuisineTypes)
                ? { contains: cuisineTypes.trim() }
                : undefined,
            },
          },
        },
        recipediets: {
          some: {
            diets: {
              display: isValidStringParam(diet)
                ? { contains: diet.trim() }
                : undefined,
            },
          },
        },
        recipekeywords: {
          some: {
            keywords: {
              name: isValidStringParam(keywords)
                ? { contains: keywords.trim() }
                : undefined,
            },
          },
        },
        recipecategories: {
          some: {
            categories: {
              name: isValidStringParam(mealTypes)
                ? { contains: mealTypes.trim() }
                : undefined,
            },
          },
        },
        times: {
          totaltime:
            (isValidStringParam(totaltime) &&
              totaltime !== "gt60" && {
                lte: totalTimes[totaltime],
              }) ||
            (isValidStringParam(totaltime) &&
              totaltime === "gt60" && { gte: 60 }) ||
            undefined,
        },
        ratings:
          (isValidStringParam(rating) && {
            avg: { lte: ratingValues[rating.trim()] },
          }) ||
          (isValidStringParam(rating) &&
            rating !== "eq5" && {
              avg: { lte: ratingValues[rating.trim()] },
            }) ||
          undefined,
        skilllevel: isValidStringParam(skillLevel)
          ? skillLevel.trim()
          : undefined,
        yieldCount: isValidStringParam(yieldCount)
          ? yieldCount.trim()
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
      take: isValidStringParam(limit) ? Number(limit) : 20,
      skip: isValidStringParam(skip) ? Number(skip) : 0,
    });
    const output = {
      recipes,
      limit: recipes.length,
      skip: isValidStringParam(skip) ? Number(skip) : 0,
      total: recipeCount,
    };
    return NextResponse.json(output);
  } catch (ex) {
    console.error(ex);
    return new NextResponse(null, { status: 500});
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
