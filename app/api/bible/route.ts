import { NextResponse } from "next/server";
import { getBookBySlug } from "../../lib/bibleBooks";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawBook = searchParams.get("book")?.trim() ?? "";
  const chapter = searchParams.get("chapter")?.trim() ?? "";
  const verse = searchParams.get("verse")?.trim() ?? "";

  if (!rawBook || !chapter) {
    return NextResponse.json(
      { error: "Book and chapter are required." },
      { status: 400 }
    );
  }

  const book = getBookBySlug(rawBook)?.name ?? rawBook;
  const reference = verse ? `${book} ${chapter}:${verse}` : `${book} ${chapter}`;

  try {
    const res = await fetch(`https://bible-api.com/${encodeURIComponent(reference)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Unable to fetch scripture." },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Unexpected scripture lookup error." },
      { status: 500 }
    );
  }
}
