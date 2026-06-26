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
      <ScrollToTop />
      <HashScroll />
      <CursorFollower />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
