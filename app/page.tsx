export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex items-center">
      <div className="max-w-4xl mx-auto px-8">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Catholic Theology Platform
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          A Next.js fullstack prototype demonstrating a Bible reader,
          scripture search experience, and a lead magnet signup funnel
          for a Catholic theology website.
        </p>

        <div className="flex gap-4">
          <a
            href="/bible"
            className="bg-black text-white px-6 py-3 rounded"
          >
            Open Bible Reader
          </a>

          <a
            href="/search"
            className="border border-black px-6 py-3 rounded"
          >
            Search Scripture
          </a>
        </div>
      </div>
    </div>
  );
}