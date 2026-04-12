/**
 * SmugMug / Flickr-style justified rows: uniform row height, variable widths from
 * aspect ratios. Completed rows span the full container width; the **last** row is
 * left as-is (no scale-up to fill), so it may be shorter than the container.
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

/** Integer widths ≥1 that sum exactly to targetSum. */
function integerWidthsProportional(
  floatWidths: readonly number[],
  targetSum: number,
): number[] {
  const n = floatWidths.length;
  if (n === 0) return [];
  const sum = floatWidths.reduce((a, b) => a + b, 0);
  if (sum <= 0 || targetSum < n) {
    const base = Math.max(1, Math.floor(targetSum / n));
    const out = Array.from({ length: n }, () => base);
    let rem = targetSum - base * n;
    let i = 0;
    while (rem > 0) {
      out[i % n] += 1;
      rem--;
      i++;
    }
    return out;
  }
  const raw = floatWidths.map((w) => (w / sum) * targetSum);
  const floors = raw.map((x) => Math.max(1, Math.floor(x)));
  let s = floors.reduce((a, b) => a + b, 0);
  let rem = targetSum - s;
  const order = raw.map((x, i) => ({ i, frac: x - floors[i]! }));
  order.sort((a, b) => b.frac - a.frac);
  const out = [...floors];
  let k = 0;
  while (rem > 0 && k < order.length) {
    out[order[k]!.i] += 1;
    rem--;
    k++;
  }
  while (rem < 0) {
    let j = out.findIndex((x) => x > 1);
    if (j < 0) break;
    out[j] -= 1;
    rem++;
  }
  return out;
}

export function computeJustifiedRows(
  aspects: readonly number[],
  containerWidth: number,
  gap: number,
  minRowHeight: number,
  maxRowHeight: number,
  /** Cap thumbnails per row (e.g. 4). */
  maxItemsPerRow: number,
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
      const sumA = row.reduce((s, idx) => s + aspectAt(aspects, idx), 0);
      const h = (W - gap * (row.length - 1)) / sumA;
      i += 1;

      if (h < minRowHeight && row.length > 1) {
        row.pop();
        i -= 1;
        break;
      }
      if (h < minRowHeight && row.length === 1) {
        break;
      }
      if (row.length >= maxItemsPerRow) {
        break;
      }
    }

    if (row.length === 0) break;

    const gapsTotal = gap * Math.max(0, row.length - 1);
    const targetContent = Math.max(1, Math.floor(W) - gapsTotal);
    const isLastRow = i >= n;

    if (row.length === 1) {
      const idx = row[0]!;
      const a = aspectAt(aspects, idx);
      if (isLastRow) {
        const wNatural = maxRowHeight * a;
        let w = Math.min(targetContent, wNatural);
        let h = w / a;
        h = Math.min(maxRowHeight, Math.max(minRowHeight, h));
        w = Math.min(targetContent, h * a);
        const iw = Math.max(1, Math.round(w));
        const rowHeight = Math.min(
          maxRowHeight,
          Math.max(minRowHeight, iw / a),
        );
        rows.push({ indices: row, height: rowHeight, widths: [iw] });
      } else {
        let h = targetContent / a;
        h = Math.min(maxRowHeight, Math.max(minRowHeight, h));
        const widths = integerWidthsProportional([targetContent], targetContent);
        rows.push({ indices: row, height: h, widths });
      }
      continue;
    }

    const sumA = row.reduce((s, idx) => s + aspectAt(aspects, idx), 0);
    let hIdeal = targetContent / sumA;
    let h = Math.min(maxRowHeight, hIdeal);
    h = Math.max(minRowHeight, h);

    let floatWidths = row.map((idx) => h * aspectAt(aspects, idx));
    let sumW = floatWidths.reduce((a, b) => a + b, 0);

    if (!isLastRow && sumW < targetContent - 0.5) {
      const scale = targetContent / sumW;
      floatWidths = floatWidths.map((w) => w * scale);
      h *= scale;
      sumW = floatWidths.reduce((a, b) => a + b, 0);
    } else if (sumW > targetContent + 0.5) {
      const scale = targetContent / sumW;
      floatWidths = floatWidths.map((w) => w * scale);
      h *= scale;
      sumW = floatWidths.reduce((a, b) => a + b, 0);
    }

    const tc = isLastRow
      ? Math.min(
          targetContent,
          Math.max(row.length, Math.floor(sumW + 0.5)),
        )
      : Math.max(1, Math.floor(targetContent));
    const intWidths = integerWidthsProportional(floatWidths, tc);
    const heightsFromCells = row.map((idx, wi) => {
      const iw = intWidths[wi] ?? 1;
      return iw / aspectAt(aspects, idx);
    });
    const rowHeight = Math.max(
      minRowHeight,
      Math.max(...heightsFromCells, 1e-6),
    );

    rows.push({ indices: row, height: rowHeight, widths: intWidths });
  }

  return rows;
}
