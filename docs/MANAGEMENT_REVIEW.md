# Management Review Checklist — Play Place Website

Everything on this list is either a draft, a placeholder, or something only management can confirm.
Nothing here should go live until it is approved (PRD §10, §14). File references show where each item lives so it can be changed quickly.

## 1. Contact and enquiry hand-off

| Item | Current value | Where | Decision needed |
|---|---|---|---|
| WhatsApp number for enquiries | 073029 88040 (the only number shown on the site; the second number +91 7302988041 was removed on the owner's instruction) | `src/config/site.js` → `ENQUIRY.whatsappNumber` | Is this number on WhatsApp and approved for **franchise** leads? Set to `null` to hide the WhatsApp option. |
| Enquiry email | playplaceinternationalschool4@gmail.com | `ENQUIRY.email` | Should franchise enquiries go to a separate address? |
| Address, phones, hours, map | Carried over from old site | `CONTACT` | Confirm still correct. |
| Social links | Instagram only | `SOCIAL` | Any other approved channels (Facebook, YouTube, LinkedIn)? |
| Consent checkbox wording | "I agree that Play Place may contact me about this enquiry…" | `src/components/forms/enquiryForms.jsx` → `CONSENT` | Approve wording. |

## 2. Brand

- [ ] **Logo**: only a 100×100 PNG exists (`public/favicon.png`). Please supply a high-resolution PNG or SVG logo.
- [ ] **Colours**: navy `#142D55`, coral red `#E5483B` (buttons), green `#5FB236` and yellow `#F8C63D` from the logo, plus pastel backgrounds (`src/index.css` → `@theme`).
- [ ] **Fonts**: Fredoka (headings) and Nunito (body text), a rounded, friendly pairing.
- [ ] **Positioning line**: "A Scalable, Tech-Enabled Preschool Network".
- [ ] **Attribution**: "A unit of Yasir Ali Classes" is used everywhere. The small text inside the logo image appears to read differently; please confirm the logo artwork is current.

## 3. Statements that need approval

- [ ] **Vision** (Home, About): "To build a trusted, high-quality and future-ready preschool network…" (the PRD's suggested concept).
- [ ] **Mission** (About): adapted from the old website's mission text.
- [ ] **Homepage hero and CTA headlines**: the PRD's suggested copy.
- [ ] **Academics copy**: describes lesson plans, teacher guidance and a play-based approach at the school. Please confirm this matches practice. **No EYFS/NEP alignment is claimed**; tell us if one should be added and what the exact wording is.
- [ ] **Eight pillars**, **10 partner support categories**, **headquarters vs. partner responsibilities** (`src/data/pillars.js`, `src/data/franchiseBenefits.js`): all are labelled as proposed and subject to the franchise agreement.
- [ ] **Seven-step process** (`src/data/franchiseProcess.js`): no durations are shown.
- [ ] **Teams** (`src/data/teams.js`): purpose statements only, no staff names.
- [ ] **Roadmap**: removed from the public site at the owner's request (franchise section simplified).
- [ ] **Quality & Support** (`src/data/qualitySupport.js`): no audit frequencies or response times are promised.
- [ ] **Franchise FAQ** (`src/data/faq.js`): **every answer needs approval.** Answers deliberately avoid fees, investment, ROI, territory and timelines.

## 4. Digital products

At the owner's request, the separate Digital Ecosystem page (website / app / LMS / MIS / CRM) was **removed** to keep the franchise message simple (`/digital-ecosystem` now redirects to `/franchise-ecosystem`). Technology appears only as pillar 3, "Technology Support", described as *planned* digital tools.
- [ ] Confirm that the "planned" wording is acceptable.

## 5. Photographs

All photos are the school's own images from the old website, converted to WebP (`public/images/school/`).
- [ ] **Publication permission** for photos showing **identifiable children**, flagged `identifiable: true` in `src/data/school.js`: `friends-corridor`, `reading-activity`, `student-smile`. These appear only on the Gallery page.
- [ ] Group and classroom photos used on the other pages also show children. Please confirm parental consent covers website use.

### Page banner images (AI-generated)
- [ ] The 7 page-header banners in `public/images/hero/` (Home, About, Academics, Admissions, Franchise, Franchise Ecosystem, Quality & Support) were **generated with Google Flow (AI)** at the owner's request, to match the design reference. They are illustrative and **do not show Play Place, its staff or its pupils**. Confirm management is happy to use them, or replace them with real photos of the same shape (landscape, subject on the right). The Gemini watermark was removed; the images still carry Google's invisible SynthID marking.
- [ ] The social-share image (`public/images/og-image.jpg`) is cropped from the Home banner.

## 6. Legal pages

- [ ] **Privacy Policy** and **Terms of Use** (`src/pages/LegalPage.jsx`) are drafts that describe how this website actually works. They need management or legal review.

## 7. Removed from the previous site

- **Parent and admin portals** (`/login`, `/admin/*`, `/parent/*`): removed and redirected to `/`. Staff and parents who used them need to be told.
- **School calendar** (`/calendar`): removed (it was database-driven) and redirected to `/contact`.
- **Online admission form with photo upload**: replaced by an admission enquiry that opens WhatsApp or email. Nothing is stored.
- **Unverified claims removed**: "Founded in 2010", "First Graduating Class 2016", "New Campus Wing 2022", the placeholder "Principal Elena Martinez" section, "500+ Happy Memories", "best junior school" SEO wording, and remote AI-generated placeholder images.
- The Supabase project and its data were **not** touched. Only the website's dependency on it was removed. The schema is archived at `docs/archive/supabase-schema.sql`, and the full old code is in git tag `pre-franchise-rebuild`.

## 8. Launch

- [ ] Review the Vercel **preview deployment** of branch `franchise-rebuild` before replacing the live site.
- [ ] Final approver: _name_

## 9. Stats strip (homepage)

The design reference uses numbers such as "25+ teachers" and "12+ years". We have **not** invented these. The strip shows only facts about our own model: 4 classes, 6 development areas, 8 pillars, 7 steps.
- [ ] If management can confirm real school figures (teachers, years running, children taught), they can replace these in `STATS` in `src/data/school.js`.
