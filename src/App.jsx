import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LenisProvider } from "@/lib/lenis.jsx";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";

/*
  App — BrowserRouter for clean URLs (/about, /contacts, legal pages). Home is
  eager (it is the common entry); the rest of the routes are lazy loaded for a
  lighter initial bundle. The public/404.html SPA redirect lets GitHub Pages
  serve deep links. Lenis powers smooth scroll. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Refund = lazy(() => import("@/pages/Refund"));
const Careers = lazy(() => import("@/pages/Careers"));
const Affiliate = lazy(() => import("@/pages/Affiliate"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteFallback() {
  return <div className="min-h-[70vh]" aria-hidden="true" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/refund" element={<Refund />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/affiliate" element={<Affiliate />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </LenisProvider>
    </BrowserRouter>
  );
}
