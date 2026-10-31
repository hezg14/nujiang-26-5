"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/lib/locales";

// Deliberately not in the dictionaries: "EN" and "中文" are endonyms, identical
// whichever locale is currently active. Translating them would be a bug.
const LABELS: Record<(typeof locales)[number], string> = { en: "EN", zh: "中文" };

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();

  /** Swaps the first path segment, keeping the reader on the same page. */
  const go = (next: string) => {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
  };

  return (
    <div className="font-mono text-xs tracking-wider">
      {locales.map((code, i) => (
        <span key={code}>
          {i > 0 && <span className="px-1 text-ink-3">/</span>}
          <button
            onClick={() => go(code)}
            aria-label={LABELS[code]}
            aria-current={locale === code ? "true" : undefined}
            className={
              locale === code ? "text-ink" : "text-ink-3 hover:text-ink"
            }
          >
            {LABELS[code]}
          </button>
        </span>
      ))}
    </div>
  );
}
