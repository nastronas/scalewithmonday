import { motion, useReducedMotion } from "framer-motion";

/*
  Reveal — fly up plus blur in on scroll into view (once).
  Used across every section and page. Stagger renders a parent that
  staggers its Reveal children. Respects prefers reduced motion.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

const EASE = [0.16, 1, 0.3, 1];

export function Reveal({
  children,
  className,
  delay = 0,
  y = 38,
  blur = 12,
  duration = 0.95,
  as = "div",
  once = true,
  margin = "-90px",
  ...props
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...props}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin }}
      transition={{ duration, ease: EASE, delay }}
      {...props}
    >
      {children}
    </Tag>
  );
}

// Stagger — wraps children and reveals them in sequence. Children should be
// <Reveal> or any motion element using the `item` variants pattern. For
// convenience this also works with <StaggerItem>.
export function Stagger({
  children,
  className,
  stagger = 0.11,
  delayChildren = 0,
  once = true,
  margin = "-90px",
  as = "div",
  ...props
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...props}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  y = 38,
  blur = 12,
  duration = 0.95,
  as = "div",
  ...props
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...props}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration, ease: EASE },
        },
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
