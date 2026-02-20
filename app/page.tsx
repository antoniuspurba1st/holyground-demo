export default function Home() {
  return (
    <div
      className="min-h-screen text-white flex items-center"
      style={{
        backgroundImage: "url('/bg1.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay biar teks kebaca */}
      <div className="w-full min-h-screen bg-black/60 flex items-center">
        <div className="max-w-5xl mx-auto px-8">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Catholic Theology Platform
          </h1>

          <p className="text-lg text-gray-200 mb-10 max-w-2xl">
            A modern Next.js fullstack prototype featuring a Bible reader,
            scripture search, and lead magnet funnel designed for a Catholic
            theology website.
          </p>

          <div className="flex gap-4">
            <a
              href="/bible"
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Open Bible Reader
            </a>

            <a
              href="/search"
              className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition"
            >
              Search Scripture
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}