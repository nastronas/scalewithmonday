import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { TRUST_STATS } from "@/data/site";

/*
  TrustStrip — short proof strip right under the hero. Headline plus a row of
  stats establishing that Monday scaled its own brands first. Imported by Home.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-panel/40 py-14 md:py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-muted">
            Proven by our own brands
          </p>
          <p className="mt-3 text-balance text-xl font-semibold tracking-[-0.03em] md:text-2xl">
            We built and scaled our own eCommerce brands before we ever ran
            yours.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {TRUST_STATS.map((s) => (
            <StaggerItem key={s.l} className="text-center">
              <CountUp
                {...s.num}
                className="block text-3xl font-semibold tracking-[-0.04em] tabular-nums md:text-4xl"
              />
              <p className="mt-1.5 text-sm text-muted">{s.l}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
