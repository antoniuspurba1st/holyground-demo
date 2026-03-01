"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BibleHome() {
  const router = useRouter();
  const [book, setBook] = useState("john");
  const [chapter, setChapter] = useState("3");

  const openBible = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chapter) return;
    router.push(`/bible/${book}/${chapter}`);
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center">

      {/* bg */}
      <div className="absolute inset-0 bg-[url('/bg.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/70" />

      {/* content */}
      <div className="relative z-10 w-full px-6 py-16">
        <div className="max-w-xl mx-auto">

          {/* glass card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-10">

            <h1 className="text-2xl sm:text-4xl font-bold text-black">
              Bible Reader
            </h1>

            <p className="text-gray-600 mt-2 mb-8 text-sm sm:text-base">
              Select a book and chapter to begin reading scripture.
            </p>

            {/* FORM (lebih proper accessibility) */}
            <form onSubmit={openBible} className="space-y-6">

              {/* BOOK */}
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
                  className="
                    border border-gray-300 
                    px-4 py-3 
                    w-full 
                    rounded-lg 
                    focus:outline-none 
                    focus:ring-2 focus:ring-black
                    text-black
                  "
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
                <label
                  htmlFor="chapter"
                  className="block mb-1 font-medium text-black"
                >
                  Chapter
                </label>

                <input
                  id="chapter"
                  name="chapter"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  placeholder="Enter chapter (e.g. 3)"
                  className="
                    border border-gray-300 
                    px-4 py-3 
                    w-full 
                    rounded-lg 
                    focus:outline-none 
                    focus:ring-2 focus:ring-black
                    text-black
                  "
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  bg-black text-white 
                  px-6 py-3 
                  rounded-xl 
                  w-full 
                  font-semibold 
                  hover:bg-gray-900 
                  transition
                "
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