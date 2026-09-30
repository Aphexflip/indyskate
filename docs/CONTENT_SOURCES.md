# IndySkate Content Sources

This file tracks where archive and current-scene material came from and whether it is safe to publish.

## Source classes

### A — Owned / first-party
Original IndySkate files, original uploads controlled by the owner, or material with clear publication rights.

### B — Official creator/platform embed
YouTube, Vimeo, Instagram, TikTok, or other creator-hosted material embedded using supported platform methods. The source remains external and attribution must be retained.

### C — Archived web capture
Pages or assets recovered from historical IndySkate site captures. Record the archived URL/capture date and preserve provenance. Recovery does not automatically establish copyright ownership for third-party material.

### D — Community submission
Material submitted by a skater, filmer, photographer, shop, or community member. Record submitter, claimed ownership/permission, date submitted, and requested credit.

### E — Research-only reference
Material useful for identifying dates, people, spots, or context but not cleared for republication. Do not copy/rehost the media merely because it is publicly visible online.

### F — Official current-scene source
Official park, shop, venue, event organizer, government page, tourism directory, creator channel, or organization used to verify current events/places/scene information.

## Publication rules
- Historical media requires provenance and a rights/publication note when knowable.
- Current feed items require a recorded source URL and verification state.
- Do not rehost third-party media just because it is public; prefer supported embeds/links.
- Unknown fields may be `null`; never infer them solely to make the site look complete.

## Current source registry
Structured source records live in `public/data/sources.json`.

Initial verified V1 sources:
- Q Skatepark — official venue/event source
- Indy Parks — Willard Park
- Indy Parks — Arsenal Park
- Visit Indy — Major Taylor Skate Park
- Indianapolis Skatepark Advocates

These are seed sources, not a complete Indiana skate source list. Future automation should expand the registry carefully and preserve editorial control.
