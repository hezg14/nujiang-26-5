import type { Dict } from "@/lib/types";

/**
 * The prefecture's own two-line tourism brand, set as a dark band. Everything
 * here is quoted rather than written: the slogan, the three routes and the
 * chips all come from official 2025–2026 material (see the source list).
 */
export default function ThemeBand({ theme }: { theme: Dict["theme"] }) {
  return (
    <section data-scheme="dark" className="border-y border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-5 py-14 md:grid-cols-[0.95fr_1.05fr] md:py-16">
        <div>
          <p className="font-mono text-mini uppercase tracking-[0.22em] opacity-50">
            {theme.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
            {theme.brandZh}
          </h2>
          <p className="mt-1 font-mono text-mini uppercase tracking-widest opacity-55">
            {theme.brandEn}
          </p>
          <p className="mt-7 font-serif text-xl">{theme.sloganZh}</p>
          <p className="mt-1 text-sm opacity-65">{theme.sloganEn}</p>
          <p className="mt-6 max-w-md text-sm leading-relaxed opacity-65">
            {theme.lead}
          </p>
        </div>

        <div>
          <p className="font-mono text-mini uppercase tracking-[0.22em] opacity-50">
            {theme.routesTitle}
          </p>
          <ol className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {theme.routes.map((route, i) => (
              <li key={route.en} className="grid grid-cols-[30px_1fr] gap-4 py-4">
                <span className="pt-1 font-mono text-mini opacity-40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-serif text-lg">{route.zh}</span>
                    <span className="font-mono text-micro uppercase tracking-widest opacity-45">
                      {route.en}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed opacity-65">
                    {route.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <ul className="mt-5 flex flex-wrap gap-2">
            {theme.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/20 px-3 py-1 font-mono text-micro uppercase tracking-wider opacity-70"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
