import { motion, useReducedMotion } from "framer-motion";

/*
  WhyVisuals — four small custom mini graphics for the Why Monday cards, tuned
  for the dark surface. One orange accent each, everything else white at low
  opacity. Subtle GPU friendly motion, frozen under reduced motion. Same compact
  footprint across all four. Imported by WhyMonday. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

const EASE = [0.16, 1, 0.3, 1];
const BOX = "flex h-16 items-center";

// 1. Own brands first: brand tiles behind a rising growth line and an orange spark.
function OwnBrands({ reduce }) {
  return (
    <div className={BOX}>
      <div className="relative h-14 w-32">
        {/* brand tiles */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between">
          {[24, 34, 46].map((h, i) => (
            <motion.div
              key={i}
              className="w-9 rounded-md border border-white/12 bg-white/[0.06]"
              style={{ height: h }}
              animate={reduce ? undefined : { y: [0, -2, 0] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }
              }
            />
          ))}
        </div>
        {/* rising growth line across the tiles */}
        <svg viewBox="0 0 128 56" className="absolute inset-0 size-full" fill="none" aria-hidden="true">
          <motion.path
            d="M10 44 L46 34 L82 26 L118 10"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={
              reduce ? { duration: 0 } : { duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: EASE }
            }
          />
          {/* orange spark at the peak */}
          <motion.circle
            cx="118"
            cy="10"
            r="3.5"
            fill="var(--primary)"
            animate={reduce ? undefined : { scale: [1, 1.4, 1] }}
            transition={reduce ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "118px 10px" }}
          />
        </svg>
      </div>
    </div>
  );
}

// 2. Creative and media under one roof: two panels overlapping, orange dot
// perfectly centered at the intersection.
function OneRoof({ reduce }) {
  return (
    <div className={BOX}>
      <div className="relative h-12 w-28">
        <motion.div
          className="absolute top-1/2 left-1/2 size-12 -translate-y-1/2 rounded-lg border border-white/14 bg-white/[0.06]"
          style={{ marginLeft: -38 }}
          animate={reduce ? undefined : { x: [0, 8, 0] }}
          transition={reduce ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 size-12 -translate-y-1/2 rounded-lg border border-primary/40 bg-primary/15"
          style={{ marginLeft: -10 }}
          animate={reduce ? undefined : { x: [0, -8, 0] }}
          transition={reduce ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* orange accent dot perfectly centered at the overlap */}
        <div className="absolute inset-0 grid place-items-center">
          <motion.span
            className="size-2.5 rounded-full bg-primary"
            animate={reduce ? undefined : { scale: [1, 1.25, 1] }}
            transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

// 3. Senior people, no handoffs: avatars connected by one direct line.
function DirectAccess({ reduce }) {
  return (
    <div className={BOX}>
      <div className="relative flex w-32 items-center justify-between">
        <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-white/15" />
        <motion.div
          className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary"
          animate={reduce ? undefined : { left: ["8%", "84%", "8%"] }}
          transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="relative z-10 size-7 rounded-full border border-white/15 bg-white/[0.08]"
            style={i === 0 ? { borderColor: "color-mix(in oklab, var(--primary) 60%, transparent)" } : undefined}
          />
        ))}
      </div>
    </div>
  );
}

// 4. Built on numbers: hairline bars with one orange counting accent.
function NumbersNotVibes({ reduce }) {
  const bars = [30, 46, 38, 60, 52, 74];
  return (
    <div className={BOX}>
      <div className="flex h-12 items-end gap-1.5">
        {bars.map((h, i) => {
          const last = i === bars.length - 1;
          return (
            <motion.div
              key={i}
              className="w-3 origin-bottom rounded-sm"
              style={{
                height: h * 0.6,
                background: last ? "var(--primary)" : "rgba(255,255,255,0.14)",
              }}
              animate={reduce ? undefined : { scaleY: [0.7, 1, 0.85, 1] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 3, repeat: Infinity, repeatType: "mirror", ease: EASE, delay: i * 0.1 }
              }
            />
          );
        })}
      </div>
    </div>
  );
}

const VISUALS = [OwnBrands, OneRoof, DirectAccess, NumbersNotVibes];

export function WhyVisual({ index }) {
  const reduce = useReducedMotion();
  const V = VISUALS[index] ?? OwnBrands;
  return <V reduce={reduce} />;
}
