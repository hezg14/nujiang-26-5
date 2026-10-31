import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import { revealDelay } from "@/lib/reveal";
import type { Dict } from "@/lib/types";

export default function Trek({ trek }: { trek: Dict["trek"] }) {
  return (
    <Section id="trek">
      <SectionHead eyebrow={trek.eyebrow} title={trek.title} lead={trek.lead} />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {trek.routes.map((route, i) => (
          <div
            key={route.name}
            data-reveal
            style={revealDelay(i, 2, 90)}
            className="card flex h-full flex-col p-6 transition-colors duration-300 hover:border-ink/25"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="font-mono text-micro tracking-[0.2em] text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1.5 font-serif text-xl leading-snug">
                  {route.name}
                </h3>
              </div>
              <span className="shrink-0 rounded-full border border-accent/30 px-2.5 py-1 font-mono text-micro uppercase tracking-wider text-accent">
                {route.difficulty}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-3 font-mono text-xs text-ink-3">
              <span>{route.distance}</span>
              <span aria-hidden className="text-ink-3/60">
                /
              </span>
              <span>{route.time}</span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              {route.note}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 rounded-xl border border-line bg-paper-2 p-4 text-sm leading-relaxed text-ink-2">
        {trek.safety}
      </p>
    </Section>
  );
}
