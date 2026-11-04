# PLAY PLACE INTERNATIONAL SCHOOL

## Product Requirements Document (PRD)

### Corporate Website & Franchise Ecosystem --- Frontend-Only Rebuild

**Status:** Planning brief for Claude Code\
**Product:** Play Place International School, Unit of Yasir Ali Classes\
**Project:** Rebuild the existing React website and remove its Supabase
backend dependency.

------------------------------------------------------------------------

# 1. Executive Summary

Play Place wants to grow from an individual preschool/school into a
scalable preschool franchise network. The senior's plan describes a
complete ecosystem that helps franchise partners launch, operate and
grow Play Place schools in different cities.

The ecosystem includes academic curriculum, learning resources,
technology, staff training, branding and marketing, infrastructure,
quality assurance and operational systems.

**This project is only the public-facing website.** It explains the Play
Place brand, school approach, franchise opportunity and the support
ecosystem. It does not build the actual ERP, CRM, LMS, mobile app or
backend systems.

The existing website is custom-coded in React and currently has a
Supabase backend. The rebuild must remove the website's dependency on
Supabase and use static/local content. Do not create a replacement
backend.

## Product vision

Create a professional, friendly, modern and responsive website that: -
Builds trust in the Play Place brand. - Explains the preschool and
educational approach. - Explains the franchise model and support. -
Presents all eight pillars of the ecosystem. - Explains the seven-step
franchise expansion process. - Introduces the future digital ecosystem
accurately. - Encourages potential franchise partners to contact Play
Place. - Preserves useful school information for parents and local
visitors.

**Positioning:** Play Place International School --- A Scalable,
Tech-Enabled Preschool Network.

Suggested supporting message: "An end-to-end preschool franchise
ecosystem designed to help partners launch, operate and grow
high-quality early childhood education centres through a consistent
brand, structured academic resources, operational guidance and
technology."

Management must approve final marketing claims before publication.

------------------------------------------------------------------------

# 2. Business Context

## 2.1 What Play Place is planning

Play Place aims to create a franchise model for preschool education. A
franchise partner should receive more than permission to use the school
name. The proposed support model includes:

-   Brand licence and usage rights.
-   School setup and interior design guidance.
-   Furniture, play equipment and learning kits.
-   Curriculum and teaching resources.
-   Staff recruitment support and training.
-   Admission and parent onboarding systems.
-   Marketing and local promotion support.
-   Technology products and digital systems.
-   Ongoing academic and operational support.
-   Quality monitoring and regular audits.

The exact services, commercial terms, eligibility criteria, territory,
fees and contractual commitments must be confirmed by management. Do not
invent them.

## 2.2 Current digital status

Known facts: - Existing website is built with React. - Existing project
has Supabase backend integration. - Rebuild should remove Supabase
dependency. - Immediate deliverable is frontend-only. - Other digital
products are part of the wider plan, not this website build.

Claude Code must inspect the repository before assuming routes,
packages, styling, deployment or existing content.

## 2.3 Website versus future products

  -----------------------------------------------------------------------
  Product                             Scope in this project
  ----------------------------------- -----------------------------------
  Public website                      Build now

  Franchise information pages         Build now

  Franchise enquiry interface         Frontend only; no database
                                      submission

  Mobile app                          Future/separate project

  LMS                                 Future/separate project

  MIS / School ERP                    Future/separate project

  CRM                                 Future/separate project

  Cloud infrastructure                Explain the vision; do not claim
                                      unbuilt systems are live
  -----------------------------------------------------------------------

Use "planned", "in development" or "future" labels only when management
confirms the status. Never imply a product is operational if it is not.

------------------------------------------------------------------------

# 3. Goals, Audiences and Success Criteria

## Business goals

1.  Explain the Play Place franchise model in simple language.
2.  Establish a credible public brand presence.
3.  Explain what franchise partners receive.
4.  Make the franchise journey easy to understand.
5.  Encourage relevant enquiries.
6.  Explain academic, operational, physical and digital support.
7.  Preserve useful school information for parents.

## Target audiences

-   **Potential franchise partners:** Want to understand the model,
    support, process and contact route.
-   **Parents and guardians:** Want school, programme, learning approach
    and admission information.
-   **Existing school community:** Needs contact details and basic
    school information.
-   **Education/business stakeholders:** Want to understand the Play
    Place model.

## Success criteria

-   All approved pages and sections are implemented.
-   Responsive on mobile, tablet and desktop.
-   No page requires Supabase to load.
-   No broken links, empty routes or console errors.
-   Contact actions behave honestly and as described.
-   No unverified business promises.
-   Images are approved and optimised.
-   Keyboard navigation and basic accessibility work.
-   Production build succeeds.

Do not invent traffic, conversion or revenue targets.

------------------------------------------------------------------------

# 4. Scope

## In scope

-   Rebuild/improve the existing React frontend.
-   Public school and corporate website.
-   Franchise-focused information architecture.
-   Homepage and supporting pages.
-   Franchise ecosystem and eight-pillar presentation.
-   Franchise partner benefits and support.
-   Seven-step expansion process.
-   Digital ecosystem overview.
-   Team responsibilities and implementation roadmap.
-   Contact and franchise enquiry frontend.
-   Local/static content data.
-   SEO, accessibility, performance and responsive testing.
-   Removal of Supabase dependencies.

## Out of scope

Do not build any of the following as working products: - School ERP /
MIS. - CRM backend. - LMS or course delivery. - Parent/teacher login
portals. - Student/staff dashboards. - Mobile apps. - API server or
database. - User registration/authentication. - Online payments. - Admin
CMS. - Persistent franchise application workflow. - Automated WhatsApp,
SMS or email sending. - File upload/document management.

**Scope guardrail:** This is a public-facing website that explains the
franchise ecosystem. It is not the franchise management platform itself.

------------------------------------------------------------------------

# 5. Information Architecture and Sitemap

Recommended navigation: 1. Home 2. About Us 3. Academics 4. Franchise
Ecosystem 5. Franchise Opportunity 6. Digital Ecosystem 7. Quality &
Support 8. Contact

Recommended routes:

  Page                     Route
  ------------------------ ------------------------
  Home                     `/`
  About Play Place         `/about`
  Academics & Curriculum   `/academics`
  Franchise Ecosystem      `/franchise-ecosystem`
  Franchise Opportunity    `/franchise`
  Digital Ecosystem        `/digital-ecosystem`
  Quality & Support        `/quality-support`
  Contact                  `/contact`
  Privacy Policy           `/privacy-policy`
  Terms                    `/terms`

Inspect current routes and preserve important URLs where practical. Do
not break existing URLs without a redirect plan.

Navigation requirements: - Desktop horizontal navigation with clear
franchise CTA. - Accessible mobile menu. - Current page indication. -
Consistent header and footer. - Avoid overcrowded menus. - All
navigation items must work.

------------------------------------------------------------------------

# 6. Detailed Page Requirements

## 6.1 Homepage

The homepage must quickly communicate that Play Place is an early
childhood education brand building a franchise ecosystem.

### A. Header

-   Official Play Place logo.
-   Main navigation.
-   Contact CTA.
-   "Explore Franchise" CTA.
-   Responsive mobile navigation.

### B. Hero

Suggested headline: **Build a Brighter Beginning. Grow with Play
Place.**

Suggested copy: "Discover a preschool franchise ecosystem combining
early childhood education, structured learning resources, operational
guidance, brand support and a technology-enabled vision."

Primary CTA: **Explore Franchise Opportunities**\
Secondary CTA: **Discover Our Ecosystem**

Use warm, authentic preschool imagery and professional composition. Do
not use identifiable student photos without valid permission.

### C. Brand introduction

Explain who Play Place is, its early childhood education focus, learning
philosophy and franchise ambition. Do not invent founding year, student
numbers, branch count, awards or achievements.

### D. Vision

Suggested concept: "To build a trusted, high-quality and future-ready
preschool network that supports children's early development and helps
franchise partners deliver a consistent learning experience."

Management must approve the final statement.

### E. Why Play Place

Present six benefits: 1. Replicable and scalable model. 2. End-to-end
support. 3. Uniform quality. 4. Technology-driven approach. 5. Brand and
marketing support. 6. Holistic growth.

Each needs a short, plain-language explanation.

### F. Eight pillars of the franchise ecosystem

Show the pillars as a connected visual ecosystem around the Play Place
brand.

**1. Curriculum & Pedagogy**\
Academic framework, teaching approach, age-appropriate learning and
curriculum planning. The senior's plan references EYFS/NEP alignment. Do
not claim formal accreditation or official alignment until verified.

**2. Learning Resources**\
Lesson plans, worksheets, teaching kits, learning materials and
workshops.

**3. Digital Ecosystem**\
Website, mobile app, LMS, MIS, CRM and cloud foundation. Explain their
intended roles; do not claim they are live.

**4. Training & Capacity Building**\
Training for founders, teachers and school staff.

**5. Branding & Marketing**\
Design resources, campaigns, digital promotion and local marketing
guidance.

**6. Infrastructure & Setup**\
Classroom planning, furniture, play areas, safety and setup guidance.

**7. Quality Assurance**\
Audits, assessments, feedback and quality monitoring.

**8. Operational Systems & SOPs**\
Admissions, HR, finance, compliance processes and standard operating
procedures.

Each pillar should have a clear title, short summary, 2--4 supporting
points and a consistent icon or illustration.

### G. What we provide to franchise partners

Present these support categories in a readable grid: - Brand licence and
usage rights. - School setup and interior design. - Furniture, play
equipment and learning kits. - Curriculum and teaching resources. -
Staff recruitment support and training. - Admission and parent
onboarding system. - Marketing and local promotion support. - Technology
suite. - Ongoing academic and operational support. - Quality monitoring
and regular audits.

Phrase as proposed support categories subject to final franchise
agreement. Do not imply unlimited or guaranteed delivery.

### H. Franchise expansion process

Show these seven stages in a timeline: 1. Enquiry & Application. 2.
Feasibility & Site Approval. 3. Agreement & Onboarding. 4. Setup &
Fit-Out. 5. Training & System Setup. 6. Launch & Marketing. 7.
Operations & Ongoing Support.

Use short descriptions. Do not invent stage durations.

### I. Digital ecosystem preview

Explain: - Website --- public brand and franchise portal. - Mobile App
--- intended parent and staff access. - LMS --- curriculum, lesson plans
and training. - MIS --- admissions, fees and school operations. - CRM
--- enquiries, franchise leads and support. - Cloud Infrastructure ---
secure and scalable technical foundation.

Make clear that these are separate planned digital products, not
functions of this static website.

### J. Teams and responsibilities

Summarise the senior's seven teams: - Leadership & Strategy. - Academic
Team. - Content Creation Team. - Web & Tech Team. - Operations Team. -
Marketing & Branding Team. - Training & Support Team.

Explain each team's purpose in one or two sentences. Do not publish
staff names without approval.

### K. Implementation roadmap

Show the senior's proposed three phases: - **Phase 1: 0--3 months:**
Finalise franchise model and SOPs, prepare website/app plans, curriculum
and setup standards. - **Phase 2: 3--6 months:** Pilot 1--2 franchise
branches, test training and systems, collect feedback and improve. -
**Phase 3: 6--12 months:** Scale to more cities, strengthen quality and
brand presence.

Label this as a proposed roadmap, not a guaranteed schedule. Management
must approve before publication.

### L. Franchise CTA

Suggested headline: **Let's Build the Future of Preschool Learning
Together.**

Invite interested people to discuss franchise opportunities. CTA:
**Enquire About a Franchise**.

### M. Footer

-   Logo and short description.
-   Navigation links.
-   Verified contact details.
-   Approved social links.
-   Privacy policy and terms.
-   Copyright notice.

Do not invent contact details.

## 6.2 About Play Place page

Include: - About the school. - Brand story (verified facts only). -
Vision and mission. - Educational values. - Learning through play. -
Holistic child development. - Why the franchise model exists. - CTA to
explore the ecosystem.

Do not invent history, founder biographies or achievements.

## 6.3 Academics & Curriculum page

Include: - Early childhood education philosophy. - Learning through
play. - Age-appropriate learning. - Curriculum and pedagogy. - Language
and communication. - Cognitive development. - Social and emotional
development. - Physical development and creative expression. - Lesson
plans and teaching resources. - Teacher support and training.

Mention EYFS/NEP only if management confirms the exact framework and
actual alignment. Do not claim certification/accreditation without
evidence.

## 6.4 Franchise Ecosystem page

Include: - Introduction to the franchise ecosystem. - Visual diagram of
eight pillars. - Detail for each pillar. - How pillars work together. -
What headquarters provides. - What the franchise partner manages. - CTA
to explore franchise opportunities.

Explain the model for someone who has never operated a preschool.

## 6.5 Franchise Opportunity page

Include: - Why consider a Play Place franchise. - Proposed franchise
model. - Partner support categories. - Seven-step expansion process. -
General partner expectations. - Site feasibility overview. - FAQ. -
Enquiry CTA.

Never invent franchise fee, total investment, royalty, profit, ROI,
guaranteed admissions, exclusivity, property size, launch time or
business success.

### Frontend-only enquiry form

Suggested fields: - Full name. - Phone number. - Email (optional if
management decides). - City. - State. - Preferred location/area. -
Property identified? (Yes / No / Exploring). - Brief message. - Consent
checkbox.

The form must not pretend to save or submit data. Initially: - Validate
fields in browser. - Redirect to a configured WhatsApp conversation with
a prefilled message, or open a configured email draft. - Explain clearly
that the visitor is being redirected. - If contact details are not
supplied, show a development placeholder and document the missing
configuration. - Never show "Enquiry submitted successfully" without a
real service confirming submission.

Use configuration constants for approved WhatsApp/email details. Do not
invent them.

## 6.6 Digital Ecosystem page

Explain in simple language:

**Website:** Public brand presence, school information and franchise
enquiries.\
**Mobile App:** Future app concept for parent and staff access, subject
to product planning.\
**LMS:** Learning platform concept for curriculum, lesson plans,
training materials and assessments.\
**MIS:** School operations platform concept for admissions, student
records, attendance, fees and reports.\
**CRM:** Relationship-management concept for admission enquiries,
franchise leads, follow-ups and support.\
**Cloud Infrastructure:** Secure technical foundation intended to
support future digital products and multiple branches.

Do not present these as operational if they are not.

## 6.7 Quality & Support page

Include: - Academic support. - Teacher and staff training. - Operational
guidance. - Quality audits. - Feedback and improvement. - Brand and
marketing support. - Learning resource updates. - Ongoing franchise
support.

Do not make service-level promises without approval.

## 6.8 Contact page

Use verified school details only: - Address. - Phone. - Email. - Maps
link, if supplied. - Social links. - General enquiry CTA. - Franchise
enquiry CTA.

Inspect the existing website for verified information and preserve it.

------------------------------------------------------------------------

# 7. Visual Design Requirements

## 7.1 Design direction

Create a premium, friendly, modern preschool brand website. Combine
warmth and child-friendly imagery with professional franchise
communication. It must not look like a generic school template or a
childish game website.

## 7.2 Brand

Use the official logo and existing approved brand assets. The senior's
infographic suggests: - Deep navy blue. - Bright green. - White. - Light
blue. - Soft yellow. - Warm accent colours.

These are visual references, not confirmed brand tokens. Inspect the
official logo and existing site before finalising.

Suggested initial tokens (confirm before use): - Navy `#12315A` - Blue
`#1767A8` - Green `#65B82E` - Light blue `#EAF4FA` - Soft green
`#EEF7E4` - White `#FFFFFF` - Body text `#263445` - Muted text `#657386`

## 7.3 Typography

Use a readable sans-serif such as Inter, Manrope or Plus Jakarta Sans.
Keep a consistent type scale and comfortable paragraph width.

## 7.4 Layout

-   Consistent max-width container.
-   Generous spacing.
-   Clear hierarchy.
-   Responsive grids.
-   Subtle section backgrounds.
-   Avoid excessive cards and excessive rounded corners.
-   Keep important CTAs visible.
-   Do not overcrowd mobile screens.

## 7.5 Motion

Use Framer Motion only if already available or justified: - Subtle hero
entrance. - Gentle section reveals. - Small hover transitions. -
Timeline progression. - Accessible interactive ecosystem graphic.

Avoid scroll hijacking, excessive parallax, heavy 3D, blocking animation
and motion that hurts readability. Respect `prefers-reduced-motion`.

## 7.6 Images

Use approved school photographs and official assets where available. New
imagery must be licensed and relevant. Do not use identifiable student
images without permission. Optimise image formats/sizes and add
meaningful alt text.

Do not turn the senior's infographic into the entire website. Use it as
business source material and create a responsive website design.

------------------------------------------------------------------------

# 8. Functional Requirements

## General

-   All navigation links work.
-   Every CTA has a meaningful action.
-   Routes load directly and on refresh.
-   Browser back/forward works.
-   No dead buttons or placeholder links in production.
-   Provide a useful 404 page.
-   Use local content data where practical.

## Forms

-   Client-side validation only.
-   Accessible labels and error messages.
-   Do not store submissions in local storage as a backend substitute.
-   Do not imply data has been delivered or saved.
-   Use approved WhatsApp/email handoff if configured.
-   Consent/privacy wording must be approved.

## FAQ

-   Accessible accordion controls.
-   Keyboard accessible.
-   Only management-confirmed answers.
-   No invented legal or commercial terms.

## Content configuration

Keep repeatable content in local files, adapting to existing
conventions: - `src/data/navigation.js` - `src/data/pillars.js` -
`src/data/franchiseBenefits.js` - `src/data/franchiseProcess.js` -
`src/data/digitalEcosystem.js` - `src/data/teams.js` -
`src/data/roadmap.js` - `src/data/faq.js` - `src/config/site.js`

Use TypeScript if the existing project already supports it; otherwise
follow its current convention.

------------------------------------------------------------------------

# 9. Technical Requirements

## 9.1 Repository audit first

Before changing code, inspect: - `package.json`. - React/Vite setup and
package versions. - Current routes. - Component structure. - Styling
approach. - Existing assets/logo. - Existing page content. - Supabase
client and every import/use. - Environment variables. -
Hosting/deployment configuration. - SEO metadata.

Report the current architecture and risks before implementation.

## 9.2 Frontend architecture

Preferred: - Keep existing React + Vite if healthy. - Reuse existing
router; add React Router only if needed. - Reuse maintainable styling;
migrate carefully only if required. - Build reusable components. -
Separate content from layout. - Avoid unnecessary dependencies.

Suggested structure (adapt, do not force a rewrite):

``` text
src/
  app/
    App.jsx
    router.jsx
  components/
    layout/
      Header.jsx
      Footer.jsx
      MobileNavigation.jsx
      PageContainer.jsx
    ui/
      Button.jsx
      SectionHeading.jsx
      Accordion.jsx
      CTASection.jsx
    sections/
      HeroSection.jsx
      BrandIntroSection.jsx
      BenefitsSection.jsx
      EcosystemSection.jsx
      PartnerSupportSection.jsx
      FranchiseProcessSection.jsx
      DigitalEcosystemSection.jsx
      TeamsSection.jsx
      RoadmapSection.jsx
  pages/
    HomePage.jsx
    AboutPage.jsx
    AcademicsPage.jsx
    FranchiseEcosystemPage.jsx
    FranchiseOpportunityPage.jsx
    DigitalEcosystemPage.jsx
    QualitySupportPage.jsx
    ContactPage.jsx
    NotFoundPage.jsx
  data/
  config/
  styles/
  assets/
```

## 9.3 Remove Supabase safely

1.  Search repository for all Supabase imports and usage.
2.  Map authentication, database, storage, realtime and edge-function
    calls.
3.  Identify components that fail without Supabase.
4.  Replace public content with local data or approved assets.
5.  Remove provider/context dependencies only if no longer needed.
6.  Remove frontend environment variable requirements.
7.  Remove Supabase package only after confirming it is unused.
8.  Remove unused hooks, services and types.
9.  Check build and deployment configuration.
10. Search again to confirm no active Supabase dependency remains.

Do not delete the remote Supabase project or its data. This request is
only to remove the website's dependency. Back up the repository and
configuration before changes.

## 9.4 No backend

Do not create Express, API routes, database schemas, replacement
services, authentication, server actions or persistent form submission.
Website must work as a frontend suitable for the approved static/client
deployment.

## 9.5 SEO

-   Unique page title and meta description.
-   Canonical URLs after final domain confirmation.
-   Open Graph/social metadata.
-   Semantic headings.
-   Descriptive alt text.
-   Sitemap and `robots.txt` if supported.
-   Clean URLs.
-   Structured data only with accurate verified details.

Never add fake ratings, reviews, locations or business facts.

## 9.6 Performance

-   Optimise image formats and sizes.
-   Lazy-load below-the-fold imagery.
-   Avoid large unnecessary libraries.
-   Minimise layout shifts.
-   Use efficient animations.
-   Prioritise mobile performance.

## 9.7 Accessibility

-   Semantic HTML.
-   Keyboard-accessible navigation.
-   Visible focus states.
-   Sufficient contrast.
-   Accessible form labels/errors.
-   Alt text for meaningful images.
-   Correct heading hierarchy.
-   Reduced-motion support.
-   Correct use of buttons and links.

------------------------------------------------------------------------

# 10. Content Rules and Accuracy

## Approved source material

1.  Existing Play Place website and verified public content.
2.  Official Play Place logo and brand assets.
3.  Senior's "Play Place Franchise Ecosystem" infographic supplied for
    this project.
4.  Management-approved contact, commercial and academic details.

## Never fabricate

-   Franchise investment amount, fee or royalty.
-   Profit, ROI or guaranteed returns.
-   Number of branches or students.
-   Years in operation.
-   Accreditation, certification or awards.
-   Partnerships.
-   Teacher qualifications.
-   Guaranteed admissions or business success.
-   Territory exclusivity.
-   Property size or guaranteed launch time.
-   Legal compliance claims.
-   Contact details.
-   Testimonials or reviews.

Use development placeholders for missing information and include them in
the management review list. Do not expose unfinished placeholders on the
live site.

## Copywriting tone

Simple English, professional, warm and trustworthy. Explain acronyms on
first use. Avoid exaggerated marketing language.

------------------------------------------------------------------------

# 11. Non-Functional Requirements

  -----------------------------------------------------------------------
  Area                                Requirement
  ----------------------------------- -----------------------------------
  Responsive                          Mobile, tablet, laptop and desktop

  Reliability                         Public pages work without backend
                                      services

  Performance                         Optimised assets and minimal
                                      scripts

  Security                            No secrets or private credentials
                                      in frontend

  Accessibility                       Keyboard and screen-reader-friendly
                                      foundations

  SEO                                 Metadata and semantic structure

  Maintainability                     Reusable components and local
                                      content

  Browsers                            Current Chrome, Edge, Firefox and
                                      Safari

  Privacy                             Do not collect/store visitor data
                                      without an approved service
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 12. Development Roadmap

Implement in controlled phases. Do not rewrite everything in one
unreviewed step.

## Phase 0 --- Repository audit

Deliver: - Repository structure summary. - Existing routes and page
map. - Framework and package versions. - Supabase usage map. - Reusable
assets/components. - Deployment setup. - Risks and safe implementation
plan.

Acceptance: no source files deleted before their purpose is understood;
current website can still run.

## Phase 1 --- Remove backend dependency

Deliver: - Replace backend-dependent public content with local data. -
Remove Supabase client usage and unused hooks. - Remove backend
environment requirements. - Confirm public pages work without Supabase.

Acceptance: build works without Supabase credentials; no active Supabase
calls remain.

## Phase 2 --- Design system and shared layout

Deliver: - Confirmed brand tokens. - Typography. - Buttons, links and
section headings. - Header, navigation and footer. - Responsive
containers. - Reusable cards, CTA and accordion. - Motion rules.

Acceptance: consistent design and working mobile navigation.

## Phase 3 --- Homepage

Deliver all homepage sections defined in Section 6.1.

Acceptance: homepage explains the full concept, all CTAs work, and no
unverified claims appear.

## Phase 4 --- Supporting pages

Build About, Academics, Franchise Ecosystem, Franchise Opportunity,
Digital Ecosystem, Quality & Support, Contact, and approved legal pages.

Acceptance: all routes load directly; content is consistent.

## Phase 5 --- Contact handoff and interactions

Deliver client-side validation, configured WhatsApp/email handoff, FAQ
accordions and accessible interactions.

Acceptance: no false success state; only verified contact details are
used.

## Phase 6 --- SEO, performance and QA

Deliver metadata, social previews, sitemap/robots where appropriate,
image optimisation, responsive checks, accessibility review and
broken-link checks.

Acceptance: no console errors, broken routes or Supabase dependency;
production build succeeds.

## Phase 7 --- Management review and launch

Deliver preview deployment, management review checklist, corrections and
final approval.

Do not replace the live website without explicit approval.

------------------------------------------------------------------------

# 13. Acceptance Checklist

## Business and content

-   [ ] Vision and franchise model explained.
-   [ ] Eight pillars covered.
-   [ ] Partner support explained.
-   [ ] Seven-step expansion process shown.
-   [ ] Digital ecosystem accurately described.
-   [ ] Teams and roadmap represented.
-   [ ] Proposed roadmap labelled as such.
-   [ ] No invented business claims.
-   [ ] Existing relevant school information preserved.

## Technical

-   [ ] Existing React project audited.
-   [ ] Supabase dependency removed from website.
-   [ ] No backend introduced.
-   [ ] No database/API required.
-   [ ] Routes load directly.
-   [ ] Navigation and CTAs work.
-   [ ] Production build succeeds.
-   [ ] No secrets in frontend files.

## Design

-   [ ] Official logo used correctly.
-   [ ] Brand colours confirmed.
-   [ ] Desktop, tablet and mobile layouts checked.
-   [ ] Images approved and optimised.
-   [ ] Motion is subtle and accessible.
-   [ ] Text is readable.
-   [ ] Keyboard navigation works.

## Enquiry

-   [ ] Contact details verified.
-   [ ] Form validation works.
-   [ ] WhatsApp/email details configured if approved.
-   [ ] No fake submission-success message.
-   [ ] Privacy wording approved.

------------------------------------------------------------------------

# 14. Management Decisions Required

Collect answers before final content approval:

1.  Is this website replacing the current school website, or should it
    be a separate franchise-focused website?
2.  What official logo, colours and fonts must be used?
3.  What are the approved vision and mission statements?
4.  What exact curriculum or academic framework is used?
5.  Is the EYFS/NEP alignment statement approved?
6.  Which franchise support services are guaranteed in the agreement?
7.  What approved phone number and email should receive franchise
    enquiries?
8.  Which cities/territories are open for franchise enquiries?
9.  Are franchise fees, investment and eligibility criteria approved for
    public display?
10. Are mobile app, LMS, MIS and CRM planned, under development or
    already available?
11. Which existing pages and URLs must be retained?
12. Are official school photographs available with publication
    permission?
13. Should enquiries redirect to WhatsApp, email or another approved
    channel?
14. Who approves content and final launch?

Until confirmed, use safe draft copy and do not publish commercial
promises.

------------------------------------------------------------------------

# 15. Instructions for Claude Code

Act as a senior frontend engineer, product designer and technical lead.
Rebuild the existing Play Place React website using this PRD.

## Non-negotiable rules

1.  Read this entire PRD before changing code.
2.  Inspect the repository before implementation.
3.  Do not assume project structure or package versions.
4.  Do not delete Supabase files before mapping all usages.
5.  Remove Supabase dependency from the website only. Do not delete
    remote data or the Supabase project.
6.  Do not build backend, database, authentication, ERP, CRM, LMS or
    mobile app.
7.  Do not fake form submissions.
8.  Do not invent business facts, pricing, ROI, awards or contact
    details.
9.  Preserve useful content and assets.
10. Use the senior's ecosystem plan as business source material,
    flagging unconfirmed claims.
11. Build responsive, accessible, maintainable React components.
12. Avoid unnecessary dependencies and overengineering.
13. Do not replace the live website without approval.
14. Prioritise speed and mobile experience.

## Required working method

### First response --- audit only

Before coding, provide: - Repository structure summary. - Framework and
package versions. - Existing route map. - Supabase usage map. - Reusable
components/assets. - Deployment setup. - Risks and questions. - Proposed
implementation plan.

Do not ask the user to repeat information already in this PRD.

### Implementation

For each phase: 1. State the objective. 2. List files to create/modify.
3. Implement the work. 4. Run available lint/build/test commands. 5. Fix
errors. 6. Summarise changes. 7. List remaining decisions/blockers. 8.
Wait for approval before a major next phase when the user is reviewing
incrementally.

## Design quality

The final website must feel like a professionally designed education and
franchise brand. It must not look like a basic admin dashboard, generic
template or random collection of cards.

Use clear hierarchy, purposeful layouts, relevant imagery, thoughtful
spacing, restrained animation and consistent components.

Communicate two things: - Play Place is an early childhood education
brand. - Play Place is building a structured franchise ecosystem with
academic, operational, infrastructure, marketing and technology support.

**Start with Phase 0: repository audit. Do not code the redesign until
the audit and implementation plan are presented.**

------------------------------------------------------------------------

# 16. Final Product Summary

The deliverable is a modern, responsive, frontend-only Play Place
International School website that communicates the brand and the full
franchise ecosystem.

It is not the franchise management software itself. It helps visitors
understand the opportunity and contact Play Place. The future ERP, CRM,
LMS, mobile app and other systems will be separate projects.

**Build the public-facing foundation first. Keep the architecture clean
so the future digital ecosystem can be connected later.**
