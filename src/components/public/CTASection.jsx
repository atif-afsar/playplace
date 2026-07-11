import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-12 text-center sm:px-6 md:py-24">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-primary-container/20 p-8 sm:rounded-[2.5rem] sm:p-12 md:p-20">
        <div className="animate-float absolute -left-10 -top-10 h-40 w-40 rounded-full bg-secondary-container opacity-30" />
        <div className="animate-float-delayed absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-tertiary-container opacity-30" />

        <div className="relative z-10 space-y-6">
          <h2 className="text-2xl font-extrabold text-on-background sm:text-3xl">Ready to join the fun?</h2>
          <p className="mx-auto max-w-xl text-base font-medium text-on-surface-variant sm:text-lg">
            Enroll your child today at Aligarh&apos;s favourite junior wing — Playgroup through UKG.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row sm:gap-4 sm:pt-6">
            <Link
              to="/admissions#apply-form"
              className="bouncy-button w-full rounded-full bg-primary px-8 py-4 text-sm font-bold text-white sm:w-auto sm:px-10"
            >
              Start Application
            </Link>
            <Link
              to="/contact"
              className="w-full rounded-full border-2 border-primary bg-white px-8 py-4 text-sm font-bold text-primary sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
