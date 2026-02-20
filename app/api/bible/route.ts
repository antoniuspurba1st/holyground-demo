import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const book = searchParams.get("book");
  const chapter = searchParams.get("chapter");

  const res = await fetch(
    `https://bible-api.com/${book}+${chapter}`
  );

  const data = await res.json();
  return NextResponse.json(data);
}