import { cn } from "@/lib/cn";

/*
  Badge — small pill used as an eyebrow / trust marker.
  variant "light" sits on cream, "dark" sits on the night hero (frosted).
  Optional dot or check glyph. Imported by Hero, sections, About, Contact.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

const VARIANTS = {
  light: "panel text-foreground/80",
  dark: "border border-white/12 bg-white/8 text-white/85 backdrop-blur-md",
};

export function Badge({
  children,
  className,
  variant = "light",
  icon = "dot",
  ...props
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-[0.02em]",
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {icon === "dot" && (
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-primary"
        />
      )}
      {icon === "check" && (
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className="size-3 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 6.5 5 9l4.5-5" />
        </svg>
      )}
      {children}
    </span>
  );
}
