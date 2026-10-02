# Content Checklist — placeholders to replace before launch

Everything on the site is driven by **`src/content/site.ts`** (single source of truth).
Search it for `PLACEHOLDER` to find every item below. Nothing else hardcodes content.

## Identity & contact

| What | Where in `src/content/site.ts` | Notes |
| --- | --- | --- |
| ~~Real email address~~ ✅ Done | `profile.email` → `orjim336@gmail.com` | Used in contact form fallback, footer, mobile menu, JSON-LD |
| Production domain | `profile.siteUrl` (currently `https://orji-michael.dev` — PLACEHOLDER) | Used for metadata, sitemap, robots, OG image |
| ~~LinkedIn URL~~ ✅ Done | `socials[0].href` → `https://linkedin.com/in/orji-michael` | Footer, contact, mobile menu, JSON-LD |
| ~~GitHub URL~~ ✅ Done | `socials[1].href` → `https://github.com/orjimichael-sketch` | Same |
| ~~WhatsApp number~~ ✅ Done | `socials[2].href` → `https://wa.me/2348153153650` (local 0815 315 3650, international format) | Same |

## Photo

| What | Where | Notes |
| --- | --- | --- |
| ~~Portrait~~ ✅ Done | `public/portrait.jpg` (from `Pictures/IMG_1764.JPG`) | Shown in the hero's split media card, cropped with `object-[center_28%]` — swap the file to update the photo, no code change needed. Optimized: 1242w → 1080w mozjpeg q82 (665 KB → 296 KB, PSNR 37.8 dB); master stays in Pictures |

## Projects (each project in `projects[]`)

| What | Where | Notes |
| --- | --- | --- |
| ~~Elysian Market live URL~~ ✅ Done | `projects[0].links.live` → `https://elsyian-market.netlify.app` | "Visit site" link appears only when set |
| ~~Logistics Platform live URL~~ ✅ Done | `projects[1].links.live` → `https://crownshine-logistics.vercel.app` + `preview.domain` | "Visit site" link and the browser-frame URL bar now show the real domain |
| ~~Tech Quiz Platform live URL~~ ✅ Done | `projects[2].links.live` → `https://jsqu.netlify.app` | "Visit site" link appears only when set |
| GitHub URLs | `projects[n].links.github` | "Source" link appears only when set — skipped for now per your choice |
| ~~Elysian Market screenshot~~ ✅ Done | `public/projects/elysian-market.jpeg` + `projects[0].preview.image` | Tall full-page capture — pans on hover over the frame. Optimized: 1900w → 1200w mozjpeg q78 (1.63 MB → 152 KB, PSNR 37.2 dB); master stays in Downloads |
| ~~Logistics Platform screenshot~~ ✅ Done | `public/projects/logistics-platform.jpeg` + `projects[1].preview.image` | Re-cut to exact 4:3 (1200×900) so it fills the preview frame at every breakpoint: cropped to the clean hero (baked-in stats strip, OS watermark, and chat widget removed — **none of the client's stats were copied into the card**), bottom edge extended with sampled hero navy (invisible). Optimized: 1205×838 crop → 1200w mozjpeg q78 (108 KB, PSNR 35.7 dB); master stays in Pictures/Screenshots. URL bar shows "Live link coming soon" until the real domain is set |
| ~~Tech Quiz Platform screenshot~~ ✅ Done | `public/projects/tech-quiz-platform.png` + `projects[2].preview.image` | Renamed to "J's Quiz" to match the product's real brand |
| ~~Metro Tulip live URL~~ ✅ Done | `projects[3].links.live` → `https://metrotulip-website.netlify.app` | Fourth project card, "Hospitality" |
| ~~Metro Tulip screenshot~~ ✅ Done | `public/projects/metrotulip.jpeg` + `projects[3].preview.image` | Tall full-page capture — pans on hover over the frame. Optimized: 1896w → 1200w mozjpeg q78 (3.36 MB → 268 KB, PSNR 36.9 dB); master stays in Downloads |
| Stat numbers | `projects[n].stats` | Currently descriptive placeholders ("Full-Stack", "3 flows"…). Replace with real metrics (users, uptime, revenue, etc.) when they exist. **Never invent numbers.** |

## Testimonials

| What | Where | Notes |
| --- | --- | --- |
| ~~Real quotes~~ ✅ Done | `testimonials[]` in `src/content/site.ts` | All three are real, published as given by each person (only lightly formatted): Sodiq Oladeni — Founder, Notzero Innovation Hub; Debbie Aderinsola — Product Manager; Mrs. Okewoye — Ambassador, Lush Hair. `sample: false` — no Sample tags render. **Never publish sample quotes as real.** |

## Email delivery (contact form)

State: `.env.local` (git-ignored) holds `FORMSPREE_FORM_ID` — paste your real Formspree form ID there. Formspree delivers to the inbox configured in its dashboard (set it to `orjim336@gmail.com`). Full walkthrough in [DEPLOY.md](DEPLOY.md).

1. Paste the form ID into `FORMSPREE_FORM_ID` in `.env.local` (local) and in Vercel's environment variables (production)
2. In the Formspree dashboard, confirm the verification email and set the delivery inbox to `orjim336@gmail.com`
3. Restart the server — env vars are read at boot
4. No DNS or domain verification needed — that's why Formspree replaced Resend

Failure behavior: missing ID → "form isn't configured" (503); rejected ID → "form endpoint rejected this submission" (502); both surface in the form's error banner with a mailto fallback, instead of failing silently.

## Optional polish

- `about.paragraphs` / `about.facts` — adjust wording as your story evolves
- `faq[]` — answers are derived only from facts already in this file; extend as needed
- `hero.meta`, `availability.items` — keep in sync with reality
- Favicon/OG monogram: `src/app/icon.svg` + `src/app/opengraph-image.tsx`
