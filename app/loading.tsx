export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8f5]">
      <div className="flex flex-col items-center">

        <h1 className="font-serif text-[42px] font-light tracking-[0.18em] uppercase text-[#181818]">
          MM Studio
        </h1>

        <p className="mt-4 text-[11px] uppercase tracking-[0.35em] text-neutral-500">
          Boutique Interior Design
        </p>

        <div className="mt-12 flex gap-3">

          <span className="h-2 w-2 animate-bounce rounded-full bg-[#b6925d]" />

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#b6925d]"
            style={{ animationDelay: "0.15s" }}
          />

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#b6925d]"
            style={{ animationDelay: "0.3s" }}
          />

        </div>

      </div>
    </main>
  );
}