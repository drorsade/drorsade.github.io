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

## Thank-you page

`thankyou/index.html` is where Grow sends the customer after a successful payment
(`https://drorsade.github.io/thankyou`). It is a directory with an `index.html`
rather than `thankyou.html`, so the URL resolves with or without a trailing slash.

It is `noindex` — a confirmation page should never appear in search results — and
it loads `analytics.js`, which makes it a **conversion counter**: a pageview on
`/thankyou` is a completed purchase. That is the one number Cloudflare Web
Analytics cannot otherwise give you, since it has no custom events.

## Analytics

GitHub Pages provides **no** analytics. (The repo's Insights → Traffic tab counts
visits to the *repository page*, not to the site.)

`analytics.js` is wired into every page but stays completely inert — it makes no
network request — until a token is set:

1. Sign up free at <https://dash.cloudflare.com> (the domain does **not** need to
   be hosted on Cloudflare)
2. **Analytics & Logs → Web Analytics → Add a site**, enter `drorsade.github.io`
3. Copy the token out of the snippet Cloudflare shows
4. Paste it into `CF_ANALYTICS_TOKEN` in `analytics.js`
5. **Update section 3 of `privacy.html`** in the same change — it currently states
   that the site runs no analytics, which stops being true the moment the token
   is set

Cloudflare Web Analytics is cookieless and collects no identifying data, so it
needs no consent banner. It reports pageviews, referrers, countries and devices —
but **not custom events**, so it cannot count buy-button clicks. If that number
matters, Plausible (~$9/month) supports events and would replace this.

## Cache busting

CSS and JS are linked with a version query — `styles.css?v=2`. There is no build
step here, so browsers will happily serve a stale stylesheet against new HTML,
which has broken the layout more than once. **After editing `styles.css`,
`script.js` or `contact.js`, bump the number in every HTML file:**

```bash
sed -i '' 's/?v=2/?v=3/g' *.html
```

## Deploying

Hosted on GitHub Pages from the `main` branch, root folder.
Settings → Pages → Source: `main` / `/ (root)`. Pushing to `main` publishes.

`.nojekyll` is present so GitHub serves the files as-is.

## TODO

### Blockers — the page can't take a real order until these are done

- [ ] **Morning payment URL** → `MORNING_URL` in `script.js` (currently `""`).
      Until it's set, every buy button opens a pre-filled WhatsApp order and payment
      is handled manually.
The מספר עוסק and returns address in `takanon.html` are both filled in — no
placeholders remain.

> **Tax status:** דרור is an **עוסק פטור** (301107819). She may not charge מע״מ
> and may not issue a חשבונית מס, so the site says **קבלה** throughout and states
> that the price carries no מע״מ. If she ever becomes an עוסק מורשה, both need
> revisiting.

### Legal

- [ ] Lawyer to review `takanon.html` and `privacy.html`. They cover חוק הגנת הצרכן
      and are a solid starting nusach, but they are templates, not legal advice.
      `accessibility.html` is complete and matches what the site actually does.

### Publishing

- [ ] Re-enable GitHub Pages when ready (Settings → Pages → `main` / root)
- [ ] While Pages is off, `canonical` and `og:image` in `index.html` point at a URL
      that returns 404. Harmless offline, but they must be corrected before
      republishing or sharing any link.
- [ ] Custom domain — deferred. Needs A/AAAA records for the apex plus a `www`
      CNAME to `drorsade.github.io`, then `canonical` / `og:url` / `og:image` updated.

### Verification not yet done

- [ ] Open the page on a real iPhone. Hebrew rendering in mobile Safari is the one
      thing desktop and headless testing can't confirm.
- [ ] Test one full purchase end to end once the Morning link is live: click the
      button, pay, confirm the invoice email arrives.

### Optional / when the content exists

- [ ] Testimonials section — deliberately omitted rather than faked. Say the word
      once there are real quotes.
- [ ] Courier orders (₪250 incl. ₪30 delivery) currently go through WhatsApp only.
      Direct purchase would need a second Morning link and a second button.
- [ ] Analytics (GA4 or Plausible) — roughly a 5-line addition, none present today.

### Notes

- The repo is **public**, which GitHub requires for Pages on a free account.
  If it's made private, Pages stops publishing.
- `.local-source/` holds two unused full-resolution card designs, gitignored so
  they aren't published.
- Commits are authored `netisade@gmail.com`, visible in the history while the repo
  is public.
