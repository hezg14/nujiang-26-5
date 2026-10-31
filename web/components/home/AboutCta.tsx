import Link from "next/link";
import { path } from "@/lib/paths";
import type { Dict } from "@/lib/types";

/** The one saturated band on the page: where a reader is asked to hire. */
export default function AboutCta({
  about,
  locale,
}: {
  about: Dict["about"];
  locale: string;
}) {
  return (
    <section className="border-t border-line bg-accent text-accent-ink">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center">
        <div>
          <p className="font-mono text-mini uppercase tracking-widest opacity-80">
            {about.eyebrow}
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight">
            {about.title}
          </h2>
        </div>
        <Link
          href={path(locale, "/about")}
          className="rounded-lg bg-accent-ink px-5 py-3 text-sm font-semibold text-accent"
        >
          {about.cta}
        </Link>
      </div>
    </section>
  );
}
