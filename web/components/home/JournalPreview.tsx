import Link from "next/link";
import JournalCard from "@/components/JournalCard";
import Section from "@/components/ui/Section";
import { journal } from "@/lib/journal";
import { path } from "@/lib/paths";
import type { Dict } from "@/lib/types";

export default function JournalPreview({
  journalCopy,
  locale,
}: {
  journalCopy: Dict["journal"];
  locale: string;
}) {
  return (
    <Section id="journal">
      <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
        <div>
          <p className="eyebrow">{journalCopy.eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
            {journalCopy.title}
          </h2>
        </div>
        <Link
          href={path(locale, "/journal")}
          className="font-mono text-micro uppercase tracking-widest text-accent hover:opacity-80"
        >
          {journalCopy.back} →
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {journal.map((article, i) => (
          <JournalCard
            key={article.slug}
            article={article}
            locale={locale}
            index={i}
          />
        ))}
      </div>
    </Section>
  );
}
