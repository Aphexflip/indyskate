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

## Product direction
IndySkate is locked as **50/50 living Indiana skate scene + permanent Indianapolis archive**.

The homepage should answer:
- what is happening in Indiana skateboarding now?
- what events are coming up?
- where can people skate?
- who and what projects are active?
- what historical material has been recovered?
- how does current scene material connect to older people/places/projects?

Erik's 20+ years of filming, skating, projects, photos and site history are part of the archive itself. There are 50+ tapes from roughly 1999–2009 waiting for structured inventory and digitization.

## V1 implementation
Branch: `agent/v1-live-feed-archive`

V1 adds:
- scrolling current-scene feed;
- feed filters;
- verified upcoming event data;
- verified Indianapolis skate places;
- source registry;
- empty relational foundations for people and collections;
- existing source-backed archive dataset;
- validation across all V1 data files.

Initial verified current sources include Q Skatepark, Indy Parks, Visit Indy and Indianapolis Skatepark Advocates.

## Immediate next priorities
1. Merge and verify V1 production deployment.
2. Expand the source registry with trusted Indiana skate YouTube channels, shops, parks, crews, skaters and event organizers.
3. Add supported automatic discovery for sources where practical, starting with YouTube/RSS/structured feeds.
4. Inventory a small pilot group of Erik's tapes before attempting bulk digitization.
5. Add the first real archive records and connect them to people/places/projects.
6. Build map UX after place data has enough depth.
7. Add Social V0 only after the feed/archive foundations are stable.

## Constraints
- Repository/source evidence overrides chat assumptions.
- Historical metadata must be sourced or explicitly marked unknown/approximate.
- Current feed content must have a recorded source.
- Original media color should be preserved.
- Large masters should not live in Git; use appropriate object storage later.
- Do not re-open the completed DNS/hosting project unless a concrete production defect appears.
