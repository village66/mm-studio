export default function Footer() {
  return (
    <footer id="contact" className="border-t border-neutral-200 py-16 bg-white">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between gap-8">

        <div>
          <h3 className="text-lg tracking-[0.25em] font-light">
            MM Studio
          </h3>

          <p className="mt-4 text-neutral-500 leading-7 text-sm">
            Interior Architecture<br />
            Taiwan
          </p>
        </div>

        <div className="text-sm text-neutral-500 leading-8">
          hello@mmstudio.com<br />
          +886 4-0000-0000
        </div>

      </div>
    </footer>
  );
}