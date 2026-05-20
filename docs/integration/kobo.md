# Kobo Integration

Kobo sync lets you send books from Grimmory to your Kobo eReader and sync reading activity between both systems. Reading progress sync is bidirectional, and personal ratings set on Kobo sync back to Grimmory. You control what gets synced through a dedicated Kobo shelf: add a book to the shelf and it appears on your device, remove it and it disappears on the next sync. Your shelves and magic shelves carry over as Kobo collections, so the organization you've built in Grimmory follows you to the device.

:::info[Kobo Account Required]
Your device must be signed in to a Kobo account for this integration to function. 
:::

The integration works by redirecting your Kobo's built-in sync to Grimmory instead of the Kobo Store. Your Kobo still functions normally (store purchases, firmware updates), but it also pulls books from your Grimmory library.

:::info[File Format Support]
Kobo sync supports **EPUB** files natively. **CBX** (CBZ/CBR/CB7) files can be converted to EPUB on the fly if enabled in app settings. **PDF** files are not supported.

Admins can also enable automatic **EPUB to KePub conversion** in app settings, which adds Kobo-specific reading enhancements like better page stats and chapter navigation.
:::

---

## Reverse Proxy Configuration

If Grimmory sits behind a reverse proxy, the proxy needs to forward the right headers for Kobo sync to work. Without these, the Kobo can't authenticate or sync properly.

### Nginx

```nginx
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Port $server_port;

proxy_buffer_size 128k;
proxy_buffers 4 256k;
proxy_busy_buffers_size 256k;
large_client_header_buffers 8 32k;
```

:::info[Nginx Proxy Manager]
The proxy headers are set automatically, but you still need to add the buffer settings manually under Advanced > Custom Nginx Configuration.
:::

:::warning[Other Reverse Proxies]
If you use Caddy, Traefik, or another reverse proxy, configure equivalent forwarded headers and buffer sizes. Consult your proxy's documentation.
:::

---

## Step 1: Get Your API Token

Go to **Settings > Devices** in Grimmory and scroll down to **Kobo Sync Settings**. Your unique sync token is displayed there. Copy it.

![Grimmory Settings > Devices page showing the Kobo Sync Token and Regenerate Token button](/img/kobo/device-settings.jpg)

You can regenerate the token at any time with the **Regenerate Token** button, but you'll need to update the Kobo's config file afterward.

:::info[Permissions]
Admins have Kobo Sync enabled by default. Other users need the **Kobo Sync** permission granted by an admin (see [Granting Access to Other Users](#granting-access-to-other-users) below).
:::

---

## Step 2: Configure Your Kobo

Connect your Kobo to your computer via USB. You need to edit a configuration file on the device to point it at your Grimmory instance.

1. Enable hidden files in your file manager (the folder you need is hidden by default)
2. Navigate to the Kobo drive and open the `.kobo` folder

![Finder showing the KOBOeReader drive with the .kobo hidden folder visible](/img/kobo/config-file-location.jpg)

3. Open `.kobo/Kobo/Kobo eReader.conf` in a text editor
4. Find the `[OneStoreServices]` section and look for the `api_endpoint` line

![The original Kobo eReader.conf showing api_endpoint pointing to storeapi.kobo.com](/img/kobo/config-before.jpg)

5. Replace the `api_endpoint` value with your Grimmory URL followed by `/api/kobo/` and your token:

**Local network (no reverse proxy):**
```text
api_endpoint=http://192.168.1.100:6060/api/kobo/your-token-here
```

**Remote server (with reverse proxy and HTTPS):**
```text
api_endpoint=https://your-grimmory-domain.com/api/kobo/your-token-here
```

![The modified Kobo eReader.conf with api_endpoint pointing to the Grimmory instance](/img/kobo/config-after.jpg)

6. Save the file and safely eject your Kobo

That's the only device-side configuration needed. From now on, when your Kobo syncs, it talks to Grimmory.

---

## Step 3: Sync Books

With the Kobo configured, you control what appears on the device through the Kobo shelf in Grimmory.

1. On any book card, click the three-dot menu and select **Assign Shelf**
2. Check the **Kobo** shelf and save

![Book card context menu showing Assign Shelf option with shelf list](/img/kobo/assign-shelf.jpg)

3. Repeat for all books you want on the device. The Kobo shelf shows everything queued for sync.

![Grimmory's Kobo shelf view showing 7 books ready to sync](/img/kobo/shelf-with-books.jpg)

4. On your Kobo, go to **My Books**, tap the sync icon in the top-right corner, and tap **Sync now**

![Kobo device showing the Sync complete dialog with Sync now button](/img/kobo/sync-button.jpg)

5. Your Grimmory books appear on the device, ready to read

![Kobo device My Books screen showing the synced books from Grimmory](/img/kobo/synced-books.jpg)

---

## Shelves as Collections

Your Grimmory shelves (including magic shelves) automatically sync to the Kobo as collections. This means the shelf organization you've set up in Grimmory is mirrored on the device.

There's one important filter: only books that are in your Kobo shelf appear in collections on the device. If your "Favorites" shelf has 10 books but only 4 of those are also in the Kobo shelf, the "Favorites" collection on the Kobo shows just those 4. Shelves with no Kobo-synced books don't appear as collections at all.

This gives you full control. The Kobo shelf determines *which* books are on the device, and your other shelves determine *how* they're organized.

---

## Removing Books

### From the Kobo

1. On the device, tap the three dots on a book cover and select **Remove**

![Kobo context menu on a book showing Read now, View Details, Add to collection, Mark as finished, and Remove options](/img/kobo/remove-menu.jpg)

2. Select **Remove from My Books** and tap **Remove**

![Kobo removal dialog with Remove download and Remove from My Books options](/img/kobo/remove-confirm.jpg)

3. Tap **Sync now** to push the change back to Grimmory

![Kobo after removal showing one fewer book, with Sync complete dialog](/img/kobo/sync-after-removal.jpg)

The book is removed from your Kobo shelf in Grimmory but stays in your library. It's not deleted, just unsynced.

![Grimmory Kobo shelf after sync showing the book has been removed from the shelf](/img/kobo/shelf-after-removal.jpg)

### From Grimmory

1. Go to your Kobo shelf
2. Click the three-dot menu on the book and select **Assign Shelf**
3. Uncheck the Kobo shelf and save
4. Sync your Kobo device to apply the change

---

## Reading Progress

When you read a book on your Kobo, the reading progress syncs back to Grimmory. It appears on the book's detail page as a percentage labeled **Kobo Progress** with a progress indicator.

![Book detail page showing Kobo Progress at 11% alongside other metadata](/img/kobo/synced-progress.jpg)

Click the reset icon next to the progress to clear it in Grimmory. This does not affect the reading position on the device.

### Personal Ratings

When you rate a book on your Kobo and run sync, that rating is saved as your **Personal Rating** in Grimmory.

How it works:

1. You set a star rating on the Kobo device for a synced book.
2. The Kobo sends that rating to Grimmory when you tap **Sync now** after setting the rating.
3. Grimmory finds the matching book in your library and stores the value as your personal rating.

**Note:** Kobo ratings are converted by doubling the value (for example, 4 stars on Kobo becomes 8 in Grimmory).

---

## Granting Access to Other Users

By default, only admins have Kobo Sync enabled. To grant it to other users:

1. Go to **Settings > Users**
2. Click the edit icon on the user row
3. Enable the **Kobo Sync** checkbox
4. Save

![Settings > Users page showing the user list with permission columns including Kobo Sync](/img/kobo/user-permissions.jpg)

Once granted, the user can find their own sync token in **Settings > Devices** and follow the same setup steps. Each user gets their own token and their own independent Kobo shelf.

---

## Troubleshooting

| Problem | What to check |
|---------|---------------|
| Books not appearing on Kobo | Make sure the books are in your Kobo shelf, then trigger a sync on the device. Check that the `api_endpoint` in the config file is correct and reachable from the Kobo's network. |
| Sync hangs or fails | If behind a reverse proxy, verify the proxy headers and buffer settings are configured (see above). The Kobo sends large headers that default buffer sizes will reject. |
| "Store unavailable" on Kobo | The Kobo can't reach Grimmory. Check the URL in `api_endpoint`, make sure the port is accessible, and confirm HTTPS is working if you're using it. |
| Reading progress not syncing back | Progress syncs during the next device sync. Make sure you trigger a sync on the Kobo after reading. |
| PDF books not syncing | PDF is not supported for Kobo sync. Only EPUB (and optionally CBX with conversion) files are synced. |
| Token changed, Kobo won't sync | If you regenerated your token, update the `api_endpoint` line in the Kobo's config file with the new token. |
