const state = {
  archive: [],
  feed: [],
  events: [],
  places: [],
  people: [],
  sources: []
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeUrl(value = "") {
  try {
    const url = new URL(value, window.location.origin);
    return ["http:", "https:", "mailto:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}

function formatDate(value) {
  if (!value) return "DATE TBD";
  const date = new Date(value + "T12:00:00");
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date).toUpperCase();
}

function recordLabel(record) {
  const skaters = Array.isArray(record.skaters) ? record.skaters.join(", ") : record.skater;
  const parts = [record.year, skaters, record.spot].filter(Boolean);
  return parts.join(" / ") || record.title || "Untitled archive item";
}

function sourceName(sourceId) {
  const source = state.sources.find((item) => item.id === sourceId);
  return source ? source.name : "SOURCE RECORDED";
}

function renderStats() {
  const feedCount = document.querySelector("#feed-count");
  const eventCount = document.querySelector("#event-count");
  const sourceCount = document.querySelector("#source-count");
  const recordCount = document.querySelector("#record-count");

  if (feedCount) feedCount.textContent = state.feed.filter((item) => item.published === true).length;
  if (eventCount) eventCount.textContent = state.events.filter((item) => item.status === "upcoming" && item.verified === true).length;
  if (sourceCount) sourceCount.textContent = state.sources.filter((item) => item.verified === true).length;

  const verifiedRecords = state.archive.filter((record) => record.verified === true).length;
  if (recordCount) {
    recordCount.textContent = verifiedRecords + " VERIFIED " + (verifiedRecords === 1 ? "RECORD" : "RECORDS");
  }
}

function renderFeed(filter = "all") {
  const target = document.querySelector("#feed-list");
  if (!target) return;

  const items = state.feed
    .filter((item) => item.published === true && item.verified === true)
    .filter((item) => filter === "all" || item.kind === filter)
    .sort((a, b) => String(b.sort_date || "").localeCompare(String(a.sort_date || "")));

  if (!items.length) {
    target.innerHTML = '<div class="empty-row">No verified items in this filter yet.</div>';
    return;
  }

  target.innerHTML = items.map((item) => {
    const source = sourceName(item.source_id);
    return '<article class="feed-item">' +
      '<div class="feed-kicker"><strong>' + escapeHtml(String(item.kind || "update").toUpperCase()) + '</strong>' +
      escapeHtml(formatDate(item.date)) + '</div>' +
      '<div class="feed-copy"><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.summary || "") + '</p></div>' +
      '<div class="feed-source">' + escapeHtml(item.location || "INDIANA") +
      '<br><a href="' + escapeHtml(safeUrl(item.source_url)) + '" target="_blank" rel="noopener">SOURCE: ' +
      escapeHtml(source) + ' ↗</a></div>' +
      '</article>';
  }).join("");
}

function renderEvents() {
  const target = document.querySelector("#events-list");
  if (!target) return;

  const events = state.events
    .filter((event) => event.verified === true && event.status === "upcoming")
    .sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")));

  if (!events.length) {
    target.innerHTML = '<div class="empty-row">No verified upcoming events loaded.</div>';
    return;
  }

  target.innerHTML = events.map((event) =>
    '<article class="event-card">' +
    '<div class="event-date">' + escapeHtml(formatDate(event.date)) + '</div>' +
    '<h3>' + escapeHtml(event.title) + '</h3>' +
    '<p>' + escapeHtml((event.venue ? event.venue + " · " : "") + (event.city || "")) + '</p>' +
    '<p>' + escapeHtml(event.summary || "") + '</p>' +
    '<a class="meta-link" href="' + escapeHtml(safeUrl(event.source_url)) + '" target="_blank" rel="noopener">VERIFY / DETAILS ↗</a>' +
    '</article>'
  ).join("");
}

function renderPlaces() {
  const target = document.querySelector("#places-list");
  if (!target) return;

  const places = state.places.filter((place) => place.verified === true);
  if (!places.length) {
    target.innerHTML = '<div class="empty-row">No verified places loaded.</div>';
    return;
  }

  target.innerHTML = places.map((place) =>
    '<article class="place-card">' +
    '<h3>' + escapeHtml(place.name) + '</h3>' +
    '<div class="place-meta"><span>' + escapeHtml(String(place.status || "unknown").toUpperCase()) + '</span>' +
    '<span>' + escapeHtml(String(place.kind || "place").toUpperCase()) + '</span></div>' +
    '<p>' + escapeHtml(place.address || place.city || "") + '</p>' +
    '<p>' + escapeHtml(place.description || "") + '</p>' +
    '<a class="meta-link" href="' + escapeHtml(safeUrl(place.source_url)) + '" target="_blank" rel="noopener">SOURCE ↗</a>' +
    '</article>'
  ).join("");
}

function renderPeople() {
  const target = document.querySelector("#people-list");
  if (!target) return;

  const people = state.people.filter((person) => person.verified === true);
  if (!people.length) return;

  target.classList.remove("muted");
  target.innerHTML = '<div class="archive-grid">' + people.map((person) =>
    '<article class="archive-item"><strong>' + escapeHtml(person.name) + '</strong><small>' +
    escapeHtml([person.city, person.era].filter(Boolean).join(" / ")) + '</small></article>'
  ).join("") + '</div>';
}

function renderYears() {
  const target = document.querySelector("#years-list");
  if (!target) return;

  const years = [...new Set(state.archive.map((record) => record.year).filter(Boolean))]
    .sort((a, b) => Number(b) - Number(a));

  if (!years.length) return;
  target.classList.remove("muted");
  target.innerHTML = '<div class="year-grid">' + years.map((year) => '<span>' + escapeHtml(year) + '</span>').join("") + '</div>';
}

function renderArchiveCollection(type, selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  const items = state.archive.filter((record) => record.verified === true && record.type === type);
  if (!items.length) return;

  target.classList.remove("muted");
  target.innerHTML = '<div class="archive-grid">' + items.map((record) =>
    '<article class="archive-item"><strong>' + escapeHtml(record.title || recordLabel(record)) +
    '</strong><small>' + escapeHtml(recordLabel(record)) + '</small></article>'
  ).join("") + '</div>';
}

function renderFeatured() {
  const target = document.querySelector("#featured-content");
  if (!target) return;

  const record = [...state.archive]
    .filter((item) => item.verified === true)
    .sort((a, b) => String(b.added_at || "").localeCompare(String(a.added_at || "")))[0];

  if (!record) return;

  const media = record.type === "photo" && record.asset
    ? '<img src="' + escapeHtml(record.asset) + '" alt="' + escapeHtml(record.alt || recordLabel(record)) + '">'
    : '';

  target.innerHTML =
    '<article class="feature-card"><figure>' + media + '</figure>' +
    '<div class="feature-meta"><span>' + escapeHtml(recordLabel(record)) + '</span><span>' +
    escapeHtml(record.credit || (record.source && record.source.label) || "SOURCE RECORDED") +
    '</span></div></article>';
}

function bindFilters() {
  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderFeed(button.dataset.filter || "all");
    });
  });
}

async function fetchJson(path, key) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(path + " request failed: " + response.status);
  const payload = await response.json();
  return Array.isArray(payload[key]) ? payload[key] : [];
}

async function loadAll() {
  try {
    const results = await Promise.all([
      fetchJson("/data/archive.json", "records"),
      fetchJson("/data/feed.json", "items"),
      fetchJson("/data/events.json", "events"),
      fetchJson("/data/places.json", "places"),
      fetchJson("/data/people.json", "people"),
      fetchJson("/data/sources.json", "sources")
    ]);

    state.archive = results[0];
    state.feed = results[1];
    state.events = results[2];
    state.places = results[3];
    state.people = results[4];
    state.sources = results[5];

    renderStats();
    renderFeed();
    renderEvents();
    renderPlaces();
    renderPeople();
    renderYears();
    renderArchiveCollection("photo", "#photos-list");
    renderArchiveCollection("video", "#videos-list");
    renderFeatured();
    bindFilters();
  } catch (error) {
    console.error("Unable to load IndySkate data", error);
    const feed = document.querySelector("#feed-list");
    if (feed) feed.innerHTML = '<div class="empty-row">IndySkate data failed to load. Check the source files and validation.</div>';
  }
}

loadAll();
