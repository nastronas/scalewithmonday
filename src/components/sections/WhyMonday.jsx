import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { WhyVisual } from "@/components/WhyVisuals";
import { DIFFERENTIATORS } from "@/data/site";

/*
  WhyMonday — differentiators on a dark surface. Each of the four cards carries
  a small custom animated visual in a clean 2x2 grid. One orange accent per
  card, calm editorial motion, Reveal stagger and a subtle hover lift.
  Imported by Home. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

export function WhyMonday() {
  return (
    <section className="bg-night py-24 text-white md:py-36">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow accent className="mx-auto w-fit">
            Why Monday
          </Eyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
            A different kind of growth partner.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-white/65 md:text-lg">
            Most agencies sell hours and decks. We sell outcomes, and we are
            built from the ground up to deliver them.
          </p>
        </Reveal>

        <Stagger className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
          {DIFFERENTIATORS.map((d, i) => (
            <StaggerItem
              key={d.title}
              y={22}
              blur={6}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-7 md:p-8"
            >
              {/* hover lift on an inner wrapper so it never fights the reveal
                  transform on the StaggerItem */}
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <WhyVisual index={i} />
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em]">
                  {d.title}
                </h3>
                <p className="mt-2.5 text-pretty text-sm text-white/60">
                  {d.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
