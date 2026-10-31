import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, toLocale } from "@/lib/i18n";
import { getArticle, journalSlugs } from "@/lib/journal";
import { path } from "@/lib/paths";
import { AUTHOR, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return journalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) return {};

  const copy = article[toLocale(params.locale)];
  return {
    title: copy.title,
    description: copy.dek,
    alternates: {
      canonical: `/${params.locale}/journal/${article.slug}`,
      languages: {
        en: `/en/journal/${article.slug}`,
        zh: `/zh/journal/${article.slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: copy.title,
      description: copy.dek,
      publishedTime: article.date,
      images: [article.image],
    },
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const dict = await getDictionary(params.locale);
  const article = getArticle(params.slug);
  if (!article) notFound();

  const locale = params.locale;
  const copy = article[toLocale(locale)];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: copy.title,
    description: copy.dek,
    datePublished: article.date,
    inLanguage: toLocale(locale) === "zh" ? "zh-CN" : "en",
    image: `${SITE_URL}${article.image}`,
    author: { "@type": "Person", name: AUTHOR },
    publisher: { "@type": "Organization", name: dict.brand.name },
    mainEntityOfPage: `${SITE_URL}${path(locale, `/journal/${article.slug}`)}`,
  };

  return (
    <article className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mx-auto max-w-3xl px-5 pt-16">
        <Link
          href={path(locale, "/journal")}
          className="font-mono text-micro uppercase tracking-widest text-ink-3 hover:text-ink"
        >
          ← {dict.journal.back}
        </Link>
        <div className="mt-6 flex items-center gap-3 font-mono text-micro uppercase tracking-widest text-ink-3">
          <time dateTime={article.date}>{article.date}</time>
          <span aria-hidden>·</span>
          <span>{article.reading}</span>
        </div>
        <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight md:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-2">{copy.dek}</p>
      </header>

      <figure className="mx-auto mt-12 max-w-content px-5">
        <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-line">
          <Image
            src={article.image}
            alt={copy.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="mt-3 font-mono text-micro uppercase tracking-widest text-ink-3">
          {article.imageCaption}
        </figcaption>
      </figure>

      <div className="mx-auto mt-14 max-w-3xl px-5">
        {copy.sections.map((section, i) => (
          <section key={section.h} className={i > 0 ? "mt-12" : ""}>
            <h2 className="font-serif text-2xl leading-snug md:text-[1.7rem]">
              {section.h}
            </h2>
            {section.p.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-[1.85] text-ink-2">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <footer className="mt-16 border-t border-line pt-6">
          <p className="font-mono text-micro uppercase tracking-widest text-ink-3">
            {dict.journal.sourcesLabel}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">
            {dict.footer.disclaimer}
          </p>
          <Link
            href={path(locale)}
            className="mt-8 inline-block font-mono text-micro uppercase tracking-widest text-accent hover:opacity-80"
          >
            {dict.journal.backHome} →
          </Link>
        </footer>
      </div>
    </article>
  );
}
