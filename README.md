# Orji Michael — Portfolio

Personal portfolio for Orji Michael, full-stack developer & digital professional.
Single-page Next.js app in a light, card-based editorial style.

## Stack

- **Next.js 16** (App Router) · React 19 · TypeScript
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **Outfit** via `next/font` · inline SVG icons (no icon library)
- **Resend** for contact-form email delivery

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## Configuration

Copy `.env.example` → `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Sends contact-form emails |
| `CONTACT_TO_EMAIL` | Inbox that receives messages |
| `CONTACT_FROM_EMAIL` | Optional verified sender identity |

Without these the form degrades gracefully with an honest "not configured" message.

## Structure

```
src/
  app/            # layout, page, api/contact, sitemap, robots, OG image, 404
  components/     # one component per section + ui/ primitives
  content/site.ts # SINGLE SOURCE OF TRUTH for all site content
  lib/            # inline social icons
```

To change anything shown on the site, edit `src/content/site.ts`.

## Before launch

Work through **[CONTENT-CHECKLIST.md](./CONTENT-CHECKLIST.md)** — it lists every
placeholder (email, socials, project links, screenshots, stats) and the sample
testimonials that must be replaced with real quotes.

## Design notes

- Light "card on canvas" system: white rounded section cards on a pale gray field
- `● Label` eyebrows, pill buttons, big display type (Outfit)
- Reduced-motion and no-JS fallbacks keep all content accessible
- SEO: metadata, canonical, JSON-LD `Person`, `sitemap.xml`, `robots.txt`, generated OG image
