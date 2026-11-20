# CARZENX — Car Loan & DSA Distributor website

React 19 + TypeScript + Vite, React Router, Lucide icons, one global stylesheet.

```bash
npm install
npm run dev       # local development
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
```

## Editing content

| What | Where |
| --- | --- |
| Phone, email, office, hours, directors, partner banks, WhatsApp | `src/data/site.ts` |
| Loan products (copy, tenures, documents, steps, FAQs, images) | `src/data/services.ts` |
| Home page FAQ | `src/data/faqs.ts` |
| Privacy Policy, Terms, Disclaimer | `src/data/legal.ts` |
| Form delivery | `src/components/forms.tsx` → `sendLead()` |

Forms (Apply, Contact, Dealer partner) validate in the browser and then open the visitor's email app with the enquiry prefilled to `support@carzenx.in`, because the site is static hosting with no server. To store leads on a server instead, replace `sendLead()` with a `fetch()` to your endpoint.

Copy avoids approval, rate or "guaranteed" claims: CARZENX is presented as a DSA that assists and routes applications, while lenders decide and disburse.

## Design

- Design system from the CARZENX design files: logo blue `#1248FF`, near-black `#07090F`, white, red `#FF1825` accent, Manrope, pill buttons, outlined numerals, dotted grey sections.
- Page structure takes cues from automotive-fintech sites (benefit tiles, stats strip, audience tabs for buyers / dealers / lenders, product grid, EMI tool, partner strip), rewritten for CARZENX.
- Plain React + CSS: one stylesheet (`src/styles/global.css`), CSS keyframe animations and an IntersectionObserver reveal (`src/hooks/useReveal.ts`). Everything respects `prefers-reduced-motion`.
- Pages: Home, About, Loans (`/services`), one page per loan (`/services/:id`), Dealer Network, Apply (3-step form), Contact, Privacy Policy, Terms & Conditions, Disclaimer, 404.
- The previous design's source is backed up (git-ignored) in `_src/old-design-backup/`.

## Media & licences

All media is self-hosted in `public/`.

- Hero video: original 8s seamless loop built with Remotion (project `E:\website\motion ai\carzenx-hero`, composition `CarzenxHero`, 1920×1080 @ 30fps). Encoded to `public/videos/carzenx-hero.mp4` (1920px) and `carzenx-hero-mobile.mp4` (960px, used ≤768px). Poster: `public/images/hero-poster.webp`. Swap the files to change the footage.
- Photography: Pexels (free Pexels licence), converted to WebP at 800px and 1600px (`public/images/<name>-800.webp` / `-1600.webp`). Pexels IDs: 14667492, 3786092, 7144207, 12565887, 17081564, 4895440, 7144261, 8482859, 16176576, 213165, 9284184, 36729855, 19477337, 37426530, 5111946, 3876397.

## Structure

```
src/
  components/  Header, Footer, EmiCalculator, forms (Apply/Contact/Partner form parts), ui (Img, Logo, Seo,
               SectionHead, PageHero, ServiceCard, Steps, Faq, CtaBand)
  pages/       Home, About, Services, ServiceDetail, DealerNetwork, Apply, Contact, Legal, NotFound
  hooks/       useReveal (scroll reveal)
  data/        site.ts, services.ts, faqs.ts, legal.ts
  styles/      global.css (design system)
```

Add `className="rv"` to any element to fade it up on scroll; `.tl` timelines draw their line when visible.

## Hosting

It's a single-page app, so the host must rewrite unknown paths to `index.html` (e.g. Netlify `_redirects`: `/* /index.html 200`, Vercel rewrites, or an Apache/Nginx fallback).
