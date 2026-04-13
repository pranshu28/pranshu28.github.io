# pranshu28.github.io

Personal website built with Next.js 16, Tailwind CSS 4, and Framer Motion. Based on [nextjs-portfolio-blog-research](https://github.com/zhengzangw/nextjs-portfolio-blog-research).

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

Static output goes to `out/`. The **Deploy to GitHub Pages** workflow builds on push to `master` (and scheduled runs) and pushes `out/` to the **`gh-pages`** branch.

**One-time:** In the repo **Settings → Pages → Build and deployment**, set **Source** to **Deploy from a branch**, branch **`gh-pages`**, folder **`/` (root)**. (If the branch is missing, run the workflow once from the Actions tab, then refresh Settings.)

Ensure **Settings → Actions → General → Workflow permissions** allows **Read and write** so `GITHUB_TOKEN` can push `gh-pages`.

Optional (repo admin, after `gh auth login`):  
`gh api repos/pranshu28/pranshu28.github.io/pages -X PUT --input - <<< '{"build_type":"legacy","source":{"branch":"gh-pages","path":"/"}}'`
