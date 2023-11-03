import { NextRequest, NextResponse } from "next/server";

import { fetchJsonBySlug } from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get("slug");
    if (!slug || slug == null) {
      return new NextResponse("Must specify slug", { status: 400 });
    } else {
      let result = await fetchJsonBySlug(slug);
      if (result != null) {
        return NextResponse.json({ result });
      }
      console.log("Trying to fetch new recipes");
      await fetch(
        process.env.SCRAPER_API_URL +
          "search?query=" +
          slug +
          "&fetchSinglePage=true"
      );
      result = await fetchJsonBySlug(slug);
      if (result != null) {
        return NextResponse.json(result);
      } else {
        return new NextResponse(null, { status: 404 });
      }
    }
  } catch (ex) {
    console.log(ex);
    return new NextResponse(null, { status: 404 });
  }
}
