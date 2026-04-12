/**
 * Justified rows: O(n) greedy packing (same idea as Flickr / SmugMug-style galleries).
 * Each photo contributes aspect ratio rᵢ = width/height. A row with photos S has height
 * H = W / Σ rᵢ so that Σ (H × rᵢ) = W — tiles meet edge-to-edge with no horizontal gap.
 *
 * Greedy rule: extend the current row while adding the next image would keep H ≥ minRowHeight;
 * otherwise close the row (so rows do not become too short / tiles too wide).
 */
export type JustifiedRow = {
  /** Global indices into the original photos array */
  readonly indices: readonly number[];
  /** Row height in px */
  readonly height: number;
};

const DEFAULT_ASPECT = 3 / 2;

/**
 * @param aspects aspects[i] = naturalWidth / naturalHeight (> 0)
 * @param widthPx container inner width
 * @param minRowHeight minimum row height in px (prevents a single ultra-wide row of tiny height)
 * @param maxRowHeight cap for a lone portrait so one image does not force an enormous row
 */
export function buildJustifiedRows(
  aspects: readonly number[],
  widthPx: number,
  minRowHeight: number,
  maxRowHeight = 560,
): JustifiedRow[] {
  const n = aspects.length;
  if (n === 0 || widthPx <= 0) return [];

  const rows: JustifiedRow[] = [];
  let start = 0;

  while (start < n) {
    let end = start + 1;
    let sum = Math.max(aspects[start] ?? DEFAULT_ASPECT, 1e-6);

    while (end < n) {
      const r = Math.max(aspects[end] ?? DEFAULT_ASPECT, 1e-6);
      const nextSum = sum + r;
      const h = widthPx / nextSum;
      if (h < minRowHeight) break;
      sum = nextSum;
      end++;
    }

    const indices: number[] = [];
    for (let i = start; i < end; i++) indices.push(i);

    let height = widthPx / sum;
    if (indices.length === 1 && height > maxRowHeight) {
      height = maxRowHeight;
    }

    rows.push({
      indices,
      height,
    });
    start = end;
  }

  return rows;
}

export function defaultAspectRatio(): number {
  return DEFAULT_ASPECT;
}
