"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex items-center">
      {/* Left side */}
      <div className="flex gap-6 items-center">
        <Link href="/" className="font-bold text-lg">
          HolyGround Demo
        </Link>
        <Link href="/bible" className="hover:underline">
          Bible
        </Link>
        <Link href="/search" className="hover:underline">
          Search
        </Link>
      </div>

      {/* Right CTA */}
      <button
        onClick={() => {
          localStorage.removeItem("closedPopup");
          window.location.reload();
        }}
        className="ml-auto bg-white text-black px-4 py-1.5 rounded font-medium hover:bg-gray-200"
      >
        Get Free eBook
      </button>
    </nav>
  );
}