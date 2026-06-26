import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/*
  ProcessVisuals — one refined looping visual per process step. Editorial and
  quiet: thin strokes, generous whitespace, small uppercase eyebrow labels,
  medium weight numbers with negative tracking, a single orange accent per
  visual, hairline detail over filled blocks, slow subtle motion. All three
  share the same fixed height frame. Reduced motion renders the static state.
  Imported by Process. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

const EASE = [0.16, 1, 0.3, 1];

// Shared frame. Identical height and styling for all three.
function Frame({ eyebrow, caption, accent, children }) {
  return (
    <div className="relative flex h-60 flex-col overflow-hidden rounded-2xl border border-line bg-card p-6 md:h-72">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted">
          {eyebrow}
        </span>
        {accent}
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-center">{children}</div>
      {caption && (
        <p className="mt-3 text-[11px] text-muted/80">{caption}</p>
      )}
    </div>
  );
}

// Smooth count up that replays whenever `cycle` changes.
function useCountUp(target, reduce, cycle, decimals = 0) {
  const [val, setVal] = useState(reduce ? target : 0);
  useEffect(() => {
    if (reduce) {
      setVal(target);
      return;
    }
    let raf;
    let start;
    const duration = 1700;
    const tick = (t) => {
      if (start == null) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduce, cycle]);

  return decimals
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString("en-US");
}

// A gentle repeating cycle counter (re triggers loops every `ms`).
function useCycle(ms, reduce) {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setCycle((c) => c + 1), ms);
    return () => clearInterval(id);
  }, [ms, reduce]);
  return cycle;
}

/* STEP 1 — Growth trend line chart, editorial and quiet. */
function StrategyVisual({ reduce }) {
  const cycle = useCycle(5600, reduce);
  const roas = useCountUp(8.2, reduce, cycle, 1);

  const pts = [
    [10, 96],
    [62, 84],
    [116, 88],
    [170, 62],
    [226, 52],
    [290, 26],
  ];
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  const area = `${line} L290 108 L10 108 Z`;
  const last = pts[pts.length - 1];

  return (
    <Frame
      eyebrow="Blended ROAS"
      caption="Trailing thirty day trend"
      accent={
        <span className="font-mono text-sm font-medium tracking-[-0.02em] text-foreground tabular-nums">
          {roas}x
        </span>
      }
    >
      <svg
        viewBox="0 0 300 116"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden="true"
      >
        {/* hairline gridlines */}
        {[34, 64, 94].map((y) => (
          <line
            key={y}
            x1="10"
            x2="290"
            y1={y}
            y2={y}
            stroke="var(--line)"
            strokeWidth="1"
          />
        ))}

        {/* soft area fill */}
        <motion.path
          d={area}
          fill="var(--primary)"
          initial={{ opacity: reduce ? 0.08 : 0 }}
          animate={{ opacity: 0.08 }}
          transition={
            reduce ? { duration: 0 } : { duration: 1, delay: 1.6, ease: "easeOut" }
          }
        />

        {/* thin trend line drawn left to right */}
        <motion.path
          key={cycle}
          d={line}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={reduce ? { duration: 0 } : { duration: 1.9, ease: EASE }}
        />

        {/* single accent node at the peak, gently pulsing */}
        <motion.circle
          cx={last[0]}
          cy={last[1]}
          r="3"
          fill="var(--primary)"
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: [1, 1.4, 1] }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  opacity: { delay: 1.7 },
                  scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.9 },
                }
          }
          style={{ transformOrigin: `${last[0]}px ${last[1]}px` }}
        />
      </svg>
    </Frame>
  );
}

/* STEP 2 — Live numbers, hairline and calm. */
function MediaVisual({ reduce }) {
  const cycle = useCycle(5600, reduce);
  const spend = useCountUp(32651, reduce, cycle);
  const roas = useCountUp(2.27, reduce, cycle, 2);
  const revenue = useCountUp(74, reduce, cycle);

  const rows = [
    { label: "Spend", value: `€${spend}` },
    { label: "ROAS", value: `${roas}x` },
    { label: "Revenue", value: `€${revenue}k` },
  ];

  return (
    <Frame
      eyebrow="Live account"
      caption="Updated continuously"
      accent={
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <span className="size-1.5 rounded-full bg-primary" />
          tracking
        </span>
      }
    >
      <div className="flex flex-col">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={
              "flex items-baseline justify-between py-2.5 " +
              (i < rows.length - 1 ? "border-b border-line" : "")
            }
          >
            <span className="text-[11px] uppercase tracking-[0.08em] text-muted">
              {r.label}
            </span>
            <span className="text-lg font-medium tracking-[-0.03em] text-foreground tabular-nums">
              {r.value}
            </span>
          </div>
        ))}
      </div>

      {/* slim pacing bar, one orange accent */}
      <div className="mt-4">
        <div className="h-1 w-full overflow-hidden rounded-full bg-panel">
          <motion.div
            key={cycle}
            className="h-full rounded-full bg-primary"
            initial={{ width: reduce ? "85%" : "0%" }}
            animate={{ width: "85%" }}
            transition={reduce ? { duration: 0 } : { duration: 1.9, ease: EASE }}
          />
        </div>
      </div>
    </Frame>
  );
}

/* STEP 3 — Creative wall: columns scrolling vertically in a seamless loop. */
// Three distinct image sets, no overlap, so no duplicate is ever visible.
const WALL_COLUMNS = [
  [1, 4, 7, 10, 13],
  [2, 5, 8, 11, 14],
  [3, 6, 9, 12, 15],
].map((col) => col.map((n) => `/scroller/${n}.webp`));

// Uniform trailing margin on EVERY thumb (including the last) keeps the doubled
// strip perfectly periodic, so a translateY of exactly -50% loops with no seam.
function WallThumb({ src }) {
  return (
    <div className="mb-2 aspect-square overflow-hidden rounded-lg bg-panel ring-1 ring-line">
      <img
        src={src}
        alt=""
        width="120"
        height="120"
        loading="lazy"
        decoding="async"
        className="size-full object-cover"
      />
    </div>
  );
}

function WallColumn({ images, reverse, duration, reduce }) {
  if (reduce) {
    // static neat column under reduced motion
    return (
      <div>
        {images.map((src, i) => (
          <WallThumb key={i} src={src} />
        ))}
      </div>
    );
  }

  // Render the list twice (A then A). Animating 0 to -50% shows the seam between
  // the two identical halves, which is invisible, so it loops forever.
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{ willChange: "transform" }}
      >
        {doubled.map((src, i) => (
          <WallThumb key={i} src={src} />
        ))}
      </motion.div>
    </div>
  );
}

const wallFade = {
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)",
  maskImage:
    "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)",
};

function CreativesVisual({ reduce }) {
  const cols = [
    { images: WALL_COLUMNS[0], reverse: false, duration: 26 },
    { images: WALL_COLUMNS[1], reverse: true, duration: 32 },
    { images: WALL_COLUMNS[2], reverse: false, duration: 29 },
  ];
  return (
    <Frame eyebrow="Creative pipeline" caption="Always testing the next batch">
      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        style={reduce ? undefined : wallFade}
        aria-hidden="true"
      >
        {cols.map((c, i) => (
          <div key={i} className={i === 2 ? "hidden sm:block" : ""}>
            <WallColumn
              images={c.images}
              reverse={c.reverse}
              duration={c.duration}
              reduce={reduce}
            />
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function ProcessVisual({ index }) {
  const reduce = useReducedMotion();
  if (index === 0) return <StrategyVisual reduce={reduce} />;
  if (index === 1) return <MediaVisual reduce={reduce} />;
  return <CreativesVisual reduce={reduce} />;
}
