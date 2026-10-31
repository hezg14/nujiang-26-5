/**
 * Eyebrow + title + standfirst, the opening of every section.
 * Revealed as one block so a heading never arrives in three separate beats.
 */
export default function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <div data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl leading-relaxed text-ink-2">{lead}</p>
    </div>
  );
}
