import { SCHOOL_CONTACT } from "./contact";

function formatAdmissionEmail(payload) {
  return [
    `New admission application received at Play Place International School`,
    ``,
    `CHILD INFORMATION`,
    `Name: ${payload.childName}`,
    `Date of Birth: ${payload.dob || "—"}`,
    `Gender: ${payload.gender}`,
    `Class Applying For: ${payload.classApplied}`,
    ``,
    `PARENT INFORMATION`,
    `Parent Name: ${payload.parentName}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Address: ${payload.address}`,
    ``,
    `Photo: ${payload.photoUrl || "Not uploaded"}`,
    ``,
    `Submitted: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
  ].join("\n");
}

/**
 * Sends admission form details to the school inbox.
 * Uses FormSubmit (no API key). On first use, FormSubmit emails the school
 * inbox once to confirm — click the activation link, then all future
 * applications arrive automatically.
 */
export async function sendAdmissionNotification(payload) {
  const schoolEmail = SCHOOL_CONTACT.email;

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(schoolEmail)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `New Admission Application — ${payload.childName}`,
      _template: "table",
      _captcha: "false",
      _replyto: payload.email,
      "Child Name": payload.childName,
      "Date of Birth": payload.dob || "—",
      Gender: payload.gender,
      "Class Applying For": payload.classApplied,
      "Parent Name": payload.parentName,
      Phone: payload.phone,
      "Parent Email": payload.email,
      Address: payload.address,
      "Photo URL": payload.photoUrl || "Not uploaded",
      message: formatAdmissionEmail(payload),
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Could not send email notification.");
  }
  return data;
}
