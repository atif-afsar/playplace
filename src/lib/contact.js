export const SCHOOL_CONTACT = {
  name: "Play Place International School",
  address: {
    lines: ["Near Monarch Apartments,", "Aligarh Bypass Road, Manjur Garhi,"],
    city: "Aligarh, Uttar Pradesh 202001",
    get full() {
      return [...this.lines, this.city].join(" ");
    },
  },
  email: "playplaceinternationalschool4@gmail.com",
  emailHint: "Email us your query",
  phones: ["+91 7302988040", "+91 7302988041"],
  hours: "Monday to Saturday, 10 AM to 5PM (IST)",
  mapsUrl: "https://www.google.com/maps/place/Monarch+Apartments/@27.9426475,78.078355,17z",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.6736772300032!2d78.078355!3d27.942647499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974a5d163f6ac03%3A0xf1381933a058afe2!2sMonarch%20Apartments!5e0!3m2!1sen!2sin!4v1783668756724!5m2!1sen!2sin",
};

export function telHref(phone) {
  return `tel:${phone.replace(/[\s()-]/g, "")}`;
}

export const CREDITS = {
  poweredBy: { name: "Yasir Ali Classes", url: "https://www.yasiraliclasses.in/" },
  websiteBy: { name: "Atif Afsar", url: "https://portfolio-rgzt.vercel.app/" },
};

export const CONTACT_CARDS = [
  {
    icon: "home",
    ring: "bg-primary-container/20 text-primary",
    title: null,
    lines: SCHOOL_CONTACT.address.lines,
    sub: SCHOOL_CONTACT.address.city,
    href: SCHOOL_CONTACT.mapsUrl,
    external: true,
  },
  {
    icon: "mail",
    ring: "bg-primary-container/20 text-primary",
    title: SCHOOL_CONTACT.email,
    lines: [],
    sub: SCHOOL_CONTACT.emailHint,
    href: `mailto:${SCHOOL_CONTACT.email}`,
  },
  {
    icon: "call",
    ring: "bg-primary-container/20 text-primary",
    title: null,
    lines: SCHOOL_CONTACT.phones,
    sub: SCHOOL_CONTACT.hours,
    href: telHref(SCHOOL_CONTACT.phones[0]),
  },
];
