import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "public/index.html",
  "public/styles.css",
  "public/app.js",
  "public/data/archive.json",
  "public/data/feed.json",
  "public/data/events.json",
  "public/data/places.json",
  "public/data/people.json",
  "public/data/collections.json",
  "public/data/sources.json",
  "AGENTS.md",
  "docs/PROJECT_STATE.md",
  "docs/FEATURE_REGISTRY.md",
  "docs/CONTENT_SOURCES.md"
];

const failures = [];

for (const file of requiredFiles) {
  try {
    await access(resolve(root, file));
  } catch {
    failures.push("Missing required file: " + file);
  }
}

async function loadJson(file) {
  try {
    return JSON.parse(await readFile(resolve(root, file), "utf8"));
  } catch (error) {
    failures.push(file + " invalid: " + error.message);
    return {};
  }
}

function requireUniqueIds(items, label) {
  const seen = new Set();
  for (const [index, item] of items.entries()) {
    if (!item.id) {
      failures.push(label + " record " + index + ": missing id");
      continue;
    }
    if (seen.has(item.id)) failures.push(label + ": duplicate id " + item.id);
    seen.add(item.id);
  }
}

function validateWebUrl(value, label) {
  if (!value) return;
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) failures.push(label + ": URL must be http/https");
  } catch {
    failures.push(label + ": invalid URL " + value);
  }
}

const archive = await loadJson("public/data/archive.json");
const feed = await loadJson("public/data/feed.json");
const events = await loadJson("public/data/events.json");
const places = await loadJson("public/data/places.json");
const people = await loadJson("public/data/people.json");
const collections = await loadJson("public/data/collections.json");
const sources = await loadJson("public/data/sources.json");

const records = Array.isArray(archive.records) ? archive.records : [];
const feedItems = Array.isArray(feed.items) ? feed.items : [];
const eventItems = Array.isArray(events.events) ? events.events : [];
const placeItems = Array.isArray(places.places) ? places.places : [];
const peopleItems = Array.isArray(people.people) ? people.people : [];
const collectionItems = Array.isArray(collections.collections) ? collections.collections : [];
const sourceItems = Array.isArray(sources.sources) ? sources.sources : [];

if (!Array.isArray(archive.records)) failures.push("archive.json: records must be an array");
if (!Array.isArray(feed.items)) failures.push("feed.json: items must be an array");
if (!Array.isArray(events.events)) failures.push("events.json: events must be an array");
if (!Array.isArray(places.places)) failures.push("places.json: places must be an array");
if (!Array.isArray(people.people)) failures.push("people.json: people must be an array");
if (!Array.isArray(collections.collections)) failures.push("collections.json: collections must be an array");
if (!Array.isArray(sources.sources)) failures.push("sources.json: sources must be an array");

requireUniqueIds(records, "archive");
requireUniqueIds(feedItems, "feed");
requireUniqueIds(eventItems, "events");
requireUniqueIds(placeItems, "places");
requireUniqueIds(peopleItems, "people");
requireUniqueIds(collectionItems, "collections");
requireUniqueIds(sourceItems, "sources");

const sourceIds = new Set(sourceItems.map((source) => source.id));

for (const [index, source] of sourceItems.entries()) {
  if (!source.name) failures.push("sources.json record " + index + ": missing name");
  if (source.verified !== true) failures.push("sources.json record " + index + ": published sources must set verified=true");
  validateWebUrl(source.url, "sources.json record " + index);
}

for (const [index, record] of records.entries()) {
  if (!record.type) failures.push("archive.json record " + index + ": missing type");
  if (record.verified !== true) failures.push("archive.json record " + index + ": published records must set verified=true");
  if (!record.source || !record.source.label) failures.push("archive.json record " + index + ": missing source.label");
}

for (const [index, item] of feedItems.entries()) {
  if (!item.kind) failures.push("feed.json record " + index + ": missing kind");
  if (!item.title) failures.push("feed.json record " + index + ": missing title");
  if (item.published === true && item.verified !== true) failures.push("feed.json record " + index + ": published items must be verified");
  if (item.source_id && !sourceIds.has(item.source_id)) failures.push("feed.json record " + index + ": unknown source_id " + item.source_id);
  validateWebUrl(item.source_url, "feed.json record " + index);
}

for (const [index, event] of eventItems.entries()) {
  if (!event.title) failures.push("events.json record " + index + ": missing title");
  if (!event.date) failures.push("events.json record " + index + ": missing date");
  if (event.verified !== true) failures.push("events.json record " + index + ": published events must be verified");
  if (event.source_id && !sourceIds.has(event.source_id)) failures.push("events.json record " + index + ": unknown source_id " + event.source_id);
  validateWebUrl(event.source_url, "events.json record " + index);
}

for (const [index, place] of placeItems.entries()) {
  if (!place.name) failures.push("places.json record " + index + ": missing name");
  if (place.verified !== true) failures.push("places.json record " + index + ": published places must be verified");
  if (place.source_id && !sourceIds.has(place.source_id)) failures.push("places.json record " + index + ": unknown source_id " + place.source_id);
  validateWebUrl(place.source_url, "places.json record " + index);
}

try {
  const html = await readFile(resolve(root, "public/index.html"), "utf8");
  for (const asset of ["/styles.css", "/app.js"]) {
    if (!html.includes(asset)) failures.push("index.html does not reference " + asset);
  }
  for (const section of ['id="feed"', 'id="events"', 'id="archive"', 'id="places"']) {
    if (!html.includes(section)) failures.push("index.html missing V1 section " + section);
  }
} catch (error) {
  failures.push("Unable to inspect index.html: " + error.message);
}

if (failures.length) {
  console.error("IndySkate validation failed:\n");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("IndySkate validation passed: V1 feed, events, places, sources and archive schema are consistent.");
