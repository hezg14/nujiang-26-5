import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealObserver from "@/components/RevealObserver";
import { getDictionary, isLocale, locales, toLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: `%s | ${dict.brand.project}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${params.locale}`,
      languages: { en: "/en", zh: "/zh" },
    },
    openGraph: {
      type: "website",
      siteName: dict.brand.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: toLocale(params.locale) === "zh" ? "zh_CN" : "en_US",
      images: [
        {
          url: "/images/og.jpg",
          width: 1200,
          height: 630,
          alt: dict.hero.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/images/og.jpg"],
    },
    icons: { icon: "/favicon.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const dict = await getDictionary(params.locale);
  const lang = toLocale(params.locale) === "zh" ? "zh-CN" : "en";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: dict.brand.name,
    inLanguage: lang,
    description: dict.meta.description,
  };

  return (
    <html lang={lang}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <RevealObserver />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-ink"
        >
          Skip to content · 跳到正文
        </a>
        <SiteHeader dict={dict} locale={params.locale} />
        <main id="main">{children}</main>
        <SiteFooter dict={dict} />
      </body>
    </html>
  );
}
