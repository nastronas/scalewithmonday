import { cn } from "@/lib/cn";

/*
  Eyebrow — small uppercase label above section headings. 12px, +0.08em
  tracking, muted (or orange when accent). Imported by sections and pages.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

export function Eyebrow({ children, className, accent = false }) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-[0.08em]",
        accent ? "text-primary" : "text-muted",
        className
      )}
    >
      {children}
    </p>
  );
}
