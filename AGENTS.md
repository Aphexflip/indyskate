# IndySkate Agent Rules

## Mission
Make IndySkate the place an Indiana skateboarder checks to know what is happening now and to explore where the scene came from.

## Product direction
IndySkate is **50/50 living scene + permanent archive**. Indianapolis is the center; surrounding Indiana cities and towns are in scope. Exceptional nearby regional references may appear when they matter to Indiana skaters.

The product should feel like a serious independent skate publication/archive, not a generic SaaS dashboard. The homepage must feel alive. Archive depth grows underneath it.

## Locked V1
The current build target is:
1. scrolling Indiana skate feed;
2. upcoming events;
3. source registry;
4. verified places;
5. relational foundations for people, media/archive records, sources, events and projects/collections.

Do not replace this with another homepage redesign or framework rewrite.

## Historical integrity
- Never invent historical photos, videos, skaters, photographers, spots, dates, captions, quotes, events or metadata.
- Never use AI-generated imagery as if it were real IndySkate history.
- Preserve original files, color, aspect ratio and attribution where practical.
- Unknown information stays unknown; approximate information is labeled approximate.
- Every historical item needs provenance.
- Prefer first-party IndySkate material, original uploads, creator-owned sources, official embeds and verifiable archived pages.

## Current-scene integrity
- Current feed items must come from a recorded source.
- Prefer official venues, shops, parks, crews, creators and supported platform feeds.
- Automations may discover/normalize/de-duplicate candidates, but must not invent events or publish uncertain claims as fact.
- Respect platform terms; use supported embeds/APIs instead of brittle scraping.

## Social direction
Social/community is a core long-term goal: submissions, comments/reactions, corrections/identification, profiles, follows, saves, personalized feeds, notifications, event interaction, then richer user posting/groups. Do not open broad posting before moderation, reporting, anti-spam and provenance controls exist.

## Design
- Minimal, editorial, media-led.
- Neutral dark/off-white/black system is acceptable; real media supplies the color.
- Thin rules, strong typography, useful metadata, fast mobile layouts.
- Avoid gradients/glassmorphism, fake VHS effects, graffiti clichés and excessive rounded-card SaaS UI.
- Make source/date/location/status obvious.

## Architecture
- Keep content data-driven and separate from presentation.
- Current JSON files under `public/data/` are the V1 source of truth.
- Large original media should move to object storage such as Cloudflare R2 later; metadata remains durable/version-controlled.
- Erik's 50+ tapes should get permanent IDs such as `TAPE-0001` before large-scale digitization.

## Workflow
1. Read `docs/PROJECT_STATE.md`, `docs/FEATURE_REGISTRY.md`, `docs/DESIGN.md`, and this file.
2. Inspect the current implementation before editing.
3. Work on `agent/*` branches for meaningful changes.
4. Validate before production merge.
5. Preserve working features and verified records.
6. Update project state/feature registry when product behavior changes.
7. Prefer small, reversible, source-backed changes.

## Production safety
Low-risk content/UI fixes may be automated. Large redesigns, deletion of historical material, attribution changes, uncertain identity/date claims, domain/DNS changes, security changes and destructive data operations require explicit review.
