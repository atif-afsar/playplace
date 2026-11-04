import { formatLines } from "../../lib/handoff";
import { CLASS_OPTIONS } from "../../data/school";
import HandoffForm from "./HandoffForm";

/** REVIEW: consent wording must be approved by management (PRD §8 Forms). */
const CONSENT = {
  name: "consent",
  type: "checkbox",
  required: true,
  label: "I agree that Play Place may contact me about this enquiry using the details I have provided.",
};

const NAME = { name: "name", label: "Full name", required: true, autoComplete: "name", minLength: 2, errorName: "your full name" };
const PHONE = {
  name: "phone",
  label: "Phone number",
  type: "tel",
  required: true,
  autoComplete: "tel",
  placeholder: "+91",
  errorName: "your phone number",
};
const EMAIL = { name: "email", label: "Email", type: "email", autoComplete: "email" };

const FRANCHISE_FIELDS = [
  NAME,
  PHONE,
  EMAIL,
  { name: "city", label: "City", required: true, autoComplete: "address-level2", errorName: "your city" },
  { name: "state", label: "State", required: true, autoComplete: "address-level1", errorName: "your state" },
  { name: "area", label: "Preferred location / area", placeholder: "Locality or neighbourhood" },
  {
    name: "property",
    label: "Have you identified a property?",
    type: "radio",
    required: true,
    options: ["Yes", "No", "Exploring"],
    requiredMessage: "Please choose an option.",
  },
  {
    name: "message",
    label: "Brief message",
    type: "textarea",
    placeholder: "Tell us a little about yourself and your plans.",
  },
  CONSENT,
];

export function FranchiseEnquiryForm() {
  return (
    <HandoffForm
      fields={FRANCHISE_FIELDS}
      buildMessage={(v) => ({
        subject: `Franchise enquiry — ${v.name}, ${v.city}`,
        text: formatLines("Hello Play Place, I would like to discuss a franchise opportunity.", [
          { label: "Name", value: v.name },
          { label: "Phone", value: v.phone },
          { label: "Email", value: v.email },
          { label: "City", value: v.city },
          { label: "State", value: v.state },
          { label: "Preferred area", value: v.area },
          { label: "Property identified", value: v.property },
          { label: "Message", value: v.message },
        ]),
      })}
    />
  );
}

const ADMISSION_FIELDS = [
  { name: "parentName", label: "Parent / guardian name", required: true, autoComplete: "name", minLength: 2, errorName: "the parent or guardian's name" },
  PHONE,
  { name: "childName", label: "Child's name", required: true, errorName: "your child's name" },
  {
    name: "programme",
    label: "Class of interest",
    type: "select",
    required: true,
    options: CLASS_OPTIONS,
    placeholder: "Select a class",
    requiredMessage: "Please choose a class.",
  },
  EMAIL,
  { name: "childDob", label: "Child's date of birth", type: "date" },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    rows: 3,
    placeholder: "Anything you would like us to know, or a good time to call.",
  },
  CONSENT,
];

export function AdmissionEnquiryForm() {
  return (
    <HandoffForm
      fields={ADMISSION_FIELDS}
      buildMessage={(v) => ({
        subject: `Admission enquiry — ${v.childName} (${v.programme})`,
        text: formatLines("Hello Play Place, I would like to enquire about admission.", [
          { label: "Parent / guardian", value: v.parentName },
          { label: "Phone", value: v.phone },
          { label: "Email", value: v.email },
          { label: "Child's name", value: v.childName },
          { label: "Date of birth", value: v.childDob },
          { label: "Class of interest", value: v.programme },
          { label: "Message", value: v.message },
        ]),
      })}
    />
  );
}

const CONTACT_FIELDS = [
  NAME,
  PHONE,
  EMAIL,
  {
    name: "topic",
    label: "What is your enquiry about?",
    type: "select",
    required: true,
    options: ["Admissions", "Franchise", "General enquiry"],
    placeholder: "Select a topic",
    requiredMessage: "Please choose a topic.",
  },
  { name: "message", label: "Message", type: "textarea", required: true, minLength: 10, errorName: "your message" },
  CONSENT,
];

export function ContactEnquiryForm() {
  return (
    <HandoffForm
      fields={CONTACT_FIELDS}
      buildMessage={(v) => ({
        subject: `${v.topic} — ${v.name}`,
        text: formatLines(`Hello Play Place, I have an enquiry (${v.topic}).`, [
          { label: "Name", value: v.name },
          { label: "Phone", value: v.phone },
          { label: "Email", value: v.email },
          { label: "Message", value: v.message },
        ]),
      })}
    />
  );
}
