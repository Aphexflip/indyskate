# IndySkate Project State

Last updated: 2026-09-30

## Production
- Public domain: https://indyskate.com
- GitHub repository: `Aphexflip/indyskate`
- Default branch: `main`
- Cloudflare nameserver cutover and custom-domain activation completed September 30, 2026.
- Both `indyskate.com` and `www.indyskate.com` were externally verified serving the new build.
- Canonical metadata points to `https://indyskate.com/`.
- Cloudflare Workers Static Assets serves `public/`.
- V1 auto-deploy from GitHub was verified after PR #11.

## Product direction
IndySkate is locked as **50/50 living Indiana skate scene + permanent Indianapolis archive**.

The homepage should answer:
- what is happening in Indiana skateboarding now?
- what events are coming up?
- where can people skate?
- who and what projects are active?
- what historical material has been recovered?
- how does current scene material connect to older people/places/projects?

Erik's 20+ years of filming, skating, projects, photos and site history are part of the archive itself.

## Archive recovery strategy — ONLINE FIRST
Do **not** make physical tape inventory the next gate.

The preferred source order is:
1. **Indyskate YouTube** — first-party historical video channel and the fastest/highest-value archive source.
2. **Recovered/archived IndySkate.com** — Wayback captures, old site pages, downloadable assets and metadata.
3. **IndySkate Blogger** — posts, embeds, dates, comments and context.
4. **Erik Erling / Indy skate Flickr** — first-party photos with useful taken/upload dates and captions.
5. Other public web remnants/cross-references — spot directories, Reddit, X, old links, embeds and references that help identify people/places/dates.
6. Local hard drive/original files — use when online material is missing, lower quality, incomplete, or when a better original is needed.

The hard drive is valuable, but it is **not a prerequisite** to getting the archive populated.

Prior recovery work already found substantial web material. Reuse that work rather than starting from zero.

## V1 implementation
V1 includes:
- scrolling current-scene feed;
- feed filters;
- verified upcoming event data;
- verified Indianapolis skate places;
- source registry;
- relational foundations for people and collections;
- source-backed archive dataset;
- validation across all V1 data files.

## Immediate next priorities
1. Import/index the old Indyskate YouTube catalog into archive candidates.
2. Reuse the prior Wayback/Blogger recovery inventory and turn recovered items into structured archive records.
3. Pull first-party Flickr skate photos into the candidate queue with dates/captions/provenance.
4. Cross-link videos/photos to people, spots, years and projects as identities are known.
5. Expand current Indiana source discovery in parallel.
6. Build map UX after place data has enough depth.
7. Add Social V0 after the feed/archive foundations are stable.

## Constraints
- Repository/source evidence overrides chat assumptions.
- Historical metadata must be sourced or explicitly marked unknown/approximate.
- Current feed content must have a recorded source.
- Original media color should be preserved.
- Large masters should not live in Git; use appropriate object storage later.
- Do not block archive progress on physical tape inventory.
- Do not re-open completed DNS/hosting work unless a concrete production defect appears.
