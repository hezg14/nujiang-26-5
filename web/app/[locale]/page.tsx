import AboutCta from "@/components/home/AboutCta";
import Coffee from "@/components/home/Coffee";
import Food from "@/components/home/Food";
import Hero from "@/components/home/Hero";
import JournalPreview from "@/components/home/JournalPreview";
import Landscape from "@/components/home/Landscape";
import ThemeBand from "@/components/home/ThemeBand";
import Trek from "@/components/home/Trek";
import Visit from "@/components/home/Visit";
import { getDictionary } from "@/lib/i18n";

/**
 * The home page is a running order, nothing else. Each band owns its own
 * layout; this file only decides sequence and which slice of the dictionary
 * each one gets.
 */
export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(params.locale);
  const locale = params.locale;

  return (
    <>
      <Hero hero={dict.hero} locale={locale} />
      <ThemeBand theme={dict.theme} />
      <Coffee coffee={dict.coffee} />
      <Landscape landscape={dict.landscape} />
      <Trek trek={dict.trek} />
      <Food food={dict.food} />
      <Visit dict={dict} />
      <JournalPreview journalCopy={dict.journal} locale={locale} />
      <AboutCta about={dict.about} locale={locale} />
    </>
  );
}
