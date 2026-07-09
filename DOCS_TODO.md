# Documentation TODO

Track progress on missing docs. Work through one section at a time, taking all screenshots for that section before moving on.

## Priority 1: High-traffic features users ask about

- [x] **Dashboard** `docs/dashboard.md`
  - Screenshots: default dashboard, dashboard settings dialog, each section type
  - Covers: customizable sections, recently read, latest additions, recommendations

- [ ] **Reading Sessions & Progress** `docs/reading-progress.md`
  - Screenshots: reading status dropdown, session timeline, rating stars, progress bar
  - Covers: status types (unread/reading/finished/abandoned/etc.), creating sessions, ratings

- [ ] **Book Readers** `docs/readers/` (split into per-reader pages)
  - [x] EPUB Reader `docs/readers/epub-reader.md`
  - [x] PDF Reader `docs/readers/pdf-reader.md`
  - [x] Comic/CBX Reader `docs/readers/cbx-reader.md`
  - [x] Audiobook Player `docs/readers/audiobook-player.md`

- [x] **Highlights & Annotations** `docs/notebook.md` (combine with Notebook)
  - Screenshots: creating a highlight in reader, annotation popup, notebook page with filters
  - Covers: creating/editing/deleting highlights and notes, notebook search, export

## Priority 2: Analytics (visually rich, good for docs)

- [x] **Library Statistics** `docs/library-stats.md`
  - Screenshots: each of the 9 chart types
  - Covers: author universe, format distribution, language stats, metadata scores, page counts, publication timeline, publication trends, reading journey, top items

- [x] **Reading Statistics** `docs/reading-stats.md`
  - Screenshots: 4-5 representative charts (heatmap, reading clock, DNA, genre stats, completion timeline)
  - Covers: overview of all chart types, how to access, permission requirements

## Priority 3: Everyday features

- [ ] **Search** `docs/search.md`
  - Screenshots: search bar, search results, empty state
  - Covers: global search, what fields are searched, result navigation

- [ ] **Theme & Appearance** `docs/theme.md`
  - Screenshots: theme configurator panel, light vs dark, custom background, favicon upload
  - Covers: color customization, background image, favicon, language selector

- [ ] **Book Recommendations** `docs/recommendations.md`
  - Screenshots: similar books section in metadata center, dashboard recommendations
  - Covers: how recommendations work, where they appear

## Priority 4: Fill gaps in existing docs

- [x] **Content Restrictions** `docs/content-restrictions.md`
  - New standalone doc covering restriction types, modes, per-user config, and enforcement

- [x] **Send to Device/Email** — already covered in `docs/email-setup.md`
  - Quick Send and Custom Send workflows are fully documented

- [x] **Sidecar Files** `docs/metadata/sidecar-files.md`
  - New standalone doc covering file format, fields, settings, per-book and library-wide operations
  - Also covered in `docs/metadata/metadata-center.md` Sidecar tab section

- [x] **Book Reviews** — already covered in `docs/metadata/metadata-center.md`
  - Reviews tab section documents external sources, spoiler handling, refresh/delete

- [x] **Komga API** (unhide from sidebar)
  - No new writing needed, just add to sidebar

## Priority 5: Minor/niche

- [ ] **File Uploads** (could fold into getting-started or library docs)
  - Screenshots: upload dialog, drag-and-drop
  - Covers: toolbar upload button, supported formats

- [ ] **Bulk Operations** (could fold into book-browser docs)
  - Screenshots: multi-select mode, bulk action bar
  - Covers: bulk metadata fetch, bulk shelf assignment, bulk delete

- [ ] **Author Matching** (extend `docs/authors.md`)
  - Screenshots: match dialog, disambiguation UI
  - Covers: auto-match, manual match, unmatch workflow

---

## Screenshot Workflow

Batch by section. For each section:
1. Set up the app state (populate data, navigate to the page)
2. Take all screenshots for that section in one pass
3. Save to `src/assets/images/<feature-name>/` following existing naming conventions
4. Write the doc while screenshots are fresh

Image specs (from DOCS_GUIDE.md):
- PNG format
- Annotate with arrows/highlights if needed
- Keep file sizes reasonable
- Use descriptive filenames
