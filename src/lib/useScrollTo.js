import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "@/lib/lenis.jsx";

/*
  useScrollTo — robust in page anchor scrolling through Lenis (native fallback
  under reduced motion). handleAnchor(to) returns an onClick for links whose
  target is "#id", "/#id", "/about#id", etc. Same route scrolls immediately;
  a different route navigates WITH the hash so the top level HashScroll effect
  (in Layout) scrolls once the new page has mounted and measured.
  Imported by Navbar, Hero, sections, page CTAs. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

export const NAV_OFFSET = -80; // clears the slim fixed nav

export function scrollToHash(id, lenis) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (lenis) {
    lenis.scrollTo(el, { offset: NAV_OFFSET });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
  return true;
}

export function useScrollTo() {
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = useCallback((id) => scrollToHash(id, lenis), [lenis]);

  const handleAnchor = useCallback(
    (to) => (e) => {
      const hashIndex = to.indexOf("#");
      if (hashIndex === -1) return;
      const path = to.slice(0, hashIndex) || "/";
      const id = to.slice(hashIndex + 1);
      const samePath =
        path === location.pathname ||
        (path === "/" && location.pathname === "/");

      e.preventDefault();
      if (samePath) {
        scrollToId(id);
      } else {
        // Navigate with the hash; HashScroll handles the scroll after mount.
        navigate(`${path}#${id}`);
      }
    },
    [location.pathname, navigate, scrollToId]
  );

  return { scrollToId, handleAnchor };
}
