import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

/*
  Careers — marketing styled hiring page with intro, value blocks, and a CTA.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

const PERKS = [
  {
    title: "Real ownership",
    body: "Own accounts and outcomes from day one. No layers, no busywork, no hiding behind a deck.",
  },
  {
    title: "Senior company",
    body: "Work next to people who are excellent at their craft and happy to teach what they know.",
  },
  {
    title: "Remote first",
    body: "We care about the work, not the chair. Sensible hours and a calm, focused pace.",
  },
  {
    title: "Room to grow",
    body: "As our brands scale, so does your scope. Strong work is noticed and rewarded.",
  },
];

export default function Careers() {
  return (
    <>
      <Seo
        title="Careers | Monday"
        description="Join Monday, a small senior growth team running paid media, creative, and retention for scaling eCommerce brands."
        path="/careers"
      />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-x">
          <Reveal>
            <Badge>Careers</Badge>
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-6xl">
              Do the best work of your{" "}
              <span className="text-primary">career.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-2xl text-pretty text-lg text-muted">
              We are a small team that moves fast and cares deeply about the
              craft. If you want real ownership and the chance to scale brands
              that matter, we would love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <Eyebrow accent>Why work here</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              A place built for people who care.
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
            {PERKS.map((p) => (
              <StaggerItem
                key={p.title}
                className="rounded-xl border border-line bg-card p-7"
              >
                <h3 className="text-xl font-semibold tracking-[-0.03em]">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-pretty text-muted">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <Reveal className="rounded-2xl border border-line bg-panel/60 px-8 py-14 text-center md:px-16 md:py-20">
            <h2 className="mx-auto max-w-xl text-balance text-2xl font-semibold tracking-[-0.04em] md:text-4xl">
              No open roles right now, but great people are always welcome.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-muted">
              Tell us what you are great at and why Monday. We read every message.
            </p>
            <div className="mt-7 flex justify-center">
              <Button to="/contacts" size="lg">
                Introduce yourself
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
