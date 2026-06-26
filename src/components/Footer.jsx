import { Link } from "react-router-dom";
import { FOOTER_COLUMNS, SITE } from "@/data/site";

/*
  Footer — bold orange footer with a big brand statement, support email and
  three link columns. White text on orange. Imported by Layout.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-xl">
            <img
              src="/proper/square-white.svg"
              alt="Monday"
              width="134"
              height="134"
              loading="lazy"
              decoding="async"
              className="h-11 w-auto md:h-12"
            />
            <p className="mt-7 text-balance text-[1.85rem] font-semibold leading-[1.05] tracking-[-0.04em] md:text-4xl">
              Monday is the growth partner that scales established eCommerce
              brands.
            </p>
            <div className="mt-8">
              <p className="text-sm text-white/80">Customer support</p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1 inline-block text-lg font-medium underline-offset-4 transition-opacity hover:opacity-80"
              >
                {SITE.email}
              </a>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-xs uppercase tracking-[0.12em] text-white/80">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link
                          to={link.to}
                          className="text-[0.95rem] text-white transition-opacity hover:opacity-75"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-[0.95rem] text-white transition-opacity hover:opacity-75"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/20 pt-7 text-sm text-white/90 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.fullName}. All rights reserved.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="https://contles.com/?ref=monday"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 transition-colors hover:bg-white/15"
            >
              <span className="size-1.5 rounded-full bg-white" />
              Supported by Contles
            </a>
            <p>Made with care in {SITE.location}.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
