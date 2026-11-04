/**
 * Builds the <head> tags for a page: title, description, canonical, robots,
 * Open Graph, Twitter, hero preload and schema.org JSON-LD.
 *
 * Used at build time by scripts/prerender.mjs. Structured data contains ONLY
 * verified facts (address, phone, hours, programmes) — no ratings, reviews,
 * prices or founding dates.
 */
import { CONTACT, SITE, SOCIAL, absoluteUrl } from "../config/site.js";
import { PAGE_SEO } from "../data/seo.js";
import { HEROES, PROGRAMMES } from "../data/school.js";
import { FRANCHISE_FAQ, PARENT_FAQ } from "../data/faq.js";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const SCHOOL_ID = `${SITE.url}/#school`;
const ORG_ID = `${SITE.url}/#yasir-ali-classes`;
const WEBSITE_ID = `${SITE.url}/#website`;

const PAGE_TYPE = {
  about: "AboutPage",
  contact: "ContactPage",
  gallery: "CollectionPage",
  notFound: "WebPage",
};

function schoolNode() {
  return {
    "@type": ["Preschool", "LocalBusiness"],
    "@id": SCHOOL_ID,
    name: SITE.name,
    alternateName: ["Play Place", "Play Place Aligarh", "Play Place Preschool Aligarh"],
    description:
      "Play-based preschool and play school in Aligarh, Uttar Pradesh, offering Playgroup, Nursery, LKG and UKG. A unit of Yasir Ali Classes.",
    url: `${SITE.url}/`,
    logo: { "@type": "ImageObject", url: absoluteUrl(SITE.logo) },
    image: [absoluteUrl(SITE.ogImage), absoluteUrl(HEROES.home.src)],
    telephone: "+91-73029-88040",
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Monarch Apartments, Aligarh Bypass Road, Manjur Garhi",
      addressLocality: "Aligarh",
      addressRegion: "Uttar Pradesh",
      postalCode: "202001",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: CONTACT.geo.latitude, longitude: CONTACT.geo.longitude },
    hasMap: CONTACT.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "14:00",
      },
    ],
    areaServed: { "@type": "City", name: "Aligarh" },
    knowsAbout: ["Early childhood education", "Play-based learning", "Preschool", "Kindergarten", ...PROGRAMMES.map((p) => p.name)],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Early years programmes",
      itemListElement: PROGRAMMES.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.full ? `${p.name} (${p.full})` : p.name, description: p.text },
      })),
    },
    parentOrganization: { "@id": ORG_ID },
    sameAs: SOCIAL.map((s) => s.href),
  };
}

function breadcrumbNode(key) {
  const page = PAGE_SEO[key];
  if (!page.breadcrumb) return null;
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(page.path)}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: page.breadcrumb, item: absoluteUrl(page.path) },
    ],
  };
}

export function structuredData(key) {
  const page = PAGE_SEO[key];
  const url = page.path === "/" ? `${SITE.url}/` : absoluteUrl(page.path);
  const crumb = breadcrumbNode(key);
  const hero = page.hero ? HEROES[page.hero] : null;

  const graph = [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Yasir Ali Classes",
      url: SITE.unitOfUrl,
    },
    schoolNode(),
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE.url}/`,
      name: SITE.name,
      inLanguage: "en-IN",
      publisher: { "@id": SCHOOL_ID },
    },
    {
      "@type": PAGE_TYPE[key] || "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: "en-IN",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": SCHOOL_ID },
      ...(hero ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(hero.src) } } : {}),
      ...(crumb ? { breadcrumb: { "@id": crumb["@id"] } } : {}),
    },
  ];
  if (crumb) graph.push(crumb);
  const faq = key === "franchise" ? FRANCHISE_FAQ : key === "admissions" ? PARENT_FAQ : null;
  if (faq) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

/** Full set of <head> tags for one page, as an HTML string. */
export function buildHead(key) {
  const page = PAGE_SEO[key];
  const url = page.path === "/" ? `${SITE.url}/` : absoluteUrl(page.path);
  const hero = page.hero ? HEROES[page.hero] : null;
  const image = absoluteUrl(SITE.ogImage);
  const robots = page.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1";

  const tags = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    page.noindex ? "" : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(SITE.name)}" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    hero
      ? `<link rel="preload" as="image" href="${hero.src}" imagesrcset="${hero.srcSet}" imagesizes="100vw" fetchpriority="high" />`
      : "",
    SITE.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(SITE.googleSiteVerification)}" />` : "",
    `<script type="application/ld+json">${JSON.stringify(structuredData(key)).replace(/</g, "\\u003c")}</script>`,
  ];
  return tags.filter(Boolean).join("\n    ");
}
