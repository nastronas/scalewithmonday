import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { useScrollTo } from "@/lib/useScrollTo";

/*
  Hero — dark night surface with a soft breathing orange glow and a faint dot
  grid that brightens in a soft spotlight following the cursor (fine pointers
  only, frozen under reduced motion). Headline ends in flat orange words.
  Animates in on load with a fly up plus blur stagger. Imported by Home.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

const EASE = [0.22, 1, 0.36, 1];
const DOTS =
  "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)";

export function Hero() {
  const reduce = useReducedMotion();
  const { handleAnchor } = useScrollTo();
  const sectionRef = useRef(null);
  const spotRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Narrow viewport or no fine pointer counts as mobile (also matches device
  // preview), so the dot field auto animates instead of waiting for a cursor.
  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.innerWidth < 768 ||
          !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Spotlight: brighten the dot overlay near the cursor via CSS vars, rAF
  // throttled. On mobile it auto drifts; disabled under reduced motion.
  useEffect(() => {
    if (reduce) return;
    const section = sectionRef.current;
    const spot = spotRef.current;
    if (!section || !spot) return;

    const fine = !isMobile;
    let raf = 0;

    // Mobile / no fine pointer: the spotlight cannot follow a cursor, so it
    // drifts on its own in a slow loop, keeping the dot field alive.
    if (!fine) {
      spot.style.opacity = "1";
      let t = 0;
      const drift = () => {
        t += 0.024;
        const rect = section.getBoundingClientRect();
        const x = rect.width * (0.5 + 0.34 * Math.sin(t));
        const y = rect.height * (0.42 + 0.3 * Math.cos(t * 0.8));
        spot.style.setProperty("--mx", `${x}px`);
        spot.style.setProperty("--my", `${y}px`);
        raf = requestAnimationFrame(drift);
      };
      raf = requestAnimationFrame(drift);
      return () => {
        if (raf) cancelAnimationFrame(raf);
      };
    }

    // Fine pointer: smooth trailing spotlight that eases toward the cursor each
    // frame, lagging with the same soft delay as the cursor circle.
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let active = false;
    let started = false;

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      spot.style.setProperty("--mx", `${cx}px`);
      spot.style.setProperty("--my", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (!started) {
        started = true; // appear at the cursor, then trail as it moves
        cx = tx;
        cy = ty;
      }
      if (!active) {
        active = true;
        spot.style.opacity = "1";
        raf = requestAnimationFrame(tick);
      }
    };
    const onLeave = () => {
      active = false;
      started = false;
      spot.style.opacity = "0";
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce, isMobile]);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.09, delayChildren: 0.05 },
    },
  };
  const item = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: EASE },
        },
      };

  // Same reveal but WITHOUT filter: an ancestor `filter` (even blur(0px)) breaks
  // backdrop-filter on descendants, so the frosted badge needs a blur free wrapper.
  const itemNoBlur = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: EASE },
        },
      };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-night text-white"
    >
      {/* breathing orange glow behind the headline */}
      {/* desktop glow: original tight radial look */}
      <motion.div
        aria-hidden="true"
        className="glow-orange pointer-events-none absolute inset-x-0 top-0 hidden h-[680px] md:block"
        animate={reduce ? undefined : { opacity: [0.5, 0.78, 0.5] }}
        transition={
          reduce
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* mobile glow: wider and shorter so it is not a tall egg */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] md:hidden"
        style={{
          background:
            "radial-gradient(130% 72% at 50% 0%, rgba(238, 117, 46, 0.24) 0%, transparent 72%)",
        }}
        animate={reduce ? undefined : { opacity: [0.5, 0.78, 0.5] }}
        transition={
          reduce
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* base faint dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: DOTS, backgroundSize: "44px 44px" }}
      />

      {/* spotlight overlay: same grid, brighter and orange tinted, masked to a
          soft circle that follows the cursor (set via --mx / --my). */}
      <div
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffa071 1px, transparent 0)",
          backgroundSize: "44px 44px",
          WebkitMaskImage:
            "radial-gradient(circle 180px at var(--mx, -200px) var(--my, -200px), #000 0%, transparent 70%)",
          maskImage:
            "radial-gradient(circle 180px at var(--mx, -200px) var(--my, -200px), #000 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-x relative flex min-h-[100svh] flex-col items-center justify-center py-20 text-center md:min-h-[73vh] md:py-24"
      >
        <motion.div variants={itemNoBlur}>
          <Badge
            variant="dark"
            icon="check"
            className="bg-white/10 supports-[backdrop-filter]:bg-white/[0.07]"
          >
            Built For Brands that Want to Scale
          </Badge>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-7 max-w-5xl text-balance text-[2.8rem] font-semibold leading-[0.96] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl"
        >
          Growth Partner for Brands Ready to{" "}
          <span className="text-primary">Scale to 8 Figures.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-lg text-pretty text-base text-white/65 md:text-lg"
        >
          Paid ads, creative, email, and landing pages under one roof.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            to="/#audit"
            size="lg"
            onClick={handleAnchor("/#audit")}
          >
            Book your discovery call
          </Button>
          <Button
            to="/#work"
            variant="ghost"
            size="lg"
            onClick={handleAnchor("/#work")}
            className="text-white hover:bg-white/10"
          >
            See our work
          </Button>
        </motion.div>

      
      </motion.div>
    </section>
  );
}
