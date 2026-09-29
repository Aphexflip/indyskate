# IndySkate Project State

Last updated: 2026-09-29

## Production
- Public domain: https://indyskate.com
- GitHub repository: `Aphexflip/indyskate`
- Default branch: `main`
- Homepage cleanup merged to `main` in PR #7 and repository validation passed.
- The public domain is still serving the legacy site, so the new GitHub build is **not yet the production site**.
- Deployment/DNS connection remains the current blocker. GitHub issue #2 tracks this work.

## Current product direction
Minimal, archive-first IndySkate site that feels complete even while the historical archive is still being recovered.

## Current implementation
- Static site under `public/`
- Data-driven archive file at `public/data/archive.json`
- Responsive editorial layout
- Homepage explains the archive mission instead of looking accidentally unfinished
- Verified-record counter wired to archive data
- Clear archive-recovery / submission call to action
- No fake historical records or generated archive imagery
- Empty-state UI intentionally explains why unverified content is not published
- Repository validation workflow enabled

## Current backlog
- Connect the production domain to the new GitHub/Cloudflare deployment
- Recover historical IndySkate site and media
- Build archive year browser from verified records
- Build verified Indy video archive with in-site playback
- Build Indianapolis skate spot archive
- Import first source-backed archive records
- Replace email-only submissions with a structured submission form when useful

## Current priority
1. Point production at the new GitHub build and verify automatic deploys from `main`.
2. Recover and catalog real IndySkate material from owned files, current site sources, and archived site captures.
3. Populate the archive only with verified/source-backed records.
4. Turn the first recovered material into useful year, skater, spot, photo, and video views.

## Important constraints
- Repository evidence and source files override chat assumptions.
- Historical metadata must be sourced or explicitly marked unknown.
- Original media color should be preserved.
- Large original media should eventually be stored outside Git in an appropriate media/object store while metadata stays version-controlled.
