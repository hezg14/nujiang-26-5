import type { ReactNode } from "react";

/**
 * A numbered chapter of the about page: index, heading, body. Used four times,
 * so it is worth a component instead of four copies of the same three divs.
 */
export default function Chapter({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-micro text-accent">{index}</span>
        <h2 className="font-serif text-2xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}
