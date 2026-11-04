# Play Place International School — Website

Public website for Play Place International School (a unit of Yasir Ali Classes): school information for parents and the Play Place preschool franchise ecosystem.

It is a **frontend-only** React site. There is no backend, database, login or form storage. Enquiry forms validate in the browser and then open WhatsApp or the visitor's email app with a prefilled message.

## Stack

- React 19 + Vite 8
- React Router 7 (pages are lazy-loaded)
- Tailwind CSS 4 (design tokens in `src/index.css` → `@theme`)
- Deployed on Vercel (`vercel.json`: SPA fallback, legacy redirects, cache headers)

## Commands

```bash
npm install
npm run dev       # local dev server
npm run lint      # ESLint
npm run build     # production build + SEO pre-render → dist/ (one HTML file per page)
npm run preview   # serve the production build
```

No environment variables are needed.

## SEO

`npm run build` pre-renders every page to static HTML (`scripts/prerender.mjs`), so search engines and WhatsApp/Facebook previews see the full content without JavaScript. Each page gets:

- a unique title, description and canonical URL (edit them in `src/data/seo.js`);
- Open Graph and Twitter tags, plus a preload hint for the hero image;
- schema.org JSON-LD (Preschool/LocalBusiness, WebSite, WebPage, BreadcrumbList, and FAQPage on Admissions and Franchise), built in `src/lib/seoHead.js` from verified facts only.

The build also writes `sitemap.xml` (with image entries) and a real `404.html`, which Vercel serves with a 404 status. To verify Google Search Console with an HTML tag, paste the code into `SITE.googleSiteVerification` in `src/config/site.js`.

## Where things live

| What | Where |
|---|---|
| Contact details, WhatsApp/email hand-off, domain | `src/config/site.js` |
| Page content (pillars, process, FAQ, teams, programmes, stats, photos…) | `src/data/*.js` |
| Per-page titles and descriptions | `src/data/seo.js` |
| Shared UI (Button, PastelCard, StatsStrip, CheckList, FramedPhoto, Mark, Doodle, Accordion, PageHero…) | `src/components/ui/` |
| Header, footer, layout | `src/components/layout/` |
| Reusable page sections | `src/components/sections/` |
| Enquiry forms | `src/components/forms/` |
| Pages and routes | `src/pages/`, `src/App.jsx` |
| Items awaiting management approval | `docs/MANAGEMENT_REVIEW.md` |

### Adding an icon

Icons use a **subset** of Material Symbols Rounded. If you use a new icon name, add it to the alphabetical `icon_names=` list in `index.html`, otherwise it will show as text.

### Adding photos

Put resized WebP files (960px and 560px wide) in `public/images/school/` and register them in `PHOTOS` in `src/data/school.js` with meaningful alt text.

## Content rules

Do not publish franchise fees, investment, ROI, branch or student numbers, accreditation, awards, testimonials or invented contact details unless management has approved them. See `docs/MANAGEMENT_REVIEW.md`.
