import { COORDS } from "@/lib/site";
import type { Dict } from "@/lib/types";

function SourceList({ sources }: { sources: Dict["footer"]["sources"] }) {
  return (
    <ul className="mt-4 columns-1 gap-8 text-[12px] leading-snug text-ink-2 sm:columns-2">
      {sources.map((source) => (
        <li key={source.href} className="mb-2 break-inside-avoid last:mb-0">
          <a
            href={source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line decoration-1 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent"
          >
            {source.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function SiteFooter({ dict }: { dict: Dict }) {
  return (
    <footer className="mt-24 border-t border-line bg-paper-2">
      <div className="mx-auto max-w-content px-5 py-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="font-serif text-2xl">
              {dict.brand.name}{" "}
              <span className="font-mono text-sm text-ink-3">
                {dict.brand.chinese}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-2">
              {dict.footer.tagline}
            </p>
            <p className="mt-6 font-mono text-micro uppercase tracking-[0.2em] text-ink-3">
              {COORDS} · Yunnan, China
            </p>
            <p className="mt-2 font-mono text-micro uppercase tracking-[0.18em] text-accent">
              {dict.footer.project}
            </p>
            <p className="mt-4 font-mono text-mini text-ink-3">
              {dict.footer.builtBy}
            </p>
          </div>

          <div className="md:col-span-5">
            <h3 className="eyebrow">{dict.footer.sourcesTitle}</h3>
            <SourceList sources={dict.footer.sources} />
          </div>

          <div className="text-mini leading-relaxed text-ink-3 md:col-span-3">
            <p>{dict.footer.builtWith}</p>
            <p className="mt-3">{dict.footer.credits}</p>
            <p className="mt-3">{dict.footer.disclaimer}</p>
            <p className="mt-4">
              © {new Date().getFullYear()} {dict.brand.name}.{" "}
              {dict.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
