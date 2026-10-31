import Image from "next/image";
import Link from "next/link";
import { path } from "@/lib/paths";
import { revealDelay } from "@/lib/reveal";
import type { JournalArticle } from "@/lib/journal";

const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * The same article tile is used on the home strip and the journal index, so it
 * lives once. `heading` changes only the outline level — the index needs an h2,
 * the home page a h3 under its section title.
 */
export default function JournalCard({
  article,
  locale,
  index,
  heading = "h3",
}: {
  article: JournalArticle;
  locale: string;
  index?: number;
  heading?: "h2" | "h3";
}) {
  const copy = article[locale === "zh" ? "zh" : "en"];
  const Heading = heading;

  return (
    <article
      className="group"
      data-reveal
      style={index === undefined ? undefined : revealDelay(index)}
    >
      <Link href={path(locale, `/journal/${article.slug}`)} className="block">
        <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-line">
          <Image
            src={article.image}
            alt={copy.title}
            fill
            sizes={CARD_SIZES}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-4 flex items-center gap-3 font-mono text-micro uppercase tracking-widest text-ink-3">
          <time dateTime={article.date}>{article.date}</time>
          <span aria-hidden>·</span>
          <span>{article.reading}</span>
        </div>
        <Heading className="mt-2 font-serif text-xl leading-snug group-hover:text-accent">
          {copy.title}
        </Heading>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">{copy.dek}</p>
      </Link>
    </article>
  );
}
