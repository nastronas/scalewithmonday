import { useMemo } from "react";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { CREATIVES } from "@/data/site";

// Fisher Yates shuffle, then split the 37 creatives into 3 disjoint rows so no
// image ever appears in two rows at once, and the order is fresh on each load.
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/*
  AdMarquee (id="work") — three stacked marquee rows of real ad creatives from
  /public/scroller. Every tile is a uniform square (aspect-ratio 1:1) of a fixed
  responsive width; the image fills it with object-cover (center crop, never
  stretched). Hairline border, panel background while loading, lazy plus async
  decoding. The fixed square size keeps layout shift near zero. Imported by Home.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

const fadeMask = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
  maskImage:
    "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
};

function Tile({ src }) {
  return (
    <div className="aspect-square w-[150px] shrink-0 overflow-hidden rounded-xl border border-line bg-panel md:w-[200px]">
      <img
        src={src}
        alt="Monday ad creative example"
        loading="lazy"
        decoding="async"
        width="200"
        height="200"
        className="block size-full object-cover"
      />
    </div>
  );
}

export function AdMarquee() {
  const rows = useMemo(() => {
    const s = shuffle(CREATIVES);
    const n = Math.ceil(s.length / 3);
    return [
      { items: s.slice(0, n), speed: 70, reverse: false },
      { items: s.slice(n, n * 2), speed: 88, reverse: true },
      { items: s.slice(n * 2), speed: 60, reverse: false },
    ];
  }, []);

  return (
    <section id="work" className="overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <Reveal>
          <Eyebrow accent>Our creative output</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
            Ads that do the heavy lifting.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-muted md:text-lg">
            Scroll stopping creative produced in house and tested at speed.
            Every concept earns its spend.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-14 flex flex-col gap-3 md:gap-4" delay={0.05}>
        {rows.map((row, i) => (
          <div key={i} style={fadeMask}>
            <Marquee
              speed={row.speed}
              reverse={row.reverse}
              items={row.items}
              renderItem={(c) => <Tile src={c.src} />}
            />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
