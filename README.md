# CARZENX — Car Loan & DSA Distributor website

React 19 + TypeScript + Vite, React Router, GSAP (ScrollTrigger), Framer Motion, Lenis, Lucide icons, CSS Modules.

```bash
npm install
npm run dev       # local development
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
```

## Before going live — replace the placeholders

No verified public CARZENX information (contact details, address, social profiles) could be found, so nothing was invented.

| What | Where |
| --- | --- |
| Phone, email, office address, business hours | `src/data/site.ts` → `site.contact` (set `value`, add `href` such as `tel:` / `mailto:`, set `placeholder: false`) |
| Production domain (canonical + Open Graph URLs) | `src/data/site.ts` → `site.url` |
| Official social profiles (footer) | `src/data/site.ts` → `site.social` |
| Enquiry form submission (currently simulated) | `src/pages/Contact.tsx` → `onSubmit` (`TODO` comment) |
| Services copy | `src/data/services.ts` |

Copy deliberately avoids approval, rate or "guaranteed" claims: CARZENX is presented as a DSA that assists and routes applications, while lenders decide and disburse. A disclosure line lives in `src/data/site.ts` → `disclosure`.

## Brand

- Logo: `public/images/carzenx-logo.png` (background removed from the supplied artwork, colours untouched) and a 720px version. The tagline in the logo is black, so the logo is only placed on light surfaces (header, loader, footer).
- Colours from the logo: blue `#0A45F5`, red `#F0141A`, ink `#0B0D12`, white / mist neutrals — tokens in `src/styles/global.css`.
- Type: Manrope (display + body), Space Grotesk (labels / numerals).

## Media & licences

All media is self-hosted in `public/`.

- Hero video: "Car Driving at Night" by Erik Mclean, Pexels (free Pexels licence) — https://www.pexels.com/video/car-driving-at-night-13643105/. Re-encoded to `public/videos/carzenx-hero.mp4` (1920px) and `carzenx-hero-mobile.mp4` (960px, used ≤768px). Poster: `public/images/hero-poster.webp`. Swap the files to change the footage.
- Photography: Pexels (free Pexels licence), converted to WebP at 800px and 1600px (`public/images/<name>-800.webp` / `-1600.webp`). Pexels IDs: 14667492, 3786092, 7144207, 12565887, 17081564, 4895440, 7144261, 8482859, 16176576, 213165, 9284184, 36729855, 19477337, 37426530, 5111946, 3876397.

## Structure

```
src/
  components/  Header, Footer, LoadingScreen, Hero, PageHero, SectionTitle, CTAButton,
               ServiceCard, ProcessSection, ImageReveal, PageTransition, CTASection,
               Marquee, Cursor, SplitText, WordsReveal, Img, Logo, Seo
  pages/       Home, About, Services, Contact, NotFound
  hooks/       useLenis, useScrollAnimation, gsap (plugin registration)
  data/        services.ts, site.ts
  context/     IntroContext (signals when the loading screen has finished)
```

Scroll animations are declarative: add `data-reveal`, `data-reveal="stagger"`, `data-parallax="0.15"` or use `<WordsReveal>` inside any page that calls `useScrollAnimation`. Everything respects `prefers-reduced-motion`.

## Hosting

It's a single-page app, so the host must rewrite unknown paths to `index.html` (e.g. Netlify `_redirects`: `/* /index.html 200`, Vercel rewrites, or an Apache/Nginx fallback).
