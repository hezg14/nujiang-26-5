import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import { revealDelay } from "@/lib/reveal";
import type { Dict, LandscapeItem } from "@/lib/types";

const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

function LandscapeCard({
  item,
  index,
}: {
  item: LandscapeItem;
  index: number;
}) {
  return (
    <article
      data-reveal
      style={revealDelay(index)}
      className="card group overflow-hidden bg-paper transition-colors duration-300 hover:border-ink/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.caption}
          fill
          sizes={CARD_SIZES}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-5">
        <h3 className="font-serif text-xl">{item.name}</h3>
        <p className="mt-1 font-mono text-mini uppercase tracking-widest text-ink-3">
          {item.caption}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-2">{item.body}</p>
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
          <LandscapeCard key={item.name} item={item} index={i} />
        ))}
      </div>

      <p className="mt-8 border-t border-line pt-5 font-mono text-micro uppercase leading-relaxed tracking-widest text-ink-3">
        {landscape.creditNote}
      </p>
    </Section>
  );
}
