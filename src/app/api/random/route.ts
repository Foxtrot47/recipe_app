import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {

    const searchParams = request.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit"));
    
      if (limit == undefined || limit == null) {
        return new NextResponse("Must specify limit", { status: 400});
      } else if (isNaN(limit) || limit < 1) {
        return new NextResponse("Limit must be a positive number", { status: 400});
      } else {
        const recipesCount = await prisma.recipes.count();
        const skip = Math.floor(Math.random() * recipesCount);
        const result = await prisma.recipes.findMany({
          take: Number(limit),
          skip: skip,
          select: {
            date: true,
            description: true,
            images: true,
            name: true,
            recipecategories: {
              select: {
                categories: true,
              },
            },
            ratings: true,
            slug: true,
          },
        })
        return NextResponse.json(result);
      }
  } catch (ex) {
    console.log(ex);
    return new NextResponse(null, { status: 500});
  }
}

