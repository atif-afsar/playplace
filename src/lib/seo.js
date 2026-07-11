import { SCHOOL_CONTACT } from "./contact";

export const SITE_URL = "https://www.theplayplace.in";
export const SITE_NAME = "Play Place International School";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/image.png`;

export const SEO_KEYWORDS = [
  "junior school in aligarh",
  "best junior wing school aligarh",
  "play school aligarh",
  "nursery school aligarh",
  "LKG UKG school aligarh",
  "Play Place International School",
  "kindergarten aligarh",
  "pre primary school aligarh",
  "best play school aligarh",
  "international school aligarh",
  "playgroup aligarh",
  "school near monarch apartments aligarh",
  "junior wing aligarh",
  "early childhood education aligarh",
].join(", ");

export const PAGE_SEO = {
  home: {
    title: "Best Junior School in Aligarh | Play Place International School",
    description:
      "Play Place International School — Aligarh's trusted junior wing for Playgroup, Nursery, LKG & UKG. Safe, playful learning near Monarch Apartments. Admissions open — apply today!",
    path: "/",
    keywords: SEO_KEYWORDS,
  },
  about: {
    title: "About Us | Play Place International School Aligarh",
    description:
      "Learn about Play Place International School in Aligarh — our mission, vision, and nurturing approach for Playgroup through UKG junior wing education.",
    path: "/about",
  },
  admissions: {
    title: "Admissions Open | Junior School Aligarh | Play Place",
    description:
      "Apply for Playgroup, Nursery, LKG & UKG at Play Place International School, Aligarh. Simple online admission form — enroll your child today.",
    path: "/admissions",
  },
  academics: {
    title: "Academics & Curriculum | Junior Wing Aligarh | Play Place",
    description:
      "Explore Play Place's play-based curriculum for Playgroup, Nursery, LKG & UKG — the best junior wing learning approach in Aligarh.",
    path: "/academics",
  },
  gallery: {
    title: "Photo Gallery | Play Place International School Aligarh",
    description:
      "See moments of joy at Play Place International School — classroom activities, events, and daily life at our Aligarh junior school campus.",
    path: "/gallery",
  },
  contact: {
    title: "Contact Us | Play Place International School Aligarh",
    description:
      "Contact Play Place International School, Aligarh. Near Monarch Apartments, Aligarh Bypass Road. Call +91 7302988040 or email us today.",
    path: "/contact",
  },
  calendar: {
    title: "School Calendar | Play Place International School Aligarh",
    description:
      "View holidays, term dates, exams & events on the Play Place International School academic calendar for Aligarh families.",
    path: "/calendar",
  },
  login: {
    title: "Parent & Admin Login | Play Place International School",
    description: "Secure login portal for Play Place International School parents and administrators.",
    path: "/login",
    noindex: true,
  },
};

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** JSON-LD for Google rich results — School + LocalBusiness */
export function schoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["School", "EducationalOrganization"],
    "@id": `${SITE_URL}/#school`,
    name: SITE_NAME,
    alternateName: "Play Place Aligarh",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    image: DEFAULT_OG_IMAGE,
    description:
      "Play Place International School is a leading junior wing and play school in Aligarh offering Playgroup, Nursery, LKG, and UKG programs.",
    telephone: SCHOOL_CONTACT.phones,
    email: SCHOOL_CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Monarch Apartments, Aligarh Bypass Road, Manjur Garhi",
      addressLocality: "Aligarh",
      addressRegion: "Uttar Pradesh",
      postalCode: "202001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.9426475,
      longitude: 78.078355,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "17:00",
    },
    areaServed: {
      "@type": "City",
      name: "Aligarh",
    },
    knowsAbout: [
      "Playgroup",
      "Nursery",
      "LKG",
      "UKG",
      "Junior Wing Education",
      "Early Childhood Education",
    ],
    sameAs: [
      "https://www.instagram.com/playplaceinternational_.school/",
      SCHOOL_CONTACT.mapsUrl,
    ],
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which is the best junior wing school in Aligarh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Play Place International School on Aligarh Bypass Road near Monarch Apartments offers Playgroup, Nursery, LKG, and UKG with a play-based junior wing curriculum trusted by Aligarh families.",
        },
      },
      {
        "@type": "Question",
        name: "What classes does Play Place International School offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer Playgroup, Nursery, LKG (Lower Kindergarten), and UKG (Upper Kindergarten) for children aged 2 years and above.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Play Place International School located in Aligarh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Play Place is located near Monarch Apartments, Aligarh Bypass Road, Manjur Garhi, Aligarh, Uttar Pradesh 202001.",
        },
      },
      {
        "@type": "Question",
        name: "How do I apply for admission at Play Place Aligarh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Visit theplayplace.in/admissions and fill out the online application form, or call +91 7302988040 to book a campus visit.",
        },
      },
    ],
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
