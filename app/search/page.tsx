"use client";

import { useState } from "react";

type Verse = {
  verse: number;
  text: string;
};

type BibleResponse = {
  reference: string;
  verses: Verse[];
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BibleResponse | null>(null);

  const searchBible = async () => {
    if (!query) return;
    const res = await fetch(
      `https://bible-api.com/${query.replace(" ", "+")}`
    );
    const data: BibleResponse = await res.json();
    setResults(data);
  };

  return (
    <div className="min-h-screen bg-white text-black p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Bible Search 🔎</h1>

        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="example: john 3:16"
            className="border border-gray-400 px-4 py-3 rounded w-full text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={searchBible}
            className="bg-black text-white px-6 rounded"
          >
            Search
          </button>
        </div>

        {results && (
          <div className="bg-gray-100 p-6 rounded">
            <h2 className="text-xl font-bold mb-4">{results.reference}</h2>
            {results.verses?.map((v: Verse) => (
              <p key={v.verse} className="mb-2 leading-7">
                <b>{v.verse}</b> {v.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}