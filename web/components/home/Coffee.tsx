import Image from "next/image";
import { revealDelay } from "@/lib/reveal";
import type { Dict } from "@/lib/types";

/** Coffee industry figures. Numbers are quoted; the note under them says from where. */
function IndustryStrip({ coffee }: { coffee: Dict["coffee"] }) {
  return (
    <>
      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
        {coffee.industry.map((stat, i) => (
          <div
            key={stat.label}
            data-reveal
            style={revealDelay(i, 4, 80)}
            className="bg-paper-2 p-6 transition-colors duration-300 hover:bg-paper"
          >
            <div className="font-serif text-4xl leading-none tracking-tight text-accent tabular-nums">
              {stat.value}
            </div>
            <div className="label mt-3 leading-relaxed tracking-[0.14em]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-micro leading-relaxed tracking-wide text-ink-3">
        {coffee.industryNote}
      </p>
    </>
  );
}

/** 咖旅融合 — the estates and cafés visitors can actually reach. */
function TourismGrid({ coffee }: { coffee: Dict["coffee"] }) {
  return (
    <div className="mt-16 border-t border-line pt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <h3 className="font-serif text-2xl">{coffee.tourismTitle}</h3>
        <p className="max-w-xl text-sm leading-relaxed text-ink-2 md:text-right">
          {coffee.tourismLead}
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {coffee.tourism.map((spot) => (
          <div key={spot.name} className="card p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h4 className="font-serif text-lg">{spot.name}</h4>
              <span className="font-mono text-micro uppercase tracking-widest text-ink-3">
                {spot.where}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">{spot.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VarietalsAndProcess({ coffee }: { coffee: Dict["coffee"] }) {
  return (
    <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
      <div>
        <h3 className="font-serif text-2xl">{coffee.varietalsTitle}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {coffee.varietals.map((varietal) => (
            <li key={varietal} className="pill">
              {varietal}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-serif text-2xl">{coffee.processTitle}</h3>
        <ol className="mt-4 space-y-4">
          {coffee.process.map((step, i) => (
            <li key={step.step} className="grid grid-cols-[28px_1fr] gap-3">
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="text-sm font-semibold">{step.step}</div>
                <div className="text-sm leading-relaxed text-ink-2">
                  {step.desc}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/**
 * Coffee is the spine of the whole site, so it gets the longest section: claim,
 * specification, the industry numbers, the estates, then the agronomy.
 */
export default function Coffee({ coffee }: { coffee: Dict["coffee"] }) {
  return (
    <section id="coffee" className="border-t border-line">
      <div className="mx-auto max-w-content px-5 py-24">
        <p className="eyebrow" data-reveal>
          {coffee.eyebrow}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div data-reveal>
            <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">
              {coffee.title}
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-ink-2">
              {coffee.lead}
            </p>

            <div className="mt-8 border-l-2 border-accent pl-5">
              <p className="font-serif text-2xl leading-snug text-ink md:text-[1.75rem]">
                {coffee.statement}
              </p>
              <p className="mt-2 font-mono text-micro uppercase tracking-[0.2em] text-ink-3">
                {coffee.statementNote}
              </p>
            </div>

            <dl className="rules mt-10">
              {coffee.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-[104px_1fr] gap-4 py-3"
                >
                  <dt className="font-mono text-mini uppercase tracking-widest text-ink-3">
                    {spec.label}
                  </dt>
                  <dd className="text-sm text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure data-reveal style={{ transitionDelay: "120ms" }}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/coffee-cherry.jpg"
                alt={coffee.imageCaption}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-[900ms] hover:scale-[1.03]"
              />
            </div>
            <figcaption className="mt-3 font-mono text-micro uppercase leading-relaxed tracking-widest text-ink-3">
              {coffee.imageCaption}
            </figcaption>
          </figure>
        </div>

        <IndustryStrip coffee={coffee} />
        <TourismGrid coffee={coffee} />
        <VarietalsAndProcess coffee={coffee} />
      </div>

      {/* full-bleed texture band — the bean, not a postcard */}
      <div
        data-scheme="dark"
        className="relative h-[200px] overflow-hidden md:h-[260px]"
      >
        <Image
          src="/images/coffee-beans.jpg"
          alt={coffee.bandAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 mx-auto flex max-w-content flex-col justify-center px-5">
          <p className="max-w-lg font-serif text-2xl leading-snug text-white md:text-3xl">
            {coffee.bandLine}
          </p>
          <p className="mt-3 font-mono text-micro uppercase tracking-[0.2em] text-white/60">
            {coffee.bandCaption}
          </p>
        </div>
      </div>
    </section>
  );
}
