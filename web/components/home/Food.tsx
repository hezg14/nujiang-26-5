import DishMark from "@/components/DishMark";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import { revealDelay } from "@/lib/reveal";
import type { Dict } from "@/lib/types";

/** Drawn, not photographed: six dishes, six line drawings, no stock food. */
export default function Food({ food }: { food: Dict["food"] }) {
  return (
    <Section id="food" tone="alt">
      <SectionHead eyebrow={food.eyebrow} title={food.title} lead={food.lead} />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {food.dishes.map((dish, i) => (
          <div
            key={dish.name}
            data-reveal
            style={revealDelay(i)}
            className="card group flex h-full flex-col bg-paper p-6 transition-colors duration-300 hover:border-accent/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="font-mono text-micro tracking-[0.2em] text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1.5 font-serif text-lg leading-snug">
                  {dish.name}
                </h3>
                <p className="mt-1 font-mono text-micro tracking-[0.14em] text-ink-3">
                  {dish.alt}
                </p>
              </div>
              <span className="shrink-0 transition-transform duration-500 group-hover:-rotate-6">
                <DishMark index={i} />
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              {dish.desc}
            </p>
            {dish.note && (
              <p className="mt-auto border-t border-line/70 pt-3 font-mono text-mini leading-relaxed text-accent">
                {dish.note}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-7 max-w-3xl border-t border-line pt-5 font-mono text-micro uppercase leading-relaxed tracking-widest text-ink-3">
        {food.marksNote}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ink-2">{food.allergy}</p>
    </Section>
  );
}
