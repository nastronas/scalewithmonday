import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

/*
  Button — Monday brand button.
  Renders a <button>, an <a> (href), or a react-router <Link> (to).
  Variants: primary, dark, outline, ghost, light. Sizes: sm, md, lg.
  Imported by Navbar, Hero, sections, pages, Footer.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

const MotionLink = motion.create(Link);

const VARIANTS = {
  primary:
    "bg-primary text-white shadow-sm hover:shadow-md hover:brightness-[1.04]",
  dark: "bg-ink text-white shadow-sm hover:shadow-md hover:brightness-125",
  outline:
    "bg-transparent text-foreground border border-line hover:bg-hover-strong hover:border-foreground/15",
  ghost: "bg-transparent text-foreground hover:bg-hover-strong",
  light:
    "bg-white text-ink shadow-sm hover:shadow-md hover:brightness-[1.02] border border-white/10",
};

const SIZES = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-[0.95rem] gap-2",
  lg: "h-13 px-8 text-base gap-2",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  to,
  href,
  children,
  ...props
}) {
  const reduce = useReducedMotion();

  let Comp = motion.button;
  const linkProps = {};
  if (to) {
    Comp = MotionLink;
    linkProps.to = to;
  } else if (href) {
    Comp = motion.a;
    linkProps.href = href;
  }

  const motionProps = reduce
    ? {}
    : { whileHover: { y: -1 }, whileTap: { scale: 0.97 } };

  return (
    <Comp
      {...linkProps}
      {...motionProps}
      className={cn(
        "inline-flex select-none items-center justify-center rounded-full font-medium transition-[transform,box-shadow,background-color,filter] duration-200 will-change-transform",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
