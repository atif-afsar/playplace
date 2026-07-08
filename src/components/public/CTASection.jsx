import Reveal from "../common/Reveal";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 text-center md:py-24">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-primary-container/20 p-12 md:p-20">
        <div className="animate-float absolute -left-10 -top-10 h-40 w-40 rounded-full bg-secondary-container opacity-30" />
        <div className="animate-float-delayed absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-tertiary-container opacity-30" />

        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-extrabold text-on-background">Ready to join the fun?</h2>
          <p className="mx-auto max-w-xl text-lg font-medium text-on-surface-variant">
            Enroll your child today and start their journey of discovery, friendship, and joyful
            learning at Play Place.
          </p>
          <form
            className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Parent's Email Address"
              className="w-full max-w-sm rounded-full border-2 border-outline-variant bg-surface-container-lowest px-6 py-4 text-base font-medium outline-none transition-all focus:border-secondary"
            />
            <button
              type="submit"
              className="bouncy-button whitespace-nowrap rounded-full bg-primary px-10 py-4 text-sm font-bold text-white"
            >
              Get Admissions Info
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
