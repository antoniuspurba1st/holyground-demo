type Verse = {
  verse: number;
  text: string;
};

type BibleResponse = {
  reference: string;
  verses: Verse[];
};

async function getBible(book: string, chapter: string): Promise<BibleResponse> {
  const res = await fetch(
    `http://localhost:3000/api/bible?book=${book}&chapter=${chapter}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed fetch");
  return res.json();
}

export default async function BiblePage({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}) {
  const { book, chapter } = await params;

  const data = await getBible(book, chapter);

  return (
    <div className="min-h-screen bg-white text-black p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{data.reference}</h1>

        <div className="bg-gray-100 p-6 rounded leading-7">
          {data.verses?.map((verse) => (
            <p key={verse.verse} className="mb-2">
              <span className="font-bold mr-2">{verse.verse}</span>
              {verse.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}