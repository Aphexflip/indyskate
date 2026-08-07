# IndySkate Agent Rules

## Mission
Preserve Indianapolis skateboarding history, document the current scene, and make IndySkate useful enough to grow the local skate community.

## Product direction
IndySkate is archive-first, clear, minimal, and media-led. It should feel like a carefully maintained independent skate archive, not a generic SaaS product, social network, or novelty website.

## Non-negotiable content rules
- Never invent historical photos, videos, skaters, photographers, spots, dates, captions, quotes, events, or archive metadata.
- Never use AI-generated imagery as if it were real IndySkate history.
- Preserve original image color. Do not convert media to black and white merely to fit the site aesthetic.
- Preserve original files and attribution whenever available.
- Unknown information must remain explicitly unknown rather than guessed.
- Every imported historical record should carry a source or provenance note.
- Prefer first-party IndySkate material, original uploads, creator-owned sources, official embeds, and verifiable archived pages.

## Design system
- Primary visual language: white/off-white background, black typography, thin rules, generous whitespace, large real photography/video.
- Typography should be direct and editorial with monospace-inspired metadata where appropriate.
- Avoid unnecessary cards, gradients, glass effects, rounded SaaS UI, graffiti clichés, fake VHS effects, and decorative clutter.
- Media supplies the color.
- Mobile is a first-class layout, not an afterthought.
- The interface should make it obvious what content is, when it is from, and where it came from.

## Architecture
- Keep archive records data-driven rather than hard-coded into page markup.
- Keep content metadata separate from presentation.
- Static public assets live under `public/` until a larger media store is introduced.
- Large original media should eventually move to object storage such as Cloudflare R2 while metadata remains version-controlled.

## Development workflow
1. Read `docs/PROJECT_STATE.md`, `docs/FEATURE_REGISTRY.md`, `docs/DESIGN.md`, and this file before substantial work.
2. Inspect the current implementation before editing.
3. Work on `agent/*` branches for meaningful changes.
4. Validate before proposing production merge.
5. Do not remove working features or historical records without a documented reason.
6. Update project state/feature registry when work materially changes the product.
7. Prefer small, reversible, source-backed changes.

## Production safety
Low-risk fixes may be automated once deployment is connected. Large redesigns, deletion of historical material, attribution changes, uncertain identity/date claims, domain/DNS changes, and security changes require explicit review.
