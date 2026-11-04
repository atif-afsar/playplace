import { ENQUIRY } from "../config/site";

/** Builds a wa.me link with a prefilled message, or null if not configured. */
export function whatsappUrl(text, number = ENQUIRY.whatsappNumber) {
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Builds a mailto: link with subject and body, or null if not configured. */
export function mailtoUrl(subject, body, email = ENQUIRY.email) {
  if (!email) return null;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const handoffChannels = {
  whatsapp: Boolean(ENQUIRY.whatsappNumber),
  email: Boolean(ENQUIRY.email),
};

/** Turns [{label, value}] into readable message lines, skipping empty values. */
export function formatLines(title, rows) {
  const lines = rows.filter((r) => r.value).map((r) => `${r.label}: ${r.value}`);
  return [title, "", ...lines].join("\n");
}
