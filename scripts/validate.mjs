import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "public/index.html",
  "public/styles.css",
  "public/app.js",
  "public/data/archive.json",
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
    failures.push(`Missing required file: ${file}`);
  }
}

try {
  const raw = await readFile(resolve(root, "public/data/archive.json"), "utf8");
  const archive = JSON.parse(raw);
  if (!Array.isArray(archive.records)) failures.push("archive.json: records must be an array");

  for (const [index, record] of (archive.records || []).entries()) {
    if (!record.id) failures.push(`archive.json record ${index}: missing id`);
    if (!record.type) failures.push(`archive.json record ${index}: missing type`);
    if (record.verified !== true) failures.push(`archive.json record ${index}: published records must set verified=true`);
    if (!record.source || !record.source.label) failures.push(`archive.json record ${index}: missing source.label`);
  }
} catch (error) {
  failures.push(`archive.json invalid: ${error.message}`);
}

try {
  const html = await readFile(resolve(root, "public/index.html"), "utf8");
  for (const asset of ["/styles.css", "/app.js"]) {
    if (!html.includes(asset)) failures.push(`index.html does not reference ${asset}`);
  }
} catch (error) {
  failures.push(`Unable to inspect index.html: ${error.message}`);
}

if (failures.length) {
  console.error("IndySkate validation failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("IndySkate validation passed.");
