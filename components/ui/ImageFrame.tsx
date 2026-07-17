type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function ImageFrame({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-sm
        shadow-[0_30px_80px_rgba(0,0,0,0.08)]
        ${className}
      `}
    >
      {children}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/5
          via-transparent
          to-transparent
        "
      />
    </div>
  );
}