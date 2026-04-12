#!/usr/bin/env python3
"""One-off: copy Frame/* into public/photos/frames/ with stable URL-safe names."""
from __future__ import annotations

import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FRAME = ROOT / "Frame"
OUT = ROOT / "public" / "photos" / "frames"


def public_name(path: Path) -> str | None:
    name = path.name
    if name.startswith("."):
        return None
    if name.endswith(".avif"):
        return None
    stem, suf = path.stem, path.suffix
    ext = suf.lower()

    if ext in (".mp4", ".mov", ".m4v"):
        return None

    m_date = re.match(r"^(\d{8})_(\d{6})\.(jpe?g)$", name, re.I)
    if m_date:
        e = m_date.group(3).lower()
        if e == "jpeg":
            e = "jpg"
        return f"{m_date.group(1)}-{m_date.group(2)}.{e}"

    if ext in (".heic",):
        m = re.match(r"^IMG_(\d+)$", stem, re.I)
        return f"img-{m.group(1)}.jpg" if m else f"{stem.lower().replace('_', '-')}.jpg"

    uuid_re = re.compile(
        r"^([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12})(-\d+)?\.(jpe?g)$",
        re.I,
    )
    if uuid_re.match(name):
        b = name.rsplit(".", 1)[0].lower()
        e = name.rsplit(".", 1)[1].lower()
        if e == "jpeg":
            e = "jpg"
        return f"{b}.{e}"

    if re.match(r"^[A-Z]{4}\d+\.jpe?g$", name, re.I):
        return name.lower()

    if stem.upper().startswith("PXL_"):
        slug = stem.lower().replace("_", "-")
        return f"{slug}.jpg"

    m = re.match(r"^IMG_(\d+)-EDIT$", stem, re.I)
    if m:
        return f"img-{m.group(1)}-edit.jpg"

    m = re.match(r"^IMG_(\d+)_(\d+)_HDR$", stem, re.I)
    if m:
        return f"img-{m.group(1)}-{m.group(2)}-hdr.jpg"

    m = re.match(r"^IMG_(\d+)_Original$", stem, re.I)
    if m:
        return f"img-{m.group(1)}-original.jpg"

    m = re.match(r"^IMG_(\d+)$", stem, re.I)
    if m:
        if ext == ".jpeg":
            return f"img-{m.group(1)}.jpeg"
        return f"img-{m.group(1)}.jpg"

    if re.match(r"^P\d+.*\.jpe?g$", name, re.I):
        base = name.rsplit(".", 1)[0].lower().replace("_", "-")
        e = name.rsplit(".", 1)[1].lower()
        if e == "jpeg":
            e = "jpg"
        return f"{base}.{e}"

    print(f"unmapped: {name}", file=sys.stderr)
    return None


def img_has_raster_pair(frame_dir: Path, n: str) -> bool:
    """True if IMG_<n> exists as jpg/jpeg (skip HEIC duplicate)."""
    for ext in (".jpg", ".jpeg", ".JPG", ".JPEG"):
        if (frame_dir / f"IMG_{n}{ext}").is_file():
            return True
    return False


def main() -> None:
    if not FRAME.is_dir():
        print("missing Frame/", file=sys.stderr)
        sys.exit(1)
    OUT.mkdir(parents=True, exist_ok=True)
    for p in OUT.iterdir():
        if p.is_file():
            p.unlink()

    for path in sorted(FRAME.iterdir()):
        if not path.is_file():
            continue
        ext = path.suffix.lower()
        if ext == ".heic":
            m = re.match(r"^IMG_(\d+)$", path.stem, re.I)
            if m and img_has_raster_pair(FRAME, m.group(1)):
                continue
        dest = public_name(path)
        if dest is None:
            continue
        out_path = OUT / dest
        if ext in (".heic",):
            subprocess.run(
                ["sips", "-s", "format", "jpeg", str(path), "--out", str(out_path)],
                check=True,
            )
        else:
            shutil.copy2(path, out_path)

    names = sorted(p.name for p in OUT.iterdir() if p.is_file())
    print("\n".join(names))


if __name__ == "__main__":
    main()
