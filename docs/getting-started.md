# 🚀 Getting Started

Grimmory is a self-hosted library management system for ebooks, comics, and audiobooks. Your books and data stay on your server, with no subscription fees or cloud dependency.

---

## 📋 Prerequisites

- **Docker & Docker Compose** (v20.10+ / v2.0+)
- **2GB RAM**, 10GB+ storage
- **Port 6060** available
- **Internet connection** for metadata fetching

---

## 📥 Step 1: Install

Create the directory structure and start the containers:

```bash
mkdir -p ~/grimmory/{mariadb/config,data,books,bookdrop}
cd ~/grimmory
```

Create a `docker-compose.yml` with the Grimmory and MariaDB services. The key volumes to mount are:

| Volume | Purpose |
|--------|---------|
| `./data:/app/data` | Application data, settings, and metadata cache |
| `./books:/books` | Your book library folder |
| `./bookdrop:/bookdrop` | Drop folder for automatic importing |

```bash
docker compose up -d
docker compose ps   # verify both containers are running
```

See the [Installation Guide](installation.md) for the complete `docker-compose.yml` with all environment variables and configuration options.

---

## 👤 Step 2: Create Admin Account

Open `http://localhost:6060` in your browser. On first launch, Grimmory shows a setup wizard to create the admin account:

| Field | Required | Notes |
|-------|----------|-------|
| Username | Yes | |
| Full Name | Yes | |
| Email | Yes | Must be a valid email address |
| Password | Yes | Minimum 6 characters |
| Confirm Password | Yes | Must match |

After submitting, you'll be redirected to the login page. See [Initial Setup](initial-setup.md) for details.

---

## 📚 Step 3: Create a Library

Click **"Add a Library"** from the dashboard to open the library creation dialog.

**Library Details:** Give it a name and optionally pick an icon.

**Book Folders:** Add one or more folders containing your book files. Navigate the directory picker to select them.

**Options:**

| Option | Description |
|--------|-------------|
| Watch Folders | Automatically detects new, changed, or deleted books in your folders |
| Metadata Source | Where to read metadata during scans: embedded file metadata, sidecar files, or both |
| Format Priority | Drag to reorder which format is treated as primary when a book exists in multiple formats |
| Allowed Formats | Restrict which file formats this library will scan |

Grimmory supports EPUB, PDF, MOBI, AZW3, FB2, CBZ/CBR/CB7, M4B, M4A, and MP3.

After saving, the library scans your folders automatically. See [Setup First Library](library/setup-first-library.md) for a full walkthrough, and [Organization Modes](library/organization-modes.md) for how to organize your files.

---

## 📖 Step 4: Add Books

**Direct copy:** Place files in your library folder, then rescan from the UI (or let Watch Folders pick them up automatically).

```bash
cp /path/to/your/books/* ~/grimmory/books/
```

**Bookdrop:** Drop files into the bookdrop folder. Grimmory auto-detects them, fetches metadata, and stages them for review. You can edit metadata, assign a destination library, and finalize the import from the UI. See [Bookdrop](bookdrop.md).

**Web upload:** Use the upload button in the toolbar. You can upload directly to a library or to BookDrop for staging. The default file size limit is 100 MB per file (configurable by admins).

:::warning[Cloudflare Tunnels]
If you serve Grimmory through a Cloudflare Tunnel, the free tier has a [100 MB upload limit](https://developers.cloudflare.com/workers/platform/limits/#request-limits).
:::

---

## 📱 Step 5: Start Reading

Click any book cover, then click **"Read"** to open the built-in reader. Grimmory has dedicated readers for each format:

| Reader | Formats | Highlights |
|--------|---------|------------|
| Ebook Reader | EPUB, MOBI, AZW3, FB2 | Bookmarks, annotations, highlights, search, custom fonts, progress sync |
| PDF Reader | PDF | Page-level progress sync, zoom, page spread modes, annotations |
| Comic Reader | CBZ, CBR, CB7 | Fit/scroll modes, reading direction (LTR/RTL), slideshow, bookmarks |
| Audiobook Player | M4B, MP3 | Chapters, track listing, playback speed, progress sync |

### 📲 E-Readers and Mobile Apps

Connect external reading apps via OPDS:

1. Go to **Settings > OPDS Configuration**
2. Toggle the OPDS server on
3. Copy the catalog URL shown in the API Endpoints section
4. Add it to your reading app (KOReader, Moon+ Reader, etc.)

Grimmory also provides a Komga-compatible API for apps like Tachiyomi and Komelia. OPDS uses its own user accounts, created by admins in the OPDS settings page.

See [Kobo Integration](integration/kobo.md) and [OPDS](integration/opds.md) for detailed setup guides.

---

## ⚙️ What to Explore Next

| Feature | Description |
|---------|-------------|
| [Metadata Configuration](metadata/metadata-fetch-configuration.md) | Set up automatic metadata enrichment from online sources |
| [Bookdrop Advanced Features](bookdrop-advanced.md) | Bulk editing, filename pattern extraction, and more |
| [Magic Shelf](magic-shelf.md) | Dynamic, auto-updating shelves based on filters |
| [Authentication](authentication/overview.md) | OIDC providers, multi-user setup, and permissions |

---

## ❓ Common Questions

**Can I access Grimmory remotely?**
Yes, set up a reverse proxy with HTTPS. See the [Installation Guide](installation.md).

**How do I backup my library?**
Backup your `data` directory (application state) and your books directory regularly.

**What e-readers work with Grimmory?**
Any device or app that supports OPDS. Kobo devices have a dedicated integration with deeper sync support.

---

## 🔗 Get Help

- [GitHub Issues](https://github.com/grimmory-tools/grimmory) for bug reports
- [Community Discord](https://discord.gg/vNsB8CTebs) for questions and support
