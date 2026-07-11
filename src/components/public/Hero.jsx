import { Link } from "react-router-dom";

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCMFwh-O-Zb5uxYO4PxJn-1TnagGsCo4owjTPkg3cdqvGOscLhcLbXwneUI90VH4sRs5cgI6ClkXT5nabaTtnjzGh9ftEmSheipgDjwbEKG4Ksd1O2ufhgv4mcvdICYeNdINBzXyy85I90gHRouyGW8GM3hhkMkrMdoCgeQBj-gMHjhXAqYYyqCFXP1Jp43konawgLv_aG1Ms02fPsWO3hNauqcX3vBRDAyEogNQHe90PrmtkfvHAAZ";

export default function Hero() {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-surface-variant/20 md:min-h-[760px]">
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt=""
          className="h-full w-full object-cover opacity-60"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl space-y-8 px-6 text-center">
        <h1
          className="reveal is-visible text-4xl font-black leading-tight tracking-tight text-on-background sm:text-5xl md:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Where Learning <span className="italic text-primary">Feels</span> Like Play!
        </h1>

        <p
          className="reveal is-visible mx-auto max-w-2xl text-lg font-medium text-on-surface-variant"
          style={{ animationDelay: "220ms" }}
        >
          A safe, fun, and engaging environment for your child&apos;s first steps. Our structured play
          approach nurtures creativity, curiosity, and confidence in every little learner.
        </p>

        <div
          className="reveal is-visible flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
          style={{ animationDelay: "360ms" }}
        >
          <Link
            to="/admissions#apply-form"
            className="bouncy-button rounded-full bg-primary px-10 py-5 text-xl font-bold text-white transition-all hover:scale-105"
          >
            Apply Now
          </Link>
          <a
            href="https://www.instagram.com/playplaceinternational_.school/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-on-surface-variant transition-all hover:bg-surface-variant/40"
          >
            <span className="material-symbols-outlined">play_circle</span>
            Take a Virtual Tour
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 right-6 hidden translate-y-4 lg:block">
        <span className="material-symbols-outlined animate-wiggle text-[120px] text-tertiary-container opacity-20">
          nature_people
        </span>
      </div>
    </section>
  );
}
