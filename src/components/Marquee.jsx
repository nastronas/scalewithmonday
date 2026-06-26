import { cn } from "@/lib/cn";

/*
  Marquee — seamless infinite horizontal scroller. Pass an `items` array and a
  `renderItem(item, i)` function (NOT JSX children, so the flex track gets each
  tile as a real flex item). Items render twice back to back (A then A) and the
  flex track animates translateX 0 to -50%. Every item carries a uniform right
  margin (including the last) so the doubled strip is perfectly periodic and the
  loop has no seam or jump. Pause on hover is gated to fine pointer devices via
  CSS (.marquee-paused) so it never stops on touch. Imported by AdMarquee.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

export function Marquee({
  items,
  renderItem,
  speed = 60,
  reverse = false,
  pauseOnHover = true,
  gap = "0.75rem",
  className,
}) {
  const list = items ?? [];
  const doubled = [...list, ...list];

  return (
    <div
      className={cn(
        "w-full overflow-hidden",
        pauseOnHover && "marquee-paused",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn("marquee-track", reverse && "marquee-reverse")}
        style={{ "--marquee-duration": `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="shrink-0" style={{ marginRight: gap }}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  );
}
