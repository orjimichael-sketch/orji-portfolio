# Deploying the portfolio to production

This guide takes the site from this machine to a live URL with a working
contact form. Order matters: GitHub first, then Vercel, then the domain.

---

## 0. Prerequisites

- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (sign in **with GitHub** — one click)
- A [Formspree](https://formspree.io) account with a created form and its
  **Form ID** (the `xyzabcd` part of `https://formspree.io/f/xyzabcd`)
- A domain — buy one when ready (Namecheap or Cloudflare, ~$10–15/yr).
  Everything else works without it; Vercel gives you a free `*.vercel.app`
  URL to start.

---

## 1. Push the code to GitHub

```bash
cd orji-portfolio
git init            # if not already a repo
git add -A
git commit -m "Portfolio site — production ready"
```

Create a new **empty** repository on GitHub (no README, no license — the
repo isn't empty), then:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

> `.env.local` is git-ignored — your Formspree ID never enters the repo.
> That's intentional; secrets are configured per-platform (step 2).

## 2. Import into Vercel

1. [vercel.com/new](https://vercel.com/new) → **Import** the repository.
2. Framework preset: **Next.js** (auto-detected). Build settings: leave as-is.
3. Before clicking Deploy, open **Environment Variables** and add:

   | Key | Value |
   | --- | --- |
   | `FORMSPREE_FORM_ID` | your Formspree form ID (no quotes) |

4. **Deploy.** In ~a minute you'll have a live `https://<project>.vercel.app`.
5. Test the contact form on the deployed URL — it should deliver to the
   inbox configured in your Formspree dashboard.

Every future `git push` to `main` auto-deploys.

## 3. Connect your domain

Once you've bought the domain:

1. **Vercel**: project → Settings → Domains → add `yourdomain.com` (and
   `www.yourdomain.com`). Vercel shows you exactly which records it needs —
   the usual ones are:
   - `A` record, name `@`, value `76.76.21.21`
   - `CNAME`, name `www`, value `cname.vercel-dns.com`
2. **Registrar DNS panel** (Namecheap/Cloudflare): add those records exactly.
   In Cloudflare, set them to **DNS only** (grey cloud), not proxied.
3. Wait for DNS to propagate (minutes to a few hours). Vercel issues SSL
   automatically once records resolve.

## 4. Point the site at the real domain

In `src/content/site.ts`, replace the placeholder:

```ts
siteUrl: "https://yourdomain.com",
```

This single value drives the canonical URL, Open Graph/Twitter metadata,
`sitemap.xml`, `robots.txt`, and JSON-LD. Commit + push — Vercel redeploys.

## 5. Post-deploy checklist

- [ ] Site loads on the production URL, HTTP→HTTPS redirect works
- [ ] Contact form submits and the message arrives in your inbox
      (check Formspree's Submissions tab if not)
- [ ] Share the URL in a chat app — the link preview shows the OG card
- [ ] `https://yourdomain.com/sitemap.xml` and `/robots.txt` resolve
- [ ] Lighthouse run (Chrome DevTools) — aim for 90+ across the board
- [ ] `wa.me`, LinkedIn, GitHub links open correctly

## Troubleshooting the form

| Symptom | Cause / fix |
| --- | --- |
| "The form isn't configured yet" | `FORMSPREE_FORM_ID` missing in Vercel env vars — add it, then **redeploy** |
| "The form endpoint rejected this submission" | Wrong form ID, or Formspree's verification email was never confirmed |
| Messages arrive but Reply goes nowhere | Expected — Formspree sets the visitor as reply-to; just hit Reply |
