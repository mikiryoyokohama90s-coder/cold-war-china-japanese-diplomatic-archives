(function () {
  const records = Array.isArray(window.SEARCH_INDEX) ? window.SEARCH_INDEX : [];

  const searchInput = document.getElementById("searchInput");
  const regionFilter = document.getElementById("regionFilter");
  const entityFilter = document.getElementById("entityFilter");
  const eventFilter = document.getElementById("eventFilter");
  const keywordFilter = document.getElementById("keywordFilter");
  const organizationFilter = document.getElementById("organizationFilter");
  const clearButton = document.getElementById("clearButton");
  const resultCount = document.getElementById("resultCount");
  const results = document.getElementById("results");

  const splitLabels = (value) => {
    if (!value) return [];
    return value
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const normalize = (value) => String(value || "").toLocaleLowerCase();

  const uniqueSorted = (items) =>
    Array.from(new Set(items.filter(Boolean))).sort((a, b) =>
      a.localeCompare(b, "ja")
    );

  const collectOptions = (...fields) =>
    uniqueSorted(records.flatMap((record) => fields.flatMap((field) => splitLabels(record[field]))));

  const addOptions = (select, values) => {
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  };

  const escapeHtml = (value) =>
    String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const limitedLabels = (value, limit = 6) => {
    const labels = splitLabels(value);
    const visible = labels.slice(0, limit);
    const hidden = labels.length - visible.length;
    return { visible, hidden };
  };

  const chipGroup = (label, value, limit = 6) => {
    const { visible, hidden } = limitedLabels(value, limit);
    if (visible.length === 0) return "";
    const chips = visible
      .map((item) => `<span class="tag">${escapeHtml(item)}</span>`)
      .join("");
    const more = hidden > 0 ? `<span class="tag tag-muted">+${hidden}</span>` : "";
    return `<div class="tag-group"><span class="tag-label">${label}</span>${chips}${more}</div>`;
  };

  const matchesFilter = (record, field, filterValue) => {
    if (!filterValue) return true;
    return splitLabels(record[field]).includes(filterValue);
  };

  const matchesAnyFilter = (record, fields, filterValue) => {
    if (!filterValue) return true;
    return fields.some((field) => splitLabels(record[field]).includes(filterValue));
  };

  const getFilteredRecords = () => {
    const query = normalize(searchInput.value).trim();
    return records.filter((record) => {
      const matchesQuery =
        !query || normalize(record.search_text_all).includes(query);
      return (
        matchesQuery &&
        matchesFilter(record, "region_labels_jp", regionFilter.value) &&
        matchesFilter(record, "entity_labels_jp", entityFilter.value) &&
        matchesFilter(record, "event_labels_jp", eventFilter.value) &&
        matchesFilter(record, "keyword_labels_jp", keywordFilter.value) &&
        matchesAnyFilter(
          record,
          ["organization_labels_jp", "related_organization_labels_jp"],
          organizationFilter.value
        )
      );
    });
  };

  const renderRecord = (record) => {
    const meta = [
      record.years ? record.years : "",
      record.mofa_material_id ? `MOFA ${record.mofa_material_id}` : "",
      record.legacy_archive_id ? `分類番号 ${record.legacy_archive_id}` : "",
      record.release_status || "",
    ].filter(Boolean);

    return `
      <article class="record-card">
        <div class="record-card-main">
          <div>
            <p class="record-kicker">${escapeHtml(meta.join(" / "))}</p>
            <h3>${escapeHtml(record.title_jp)}</h3>
            <p class="title-en">${escapeHtml(record.title_en)}</p>
          </div>
          <div class="actions card-actions">
            <a href="record.html?id=${encodeURIComponent(record.record_id)}">Details</a>
            <a class="secondary-action" href="${escapeHtml(record.source_url)}" target="_blank" rel="noreferrer">MOFA</a>
          </div>
        </div>
        <div class="tag-groups compact-tags">
          ${chipGroup("Region", record.region_labels_jp, 4)}
          ${chipGroup("Entity", record.entity_labels_jp, 6)}
          ${chipGroup("Event", record.event_labels_jp, 3)}
          ${chipGroup("Keyword", record.keyword_labels_jp, 5)}
          ${chipGroup("Org", [record.organization_labels_jp, record.related_organization_labels_jp].filter(Boolean).join("; "), 3)}
        </div>
      </article>
    `;
  };

  const render = () => {
    const filtered = getFilteredRecords();
    resultCount.textContent = `${filtered.length} / ${records.length} records`;
    if (filtered.length === 0) {
      results.innerHTML = `<div class="empty">No records found. 検索語やフィルターを少し広げてみてください。</div>`;
      return;
    }
    results.innerHTML = filtered.map(renderRecord).join("");
  };

  addOptions(regionFilter, collectOptions("region_labels_jp"));
  addOptions(entityFilter, collectOptions("entity_labels_jp"));
  addOptions(eventFilter, collectOptions("event_labels_jp"));
  addOptions(keywordFilter, collectOptions("keyword_labels_jp"));
  addOptions(organizationFilter, collectOptions("organization_labels_jp", "related_organization_labels_jp"));

  searchInput.addEventListener("input", render);
  regionFilter.addEventListener("change", render);
  entityFilter.addEventListener("change", render);
  eventFilter.addEventListener("change", render);
  keywordFilter.addEventListener("change", render);
  organizationFilter.addEventListener("change", render);
  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    regionFilter.value = "";
    entityFilter.value = "";
    eventFilter.value = "";
    keywordFilter.value = "";
    organizationFilter.value = "";
    render();
    searchInput.focus();
  });

  render();
})();
