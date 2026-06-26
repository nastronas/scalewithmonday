import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

/*
  Lenis smooth scroll. A provider runs one Lenis instance with a rAF loop and
  exposes it via context so anchor links can call lenis.scrollTo. Smoothing is
  disabled when the user prefers reduced motion. framer-motion useScroll keeps
  working because Lenis drives the real window scroll position.
  Imported by App.jsx. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Under reduced motion, skip Lenis entirely and use native scrolling.
    if (prefersReduced) {
      return;
    }

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(instance);

    const raf = (time) => {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
