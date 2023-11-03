import { NextRequest, NextResponse } from "next/server";

import { fetchJsonById } from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = Number(searchParams.get("id"));
    if (id == undefined || id == null) {
      return new NextResponse("Must specify id", { status: 400 });
    } else if (isNaN(id) || id < 1) {
      return new NextResponse("id must be a positive number", { status: 400 });
    } else {
      const result = await fetchJsonById(Number(id));
      if (result == null) {
        return new NextResponse("Invalid id", { status: 400 });
      } else {
        return NextResponse.json(result);
      }
    }
  } catch (ex) {
    console.log(ex);
    return new NextResponse(null, { status: 500 });
  }
}
