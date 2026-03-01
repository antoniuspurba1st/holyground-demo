"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="font-bold text-lg">
          HolyGround Demo
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/bible" className="hover:text-gray-300 transition">
            Bible
          </Link>
          <Link href="/search" className="hover:text-gray-300 transition">
            Search
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("closedPopup");
              window.location.reload();
            }}
            className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Free eBook
          </button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="flex flex-col px-6 py-4 gap-4">
            <Link href="/bible" onClick={()=>setOpen(false)}>
              Bible
            </Link>
            <Link href="/search" onClick={()=>setOpen(false)}>
              Search
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("closedPopup");
                window.location.reload();
              }}
              className="bg-white text-black px-4 py-2 rounded-lg font-medium mt-2"
            >
              Get Free eBook
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}