// Post build SEO step. A client only SPA serves one index.html for every URL,
// so non JS crawlers (social unfurlers, cold fetches) would see Home metadata on
// every route. This writes a per route dist/<route>/index.html with the correct
// title, description, canonical and Open Graph or Twitter tags, while the same
// app bundle still hydrates and routes client side. Runs as part of `npm run build`.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ORIGIN = "https://scalewithmonday.com";

const ROUTES = [
  {
    path: "/about",
    title: "About Monday | The Team Scaling eCommerce Brands",
    description:
      "Meet Monday, the founders and team behind a full stack growth agency for eCommerce DTC brands scaling to eight and nine figures.",
  },
  {
    path: "/contacts",
    title: "Contact Monday | Book Your Free Growth Audit",
    description:
      "Get in touch with Monday and book a free growth audit. See exactly how we would scale your eCommerce brand.",
  },
  {
    path: "/careers",
    title: "Careers at Monday | Growth Marketing Roles",
    description:
      "Join Monday, a full stack growth agency for eCommerce brands, with roles across media buying, creative, and strategy.",
  },
  {
    path: "/affiliate",
    title: "Become an Affiliate | Monday",
    description:
      "Partner with Monday and earn by referring eCommerce brands to a full stack growth agency.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Monday",
    description: "How Monday collects, uses, and protects your information.",
  },
  {
    path: "/terms",
    title: "Terms of Service | Monday",
    description:
      "The terms that govern your use of the Monday website and services.",
  },
  {
    path: "/refund",
    title: "Refund Policy | Monday",
    description: "The Monday policy on refunds and cancellations.",
  },
];

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const base = readFileSync(join(dist, "index.html"), "utf8");

// Replace the inner value of an attribute (content=" or href=") for the first
// tag matching the given selector fragment. Tolerant of multi line tags.
function setAttr(html, selector, attr, value) {
  const re = new RegExp(`(${selector}[\\s\\S]*?${attr}=")[\\s\\S]*?(")`, "");
  return html.replace(re, `$1${value}$2`);
}

function buildHtml({ path, title, description }) {
  const url = ORIGIN + path;
  let out = base;
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  out = setAttr(out, '<meta\\s+name="description"', "content", esc(description));
  out = setAttr(out, '<link\\s+rel="canonical"', "href", url);
  out = setAttr(out, '<meta\\s+property="og:title"', "content", esc(title));
  out = setAttr(out, '<meta\\s+property="og:description"', "content", esc(description));
  out = setAttr(out, '<meta\\s+property="og:url"', "content", url);
  out = setAttr(out, '<meta\\s+name="twitter:title"', "content", esc(title));
  out = setAttr(out, '<meta\\s+name="twitter:description"', "content", esc(description));
  return out;
}

for (const route of ROUTES) {
  const dir = join(dist, route.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), buildHtml(route));
}

console.log(`SEO prerender: wrote ${ROUTES.length} per route index.html files`);
