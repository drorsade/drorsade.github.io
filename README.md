# קלפי משפטים מחזקים — דף נחיתה

Landing page for דרור שדה's affirmation card deck. Static HTML/CSS/JS — no build step,
no dependencies, no backend. Deployed on GitHub Pages.

## Local preview

```bash
open index.html
```

That's it. There is nothing to install and nothing to compile.

## The one thing you'll need to change: the payment link

Payments run through **Morning (חשבונית ירוקה)**. Create a *דף מכירה* or *לינק לתשלום*
there, then paste the URL into the top of `script.js`:

```js
const MORNING_URL = "https://…";   // ← paste here
```

Every buy button on the page picks it up automatically.

Until that string is filled in, the buy buttons open a **pre-filled WhatsApp order message**
instead. That's deliberate: the page is sellable from day one, and it keeps working even if
JavaScript fails to load.

## Editing content

| What | Where |
|---|---|
| The card phrases in the hero | `PHRASES` array in `script.js` |
| Price, specs, FAQ, all page copy | `index.html` |
| Colors and fonts | `:root` block at the top of `styles.css` |
| Photos and video | `assets/` |

Brand values, already wired into `styles.css`:

- Text and birds — `#584F4C`
- Backgrounds — `#F0DFD8`, `#E8CFC7`
- Headings — Frank Ruhl Libre · Body — Assistant

## Assets

Everything in `assets/` is already compressed for web (photos ~250–350 KB, video 1.3 MB
down from 35 MB). If you add new photos, resize them first — a raw phone photo is
5–7 MB and will make the page slow on mobile:

```bash
sips -Z 1600 -s format jpeg -s formatOptions 80 IMG_1234.JPG --out assets/new-photo.jpg
```

For video, **always pass `-pix_fmt yuv420p`**. Homebrew's ffmpeg is built against a 10-bit
x264, and its default output is H.264 High 10 — which no browser can decode. It encodes and
plays fine locally, then silently fails on the web:

```bash
ffmpeg -i clip.MP4 -vf "scale=-2:720" -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 28 -movflags +faststart -c:a aac -b:a 96k assets/new-video.mp4
```

## Deploying

Hosted on GitHub Pages from the `main` branch, root folder.
Settings → Pages → Source: `main` / `/ (root)`. Pushing to `main` publishes.

`.nojekyll` is present so GitHub serves the files as-is.

## Before launch

- [ ] Paste the Morning payment URL into `script.js`
- [ ] Fill in the עוסק number and returns address in `takanon.html` (marked `[להשלמה]`)
- [ ] Have a lawyer glance at `takanon.html` / `privacy.html` — they're solid templates,
      not legal advice
- [ ] Update `og:url` / `canonical` in `index.html` to the real domain
- [ ] Check the page on a real iPhone
