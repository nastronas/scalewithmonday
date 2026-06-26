import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { ProcessVisual } from "@/components/ProcessVisuals";
import { useScrollTo } from "@/lib/useScrollTo";
import { PROCESS_STEPS } from "@/data/site";
import { cn } from "@/lib/cn";

/*
  Process — three steps down a vertical orange connector that draws (scaleY 0->1)
  as you scroll. Glowing node dots. Each step pairs text with its own looping
  animated visual (see ProcessVisuals). Zig zag on desktop, stacked on mobile.
  Imported by Home. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

export function Process() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { handleAnchor } = useScrollTo();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-24 md:py-36">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <Eyebrow accent>How we operate</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
            Full circle performance, from creatives to scale.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16 md:mt-24">
          {/* connector line: left on mobile, centered on desktop */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 bottom-2 w-px bg-line md:left-1/2 md:-translate-x-1/2"
          >
            <motion.div
              className="absolute inset-x-0 top-0 w-px origin-top bg-primary"
              style={reduce ? { height: "100%" } : { height: "100%", scaleY }}
            />
          </div>

          <ol className="space-y-16 md:space-y-28">
            {PROCESS_STEPS.map((step, i) => {
              const flip = i % 2 === 1;
              return (
                <li
                  key={step.n}
                  className="relative grid grid-cols-[44px_1fr] gap-x-5 md:grid-cols-2 md:gap-x-16"
                >
                  {/* node dot */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[12px] top-1.5 z-10 flex size-4 items-center justify-center rounded-full bg-primary md:left-1/2 md:-translate-x-1/2"
                    style={{
                      boxShadow:
                        "0 0 0 4px var(--background), 0 0 18px 2px rgba(238, 117, 46, 0.6)",
                    }}
                  >
                    <span className="size-1.5 rounded-full bg-white/90" />
                  </span>

                  {/* text */}
                  <Reveal
                    className={cn(
                      "col-start-2 md:col-start-auto md:self-center",
                      flip ? "md:order-2 md:col-start-2 md:pl-4" : "md:pr-4 md:text-right"
                    )}
                    delay={0.05}
                  >
                    <span className="font-mono text-sm text-primary">
                      {step.n}
                    </span>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-md text-pretty text-muted md:ml-auto md:max-w-md">
                      {step.body}
                    </p>
                  </Reveal>

                  {/* visual */}
                  <Reveal
                    className={cn(
                      "col-start-2 mt-6 md:col-start-auto md:mt-0 md:self-center",
                      flip ? "md:order-1 md:pr-4" : "md:pl-4"
                    )}
                    delay={0.12}
                  >
                    <ProcessVisual index={i} />
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-20 flex justify-center">
          <Button to="/#audit" size="lg" onClick={handleAnchor("/#audit")}>
            Get your free growth audit
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
