/**
 * Hand-drawn ingredient marks for the food section.
 *
 * The dishes here (lacquer-oil chicken, stone-slab flatbread, pipa pork) are
 * specific to Nu and Lisu kitchens and do not exist in any openly licensed
 * photo library. Rather than caption a mainland-China dish as something it is
 * not, the table is drawn: one line mark per dish, in the same specimen
 * language as the rest of the site.
 */

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.35,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function LacquerChicken() {
  return (
    <g {...common}>
      <path d="M10 23h28v7.5A7.5 7.5 0 0 1 30.5 38h-13A7.5 7.5 0 0 1 10 30.5V23Z" />
      <path d="M8.5 23h31" />
      <path d="M24 23v-3.2" />
      <path d="M7 26.5H4.2M41 26.5h2.8" />
      <path d="M18 17.5c0-2.2 3-2.2 3-4.4M26 17.5c0-2.2 3-2.2 3-4.4" />
    </g>
  );
}

function Ham() {
  return (
    <g {...common}>
      <path d="M20.5 13.4c5-2.6 10.5 1.4 10.5 7.6 0 4.6-2.2 7.4-3.4 10.6-1.2 3.4-3.2 6-6.6 6s-5.6-2.6-5.6-6.2 2.6-5.2 2.6-9.6c0-4.2-1-6.6 2.5-8.4Z" />
      <path d="M27.2 13.8 32.4 10.6" />
      <circle cx="34" cy="9.7" r="1.9" />
      <path d="M18.2 24.6c3.4 1.2 7.2 1.2 10.4 0" />
    </g>
  );
}

function StoneSlab() {
  return (
    <g {...common}>
      <path d="M6.5 31.5 35 25.8l6.5 4-28.6 6.4Z" />
      <ellipse cx="24" cy="22.6" rx="8.6" ry="3.6" />
      <path d="M24 19v-2.4" />
      <path d="M13 38.5c0 2 2 2 2 4M24 38.5c0 2 2 2 2 4M35 38.5c0 2 2 2 2 4" />
    </g>
  );
}

function HandRice() {
  return (
    <g {...common}>
      <path d="M7.5 27.5c3.4-11.4 16.6-17.4 30-15.4-1.6 13.2-12.6 22.6-25.6 21-3-.4-4.4-2.6-4.4-5.6Z" />
      <path d="M16.5 28.2c1.6-5 5-7.2 8.4-7.2s6.8 2.2 8.4 7.2" />
      <circle cx="20.5" cy="25" r=".9" />
      <circle cx="25" cy="23.4" r=".9" />
      <circle cx="29" cy="25.2" r=".9" />
    </g>
  );
}

function PipaPork() {
  return (
    <g {...common}>
      <path d="M14.5 15.5h19v17.8a4 4 0 0 1-4 4h-11a4 4 0 0 1-4-4Z" />
      <path d="M14.5 21.5h19M14.5 27.5h19" />
      <path d="M24 15.5V9h6.4" />
    </g>
  );
}

function Gula() {
  return (
    <g {...common}>
      <path d="M18.5 21.5h11v11.8a3.6 3.6 0 0 1-3.6 3.6h-3.8a3.6 3.6 0 0 1-3.6-3.6Z" />
      <path d="M21 21.5v-3.6h6v3.6" />
      <path d="M18.5 24.5 14 21.8" />
      <path d="M24 15.4c1.2-1.8.2-3.4 1-5.2 2.4 2.2 4 4.6 1.4 7.2" />
    </g>
  );
}

const MARKS = [LacquerChicken, Ham, StoneSlab, HandRice, PipaPork, Gula];

export default function DishMark({ index }: { index: number }) {
  const Mark = MARKS[index % MARKS.length];
  return (
    <svg
      viewBox="0 0 48 48"
      width="58"
      height="58"
      aria-hidden="true"
      className="text-accent"
    >
      <Mark />
    </svg>
  );
}
