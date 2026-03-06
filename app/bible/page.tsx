"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BIBLE_BOOKS, getBookBySlug } from "../lib/bibleBooks";

export default function BibleHome() {
  const router = useRouter();
  const [book, setBook] = useState("john");
  const [chapter, setChapter] = useState("3");
  const currentBook = getBookBySlug(book) ?? BIBLE_BOOKS[0];
  const chapters = Array.from(
    { length: currentBook.chapters },
    (_, index) => String(index + 1)
  );

  const openBible = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chapter) return;
    router.push(`/bible/${encodeURIComponent(book)}/${chapter}`);
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/bg.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full px-6 py-16">
        <div className="max-w-xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-10">
            <h1 className="text-2xl sm:text-4xl font-bold text-black">
              Bible Reader
            </h1>

            <p className="text-gray-600 mt-2 mb-8 text-sm sm:text-base">
              Select a book and chapter to begin reading scripture.
            </p>

            <form onSubmit={openBible} className="space-y-6">
              <div>
                <label
                  htmlFor="book"
                  className="block mb-1 font-medium text-black"
                >
                  Book
                </label>

                <select
                  id="book"
                  name="book"
                  className="border border-gray-300 px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                  value={book}
                  onChange={(e) => {
                    setBook(e.target.value);
                    setChapter("1");
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
              </div>

              <div>
                <label
                  htmlFor="chapter"
                  className="block mb-1 font-medium text-black"
                >
                  Chapter
                </label>

                <select
                  id="chapter"
                  name="chapter"
                  className="border border-gray-300 px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                >
                  {chapters.map((chapterNumber) => (
                    <option key={chapterNumber} value={chapterNumber}>
                      Chapter {chapterNumber}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-xl w-full font-semibold hover:bg-gray-900 transition"
              >
                Open Scripture
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
