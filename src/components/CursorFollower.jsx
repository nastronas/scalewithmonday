import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/*
  CursorFollower — a small orange circle that trails the mouse with spring
  easing. Grows and fades when hovering interactive elements. pointer-events
  none so it never blocks clicks. Hidden on touch (CSS .cursor-dot guard) and
  disabled under reduced motion. Imported by Layout.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

const SIZE = 9;
const INTERACTIVE = 'a, button, [role="button"], [role="option"], label[for], input, select, textarea, summary, [data-cursor="grow"]';

export function CursorFollower() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const movedRef = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 38, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 38, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const onMove = (e) => {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
      if (!movedRef.current) {
        movedRef.current = true;
        setVisible(true);
      }
      const t = e.target;
      setHovering(!!(t && t.closest && t.closest(INTERACTIVE)));
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="cursor-dot"
      aria-hidden="true"
      style={{ x: sx, y: sy, width: SIZE, height: SIZE }}
      animate={{
        scale: hovering ? 2.4 : 1,
        opacity: visible ? (hovering ? 0.35 : 0.9) : 0,
      }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
    />
  );
}
