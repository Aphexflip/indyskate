# IndySkate Feature Registry

| Feature | Status | Notes |
|---|---|---|
| Minimal homepage shell | COMPLETE | Archive-first editorial homepage with intentional recovery state |
| Responsive mobile layout | COMPLETE | Mobile-first responsive layout in current cleanup |
| Archive recovery explainer | COMPLETE | Makes the empty state deliberate and transparent |
| Community archive submission CTA | STARTED | Email-based submission path added; structured form can come later |
| Verified record counter | COMPLETE | Count is derived from verified records in archive data |
| Data-driven archive records | IN PROGRESS | Empty verified dataset wired into UI |
| Archive year browsing | STARTED | Renders years once records exist |
| Photo archive | STARTED | Renders verified photo records once imported |
| Video archive | PLANNED | Support verified in-site embeds where permitted |
| Zines / print media | PLANNED | Source-backed scans and metadata |
| Skater pages | PLANNED | Derived from verified records/submissions |
| Indianapolis spots | PLANNED | Historical + current spot information |
| Wayback recovery | PLANNED | Recover old IndySkate pages/assets and document provenance |
| Search | PLANNED | Archive-wide search after meaningful content volume exists |
| Cloudflare / production auto-deploy | BLOCKED ON SETUP | New build is merged, but indyskate.com is still serving the legacy site |
| Cloudflare R2 media vault | FUTURE | For large originals and preservation assets |
| Automated link/media QA | PLANNED | Extend GitHub validation workflow |

## Status meanings
- PLANNED: agreed direction, not implemented.
- STARTED: foundation exists but is not feature-complete.
- IN PROGRESS: actively being built/tested.
- COMPLETE: current intended scope is implemented.
- BLOCKED ON SETUP: implementation depends on account-side configuration.
- FUTURE: intentionally deferred.
