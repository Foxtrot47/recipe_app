import { NextRequest, NextResponse } from "next/server";

import { isValidStringParam } from "../../../Helpers";
import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const collectionid = searchParams.get("collectionid");
    const limt = searchParams.get("limt");
    const skip = searchParams.get("skip");

    if (!collectionid || collectionid == null) {
      return new NextResponse("Must specify collectionid", { status: 400 });
    }

    if (!isValidStringParam(collectionid)) {
      return new NextResponse("Invalid collectionid", { status: 400 });
    }

    // You shouldn't await for the response
    // The Scraper will take some time if there are a lot of search results
    try {
      fetch(
        process.env.SCRAPER_API_URL +
          "search?query=" +
          collectionid +
          "&fetchSinglePage=false"
      );
    } catch (ex) {
      console.log("Failed to ping scraper");
    }

    const recipeCount = await prisma.collectionrecipes.count({
      where: {
        collectionid: Number(collectionid),
      },
    });

    const recipes = await prisma.recipes.findMany({
      ...selectBlock,
      where: {
        collectionrecipes: {
          every: {
            collectionid: Number(collectionid),
          },
        },
      },
      take: isValidStringParam(limt) ? Number(limt) : 20,
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
