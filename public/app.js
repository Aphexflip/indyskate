const state = { records: [] };

const byType = (type) => state.records.filter((record) => record.type === type);

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function recordLabel(record) {
  const parts = [record.year, record.skater, record.spot].filter(Boolean);
  return parts.join(" / ") || record.title || "Untitled archive item";
}

function renderRecordCount() {
  const target = document.querySelector("#record-count");
  if (!target) return;
  const verifiedCount = state.records.filter((record) => record.verified === true).length;
  target.textContent = `${verifiedCount} VERIFIED ${verifiedCount === 1 ? "RECORD" : "RECORDS"}`;
}

function renderFeatured() {
  const target = document.querySelector("#featured-content");
  const record = [...state.records]
    .filter((item) => item.verified === true)
    .sort((a, b) => (b.added_at || "").localeCompare(a.added_at || ""))[0];

  if (!record) return;

  const media = record.type === "photo" && record.asset
    ? `<img src="${escapeHtml(record.asset)}" alt="${escapeHtml(record.alt || recordLabel(record))}">`
    : "";

  target.innerHTML = `
    <article class="feature-card">
      <figure>${media}</figure>
      <div class="feature-meta">
        <span>${escapeHtml(recordLabel(record))}</span>
        <span>${escapeHtml(record.credit || record.source?.label || "SOURCE RECORDED")}</span>
      </div>
    </article>`;
}

function renderYears() {
  const target = document.querySelector("#years-list");
  const years = [...new Set(state.records.map((record) => record.year).filter(Boolean))]
    .sort((a, b) => Number(b) - Number(a));

  if (!years.length) return;
  target.classList.remove("muted");
  target.innerHTML = `<div class="year-grid">${years.map((year) => `<span>${escapeHtml(year)}</span>`).join("")}</div>`;
}

function renderCollection(type, selector) {
  const target = document.querySelector(selector);
  const items = byType(type);
  if (!items.length) return;

  target.classList.remove("muted");
  target.innerHTML = `<div class="archive-grid">${items.map((record) => `
    <article class="archive-item">
      <strong>${escapeHtml(record.title || recordLabel(record))}</strong>
      <small>${escapeHtml(recordLabel(record))}</small>
    </article>`).join("")}</div>`;
}

async function loadArchive() {
  try {
    const response = await fetch("/data/archive.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Archive request failed: ${response.status}`);
    const payload = await response.json();
    state.records = Array.isArray(payload.records) ? payload.records : [];
    renderRecordCount();
    renderFeatured();
    renderYears();
    renderCollection("photo", "#photos-list");
    renderCollection("video", "#videos-list");
  } catch (error) {
    console.error("Unable to load IndySkate archive data", error);
  }
}

loadArchive();
