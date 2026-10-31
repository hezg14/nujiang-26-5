import JournalCard from "@/components/JournalCard";
import { getDictionary } from "@/lib/i18n";
import { journal } from "@/lib/journal";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(params.locale);
  return {
    title: dict.journal.title,
    description: dict.journal.lead,
    alternates: {
      canonical: `/${params.locale}/journal`,
      languages: { en: "/en/journal", zh: "/zh/journal" },
    },
  };
}

export default async function JournalIndex({
  params,
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(params.locale);

  return (
    <div className="mx-auto max-w-content px-5 py-20">
      <p className="eyebrow">{dict.journal.eyebrow}</p>
      <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight md:text-5xl">
        {dict.journal.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
        {dict.journal.lead}
      </p>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {journal.map((article, i) => (
          <JournalCard
            key={article.slug}
            article={article}
            locale={params.locale}
            index={i}
            heading="h2"
          />
        ))}
      </div>
    </div>
  );
}
