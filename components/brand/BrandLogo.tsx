type BrandLogoProps = {
  variant?: "horizontal" | "footer";
  className?: string;
  transitioning?: boolean;
};

export default function BrandLogo({
  variant = "horizontal",
  className = "",
  transitioning = false,
}: BrandLogoProps) {
  if (variant === "footer") {
    return (
      <svg
        viewBox="0 0 520 250"
        role="img"
        aria-label="MM Studio Boutique Interior Design"
        className={className}
      >
        <defs>
          <mask id="mm-footer-cut">
            <rect width="520" height="250" fill="white" />
            <rect x="104" y="90" width="312" height="7" fill="black" />
          </mask>
        </defs>

        <g
          mask="url(#mm-footer-cut)"
          fill="currentColor"
          className="
            transition-colors
            duration-700
            ease-out
            group-hover/brand:text-[#171714]
            motion-reduce:transition-none
          "
        >
          <path d="M122 143V42H139L182 126L225 42H242V143H229V66L182 145L135 66V143Z" />
          <path d="M278 143V42H295L338 126L381 42H398V143H385V66L338 145L291 66V143Z" />
        </g>

        <path
          d="M104 93.5H416"
          fill="none"
          stroke="#D8D2C8"
          strokeWidth="2"
        />

        <path
          d="M104 93.5H416"
          fill="none"
          stroke="#B6925D"
          strokeWidth="2.4"
          className={
            transitioning
              ? "mm-brand-cut-animation origin-left"
              : `
                  origin-left
                  scale-x-0
                  transition-transform
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover/brand:scale-x-100
                  motion-reduce:transition-none
                `
          }
        />

        <g
          fill="none"
          stroke="#B6925D"
          strokeWidth="1.8"
          className={
            transitioning
              ? "mm-brand-ticks-animation"
              : `
                  opacity-40
                  transition-all
                  delay-200
                  duration-500
                  group-hover/brand:opacity-100
                  motion-reduce:transition-none
                `
          }
        >
          <path d="M255 83V105" />
          <path d="M265 83V105" />
        </g>

        <text
          x="260"
          y="191"
          textAnchor="middle"
          fill="#24231F"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="38"
          letterSpacing="11"
        >
          MM STUDIO
        </text>

        <text
          x="260"
          y="224"
          textAnchor="middle"
          fill="#8C877F"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="17"
          fontWeight="500"
          letterSpacing="3"
        >
          BOUTIQUE INTERIOR DESIGN
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 920 220"
      role="img"
      aria-label="MM Studio Boutique Interior Design"
      className={className}
    >
      <defs>
        <mask id="mm-horizontal-cut">
          <rect width="920" height="220" fill="white" />
          <rect x="44" y="91" width="326" height="7" fill="black" />
        </mask>
      </defs>

      <g
        mask="url(#mm-horizontal-cut)"
        fill="currentColor"
        className="
          transition-colors
          duration-700
          ease-out
          group-hover/logo:text-[#171714]
          motion-reduce:transition-none
        "
      >
        <path d="M62 152V40H79L128 133L177 40H194V152H181V67L128 154L75 67V152Z" />
        <path d="M220 152V40H237L286 133L335 40H352V152H339V67L286 154L233 67V152Z" />
      </g>

      <path
        d="M44 94.5H370"
        fill="none"
        stroke="#D8D2C8"
        strokeWidth="2"
      />

      <path
        d="M44 94.5H370"
        fill="none"
        stroke="#B6925D"
        strokeWidth="2.5"
        className={
          transitioning
            ? "mm-brand-cut-animation origin-left"
            : `
                origin-left
                scale-x-0
                transition-transform
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover/logo:scale-x-100
                motion-reduce:transition-none
              `
        }
      />

      <g
        fill="none"
        stroke="#B6925D"
        strokeWidth="1.8"
        className={
          transitioning
            ? "mm-brand-ticks-animation"
            : `
                opacity-40
                transition-all
                delay-200
                duration-500
                group-hover/logo:opacity-100
                motion-reduce:transition-none
              `
        }
      >
        <path d="M203 84V105" />
        <path d="M211 84V105" />
      </g>

      <path d="M414 42V154" stroke="#D8D2C8" />

      <text
        x="470"
        y="96"
        fill="#24231F"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="54"
        fontWeight="400"
        letterSpacing="13"
      >
        MM STUDIO
      </text>

      <text
        x="473"
        y="140"
        fill="#8C877F"
        fontFamily="Inter, Arial, sans-serif"
          fontSize="21"
        fontWeight="500"
        letterSpacing="4.5"
      >
        BOUTIQUE INTERIOR DESIGN
      </text>
    </svg>
  );
}
