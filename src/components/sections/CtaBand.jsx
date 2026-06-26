import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { useScrollTo } from "@/lib/useScrollTo";

/*
  CtaBand — big closing call to action on a dark band. Reused on Home (before
  the audit form area) and About. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

export function CtaBand({
  title = "Ready to scale your brand?",
  highlight = "Let us show you how.",
  body = "Book a free growth audit and we will map out exactly how we would scale your paid social, creative, and retention.",
  to = "/#audit",
  cta = "Get your free growth audit",
}) {
  const { handleAnchor } = useScrollTo();

  return (
    <section className="py-12 md:py-20">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-2xl bg-night px-8 py-16 text-center text-white md:px-16 md:py-24">
          <div
            aria-hidden="true"
            className="glow-orange pointer-events-none absolute inset-x-0 top-0 h-72"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
              {title} <span className="text-primary">{highlight}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-pretty text-white/65">
              {body}
            </p>
            <div className="mt-8 flex justify-center">
              <Button to={to} size="lg" onClick={handleAnchor(to)}>
                {cta}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
