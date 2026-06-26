import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { Badge } from "@/components/Badge";
import { CtaBand } from "@/components/sections/CtaBand";
import { TEAM, VALUES, PROCESS_STEPS, TRUST_STATS } from "@/data/site";
import { cn } from "@/lib/cn";

/*
  About — full page: positioning hero, story, mission and values, proof stats,
  team grid, a how we work recap, and a closing CTA band. No data files /
  no schemas. Instruction: build the Monday agency marketing site.
*/

const AVATAR_TINT = {
  orange: "bg-primary text-white",
  ink: "bg-ink text-white",
  cream: "bg-primary-light text-ink",
};

export default function About() {
  return (
    <>
      <Seo
        title="About Monday | The Growth Team Behind Scaling Brands"
        description="Monday is a small senior team running paid ads, creative production, and retention for eCommerce DTC brands scaling to 8 and 9 figures. Meet the people and the philosophy."
        path="/about"
      />

      {/* hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-x">
          <Reveal>
            <Badge>Who we are</Badge>
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-6xl">
              Who we are and{" "}
              <span className="text-primary">what we do.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-2xl text-pretty text-lg text-muted">
              Monday is a boutique full stack growth agency for eCommerce DTC
              brands. We pair sharp media buying with creative produced in house,
              then wire it all into email and retention so growth compounds. We
              scaled our own brands first, so we run yours the same way.
            </p>
          </Reveal>
        </div>
      </section>

      {/* story + mission */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <Eyebrow accent>Our story</Eyebrow>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
                Built by operators, not slide decks.
              </h2>
            </Reveal>
            <Reveal delay={0.06} className="space-y-5 text-pretty text-muted md:text-lg">
              <p>
                We started on the other side of the table, building and scaling
                our own eCommerce brands. We felt every late night chasing a
                broken funnel and every win that came from one great ad.
              </p>
              <p>
                Monday is what we wished we could have hired. A small senior team
                that treats your brand like its own, moves fast, and ties every
                decision back to the numbers that matter.
              </p>
              <p>
                Today we run growth for established brands across Europe and
                beyond, from creative concept all the way to scaled spend.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* proof stats */}
      <section className="border-y border-line bg-panel/40 py-14 md:py-20">
        <div className="container-x">
          <Stagger className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {TRUST_STATS.map((s) => (
              <StaggerItem key={s.l} className="text-center">
                <p className="text-3xl font-semibold tracking-[-0.04em] tabular-nums md:text-4xl">
                  {s.v}
                </p>
                <p className="mt-1.5 text-sm text-muted">{s.l}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* values */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <Eyebrow accent>What we believe</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
              The principles behind the work.
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
            {VALUES.map((v) => (
              <StaggerItem
                key={v.title}
                className="rounded-xl border border-line bg-card p-7"
              >
                <h3 className="text-xl font-semibold tracking-[-0.03em]">
                  {v.title}
                </h3>
                <p className="mt-2.5 text-pretty text-muted">{v.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* team */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <Eyebrow accent>The team · {TEAM.length} people</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
              A small crew with sharp instincts.
            </h2>
            <p className="mt-5 text-pretty text-muted md:text-lg">
              No account managers passing you along. You work directly with the
              people doing the work.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <StaggerItem
                key={member.name}
                className="group rounded-xl border border-line bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div
                  className={cn(
                    "flex size-16 items-center justify-center rounded-full text-lg font-semibold tracking-[-0.03em]",
                    AVATAR_TINT[member.tint]
                  )}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-primary">{member.role}</p>
                <p className="mt-3 text-pretty text-muted">{member.bio}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* how we work recap */}
      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <Eyebrow accent>How we work</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
              Three jobs, one tight team.
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {PROCESS_STEPS.map((step) => (
              <StaggerItem
                key={step.n}
                className="rounded-xl border border-line bg-card p-7"
              >
                <span className="font-mono text-sm text-primary">{step.n}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-pretty text-muted">{step.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title="Ready to put a senior team on your"
        highlight="growth?"
        body="Book a free audit and we will show you exactly how we would scale your brand."
      />
    </>
  );
}
