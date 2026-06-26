import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/Button";
import { NAV_LINKS } from "@/data/site";
import { cn } from "@/lib/cn";

/*
  Navbar — fixed top bar. Frosted glass once the page is scrolled.
  Wordmark logo that crossfades dark or light to suit the background, plus nav
  links and a CTA.
  Mobile: hamburger toggles a full width glass dropdown.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The Home hero is dark, so while the nav floats transparently over the top
  // of it (not scrolled, menu closed) the nav text must be light for contrast.
  const darkTop = location.pathname === "/" && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "glass border-b border-line/70"
          : "border-b border-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="container-x flex h-14 items-center justify-between md:h-[60px]"
      >
        <Link
          to="/"
          className="relative flex items-center"
          aria-label="Monday home"
        >
          {/* crossfade between dark and light wordmark based on background */}
          <img
            src="/proper/dark-logo.svg"
            alt="Monday"
            width="676"
            height="149"
            className={cn(
              "h-[22px] w-auto transition-opacity duration-300 md:h-6",
              darkTop ? "opacity-0" : "opacity-100"
            )}
          />
          <img
            src="/proper/light-logo.svg"
            alt=""
            aria-hidden="true"
            width="676"
            height="149"
            className={cn(
              "absolute inset-0 h-[22px] w-auto transition-opacity duration-300 md:h-6",
              darkTop ? "opacity-100" : "opacity-0"
            )}
          />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  darkTop
                    ? isActive
                      ? "text-white"
                      : "text-white/65 hover:text-white"
                    : isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Button to="/contacts" size="sm">
            Reach out
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "relative flex size-10 items-center justify-center rounded-full transition-colors md:hidden",
            darkTop ? "text-white hover:bg-white/10" : "text-foreground hover:bg-hover"
          )}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-4 w-5">
            <span
              className={cn(
                "absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-current transition-all duration-300",
                open && "top-1.5 rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute left-0 bottom-1 block h-0.5 w-5 rounded-full bg-current transition-all duration-300",
                open && "bottom-2 -rotate-45"
              )}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line/70 md:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-5">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-4 py-3 text-base transition-colors",
                      isActive
                        ? "bg-hover text-foreground"
                        : "text-muted hover:bg-hover hover:text-foreground"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Button to="/contacts" size="lg" className="mt-3 w-full">
                Reach out
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
