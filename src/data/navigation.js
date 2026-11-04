/** Primary navigation. Items with `children` render as a dropdown. */
export const MAIN_NAV = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Academics", to: "/academics" },
  { label: "Admissions", to: "/admissions" },
  {
    label: "Franchise",
    children: [
      {
        label: "Franchise Opportunity",
        to: "/franchise",
        description: "Open a Play Place preschool in your city",
        icon: "handshake",
      },
      {
        label: "Franchise Ecosystem",
        to: "/franchise-ecosystem",
        description: "The eight pillars of support",
        icon: "hub",
      },
      {
        label: "Quality & Support",
        to: "/quality-support",
        description: "Training, audits and ongoing guidance",
        icon: "verified",
      },
    ],
  },
  { label: "Gallery", to: "/gallery" },
];

export const FOOTER_NAV = [
  {
    title: "School",
    links: [
      { label: "About us", to: "/about" },
      { label: "Academics", to: "/academics" },
      { label: "Admissions", to: "/admissions" },
      { label: "Gallery", to: "/gallery" },
    ],
  },
  {
    title: "Franchise",
    links: [
      { label: "Franchise Opportunity", to: "/franchise" },
      { label: "Franchise Ecosystem", to: "/franchise-ecosystem" },
      { label: "Quality & Support", to: "/quality-support" },
      { label: "Enquire now", to: "/franchise#enquiry" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact us", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Use", to: "/terms" },
    ],
  },
];
