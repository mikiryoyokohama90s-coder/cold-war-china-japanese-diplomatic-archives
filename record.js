(function () {
  const searchRecords = Array.isArray(window.SEARCH_INDEX) ? window.SEARCH_INDEX : [];
  const publicRecords = Array.isArray(window.PUBLIC_RECORDS) ? window.PUBLIC_RECORDS : [];
  const params = new URLSearchParams(window.location.search);
  const recordId = params.get("id");

  const title = document.getElementById("recordTitle");
  const titleEn = document.getElementById("recordTitleEn");
  const detail = document.getElementById("recordDetail");

  const searchRecord = searchRecords.find((record) => record.record_id === recordId);
  const publicRecord = publicRecords.find((record) => record.record_id === recordId);
  const record = { ...(publicRecord || {}), ...(searchRecord || {}) };

  const escapeHtml = (value) =>
    String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const splitLabels = (value) => {
    if (!value) return [];
    return value
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const valueRow = (label, value) => {
    if (!value) return "";
    return `
      <div class="detail-row">
        <dt>${escapeHtml(label)}</dt>
        <dd>${escapeHtml(value)}</dd>
      </div>
    `;
  };

  const tagSection = (label, value) => {
    const items = splitLabels(value);
    if (items.length === 0) return "";
    return `
      <section class="detail-section">
        <h2>${escapeHtml(label)}</h2>
        <div class="tag-group detail-tags">
          ${items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}
        </div>
      </section>
    `;
  };

  if (!recordId || (!searchRecord && !publicRecord)) {
    title.textContent = "Record not found";
    titleEn.textContent = "";
    detail.innerHTML = `
      <div class="empty">
        The requested record could not be found. 一覧ページからもう一度選んでください。
      </div>
    `;
    return;
  }

  document.title = `${record.title_en || record.title_jp} | Record Detail`;
  title.textContent = record.title_jp || "Untitled record";
  titleEn.textContent = record.title_en || "";

  const metadataRows = `
    ${valueRow("Record ID", record.record_id)}
    ${valueRow("MOFA Material ID", record.mofa_material_id)}
    ${valueRow("Classification", record.legacy_archive_id)}
    ${valueRow("Legacy Record ID", record.legacy_record_id)}
    ${valueRow("Volume", record.volume)}
    ${valueRow("Release Status", record.release_status)}
    ${valueRow("Years", record.years)}
    ${valueRow("Primary Subject", record.primary_subject_jp)}
    ${valueRow("Primary Subject EN", record.primary_subject_en)}
  `;

  detail.innerHTML = `
    <section class="detail-hero panel">
      <div>
        <p class="record-kicker">${escapeHtml([record.years, record.mofa_material_id, record.legacy_archive_id].filter(Boolean).join(" / "))}</p>
        <h2>Record Metadata</h2>
      </div>
      <div class="actions">
        <a href="${escapeHtml(record.source_url)}" target="_blank" rel="noreferrer">Open official MOFA record</a>
        <a class="secondary-action" href="index.html">Back to search</a>
      </div>
    </section>

    <section class="detail-section">
      <h2>Basic Information</h2>
      <dl class="detail-list">${metadataRows}</dl>
    </section>

    ${tagSection("Regions", record.region_labels_jp)}
    ${tagSection("Reaction Regions", record.reaction_region_labels_jp)}
    ${tagSection("Entities", record.entity_labels_jp)}
    ${tagSection("Organizations", record.organization_labels_jp)}
    ${tagSection("Related Organizations", record.related_organization_labels_jp)}
    ${tagSection("Events", record.event_labels_jp)}
    ${tagSection("Blocs", record.bloc_labels_jp)}
    ${tagSection("Keywords", record.keyword_labels_jp)}
    ${tagSection("Analytical Contexts", record.analytical_context_labels_jp)}

    <section class="detail-section provenance-section">
      <h2>Source / Provenance</h2>
      <p class="note">${escapeHtml(record.source_verified_note || "No source verification note recorded.")}</p>
    </section>

    <details class="detail-section developer-details">
      <summary>Developer Search Text</summary>
      <p class="note">${escapeHtml(record.search_text_all)}</p>
    </details>
  `;
})();
