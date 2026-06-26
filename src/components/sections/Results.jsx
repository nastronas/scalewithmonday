import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { CountUp } from "@/components/CountUp";
import { KPIS } from "@/data/site";

/*
  Results — KPI stat cards plus two real ROAS screenshots shown in full inside
  clean framed panels (no side cropping). Images degrade gracefully via alt text
  if missing. Imported by Home. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

const RESULT_IMAGES = [
  {
    src: "/results/roas-1.webp",
    w: 1600,
    h: 589,
    alt: "Real ad account showing spend, purchase ROAS, conversion value, results, and cost per result across scaling windows",
    caption: "Real account data",
  },
  {
    src: "/results/roas-2.webp",
    w: 1600,
    h: 960,
    alt: "Real ad account showing multiple campaigns with purchase ROAS above eight and growing conversion value",
    caption: "Results vary by brand and category",
  },
];

export function Results() {
  return (
    <section className="bg-panel/40 py-24 md:py-36">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <Eyebrow accent>Everything you need</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
            Real and consistent growth.
          </h2>
          <p className="mt-5 text-pretty text-muted md:text-lg">
            We unlock the full potential of your brand with tailored strategies
            that compound. From first touch to repeat purchase.
          </p>
          <p className="mt-6 text-balance text-xl font-semibold tracking-[-0.03em] md:text-2xl">
            Generating an extra 74k in revenue? That is our specialty.
          </p>
        </Reveal>

        {/* KPI cards */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {KPIS.map((kpi, i) => (
            <Reveal
              key={kpi.l}
              delay={i * 0.06}
              className="rounded-xl border border-line bg-card p-6"
            >
              <CountUp
                {...kpi.num}
                className="block text-3xl font-semibold tracking-[-0.04em] tabular-nums md:text-4xl"
              />
              <p className="mt-2 text-sm text-muted">{kpi.l}</p>
            </Reveal>
          ))}
        </div>

        {/* real ROAS screenshots, shown in full */}
        <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-8">
          {RESULT_IMAGES.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.06}>
              <figure className="overflow-hidden rounded-2xl border border-line bg-card p-2.5 shadow-sm md:p-3">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full rounded-xl object-contain"
                />
                <figcaption className="px-1 pt-3 text-center text-xs text-muted">
                  {img.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
