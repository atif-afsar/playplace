import { Link } from "react-router-dom";
import Reveal from "../../common/Reveal";

export default function AcademicsCTA() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 text-center md:px-16">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] border-4 border-white bg-primary-container p-12 shadow-[0_10px_30px_-10px_rgba(159,65,34,0.15)] md:p-20">
        <span className="material-symbols-outlined absolute right-0 top-0 p-8 text-[12rem] text-on-primary-container opacity-10">
          auto_stories
        </span>
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl font-black text-on-primary-container sm:text-5xl">
            Ready to Start the Adventure?
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-medium text-on-primary-container opacity-90">
            Join our family of happy learners today. Admissions for the 2024 academic year are now
            open for all grade levels.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/admissions"
              className="bouncy-button flex items-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-bold text-primary transition-transform hover:scale-105"
            >
              Apply Online
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <button
              type="button"
              className="bouncy-button rounded-full bg-primary px-10 py-4 text-sm font-bold text-white transition-transform hover:scale-105"
            >
              Download Brochure
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
