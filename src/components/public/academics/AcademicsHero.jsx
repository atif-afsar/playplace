import { Link } from "react-router-dom";
import Reveal from "../../common/Reveal";
import { SCHOOL_CONTACT, telHref } from "../../../lib/contact";

const CLASSROOM_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuApssEnDGRewJik-Tywgm8ToSuntdhtJQY5tJHkrU-kCSBPj-nVfKsmB-MZCgunsiqkaXmnhMk-ozcwv2qxc7gfghO33wDjo94EAixbXRPdxbY926UL9JFpmZnrT98_5fj0DfYNIQxPMIO0V9ZQCmAKFzXWx-bKw8gcsXKryBPAGWBO4LqvN08YzOlBnS6arzjYddx2ilNd5rxObzqZCGsSAhT0-3zQRo8zCa1qEn1M-Z20KYB-a3kY";

export default function AcademicsHero() {
  return (
    <section className="relative px-6 pt-12 md:px-16">
      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-12 overflow-hidden rounded-[2.5rem] border-2 border-surface-variant bg-surface-container-low p-8 shadow-[0_10px_30px_-10px_rgba(159,65,34,0.15)] md:flex-row md:p-16">
        <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-secondary-container opacity-20 blur-3xl" />
        <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-tertiary-container opacity-20 blur-3xl" />

        <Reveal className="relative z-10 w-full space-y-6 md:w-1/2">
          <span className="inline-block rounded-full bg-secondary-container px-4 py-1 text-sm font-bold uppercase tracking-widest text-on-secondary-container">
            Growing Hearts &amp; Minds
          </span>
          <h1 className="text-4xl font-black leading-tight text-primary sm:text-5xl">
            Where Curiosity <span className="text-tertiary">Takes Root</span>
          </h1>
          <p className="max-w-lg text-lg font-medium text-on-surface-variant">
            At Play Place International School, we believe that every child is a unique explorer.
            Our curriculum is designed to nurture their innate sense of wonder while building a
            strong academic foundation through love and laughter.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admissions#apply-form"
              className="bouncy-button rounded-full bg-primary px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
            >
              Apply
            </Link>
            <a
              href={telHref(SCHOOL_CONTACT.phones[0])}
              className="bouncy-button inline-flex items-center gap-2 rounded-full border-2 border-primary bg-white px-8 py-3 text-sm font-bold text-primary transition-transform hover:scale-105"
            >
              <span className="material-symbols-outlined text-lg">call</span>
              Book a Visit · {SCHOOL_CONTACT.phones[0]}
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative w-full md:w-1/2">
          <span
            className="material-symbols-outlined absolute -right-2 -top-6 animate-bounce text-6xl text-secondary-fixed-dim"
            style={{ animationDuration: "3s" }}
          >
            wb_sunny
          </span>
          <img
            src={CLASSROOM_IMG}
            alt="Children learning in a colorful classroom"
            className="aspect-square w-full rotate-1 rounded-[2rem] border-8 border-white object-cover shadow-xl transition-transform duration-500 hover:rotate-0"
          />
        </Reveal>
      </div>
    </section>
  );
}
