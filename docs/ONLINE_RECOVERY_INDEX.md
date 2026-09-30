# IndySkate Online Recovery Index

Last updated: 2026-09-30

## Why this exists

A large portion of the IndySkate archive was already recovered before the current public-site rebuild. The production site should **reuse** that work instead of restarting archaeology or making physical tape inventory a prerequisite.

## Existing recovered work

- Private Living Archive v7 with a dedicated IndySkate section and recovered timeline.
- Forensic Dossier v6 with original IndySkate source-file evidence and old video IDs.
- Recovered 2001 homepage (Notion Digital Archive ID ARC-86).
- Recovered 2001 event calendar (ARC-87).
- Recovered 2006 IndySkate / IndyParty landing page (ARC-88).
- IndySkate Blogger archive record (ARC-80).
- Existing PowerShell Wayback harvester that produces CDX capture manifests.

## Source priority

1. Indyskate YouTube
2. Wayback / recovered IndySkate.com
3. IndySkate Blogger
4. Erik Erling / Indy skate Flickr
5. Public cross-references used only to identify/match material
6. Local hard-drive originals when online copies are missing, incomplete or lower quality

## Current public source checks

### Indyskate YouTube
- Channel remains live as `@Indyskate`.
- Current live video verification confirms:
  - `_CmU7RqA6CU` — **King Of The Road 2005 Louisville KY**
  - `NXexWlerUNA` — **Go Skateboard Day Philly 2005 Love Park**
- The Louisville video is within the project's explicitly allowed exceptional regional geography and has been promoted to `archive.json`.
- The Philadelphia video stays indexed as a candidate but is deferred by the current Indiana-first geography rule.

### Blogger
The public Blogger archive remains live and exposes dated first-party posts including:
- 2012-04-25 — Front Crook - Front Air — Franklin Luna / Terelle Young
- 2012-04-11 — T.J. Rains - Ollie to Fakie, Kickflip to Fakie
- 2011-09-19 — Jordan - Monster Kickflip - Back 360
- 2011-09-17 — Jordan - MT - Hardflip - Kickflip

The Blogger pages link directly to Flickr media, making them strong join points between post/date/person/photo.

### Flickr
- Erik Erling / “Indy skate”
- Indianapolis, IN
- 229 public photos
- joined 2007

### External cross-reference
FindSkateSpots associates **Crew Battle 3 - Indianapolis** with Indyskate and the School 27 10 Stair Rail spot. Treat that as research evidence until the direct first-party video URL is recovered.

## Data flow

`archive_candidates.json` is the staging queue.

Candidate → verify provenance/date/people/place/media → choose publication mode → promote to `archive.json` → render on site.

Do not make candidate records visible as verified archive history until they pass promotion checks.
