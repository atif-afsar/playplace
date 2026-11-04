/**
 * Per-page SEO. Used by the <Seo> component (client-side navigation) AND by the
 * build-time pre-renderer (scripts/prerender.mjs), which writes these tags into
 * each page's static HTML so crawlers and link previews see them immediately.
 *
 * Guidelines: title ≤ ~60 chars with the main keyword first; description
 * 140–160 chars; one primary search intent per page; no unverifiable claims
 * ("best", "No. 1", ratings, years).
 */
export const PAGE_SEO = {
  home: {
    path: "/",
    title: "Play Place International School | Preschool & Play School in Aligarh",
    description:
      "Play-based preschool in Aligarh for Playgroup, Nursery, LKG and UKG. Safe, joyful classrooms near Monarch Apartments. Admissions open — call 073029 88040.",
    hero: "home",
  },
  about: {
    path: "/about",
    title: "About Play Place | Preschool in Aligarh, Unit of Yasir Ali Classes",
    description:
      "Meet Play Place International School, a caring preschool in Aligarh and a unit of Yasir Ali Classes. Our vision, mission and values for early childhood learning.",
    breadcrumb: "About us",
    hero: "about",
  },
  academics: {
    path: "/academics",
    title: "Preschool Curriculum: Playgroup, Nursery, LKG & UKG | Play Place",
    description:
      "A play-based early years curriculum in Aligarh covering language, thinking, social, emotional, physical and creative development for Playgroup to UKG.",
    breadcrumb: "Academics",
    hero: "academics",
  },
  admissions: {
    path: "/admissions",
    title: "Preschool Admissions in Aligarh | Playgroup to UKG | Play Place",
    description:
      "Nursery, LKG and UKG admissions at Play Place, Aligarh. Four easy steps — call 073029 88040, visit the school or send an admission enquiry today.",
    breadcrumb: "Admissions",
    hero: "admissions",
  },
  gallery: {
    path: "/gallery",
    title: "Photo Gallery | Play Place Preschool, Aligarh",
    description:
      "See inside Play Place International School, Aligarh — bright classrooms, indoor play areas, festivals and everyday moments of learning through play.",
    breadcrumb: "Gallery",
  },
  franchise: {
    path: "/franchise",
    title: "Preschool Franchise Opportunity | Play School Franchise | Play Place",
    description:
      "Start a Play Place preschool in your city. A trusted brand, ready curriculum, staff training, setup guidance and ongoing support. Enquire about a franchise.",
    breadcrumb: "Franchise",
    hero: "franchise",
  },
  franchiseEcosystem: {
    path: "/franchise-ecosystem",
    title: "Preschool Franchise Support: 8 Pillars | Play Place Ecosystem",
    description:
      "Curriculum, learning resources, technology, training, branding, setup, quality and SOPs — the eight pillars that support every Play Place preschool franchise.",
    breadcrumb: "Franchise Ecosystem",
    hero: "ecosystem",
  },
  quality: {
    path: "/quality-support",
    title: "Franchise Training & Quality Support | Play Place Preschool",
    description:
      "How Play Place supports partner preschools after launch: academic help, staff training, operations guidance, quality audits and a cycle of improvement.",
    breadcrumb: "Quality & Support",
    hero: "quality",
  },
  contact: {
    path: "/contact",
    title: "Contact Play Place Preschool, Aligarh | Call 073029 88040",
    description:
      "Visit Play Place International School near Monarch Apartments, Aligarh Bypass Road, Manjur Garhi, Aligarh. Call 073029 88040 or email us. Open Mon–Sat.",
    breadcrumb: "Contact",
  },
  privacy: {
    path: "/privacy-policy",
    title: "Privacy Policy | Play Place International School",
    description: "How the Play Place International School website handles information, enquiry forms, cookies and third-party services.",
    breadcrumb: "Privacy Policy",
  },
  terms: {
    path: "/terms",
    title: "Terms of Use | Play Place International School",
    description: "Terms for using the Play Place International School website, including franchise information and brand use.",
    breadcrumb: "Terms of Use",
  },
  notFound: {
    path: "/404",
    title: "Page Not Found | Play Place International School",
    description: "The page you are looking for could not be found. Explore admissions, academics or the Play Place franchise.",
    noindex: true,
  },
};

/** Every indexable route, in sitemap order. */
export const SEO_ROUTES = [
  "home",
  "admissions",
  "academics",
  "about",
  "franchise",
  "franchiseEcosystem",
  "quality",
  "contact",
  "gallery",
  "privacy",
  "terms",
];
