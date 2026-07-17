interface Props {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  eyebrow,
  title,
  align = "left",
}: Props) {
  return (
    <div
      className={`mb-16 ${
        align === "center" ? "text-center" : ""
      }`}
    >
      <p className="uppercase tracking-[0.45em] text-xs text-neutral-500 mb-4">
        {eyebrow}
      </p>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
        {title}
      </h2>
    </div>
  );
}