import { SCHOOL_CONTACT } from "./contact";

async function submitToSchoolInbox({ subject, replyTo, fields, message }) {
  const schoolEmail = SCHOOL_CONTACT.email;

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(schoolEmail)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _replyto: replyTo,
      ...fields,
      message,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Could not send your message. Please try again or call us.");
  }
  return data;
}

function istTimestamp() {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

/** Admission application → school inbox */
export async function sendAdmissionNotification(payload) {
  const message = [
    "New admission application received at Play Place International School",
    "",
    "CHILD INFORMATION",
    `Name: ${payload.childName}`,
    `Date of Birth: ${payload.dob || "—"}`,
    `Gender: ${payload.gender}`,
    `Class Applying For: ${payload.classApplied}`,
    "",
    "PARENT INFORMATION",
    `Parent Name: ${payload.parentName}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Address: ${payload.address}`,
    "",
    `Photo: ${payload.photoUrl || "Not uploaded"}`,
    "",
    `Submitted: ${istTimestamp()} IST`,
  ].join("\n");

  return submitToSchoolInbox({
    subject: `New Admission Application — ${payload.childName}`,
    replyTo: payload.email,
    fields: {
      "Child Name": payload.childName,
      "Date of Birth": payload.dob || "—",
      Gender: payload.gender,
      "Class Applying For": payload.classApplied,
      "Parent Name": payload.parentName,
      Phone: payload.phone,
      "Parent Email": payload.email,
      Address: payload.address,
      "Photo URL": payload.photoUrl || "Not uploaded",
    },
    message,
  });
}

/** Contact page message → school inbox */
export async function sendContactMessage(payload) {
  const message = [
    "New contact form message from Play Place International School website",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    "",
    "Message:",
    payload.message,
    "",
    `Submitted: ${istTimestamp()} IST`,
  ].join("\n");

  return submitToSchoolInbox({
    subject: `Contact Form — ${payload.name}`,
    replyTo: payload.email,
    fields: {
      Name: payload.name,
      Email: payload.email,
      Phone: payload.phone,
      Message: payload.message,
    },
    message,
  });
}
