import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center">

        {/* background */}
        <div className="absolute inset-0 bg-[url('/bg1.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" />

        {/* content container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">

          <div className="
            flex flex-col 
            justify-center 
            min-h-[70vh]
            text-white
          ">

            {/* heading */}
            <h1 className="
              text-3xl 
              sm:text-5xl 
              lg:text-6xl 
              xl:text-7xl 
              font-bold 
              leading-tight 
              max-w-3xl
            ">
              Catholic Theology Platform
            </h1>

            {/* desc */}
            <p className="
              mt-6 
              text-base 
              sm:text-lg 
              lg:text-xl 
              text-gray-200 
              max-w-xl
            ">
              A modern Next.js fullstack prototype featuring a Bible reader,
              scripture search, and lead magnet funnel designed for a Catholic
              theology website.
            </p>

            {/* buttons */}
            <div className="
              mt-10 
              flex 
              flex-col 
              sm:flex-row 
              gap-4 
              w-full 
              sm:w-auto
            ">
              <Link
                href="/bible"
                className="
                  bg-white text-black 
                  px-6 py-3 
                  rounded-xl 
                  font-semibold 
                  hover:bg-gray-200 
                  transition 
                  text-center
                  w-full sm:w-auto
                "
              >
                Open Bible
              </Link>

              <Link
                href="/search"
                className="
                  border border-white 
                  px-6 py-3 
                  rounded-xl 
                  font-semibold 
                  hover:bg-white hover:text-black 
                  transition 
                  text-center
                  w-full sm:w-auto
                "
              >
                Search Scripture
              </Link>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}