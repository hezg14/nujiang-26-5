import Image from "next/image";
import Link from "next/link";
import { path } from "@/lib/paths";
import type { Dict } from "@/lib/types";

/**
 * Split editorial opening: type on the left, one vertical plate on the right.
 * Not a full-bleed banner — the photograph is evidence, not wallpaper.
 */
export default function Hero({
  hero,
  locale,
}: {
  hero: Dict["hero"];
  locale: string;
}) {
  return (
    <section className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-5 pt-14 pb-20 md:grid-cols-2 md:pt-24 md:pb-28">
      <div>
        <p className="eyebrow hero-line">{hero.origin}</p>
        <h1
          className="hero-line mt-5 font-serif text-[clamp(2.6rem,6.4vw,4.6rem)] font-semibold leading-[1.02] tracking-tight"
          style={{ animationDelay: "90ms" }}
        >
          {hero.title}
        </h1>
        <p
          className="hero-line mt-6 max-w-md text-base leading-relaxed text-ink-2 md:text-lg"
          style={{ animationDelay: "180ms" }}
        >
          {hero.subtitle}
        </p>
        <div
          className="hero-line mt-8 flex flex-wrap gap-3"
          style={{ animationDelay: "270ms" }}
        >
          <Link href={path(locale, "#coffee")} className="btn-primary">
            {hero.ctaPrimary}
          </Link>
          <Link href={path(locale, "#visit")} className="btn-ghost">
            {hero.ctaSecondary}
          </Link>
        </div>
      </div>

      <div className="hero-plate relative aspect-[4/5] overflow-hidden rounded-2xl">
        <Image
          src="/images/nujiang-river.jpg"
          alt={hero.imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <p className="absolute bottom-3 left-3 rounded-sm bg-black/55 px-2.5 py-1 font-mono text-micro uppercase tracking-[0.18em] text-white/90 backdrop-blur-[2px]">
          {hero.imageTag}
        </p>
      </div>
    </section>
  );
}
