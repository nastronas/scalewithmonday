import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "@/lib/lenis.jsx";

/*
  ScrollToTop — jumps to the top on route change (path only, not hash, so anchor
  scrolling is preserved). Uses Lenis when active. Imported by Layout.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) return; // let anchor handlers manage hash targets
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, lenis]);

  return null;
}
