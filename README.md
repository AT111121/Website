# Ankur Tripathi — website (Astro + Sveltia CMS)

Your personal site with a real content engine: write articles, carousels and
infographics in a browser dashboard, and they publish automatically. SEO/AEO
(schema, sitemap, RSS, canonical tags) is built in.

You do **not** need to install anything on your computer or use a terminal.
Cloudflare builds the site for you in the cloud.

---

## What's inside
- `src/pages/` — homepage, writing hub, article pages, FAQ, thank-you
- `src/content/` — your posts (articles + visuals). The CMS writes here for you.
- `public/admin/` — your writing dashboard (Sveltia CMS)
- `enquiry-to-sheet-Code.gs` — the Google Sheet form backend
- SEO baked in: JSON-LD (Person, Article, FAQ), sitemap, RSS, Open Graph

---

## ONE-TIME SETUP

### Step 1 — Put the code on GitHub (free)
1. Create an account at github.com.
2. Click **New repository** → name it e.g. `website` → keep it Public → Create.
3. On the empty repo page click **uploading an existing file**.
4. Drag in **all the files and folders from this project EXCEPT** `node_modules`
   and `dist` (you won't have those if you didn't run anything — good).
5. Click **Commit changes**.

### Step 2 — Deploy on Cloudflare Pages (free hosting)
1. In Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick your repo. Cloudflare auto-detects **Astro** (build command `npm run build`,
   output `dist`). Click **Save and Deploy**.
3. In ~1 minute you're live on a `…pages.dev` link.

### Step 3 — Connect your domain
- In the Pages project → **Custom domains** → add `ankurtripathi.net` and
  `www.ankurtripathi.net`. DNS + SSL are automatic (domain's already in Cloudflare).
- Open `astro.config.mjs` → set `site` to your real domain → commit. (Powers
  sitemap, RSS, canonical and social links.)

### Step 4 — Turn on the enquiry form → Google Sheet
Follow the steps inside **`enquiry-to-sheet-Code.gs`**. In short: create a Google
Sheet → Extensions → Apps Script → paste that file → Deploy as Web app → copy the
URL → paste it into `src/pages/index.astro` where it says
`PASTE_YOUR_APPS_SCRIPT_URL_HERE` → commit. Enquiries now save to your Sheet, email
you, and auto-reply to the sender.

### Step 5 — Turn on the writing dashboard (CMS login)
Sveltia CMS needs to log in to GitHub. The clean, free way is a tiny auth worker:
1. Go to **github.com/sveltia/sveltia-cms-auth** and click its **Deploy to
   Cloudflare** button. Deploy the worker. Copy its URL (ends in `.workers.dev`).
2. On GitHub → Settings → Developer settings → **OAuth Apps** → New OAuth App:
   - Homepage URL: your site, e.g. `https://www.ankurtripathi.net`
   - Authorization callback URL: **your worker URL** from step 1, with `/callback`
3. Copy the **Client ID** and generate a **Client Secret**.
4. In Cloudflare → your worker → Settings → Variables, add `GITHUB_CLIENT_ID`,
   `GITHUB_CLIENT_SECRET`, and `ALLOWED_DOMAINS` (your domain). Save.
5. Open `public/admin/config.yml` → set `repo:` to `your-username/your-repo`, and
   uncomment `base_url:` with your worker URL → commit.

(Simpler fallback if the worker feels like too much: Sveltia also supports logging
in with a GitHub Personal Access Token — see the Sveltia docs. The worker just
gives a nicer "Sign in with GitHub" button.)

### Step 6 — Publish
Go to `https://www.ankurtripathi.net/admin/` → sign in with GitHub → write a post
→ Publish. It commits to GitHub, Cloudflare rebuilds, and it's live in ~1 minute.
You can do this from your phone too.

---

## Things to personalise
- **Your X link:** in `src/pages/index.astro` and `src/components/Seo.astro`, replace the `#` / comment with your X profile URL.
- **Your headshot:** drop a photo in `public/images/`, then in `src/pages/index.astro` replace the `<div class="portrait">…</div>` block with `<img src="/images/your-photo.jpg" alt="Ankur Tripathi" style="width:100%;height:100%;object-fit:cover">`.
- **FAQ answers:** edit the `faqs` list in `src/pages/faq.astro`.

## Optional: preview on your own computer
Install Node.js, then in this folder run `npm install` and `npm run dev`.
