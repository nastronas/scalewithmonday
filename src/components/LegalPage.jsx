import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";

/*
  LegalPage — reusable layout for Privacy, Terms, and Refund pages. Title,
  last updated line, readable prose sections, and a counsel review note.
  Imported by the legal pages. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

export function LegalPage({
  eyebrow = "Legal",
  title,
  updated,
  intro,
  sections,
  seoTitle,
  seoDescription,
  path,
}) {
  return (
    <>
      <Seo title={seoTitle} description={seoDescription} path={path} />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <Eyebrow accent>{eyebrow}</Eyebrow>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
              {title}
            </h1>
            {updated && (
              <p className="mt-5 text-sm text-muted">Last updated {updated}</p>
            )}
            {intro && (
              <p className="mt-6 text-pretty text-lg text-muted">{intro}</p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <div className="mx-auto max-w-3xl space-y-12">
            {sections.map((s, i) => (
              <Reveal key={s.heading} delay={Math.min(i * 0.03, 0.12)}>
                <h2 className="text-xl font-semibold tracking-[-0.03em] md:text-2xl">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4 text-pretty text-muted">
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </Reveal>
            ))}

            <Reveal>
              <p className="rounded-xl border border-line bg-panel/60 px-5 py-4 text-sm text-muted">
                This page is professional placeholder copy and should be reviewed
                by legal counsel before launch.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
