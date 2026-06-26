import { Reveal } from "@/components/Reveal";
import { TESTIMONIAL } from "@/data/site";

/*
  Testimonial — single strong quote as a case highlight. Imported by Home.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

export function Testimonial() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <svg
            viewBox="0 0 24 24"
            className="mx-auto size-9 text-primary"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.5 7C6.5 7 4 9.5 4 12.8 4 15.7 6 17.6 8.4 17.6c.5 0 1 .1 1 .7 0 .6-.5 1.2-1.4 1.7l.9 1.4c2.6-1.1 4.6-3.6 4.6-7.3C13.5 9.7 11.9 7 9.5 7Zm9 0C15.5 7 13 9.5 13 12.8c0 2.9 2 4.8 4.4 4.8.5 0 1 .1 1 .7 0 .6-.5 1.2-1.4 1.7l.9 1.4c2.6-1.1 4.6-3.6 4.6-7.3C22.5 9.7 20.9 7 18.5 7Z" />
          </svg>
          <blockquote className="mt-7 text-balance text-2xl font-semibold leading-[1.2] tracking-[-0.035em] md:text-4xl">
            {TESTIMONIAL.quote}
          </blockquote>
          <figcaption className="mt-7 text-muted">
            <span className="font-medium text-foreground">
              {TESTIMONIAL.name}
            </span>
            , {TESTIMONIAL.role}
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
