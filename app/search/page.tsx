"use client";

import { useState } from "react";
import { BIBLE_BOOKS, getBookBySlug } from "../lib/bibleBooks";

type Verse = {
  verse: number;
  text: string;
};

type BibleResponse = {
  reference?: string;
  verses?: Verse[];
  text?: string;
  error?: string;
};

const QUICK_REFERENCES = ["John 3:16", "Psalm 23", "Romans 8:28", "1 John 4:8"];

function parseReference(reference: string) {
  const match = reference.match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
  if (!match) return null;

  return {
    book: match[1].toLowerCase(),
    chapter: match[2],
    verse: match[3] ?? "",
  };
}

export default function SearchPage() {
  const [book, setBook] = useState("john");
  const [chapter, setChapter] = useState("3");
  const [verse, setVerse] = useState("16");
  const [results, setResults] = useState<BibleResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const currentBook = getBookBySlug(book) ?? BIBLE_BOOKS[0];
  const chapters = Array.from(
    { length: currentBook.chapters },
    (_, index) => String(index + 1)
  );

  const runSearch = async (
    nextBook = book,
    nextChapter = chapter,
    nextVerse = verse
  ) => {
    setLoading(true);
    setError("");
    setResults(null);

    try {
      const params = new URLSearchParams({
        book: nextBook,
        chapter: nextChapter,
      });

      if (nextVerse.trim()) {
        params.set("verse", nextVerse.trim());
      }

      const res = await fetch(`/api/bible?${params.toString()}`);
      const data: BibleResponse = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Scripture not found.");
        return;
      }

      setResults(data);
    } catch {
      setError("Unable to search scripture right now.");
    } finally {
      setLoading(false);
    }
  };

  const applyQuickReference = (reference: string) => {
    const parsedReference = parseReference(reference);
    if (!parsedReference) return;

    setBook(parsedReference.book);
    setChapter(parsedReference.chapter);
    setVerse(parsedReference.verse);
    runSearch(parsedReference.book, parsedReference.chapter, parsedReference.verse);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/bg2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="min-h-screen bg-black/60 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur-sm sm:p-8 lg:p-10">
            <h1 className="text-3xl font-bold text-black sm:text-4xl">Bible Search</h1>
            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
              Search by book, chapter, and optional verse with the full list of Bible books.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              {QUICK_REFERENCES.map((reference) => (
                <button
                  key={reference}
                  type="button"
                  onClick={() => applyQuickReference(reference)}
                  className="rounded-full border border-gray-300 px-3 py-2 text-xs font-medium text-black transition hover:bg-black hover:text-white sm:px-4 sm:text-sm"
                >
                  {reference}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_140px_140px_auto] lg:gap-4">
              <select
                className="min-w-0 rounded border border-gray-400 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
                value={book}
                onChange={(e) => {
                  setBook(e.target.value);
                  setChapter("1");
                  setVerse("");
                }}
              >
                <optgroup label="Old Testament">
                  {BIBLE_BOOKS.filter(
                    (bibleBook) => bibleBook.testament === "Old Testament"
                  ).map((bibleBook) => (
                    <option key={bibleBook.slug} value={bibleBook.slug}>
                      {bibleBook.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="New Testament">
                  {BIBLE_BOOKS.filter(
                    (bibleBook) => bibleBook.testament === "New Testament"
                  ).map((bibleBook) => (
                    <option key={bibleBook.slug} value={bibleBook.slug}>
                      {bibleBook.name}
                    </option>
                  ))}
                </optgroup>
              </select>

              <select
                className="min-w-0 rounded border border-gray-400 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
              >
                {chapters.map((chapterNumber) => (
                  <option key={chapterNumber} value={chapterNumber}>
                    Ch. {chapterNumber}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                inputMode="numeric"
                placeholder="Verse"
                className="min-w-0 rounded border border-gray-400 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
                value={verse}
                onChange={(e) => setVerse(e.target.value)}
              />

              <button
                type="button"
                onClick={() => runSearch()}
                disabled={loading}
                className="rounded bg-black px-6 py-3 text-white transition hover:bg-gray-900 disabled:opacity-60 lg:min-w-[120px]"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Example: choose John, chapter 3, verse 16. Leave verse empty to load a whole chapter.
            </p>

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:px-5 sm:py-4">
                {error}
              </div>
            )}

            {results && (
              <div className="mt-6 rounded bg-gray-100 p-4 text-black sm:p-6">
                <h2 className="mb-4 text-lg font-bold sm:text-xl">{results.reference}</h2>

                {results.verses?.map((item) => (
                  <p key={`${item.verse}-${item.text.slice(0, 12)}`} className="mb-2 text-sm leading-7 sm:text-base">
                    <b>{item.verse}</b> {item.text}
                  </p>
                ))}

                {!results.verses?.length && results.text && (
                  <p className="whitespace-pre-line text-sm leading-7 sm:text-base">{results.text}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
