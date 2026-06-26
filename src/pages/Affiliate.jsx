import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

/*
  Affiliate — marketing styled partner program page with intro, steps, and a
  CTA. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

const STEPS = [
  {
    n: "01",
    title: "Introduce a brand",
    body: "Know an eCommerce brand ready to scale? Send them our way or make a warm introduction.",
  },
  {
    n: "02",
    title: "We do the work",
    body: "If they become a client, our team runs the growth while you sit back. No work required on your side.",
  },
  {
    n: "03",
    title: "Earn on every month",
    body: "Receive a recurring share for as long as the brand stays with us. Simple, transparent, and ongoing.",
  },
];

export default function Affiliate() {
  return (
    <>
      <Seo
        title="Become an Affiliate | Monday"
        description="Refer eCommerce brands to Monday and earn a recurring share for every brand we scale."
        path="/affiliate"
      />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-x">
          <Reveal>
            <Badge>Partner program</Badge>
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-6xl">
              Refer brands, earn{" "}
              <span className="text-primary">recurring rewards.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-2xl text-pretty text-lg text-muted">
              If you know founders and operators in eCommerce, our affiliate
              program turns those connections into recurring income. You make the
              introduction, we scale the brand, everyone wins.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <Eyebrow accent>How it works</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              Three simple steps.
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((s) => (
              <StaggerItem
                key={s.n}
                className="rounded-xl border border-line bg-card p-7"
              >
                <span className="font-mono text-sm text-primary">{s.n}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-pretty text-muted">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <Reveal className="rounded-2xl border border-line bg-panel/60 px-8 py-14 text-center md:px-16 md:py-20">
            <h2 className="mx-auto max-w-xl text-balance text-2xl font-semibold tracking-[-0.04em] md:text-4xl">
              Ready to partner with us?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-muted">
              Reach out and we will share the program details and get you set up.
            </p>
            <div className="mt-7 flex justify-center">
              <Button to="/contacts" size="lg">
                Become an affiliate
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
