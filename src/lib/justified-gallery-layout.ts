/**
 * SmugMug / Flickr-style justified rows: fixed vertical size per row, variable widths from
 * aspect ratios, row spans `containerWidth` (gutters subtracted).
 */

export type JustifiedRowLayout = {
  readonly indices: readonly number[];
  readonly height: number;
  readonly widths: readonly number[];
};

const DEFAULT_ASPECT = 3 / 2;

function aspectAt(aspects: readonly number[], i: number): number {
  const v = aspects[i];
  if (v !== undefined && Number.isFinite(v) && v > 0.12) return v;
  return DEFAULT_ASPECT;
}

export function computeJustifiedRows(
  aspects: readonly number[],
  containerWidth: number,
  gap: number,
  minRowHeight: number,
  maxRowHeight: number,
): JustifiedRowLayout[] {
  const W = containerWidth;
  const n = aspects.length;
  if (!Number.isFinite(W) || W <= gap || n === 0) return [];

  const rows: JustifiedRowLayout[] = [];
  let i = 0;

  while (i < n) {
    const row: number[] = [];

    while (i < n) {
      row.push(i);
      const sum = row.reduce((s, idx) => s + aspectAt(aspects, idx), 0);
      const h = (W - gap * (row.length - 1)) / sum;
      i += 1;

      if (h < minRowHeight && row.length > 1) {
        row.pop();
        i -= 1;
        break;
      }
      if (h < minRowHeight && row.length === 1) {
        break;
      }
    }

    if (row.length === 0) break;

    const sum = row.reduce((s, idx) => s + aspectAt(aspects, idx), 0);
    let height = (W - gap * (row.length - 1)) / sum;

    if (row.length === 1) {
      height = Math.min(maxRowHeight, Math.max(minRowHeight, height));
    } else {
      height = Math.min(maxRowHeight, height);
    }

    const widths = row.map((idx) => height * aspectAt(aspects, idx));
    const used =
      widths.reduce((a, b) => a + b, 0) + gap * Math.max(0, row.length - 1);

    if (used > W + 0.5) {
      const s = W / used;
      const scaledH = height * s;
      const scaledWidths = widths.map((w) => w * s);
      rows.push({ indices: row, height: scaledH, widths: scaledWidths });
    } else {
      rows.push({ indices: row, height, widths });
    }
  }

  return rows;
}
