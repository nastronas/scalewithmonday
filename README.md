# Scale with Monday

A minimal **React + Vite + Tailwind CSS v4 + Framer Motion** site that deploys to **GitHub Pages** at **[scalewithmonday.com](https://scalewithmonday.com)**.

Two pages with navigation, one example component, a color-token theme, and a couple of demos — that's it. Build from here.

## Quick start

```bash
npm install      # install dependencies
npm run dev      # dev server → http://localhost:5173
npm run build    # production build → ./dist
npm run preview  # preview the build locally
```

## Structure

```
index.html                 # entry + Inter font + SEO meta
vite.config.js             # Vite + React + Tailwind, @/ alias
public/.nojekyll           # don't run Jekyll on Pages
public/CNAME               # custom domain for GitHub Pages (scalewithmonday.com)
src/
  main.jsx                 # React entry
  index.css                # 🎨 color tokens (CSS variables) + Tailwind setup
  App.jsx                  # routes (HashRouter)
  components/
    Layout.jsx             # header nav + page outlet
    Button.jsx             # the example component
  pages/
    Home.jsx               # color showcase + custom Tailwind + Framer Motion
    About.jsx              # second page (navigation demo)
```

## Theming

All colors are CSS variables in [src/index.css](src/index.css), wired into Tailwind via `@theme inline`. Change one value and the whole app updates:

```css
:root {
  --primary: #7c3aed;
  --accent: #06b6d4;
  --foreground: #18181b;
  /* … */
}
```

Use them as utilities anywhere: `bg-primary`, `text-foreground`, `border-border`. (No dark mode — light only.)

## Routing

Uses `HashRouter`, so client-side routing **just works on GitHub Pages** with no server config (URLs look like `scalewithmonday.com/#/about`). Add pages in [src/App.jsx](src/App.jsx).

> Want clean URLs (`scalewithmonday.com/about`)? Swap `HashRouter` for `BrowserRouter` and add the standard GitHub Pages `404.html` SPA redirect.

## Deploy to GitHub Pages

The production build in [`dist/`](dist) is committed and served by GitHub Pages.
After changing anything in `src/`, rebuild and commit:

```bash
npm run build    # regenerates ./dist (incl. CNAME + SEO meta)
git add -A && git commit -m "Build" && git push
```

The build uses a relative base + `HashRouter`, so the same `dist/` works both at
the project URL `https://nastronas.github.io/scalewithmonday/` and at the root
custom domain `https://scalewithmonday.com`.

### Custom domain (scalewithmonday.com)

The repo already includes [`public/CNAME`](public/CNAME) with `scalewithmonday.com`,
so the built site carries the custom-domain marker. To finish wiring it up:

1. At your domain host, add apex `A` records for `scalewithmonday.com` →
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (optionally a `CNAME` record `www` → `nastronas.github.io`).
2. Repo **Settings → Pages → Custom domain** → enter `scalewithmonday.com`, then
   enable **Enforce HTTPS** once it verifies.

Until DNS propagates, the site is reachable at
`https://nastronas.github.io/scalewithmonday/`.
