import Chapter from "@/components/ui/Chapter";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(params.locale);
  return { title: dict.about.title, description: dict.about.lead };
}

/**
 * The hire-me page: why the site exists, the rule it follows, what it is built
 * on, and what it produced. Written as four numbered chapters so the argument
 * can be read in order rather than skimmed as cards.
 */
export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(params.locale);
  const about = dict.about;

  return (
    <div className="pb-24">
      <header className="mx-auto max-w-content px-5 pt-16 md:pt-20">
        <p className="eyebrow">{about.eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.06] tracking-tight md:text-6xl">
          {about.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
          {about.lead}
        </p>
      </header>

      <div className="mx-auto mt-16 max-w-content px-5">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 border-t border-line pt-10 md:grid-cols-2">
          <Chapter index="01" title={about.problem.title}>
            <p className="mt-4 leading-relaxed text-ink-2">{about.problem.body}</p>
          </Chapter>
          <Chapter index="02" title={about.approach.title}>
            <p className="mt-4 leading-relaxed text-ink-2">
              {about.approach.body}
            </p>
          </Chapter>
        </div>

        {/* The rule that governs the whole site — a pull quote, not another card */}
        <div className="mt-14 border-l-2 border-accent pl-6 md:pl-8">
          <h2 className="font-serif text-2xl leading-snug">
            {about.imageRule.title}
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-2">
            {about.imageRule.body}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-10 border-t border-line pt-10 md:grid-cols-2">
          <Chapter index="03" title={about.stack.title}>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {about.stack.items.map((item, i) => (
                <li key={item} className="flex items-baseline gap-4 py-2.5">
                  <span className="font-mono text-micro text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-ink-2">{item}</span>
                </li>
              ))}
            </ul>
          </Chapter>
          <Chapter index="04" title={about.result.title}>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {about.result.items.map((item) => (
                <li key={item} className="flex items-baseline gap-3 py-2.5">
                  <span className="text-accent">→</span>
                  <span className="text-sm text-ink-2">{item}</span>
                </li>
              ))}
            </ul>
          </Chapter>
        </div>
      </div>

      <section
        data-scheme="dark"
        className="mt-20 border-y border-line bg-ink text-paper"
      >
        <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-8 px-5 py-14 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-micro uppercase tracking-[0.22em] opacity-50">
              {dict.brand.name} · {dict.brand.tagline}
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight">
              {about.ctaTitle}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed opacity-65">
              {about.ctaNote}
            </p>
            <p className="mt-5 font-mono text-micro uppercase tracking-[0.18em] opacity-40">
              {dict.footer.builtBy}
            </p>
          </div>
          <a
            href={about.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group shrink-0"
          >
            {about.cta}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
