/**
 * Site-wide configuration.
 *
 * Contact details below are carried over from the existing live website
 * (theplayplace.in). Anything marked "REVIEW" must be confirmed by management
 * before launch — see docs/MANAGEMENT_REVIEW.md.
 */

export const SITE = {
  name: "Play Place International School",
  shortName: "Play Place",
  unitOf: "A unit of Yasir Ali Classes",
  unitOfUrl: "https://www.yasiraliclasses.in/",
  url: "https://www.theplayplace.in",
  positioning: "A Scalable, Tech-Enabled Preschool Network",
  description:
    "An end-to-end preschool franchise ecosystem designed to help partners launch, operate and grow high-quality early childhood education centres through a consistent brand, structured academic resources, operational guidance and technology.",
  logo: "/favicon.png",
  ogImage: "/images/og-image.jpg",
  /**
   * Google Search Console → Settings → Ownership verification → HTML tag.
   * Paste only the content="…" value here (leave "" if you verify via DNS instead).
   */
  googleSiteVerification: "",
  locale: "en_IN",
};

export const CONTACT = {
  addressLines: ["Near Monarch Apartments,", "Aligarh Bypass Road, Manjur Garhi,"],
  city: "Aligarh, Uttar Pradesh 202001",
  get addressFull() {
    return [...this.addressLines, this.city].join(" ");
  },
  email: "playplaceinternationalschool4@gmail.com",
  phones: ["073029 88040"], // display format; links dial +91 7302988040
  hours: "Monday to Saturday, 8 AM to 2 PM (IST)",
  mapsUrl: "https://www.google.com/maps/place/Monarch+Apartments/@27.9426475,78.078355,17z",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.6736772300032!2d78.078355!3d27.942647499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974a5d163f6ac03%3A0xf1381933a058afe2!2sMonarch%20Apartments!5e0!3m2!1sen!2sin!4v1783668756724!5m2!1sen!2sin",
  geo: { latitude: 27.9426475, longitude: 78.078355 },
};

export const SOCIAL = [
  {
    label: "Instagram",
    handle: "@playplaceinternational_.school",
    href: "https://www.instagram.com/playplaceinternational_.school/",
  },
];

/**
 * Enquiry hand-off targets. The website never stores or sends data itself —
 * forms open WhatsApp or the visitor's email app with a prefilled message.
 *
 * REVIEW: confirm the WhatsApp number is WhatsApp-enabled and approved for
 * franchise leads. Set a value to null to hide that hand-off option; if both
 * are null the form shows a configuration notice instead of a send button.
 */
export const ENQUIRY = {
  whatsappNumber: "917302988040", // digits only, country code first
  email: CONTACT.email,
};

export const CREDITS = {
  websiteBy: { name: "Atif Afsar", url: "https://portfolio-rgzt.vercel.app/" },
};

/** "073029 88040" → "tel:+917302988040" */
export function telHref(phone) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return `tel:${digits}`;
  return `tel:+91${digits.replace(/^0/, "")}`;
}

export function absoluteUrl(path = "/") {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
