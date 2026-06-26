import { motion, useReducedMotion } from "framer-motion";

/*
  ServiceVisuals — six small custom mini graphics, one per service card, tuned
  for the light card surface. One orange accent each, everything else ink and
  hairline gray. Subtle GPU friendly motion, frozen under reduced motion. Same
  compact footprint across all six. Imported by Services.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

const EASE = [0.16, 1, 0.3, 1];
// Fixed footprint shared by all six visuals so they line up across the cards.
const BOX = "flex h-14 w-24 shrink-0 items-end justify-end";
const LINE = "rgba(22,20,18,0.10)";

// 01 Paid social: scaling spend bars climbing.
function PaidSocial({ reduce }) {
  const bars = [40, 55, 48, 70, 62, 90];
  return (
    <div className={BOX}>
      <div className="flex h-full w-full items-end gap-1.5">
        {bars.map((h, i) => {
          const last = i === bars.length - 1;
          return (
            <motion.div
              key={i}
              className="flex-1 origin-bottom rounded-sm"
              style={{ height: `${h}%`, background: last ? "var(--primary)" : LINE }}
              animate={reduce ? undefined : { scaleY: [0.65, 1, 0.82, 1] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 2.8, repeat: Infinity, repeatType: "mirror", ease: EASE, delay: i * 0.1 }
              }
            />
          );
        })}
      </div>
    </div>
  );
}

// 02 Creative production: a stack of frames cycling.
function CreativeProduction({ reduce }) {
  return (
    <div className="flex h-14 w-24 shrink-0 items-center justify-end">
      <div className="relative h-12 w-12">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute size-9 rounded-md border"
            style={{
              borderColor: i === 0 ? "rgba(238, 117, 46, 0.55)" : LINE,
              background: i === 0 ? "#fceee6" : "var(--card)",
              left: i * 5,
              top: i * 5,
              zIndex: 3 - i,
            }}
            animate={reduce ? undefined : { y: [0, -3, 0], opacity: [1, 0.85, 1] }}
            transition={
              reduce
                ? undefined
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }
            }
          />
        ))}
      </div>
    </div>
  );
}

// 03 Email and retention: three envelope cards lighting up orange in sequence
// with a loop back arrow beneath, conveying a repeating retention cycle.
function EmailRetention({ reduce }) {
  return (
    <div className="flex h-14 w-24 shrink-0 items-center justify-end">
      <div className="relative h-12 w-24">
        <div className="flex items-center justify-end gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="relative flex h-7 w-7 items-center justify-center rounded-md border"
              style={{ borderColor: LINE, background: "var(--card)" }}
              animate={
                reduce
                  ? undefined
                  : {
                      backgroundColor: [
                        "var(--card)",
                        "var(--primary)",
                        "var(--card)",
                      ],
                      borderColor: [LINE, "var(--primary)", LINE],
                    }
              }
              transition={
                reduce
                  ? undefined
                  : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.6, times: [0, 0.2, 0.5] }
              }
            >
              <svg viewBox="0 0 16 12" className="h-3 w-3.5" fill="none" aria-hidden="true">
                <rect x="0.5" y="0.5" width="15" height="11" rx="1.5" stroke="var(--ink)" strokeWidth="1.2" />
                <path d="M1 2 L8 7 L15 2" stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </motion.div>
          ))}
        </div>
        {/* loop back arrow beneath */}
        <svg viewBox="0 0 96 18" className="mt-1 h-4 w-full" fill="none" aria-hidden="true">
          <path
            d="M88 2 q6 0 6 7 0 7 -6 7 H10 q-6 0 -6 -7"
            stroke={LINE}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M4 9 l-2.5 3.5 M4 9 l3 2.5" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// 04 Landing pages: a mini wireframe with a converting button highlighting.
function LandingPages({ reduce }) {
  return (
    <div className="flex h-14 w-24 shrink-0 items-center justify-end">
      <div className="w-20 rounded-md border p-1.5" style={{ borderColor: LINE }}>
        <div className="h-1.5 w-2/3 rounded-full" style={{ background: LINE }} />
        <div className="mt-1.5 h-1.5 w-full rounded-full" style={{ background: LINE }} />
        <motion.div
          className="mt-2 h-3 w-10 rounded-full bg-primary"
          animate={reduce ? undefined : { opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
          transition={reduce ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "left center" }}
        />
      </div>
    </div>
  );
}

// 05 Growth strategy: channel nodes converging into one line.
function GrowthStrategy({ reduce }) {
  return (
    <div className="flex h-14 w-24 shrink-0 items-center justify-end">
      <svg viewBox="0 0 70 44" className="h-12 w-20" fill="none" aria-hidden="true">
        {[8, 22, 36].map((y, i) => (
          <motion.path
            key={i}
            d={`M6 ${y} C30 ${y}, 36 22, 60 22`}
            stroke={i === 1 ? "var(--primary)" : LINE}
            strokeWidth="1.75"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={
              reduce ? { duration: 0 } : { duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: EASE, delay: i * 0.15 }
            }
          />
        ))}
        <circle cx="60" cy="22" r="3" fill="var(--primary)" />
        {[8, 22, 36].map((y, i) => (
          <circle key={i} cx="6" cy={y} r="2.5" fill="var(--ink)" />
        ))}
      </svg>
    </div>
  );
}

// 06 Analytics and tracking: a live sparkline ticking.
function Analytics({ reduce }) {
  return (
    <div className="flex h-14 w-24 shrink-0 items-center justify-end">
      <svg viewBox="0 0 80 40" className="h-12 w-24" fill="none" aria-hidden="true">
        <line x1="0" x2="80" y1="20" y2="20" stroke={LINE} strokeWidth="1" />
        <motion.path
          d="M2 30 L14 24 L26 28 L38 16 L50 22 L62 10 L78 14"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={
            reduce ? { duration: 0 } : { duration: 2.6, repeat: Infinity, repeatType: "reverse", ease: EASE }
          }
        />
      </svg>
    </div>
  );
}

const VISUALS = [
  PaidSocial,
  CreativeProduction,
  EmailRetention,
  LandingPages,
  GrowthStrategy,
  Analytics,
];

export function ServiceVisual({ index }) {
  const reduce = useReducedMotion();
  const V = VISUALS[index] ?? PaidSocial;
  return <V reduce={reduce} />;
}
