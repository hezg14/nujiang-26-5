/**
 * Kongque Shan, drawn as a measured cross-section instead of photographed.
 *
 * No openly licensed photograph of the peak exists: Commons has nothing under
 * 孔雀山 / Kongque Shan, and the nearest Biluo shots are either a different
 * section of the range (Lanping, well south of the peak) or a roadside
 * snapshot. Drawing what actually makes the mountain specific is more useful
 * than captioning someone else's peak — 4,400 m summit, 3,882 m pass on the
 * old Degong road, the lake basin at about 3,800 m.
 *
 * Geometry: a 360 × 270 frame fills the 4:3 card. Elevation is linear —
 * 2,000 m sits at y=244, 4,400 m at y=80 — so the profile reads as a profile.
 * The top margin is left empty on purpose: the card's own tag sits there.
 */

const INK = "#efe7d8";
const MUTED = "#a2957f";
const ACCENT = "#d6806c";
const GRID = "rgba(239,231,216,0.09)";

const TICKS = [2000, 3000, 4000];

/** 2,000 m → y 244; 4,400 m → y 80. No vertical exaggeration. */
const y = (metres: number) => 244 - ((metres - 2000) / 2400) * 164;

export default function TerrainPlate({
  peak,
  summit,
  pass,
  passLabel,
  lakes,
  scaleLabel,
  axisLabel,
}: {
  peak: string;
  summit: string;
  pass: string;
  passLabel: string;
  lakes: string;
  /** e.g. "10 km" — what the scale bar stands for. */
  scaleLabel: string;
  /** e.g. "metres" — what the left axis counts. */
  axisLabel: string;
}) {
  return (
    <svg
      viewBox="0 0 360 270"
      className="h-full w-full"
      role="img"
      aria-label={`${peak} — ${summit} summit, ${pass} ${passLabel}, ${lakes}`}
    >
      {TICKS.map((metres) => (
        <g key={metres}>
          <line
            x1="40"
            y1={y(metres)}
            x2="352"
            y2={y(metres)}
            stroke={GRID}
            strokeWidth="0.7"
            strokeDasharray="1 6"
          />
          <text
            x="36"
            y={y(metres) + 2.5}
            fontSize="7.5"
            textAnchor="end"
            fill={MUTED}
            fontFamily="monospace"
          >
            {metres.toLocaleString("en-US")}
          </text>
        </g>
      ))}

      {/* the next spur back, held low so the main ridge reads first */}
      <path
        d={`M40 ${y(2400)} L74 ${y(2620)} L104 ${y(2500)} L132 ${y(2820)} L158 ${y(
          3000
        )} L186 ${y(2860)} L214 ${y(2990)} L242 ${y(2840)} L272 ${y(2960)} L302 ${y(
          2830
        )} L330 ${y(2950)} L352 ${y(2860)} L352 244 L40 244 Z`}
        fill="rgba(239,231,216,0.045)"
      />

      {/* the ridge: valley, summit 4,400, saddle, pass 3,882, far shoulder */}
      <path
        d={`M40 ${y(2250)} L64 ${y(2450)} L86 ${y(2300)} L106 ${y(3050)} L124 ${y(
          3480
        )} L140 ${y(3900)} L150 80 L166 ${y(4150)} L182 ${y(3800)} L200 ${y(
          3860
        )} L218 ${y(4020)} L236 ${y(3760)} L250 ${y(3882)} L266 ${y(3700)} L288 ${y(
          3900
        )} L310 ${y(3620)} L334 ${y(3380)} L352 ${y(3150)} L352 244 L40 244 Z`}
        fill="rgba(239,231,216,0.10)"
        stroke={INK}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />

      {/* summit — plumb line, crosshair, then the number that matters */}
      <line
        x1="150"
        y1="80"
        x2="150"
        y2="244"
        stroke={ACCENT}
        strokeWidth="0.8"
        strokeDasharray="2 5"
        opacity="0.65"
      />
      <circle cx="150" cy="80" r="2.8" fill={ACCENT} />
      <text
        x="142"
        y="76"
        fontSize="11"
        textAnchor="end"
        fill={INK}
        fontFamily="monospace"
      >
        {summit}
      </text>
      <text
        x="142"
        y="88"
        fontSize="8"
        textAnchor="end"
        fill={MUTED}
        fontFamily="monospace"
      >
        {peak}
      </text>

      {/* the pass the old road crosses */}
      <line
        x1="250"
        y1={y(3882)}
        x2="250"
        y2="244"
        stroke={MUTED}
        strokeWidth="0.7"
        strokeDasharray="2 5"
        opacity="0.5"
      />
      <circle
        cx="250"
        cy={y(3882)}
        r="2.4"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.1"
      />
      <text x="258" y={y(3882) - 8} fontSize="9" fill={INK} fontFamily="monospace">
        {pass}
      </text>
      <text
        x="258"
        y={y(3882) + 3}
        fontSize="7.5"
        fill={MUTED}
        fontFamily="monospace"
      >
        {passLabel}
      </text>

      {/* lake basin strung along the saddle */}
      {[
        { cx: 196, cy: y(3800), rx: 5.6, ry: 1.9 },
        { cx: 208, cy: y(3760), rx: 4.2, ry: 1.6 },
        { cx: 188, cy: y(3740), rx: 3.2, ry: 1.3 },
      ].map((lake, i) => (
        <ellipse key={i} {...lake} fill="#8fa3a3" opacity={0.85 - i * 0.14} />
      ))}
      <text x="176" y={y(3560)} fontSize="7.5" fill={MUTED} fontFamily="monospace">
        {lakes}
      </text>

      {/* axis caption, then the scale bar */}
      <text x="34" y="66" fontSize="7" fill={MUTED} fontFamily="monospace">
        {axisLabel}
      </text>
      <line x1="40" y1="262" x2="112" y2="262" stroke={MUTED} strokeWidth="0.7" />
      {[40, 76, 112].map((tick) => (
        <line
          key={tick}
          x1={tick}
          y1="258"
          x2={tick}
          y2="266"
          stroke={MUTED}
          strokeWidth="0.7"
        />
      ))}
      <text x="118" y="265" fontSize="7.5" fill={MUTED} fontFamily="monospace">
        {scaleLabel}
      </text>
    </svg>
  );
}
