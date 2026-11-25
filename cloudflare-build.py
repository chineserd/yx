#!/usr/bin/env python3
"""Build the published prototype snapshot for a Cloudflare Pages trial.

The GitHub Pages repository stores ready-to-serve files at its root. Cloudflare
serves them under /yx/ to keep the existing absolute links working.
"""

import argparse
import json
import re
import shutil
import subprocess
from pathlib import Path

MAX_FILES = 20_000
MAX_FILE_BYTES = 25 * 1024 * 1024
SKIP_DIRS = {".git", "cloudflare-dist", "__pycache__"}
SKIP_FILES = {"cloudflare-build.py", ".DS_Store"}


def build(source: Path, output: Path) -> dict:
    source = source.resolve()
    output = output.resolve()
    if output == source or source not in output.parents:
        raise ValueError("输出目录必须位于源目录内，且不能覆盖源目录")
    if not (source / "index.html").is_file() or not (source / "menu-config.json").is_file():
        raise ValueError("源目录缺少原型总览入口或菜单配置")

    if output.exists():
        shutil.rmtree(output)
    site = output / "yx"
    site.mkdir(parents=True)
    count = 0
    for path in source.rglob("*"):
        if any(part in SKIP_DIRS for part in path.relative_to(source).parts):
            continue
        if not path.is_file() or path.is_symlink() or path.name.startswith(".") or path.name in SKIP_FILES:
            continue
        size = path.stat().st_size
        if size > MAX_FILE_BYTES:
            raise ValueError(f"单文件超过 Cloudflare Pages 25 MiB 上限：{path}")
        target = site / path.relative_to(source)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, target)
        count += 1
    if count > MAX_FILES:
        raise ValueError(f"文件数量超过 Cloudflare Pages 免费版上限：{count}")

    home = site / "index.html"
    hostname_check = "location.hostname === 'chineserd.github.io'"
    old_gate = (
        "<script>if (" + hostname_check
        + " || new URLSearchParams(location.search).has('gate-preview'))"
    )
    new_hostname_check = (
        "(location.hostname === 'chineserd.github.io' || "
        "location.hostname === 'chineserd-prototypes.pages.dev' || "
        "location.hostname.endsWith('.chineserd-prototypes.pages.dev'))"
    )
    new_gate = old_gate.replace(hostname_check, new_hostname_check)
    html = home.read_text(encoding="utf-8")
    if html.count(old_gate) != 1:
        raise ValueError("总览登录提示的域名判断已变化，请检查后再发布")
    home.write_text(html.replace(old_gate, new_gate), encoding="utf-8")

    header_rules = ["/*", "  Cache-Control: no-cache, max-age=0, must-revalidate"]
    fingerprinted = re.compile(r".+-[A-Za-z0-9_-]{8,}\.(?:js|css|svg|png|webp|woff2)$")
    for directory in sorted(site.rglob("assets")):
        if not directory.is_dir():
            continue
        relative = directory.relative_to(output).as_posix()
        files = [item for item in directory.rglob("*") if item.is_file()]
        if not relative.isascii() or not files or not all(fingerprinted.fullmatch(item.name) for item in files):
            continue
        header_rules.extend([
            "",
            f"/{relative}/*",
            "  ! Cache-Control",
            "  Cache-Control: public, max-age=31536000, immutable",
        ])
    (output / "_headers").write_text("\n".join(header_rules) + "\n", encoding="utf-8")
    (output / "index.html").write_text(
        '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<title>中文路需求原型汇总</title>'
        '<script>location.replace("/yx/"+location.search+location.hash)</script>'
        '</head><body><a href="/yx/">打开原型总览</a></body></html>\n',
        encoding="utf-8",
    )
    try:
        commit = subprocess.check_output(
            ["git", "-C", str(source), "rev-parse", "HEAD"], text=True
        ).strip()
    except (OSError, subprocess.CalledProcessError):
        commit = "local-preview"
    (site / "deployment-version.json").write_text(
        json.dumps({"commit": commit}, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    return {"ok": True, "files": count, "fingerprinted_asset_groups": (len(header_rules) - 2) // 4,
            "commit": commit, "output": str(output)}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=Path(__file__).resolve().parent)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    root = args.source.resolve()
    destination = args.output.resolve() if args.output else root / "cloudflare-dist"
    print(json.dumps(build(root, destination), ensure_ascii=False))
