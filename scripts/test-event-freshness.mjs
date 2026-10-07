import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const app = readFileSync(resolve("public/app.js"), "utf8");
// Evaluate the production browser code, but do not start its network bootstrap.
const source = app.replace(/\bloadAll\(\);\s*$/, "");
assert.notEqual(source, app, "the test must disable only the final bootstrap call");

const context = {
  console,
  URL,
  window: { location: { origin: "https://indyskate.com" } },
  document: { querySelector: () => null }
};

const results = runInNewContext(`
  ${source}
  state.events = [
    { id: "yesterday", date: "2026-10-23", status: "upcoming", verified: true },
    { id: "today", date: "2026-10-24", status: "upcoming", verified: true },
    { id: "tomorrow", date: "2026-10-25", status: "upcoming", verified: true },
    { id: "unverified", date: "2026-10-25", status: "upcoming", verified: false },
    { id: "cancelled", date: "2026-10-25", status: "cancelled", verified: true }
  ];
  JSON.stringify({
    beforeMidnight: upcomingEvents(new Date("2026-10-24T03:59:00Z")).map((e) => e.id),
    afterMidnight: upcomingEvents(new Date("2026-10-24T04:01:00Z")).map((e) => e.id),
    nextDay: upcomingEvents(new Date("2026-10-25T04:01:00Z")).map((e) => e.id)
  });
`, context);

assert.deepEqual(JSON.parse(results), {
  beforeMidnight: ["yesterday", "today", "tomorrow"],
  afterMidnight: ["today", "tomorrow"],
  nextDay: ["tomorrow"]
});
assert.match(app, /eventCount\.textContent = upcomingEvents\(\)\.length/);
assert.match(app, /const events = upcomingEvents\(\)/);
console.log("IndySkate upcoming events use Indianapolis dates for list and count.");
