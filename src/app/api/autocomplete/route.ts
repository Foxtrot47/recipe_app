import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q");
    if (q == undefined || q == null) {
      return new NextResponse("Must specify query parameter", { status: 400 });
    } else {
      const res = await prisma.recipes.findMany({
        where: {
          name: {
            contains: q,
          },
        },
        select: {
          id: true,
          name: true,
          images: true,
          slug: true,
          ratings: true,
        },
        take: 5,
      });
      return NextResponse.json(res);
    }
  } catch (ex) {
    console.error(ex);
    return new NextResponse(null, { status: 500 });
  }
}
