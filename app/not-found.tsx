import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8f5] px-6">
      <div className="max-w-xl text-center">

        <p className="text-[12px] uppercase tracking-[0.4em] text-neutral-500">
          404
        </p>

        <h1 className="mt-6 text-5xl font-extralight text-[#181818] md:text-7xl">
          Page Not Found
        </h1>

        <p className="mt-8 text-lg leading-8 text-neutral-600">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-12 inline-flex h-14 items-center rounded-full border border-neutral-300 px-10 text-[12px] uppercase tracking-[0.3em] transition duration-300 hover:bg-neutral-100"
        >
          Back Home
        </Link>

      </div>
    </main>
  );
}