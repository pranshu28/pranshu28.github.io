#!/usr/bin/env python3
"""Exit 0 iff `public/photos/frames/` filenames match `FRAME_PHOTOS` in photo-catalog-frames.ts."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FRAMES_DIR = ROOT / "public" / "photos" / "frames"
CATALOG = ROOT / "src" / "data" / "photo-catalog-frames.ts"


def main() -> None:
    text = CATALOG.read_text(encoding="utf-8")
    listed = sorted(
        re.findall(r'src:\s*"/photos/frames/([^"]+)"', text),
    )
    on_disk = sorted(
        p.name
        for p in FRAMES_DIR.iterdir()
        if p.is_file() and p.name != ".DS_Store"
    )

    only_catalog = sorted(set(listed) - set(on_disk))
    only_disk = sorted(set(on_disk) - set(listed))

    if only_catalog or only_disk:
        if only_catalog:
            print("In catalog but missing on disk:", file=sys.stderr)
            for x in only_catalog:
                print(f"  {x}", file=sys.stderr)
        if only_disk:
            print("On disk but not in catalog:", file=sys.stderr)
            for x in only_disk:
                print(f"  {x}", file=sys.stderr)
        sys.exit(1)

    print(f"OK: {len(listed)} frames in sync.")


if __name__ == "__main__":
    main()
