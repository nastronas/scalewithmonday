import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { HashScroll } from "@/components/HashScroll";
import { CursorFollower } from "@/components/CursorFollower";

/*
  Layout — app shell: fixed Navbar, routed <Outlet />, Footer, ScrollToTop, and
  the custom cursor follower (fine pointer only). No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <HashScroll />
      <CursorFollower />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
