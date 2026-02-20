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
    <div
      className="min-h-screen flex items-center"
      style={{
        backgroundImage: "url('/bg2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div className="w-full min-h-screen bg-black/60 flex items-center">
        <div className="max-w-3xl mx-auto w-full px-8">
          {/* glass card */}
          <div className="bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-xl">
            <h1 className="text-4xl font-bold mb-6 text-black">Bible Search</h1>

            <div className="flex gap-2 mb-8">
              <input
                type="text"
                placeholder="Example: John 3:16"
                className="border border-gray-400 px-4 py-3 rounded w-full text-black focus:outline-none focus:ring-2 focus:ring-black"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchBible();
                }}
              />

              <button
                onClick={searchBible}
                className="bg-black text-white px-6 rounded hover:bg-gray-900 transition"
              >
                Search
              </button>
            </div>

            {results && (
              <div className="bg-gray-100 p-6 rounded text-black">
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
      </div>
    </div>
  );
}