/**
 * Stagger for the scroll-reveal. Cards that share a row should start a beat
 * apart; the delay is expressed in rows, not in raw milliseconds, so the
 * rhythm survives a change to the grid.
 *
 *   revealDelay(index, 3, 90) — three columns, 90 ms between columns
 */
export function revealDelay(
  index: number,
  columns = 3,
  stepMs = 90
): { transitionDelay: string } {
  return { transitionDelay: `${(index % columns) * stepMs}ms` };
}
