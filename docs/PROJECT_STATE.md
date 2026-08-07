# IndySkate Project State

Last updated: 2026-08-07

## Production
- Public domain: https://indyskate.com
- GitHub repository: `Aphexflip/indyskate`
- Default branch: `main`
- Current working branch: `agent/initial-archive-build`
- Cloudflare Git deployment: not yet verified/connected in this repository bootstrap

## Current product direction
Minimal archive-first IndySkate site based on the selected Concept 3 direction.

## Current implementation
- Static site under `public/`
- Data-driven archive file at `public/data/archive.json`
- Responsive editorial layout
- No fake historical records or generated archive imagery
- Empty-state UI until verified material is imported

## Current priority
1. Merge/deploy the initial archive-first shell.
2. Connect `Aphexflip/indyskate` to Cloudflare Pages with `main` as production.
3. Recover and catalog real IndySkate material from owned files, current site sources, and archived site captures.
4. Build archive browsing from verified records.

## Important constraints
- Repository evidence and source files override chat assumptions.
- Historical metadata must be sourced or explicitly marked unknown.
- Original media color should be preserved.
- Large original media should eventually be stored outside Git in an appropriate media/object store while metadata stays version-controlled.
