<div align="center">

[![Read the Docs](https://img.shields.io/badge/Read%20the%20Docs-FB923C?style=flat-square&logo=readthedocs)](https://grimmory.org/getting-started)
[![Join Discord](https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white)](https://discord.gg/vNsB8CTebs)
[![Reddit](https://img.shields.io/badge/Reddit-%23FF4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Grimmory/)
[![Release](https://img.shields.io/github/v/release/grimmory-tools/grimmory?color=818CF8&style=flat-square&logo=github)](https://github.com/grimmory-tools/grimmory/releases)

</div>

# Grimmory Docs

Documentation for [Grimmory](https://github.com/grimmory-tools/grimmory), built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build). Live at [grimmory.org](https://grimmory.org).

## Development

Requires Node 22.12+ and [Git LFS](https://git-lfs.com).

```bash
npm ci
npm run dev
```

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## Content

Pages are MDX in `src/content/docs/`. Screenshot assets live in `src/assets/images/` and render through the `DocsImage` component. For theme-aware screenshots, place `light.png` and `dark.png` in a folder and reference that folder with the `/img/` path:

```mdx
<DocsImage src={"/img/dashboard/dashboard-overview"} alt={"Dashboard"} />
```

A single image file at the path works too. Browser-served static assets, such as the site favicon, live in `public/`.

Screenshots are captured by the automation in the grimmory-seed repo and copied here with `grimmory-seed sync`. Images that automation can't capture (external UIs, e-reader hardware) carry a `manual` attribute on their `DocsImage` tag so sync doesn't report them as gaps.

## Deploy

Pushes to `main` deploy to GitHub Pages via [deploy.yml](.github/workflows/deploy.yml). The custom domain is set in [public/CNAME](public/CNAME) and `site` in [astro.config.mjs](astro.config.mjs).
