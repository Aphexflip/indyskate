# IndySkate Project State

Last updated: 2026-08-16

## Production
- Public domain: https://indyskate.com
- GitHub repository: `Aphexflip/indyskate`
- Default branch: `main`
- Baseline merge commit: `b3d2df19a983856efaafb555b6a73728609ec62d`
- Initial bootstrap PR: #1 — merged
- Cloudflare Git deployment: connection re-test initiated 2026-08-16 via a harmless metadata-only `main` commit; awaiting deployment evidence

## Current product direction
Minimal archive-first IndySkate site based on the selected Concept 3 direction.

## Current implementation
- Static site under `public/`
- Data-driven archive file at `public/data/archive.json`
- Responsive editorial layout
- No fake historical records or generated archive imagery
- Empty-state UI until verified material is imported
- Repository validation workflow enabled

## Current backlog
- #2 Connect GitHub repository to Cloudflare Pages
- #3 Recover historical IndySkate site and media
- #4 Build archive year browser from verified records
- #5 Build verified Indy video archive with in-site playback
- #6 Build Indianapolis skate spot archive

## Current priority
1. Verify automatic Cloudflare production deployment from `main`.
2. Close #2 once deployment evidence is confirmed.
3. Recover and catalog real IndySkate material from owned files, current site sources, and archived site captures.
4. Populate the archive only with verified/source-backed records.

## Important constraints
- Repository evidence and source files override chat assumptions.
- Historical metadata must be sourced or explicitly marked unknown.
- Original media color should be preserved.
- Large original media should eventually be stored outside Git in an appropriate media/object store while metadata stays version-controlled.
