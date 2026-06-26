import { useEffect } from "react";
import { SITE } from "@/data/site";

/*
  Seo — sets document.title, meta description, canonical and og/twitter title
  and description per route using the document API (no extra dependency).
  Imported by every page. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, name] = selector.match(/\[(.+?)="(.+?)"\]/) ?? [];
    if (key && name) el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function Seo({ title, description, path = "/" }) {
  useEffect(() => {
    const canonical = SITE.url + (path === "/" ? "/" : path);

    if (title) document.title = title;
    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }
    if (title) {
      setMeta('meta[property="og:title"]', "content", title);
      setMeta('meta[name="twitter:title"]', "content", title);
    }
    setMeta('meta[property="og:url"]', "content", canonical);
    setCanonical(canonical);
  }, [title, description, path]);

  return null;
}
