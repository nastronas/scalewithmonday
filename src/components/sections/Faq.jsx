import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { FAQS } from "@/data/site";
import { cn } from "@/lib/cn";

/*
  Faq — accessible accordion of common questions. One item open at a time with a
  smooth height animation. Imported by Home. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

export function Faq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);

  return (
    <section className="py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <Eyebrow accent>Questions</Eyebrow>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
              Good questions, straight answers.
            </h2>
            <p className="mt-5 text-pretty text-muted md:text-lg">
              Still unsure? The free audit is the fastest way to see if we are a
              fit.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="divide-y divide-line border-y border-line">
              {FAQS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="flex w-full items-center justify-between gap-4 py-5 text-left"
                      >
                        <span className="text-lg font-medium tracking-[-0.02em]">
                          {item.q}
                        </span>
                        <span
                          className={cn(
                            "relative flex size-7 shrink-0 items-center justify-center rounded-full border border-line transition-colors",
                            isOpen && "border-primary bg-primary text-white"
                          )}
                          aria-hidden="true"
                        >
                          <span className="absolute h-px w-3 bg-current" />
                          <span
                            className={cn(
                              "absolute h-3 w-px bg-current transition-transform duration-300",
                              isOpen && "scale-y-0"
                            )}
                          />
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          animate={
                            reduce
                              ? { opacity: 1 }
                              : { height: "auto", opacity: 1 }
                          }
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-5 text-pretty text-muted">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
