"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BibleHome() {
  const router = useRouter();
  const [book, setBook] = useState("john");
  const [chapter, setChapter] = useState("3");

  const openBible = () => {
    if (!chapter) return;
    router.push(`/bible/${book}/${chapter}`);
  };

  return (
    <div
      className="min-h-screen flex items-center"
      style={{
        backgroundImage: "url('/bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div className="w-full min-h-screen bg-black/60 flex items-center">
        {/* glass card */}
        <div className="max-w-xl mx-auto w-full px-8">
          <div className="bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-xl">
            <h1 className="text-4xl font-bold mb-2 text-black">Bible Reader</h1>
            <p className="text-gray-600 mb-8">
              Select a book and chapter to begin reading scripture.
            </p>

            <div className="space-y-6">
              {/* BOOK */}
              <div>
                <label htmlFor="book" className="block mb-1 font-medium text-black">
                  Book
                </label>

                <select
                  id="book"
                  className="border border-gray-300 px-3 py-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black text-black"
                  value={book}
                  onChange={(e) => setBook(e.target.value)}
                >
                  <option value="john">John</option>
                  <option value="matthew">Matthew</option>
                  <option value="genesis">Genesis</option>
                  <option value="psalms">Psalms</option>
                  <option value="romans">Romans</option>
                </select>
              </div>

              {/* CHAPTER */}
              <div>
                <label htmlFor="chapter" className="block mb-1 font-medium text-black">
                  Chapter
                </label>

                <input
                  id="chapter"
                  type="number"
                  min="1"
                  className="border border-gray-300 px-3 py-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black text-black"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") openBible();
                  }}
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={openBible}
                className="bg-black text-white px-6 py-3 rounded w-full font-medium hover:bg-gray-900 transition"
              >
                Open Scripture
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}