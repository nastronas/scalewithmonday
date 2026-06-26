import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/*
  CountUp — animates a number from 0 to its value once it scrolls into view.
  Pass the numeric `value` plus optional prefix, suffix, decimals, and grouping.
  Lands exactly on the final value. Reduced motion renders the final value at
  once. Uses tabular-nums so width does not jump. Imported by TrustStrip and
  Results. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

function format(n, { decimals = 0, group = false }) {
  if (decimals > 0) {
    return n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  const rounded = Math.round(n);
  return group ? rounded.toLocaleString("en-US") : String(rounded);
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  group = false,
  duration = 1600,
  className,
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    let raf;
    let start;
    const tick = (t) => {
      if (start == null) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // ease out cubic
      setDisplay(value * eased);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(value); // land exactly
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(display, { decimals, group })}
      {suffix}
    </span>
  );
}
