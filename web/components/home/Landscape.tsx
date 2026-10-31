import Image from "next/image";
import TerrainPlate from "@/components/TerrainPlate";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import { revealDelay } from "@/lib/reveal";
import type { Dict, LandscapeItem } from "@/lib/types";

const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * One card is drawn rather than photographed — see TerrainPlate. It is painted
 * dark so it reads as a plate in the set instead of a failed image, and the tag
 * in the corner says exactly what it is.
 */
function LandscapeCard({
  item,
  plateTag,
  index,
}: {
  item: LandscapeItem;
  plateTag: string;
  index: number;
}) {
  const plate = item.profile;

  return (
    <article
      data-reveal
      style={revealDelay(index)}
      className={`card group overflow-hidden transition-colors duration-300 ${
        plate
          ? "border-ink bg-ink text-paper"
          : "bg-paper hover:border-ink/20"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {plate ? (
          <>
            <TerrainPlate {...plate} />
            <p className="absolute right-3 top-3 font-mono text-micro uppercase tracking-[0.16em] text-paper/45">
              {plateTag}
            </p>
          </>
        ) : (
          <Image
            src={item.image}
            alt={item.caption}
            fill
            sizes={CARD_SIZES}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
      </div>

      <div className="p-5">
        <h3 className="font-serif text-xl">{item.name}</h3>
        <p
          className={`mt-1 font-mono text-mini uppercase tracking-widest ${
            plate ? "text-paper/55" : "text-ink-3"
          }`}
        >
          {item.caption}
        </p>
        <p
          className={`mt-3 text-sm leading-relaxed ${
            plate ? "text-paper/80" : "text-ink-2"
          }`}
        >
          {item.body}
        </p>
      </div>
    </article>
  );
}

export default function Landscape({
  landscape,
}: {
  landscape: Dict["landscape"];
}) {
  return (
    <Section id="landscape" tone="alt">
      <SectionHead
        eyebrow={landscape.eyebrow}
        title={landscape.title}
        lead={landscape.lead}
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {landscape.items.map((item, i) => (
          <LandscapeCard
            key={item.name}
            item={item}
            plateTag={landscape.plateTag}
            index={i}
          />
        ))}
      </div>

      <p className="mt-8 border-t border-line pt-5 font-mono text-micro uppercase leading-relaxed tracking-widest text-ink-3">
        {landscape.creditNote}
      </p>
    </Section>
  );
}
