import type { ReactNode } from "react";

/**
 * The vertical rhythm of the page: every band is full-bleed, the content inside
 * is capped at one measure. Keeping both here is what stops the six sections
 * from drifting apart by a few pixels each time one of them is edited.
 */
export default function Section({
  id,
  tone = "paper",
  children,
}: {
  id?: string;
  /** "alt" paints the warmer paper tone — used to alternate the page. */
  tone?: "paper" | "alt";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`border-t border-line ${tone === "alt" ? "bg-paper-2" : ""}`}
    >
      <div className="mx-auto max-w-content px-5 py-24">{children}</div>
    </section>
  );
}
