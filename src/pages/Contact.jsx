import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { AuditForm } from "@/components/sections/AuditForm";
import { SITE } from "@/data/site";

/*
  Contact (/contacts) — headline, contact details, and the audit form reused.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

const DETAILS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Location", value: SITE.location },
  { label: "Hours", value: "Monday to Friday, replies within one business day" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X", href: "#" },
];

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Monday | Book Your Free Growth Audit"
        description="Get in touch with Monday. Book a free growth audit for your eCommerce brand and we will show you exactly how we would scale your paid ads, creative, and retention."
        path="/contacts"
      />

      <section className="pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <Reveal>
              <Eyebrow accent>Contact</Eyebrow>
              <h1 className="mt-5 max-w-xl text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-6xl">
                Have a moment to scale?{" "}
                <span className="text-primary">Let us talk.</span>
              </h1>
              <p className="mt-7 max-w-md text-pretty text-lg text-muted">
                Tell us about your brand and where you want to take it. We reply
                personally, never with a template.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="lg:pt-2">
              <dl className="space-y-7">
                {DETAILS.map((d) => (
                  <div key={d.label}>
                    <dt className="text-xs uppercase tracking-[0.08em] text-muted">
                      {d.label}
                    </dt>
                    <dd className="mt-1.5 text-lg font-medium tracking-[-0.02em]">
                      {d.href ? (
                        <a
                          href={d.href}
                          className="underline-offset-4 transition-colors hover:text-primary"
                        >
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-muted">
                    Social
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="rounded-full border border-line bg-card px-4 py-2 text-sm transition-colors hover:bg-hover-strong"
                      >
                        {s.label}
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <AuditForm
        heading="Book your free growth audit."
        subheading="Tell us where you are and where you want to go. We will show you exactly how we would scale it."
      />
    </>
  );
}
