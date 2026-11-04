import Seo from "../components/ui/Seo";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import { PAGE_SEO } from "../data/seo";
import { CONTACT, SITE } from "../config/site";

/**
 * Privacy policy and terms of use.
 * REVIEW: legal wording must be reviewed and approved by management before launch.
 * The content reflects how this frontend-only website actually behaves.
 */
const UPDATED = "4 November 2026";

const PRIVACY = [
  {
    h: "Overview",
    p: [
      `This policy explains how the ${SITE.name} website (${SITE.url.replace("https://", "")}) handles information. The website is for information only. It does not have user accounts and does not store visitor data.`,
    ],
  },
  {
    h: "Enquiry forms",
    p: [
      "Our enquiry forms check your details in your browser only. The website does not save or send what you type. When you choose to continue, your device opens WhatsApp or your email app with a message prepared from your details.",
      "Your enquiry is shared with Play Place only if you choose to send that message. After that, the information you send is handled by Play Place for the purpose of responding to your enquiry, and by WhatsApp or your email provider under their own privacy policies.",
    ],
  },
  {
    h: "Third-party services",
    p: [
      "The website uses a small number of third-party services to work: our hosting provider, Google Fonts for typography and Google Maps for the map on the contact page. These services may receive technical information such as your IP address when your browser loads them.",
      "Links to Instagram, WhatsApp, Google Maps and other websites are governed by those websites’ own policies.",
    ],
  },
  {
    h: "Cookies and analytics",
    p: ["The website does not set its own cookies and does not use analytics or advertising trackers."],
  },
  {
    h: "Children’s privacy",
    p: [
      "The website is intended for parents, guardians and prospective franchise partners. It does not knowingly collect information from children.",
    ],
  },
  {
    h: "Contact",
    p: [`For any questions about this policy, please email ${CONTACT.email} or call ${CONTACT.phones[0]}.`],
  },
];

const TERMS = [
  {
    h: "Use of this website",
    p: [
      `This website provides general information about ${SITE.name}, its educational approach and its franchise opportunity. By using the website you agree to these terms.`,
    ],
  },
  {
    h: "Information only — not an offer",
    p: [
      "Franchise information on this website is a general description of a proposed model. It is not an offer, contract or guarantee of any kind. Support categories, processes and roadmaps are proposed and may change. Any franchise relationship is governed only by a separate written agreement.",
      "Nothing on this website is a promise of investment returns, admissions, territory or business success.",
    ],
  },
  {
    h: "Brand and content",
    p: [
      "The Play Place name, logo, text and photographs on this website belong to Play Place International School and may not be copied or used without written permission.",
    ],
  },
  {
    h: "Accuracy and changes",
    p: [
      "We try to keep information accurate and up to date, but it may change without notice. We may update these terms from time to time; the date below shows the latest version.",
    ],
  },
  {
    h: "Contact",
    p: [`Questions about these terms can be sent to ${CONTACT.email}.`],
  },
];

function LegalPage({ seo, title, sections, breadcrumb }) {
  return (
    <>
      <Seo {...seo} />
      <PageHero breadcrumb={breadcrumb} title={title} intro={`Last updated: ${UPDATED}`} />
      <Container width="prose" className="py-14 sm:py-20">
        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-2xl font-extrabold">{s.h}</h2>
              {s.p.map((para) => (
                <p key={para} className="mt-3 leading-relaxed text-muted">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}

export function PrivacyPolicyPage() {
  return <LegalPage seo={PAGE_SEO.privacy} title="Privacy Policy" breadcrumb="Privacy Policy" sections={PRIVACY} />;
}

export function TermsPage() {
  return <LegalPage seo={PAGE_SEO.terms} title="Terms of Use" breadcrumb="Terms of Use" sections={TERMS} />;
}
