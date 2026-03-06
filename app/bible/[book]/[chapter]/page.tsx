import { getBookBySlug } from "../../../lib/bibleBooks";

type Verse = {
  verse: number;
  text: string;
};

type BibleResponse = {
  reference?: string;
  verses?: Verse[];
};

async function getBible(book: string, chapter: string): Promise<BibleResponse | null> {
  try {
    const reference = encodeURIComponent(`${book} ${chapter}`);
    const res = await fetch(`https://bible-api.com/${reference}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();

    if (!data.verses) return null;

    return data;
  } catch (err) {
    console.error("Bible fetch error:", err);
    return null;
  }
}

export default async function BiblePage({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}) {
  const { book: rawBook, chapter } = await params;
  const decodedBook = decodeURIComponent(rawBook);
  const resolvedBook = getBookBySlug(decodedBook)?.name ?? decodedBook;
  const data = await getBible(resolvedBook, chapter);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Scripture not found or API error.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{data.reference}</h1>

        {data.verses?.map((v) => (
          <p key={v.verse} className="mb-2 leading-7">
            <b>{v.verse}</b> {v.text}
          </p>
        ))}
      </div>
    </div>
  );
}
