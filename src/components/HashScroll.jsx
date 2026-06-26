import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "@/lib/lenis.jsx";
import { scrollToHash } from "@/lib/useScrollTo";

/*
  HashScroll — top level effect that scrolls to the hash target whenever the
  location (path or hash) changes. A tall landing page reflows as lazy images
  and fonts settle, so we re issue the scroll several times over about a second
  using the latest measured position. This guarantees the target is reached even
  when navigating from another route. Sits in Layout alongside ScrollToTop,
  which only handles plain pathname changes (no hash).
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

export function HashScroll() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));

    // Re issue the scroll on a schedule so the final position uses the settled
    // layout. Each call recomputes the element offset from the latest layout.
    const delays = [60, 180, 360, 600, 900, 1300, 1800, 2400];
    const timers = delays.map((d) =>
      setTimeout(() => scrollToHash(id, lenis), d)
    );

    return () => timers.forEach(clearTimeout);
  }, [pathname, hash, lenis]);

  return null;
}
