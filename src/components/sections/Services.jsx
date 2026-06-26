import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ServiceVisual } from "@/components/ServiceVisuals";
import { SERVICES } from "@/data/site";

/*
  Services — what we do grid. A single Stagger parent (one viewport observer,
  once) drives every reveal, so nothing animates twice. The heading block is one
  StaggerItem; the card grid is a variants only motion container (no second
  whileInView) that inherits the show state from the parent and staggers its six
  card StaggerItems. Each element flies up plus blurs in exactly once. Imported
  by Home. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export function Services() {
  return (
    <section className="py-24 md:py-36">
      <Stagger className="container-x">
        <StaggerItem className="max-w-2xl">
          <Eyebrow accent>What we do</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
            One team for the entire growth stack.
          </h2>
          <p className="mt-5 text-pretty text-muted md:text-lg">
            Strategy, media, creative, and retention working together. No
            handoffs, no finger pointing, no gaps between the people who plan and
            the people who execute.
          </p>
        </StaggerItem>

        {/* variants only container: inherits hidden/show from Stagger (no own
            whileInView), so the cards stagger without a second observer */}
        <motion.div
          variants={gridVariants}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((s, i) => (
            <StaggerItem
              key={s.title}
              className="group rounded-2xl border border-line bg-card p-7 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-sm text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ServiceVisual index={i} />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
                {s.title}
              </h3>
              <p className="mt-2.5 text-pretty text-muted">{s.body}</p>
            </StaggerItem>
          ))}
        </motion.div>
      </Stagger>
    </section>
  );
}
