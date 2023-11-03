import { NextRequest, NextResponse } from "next/server";

import { isValidStringParam } from "../../../Helpers";
import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const recipeid = searchParams.get("recipeid");
    const limit = searchParams.get("limt");
    const skip = searchParams.get("skip");
    
    if (!recipeid || recipeid == null) {
      return new NextResponse("Must specify recipeid", { status: 400 });
    }

    if (!isValidStringParam(recipeid)) {
      return new NextResponse("Invalid recipeid", { status: 400 });
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
    return NextResponse.json(output);
  } catch (ex) {
    console.error(ex);
    return new NextResponse(null, { status: 500 });
  }
}
