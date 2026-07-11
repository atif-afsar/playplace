import { Link } from "react-router-dom";
import Reveal from "../../common/Reveal";
import OptimizedImage from "../../common/OptimizedImage";
import { SCHOOL_CONTACT, telHref } from "../../../lib/contact";

const CLASSROOM_IMG = "/images/image2.png";

export default function AcademicsHero() {
  return (
    <section className="relative px-4 pt-8 sm:px-6 md:px-16 md:pt-12">
      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-8 overflow-hidden rounded-[2rem] border-2 border-surface-variant bg-surface-container-low p-6 shadow-[0_10px_30px_-10px_rgba(159,65,34,0.15)] sm:rounded-[2.5rem] sm:p-8 md:flex-row md:gap-12 md:p-16">
        <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-secondary-container opacity-20 blur-3xl" />
        <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-tertiary-container opacity-20 blur-3xl" />

        <Reveal className="relative z-10 w-full space-y-6 md:w-1/2">
          <span className="inline-block rounded-full bg-secondary-container px-4 py-1 text-sm font-bold uppercase tracking-widest text-on-secondary-container">
            Growing Hearts &amp; Minds
          </span>
          <h1 className="text-3xl font-black leading-tight text-primary sm:text-4xl md:text-5xl">
            Where Curiosity <span className="text-tertiary">Takes Root</span>
          </h1>
          <p className="max-w-lg text-lg font-medium text-on-surface-variant">
            At Play Place International School, we believe that every child is a unique explorer.
            Our curriculum is designed to nurture their innate sense of wonder while building a
            strong academic foundation through love and laughter.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/admissions#apply-form"
              className="bouncy-button w-full rounded-full bg-primary px-8 py-3.5 text-center text-sm font-bold text-white sm:w-auto"
            >
              Apply
            </Link>
            <a
              href={telHref(SCHOOL_CONTACT.phones[0])}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-white px-6 py-3.5 text-sm font-bold text-primary sm:w-auto"
            >
              <span className="material-symbols-outlined text-lg">call</span>
              Call to Book a Visit
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
          <OptimizedImage
            src={CLASSROOM_IMG}
            alt="Play Place junior wing classroom in Aligarh — Nursery, LKG and UKG learning"
            className="aspect-square w-full rotate-1 rounded-[2rem] border-8 border-white object-cover shadow-xl transition-transform duration-500 hover:rotate-0"
          />
        </Reveal>
      </div>
    </section>
  );
}
