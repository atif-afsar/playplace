import Reveal from "../../common/Reveal";
import OptimizedImage from "../../common/OptimizedImage";

const HERO_IMG = "/images/image4.png";

export default function GalleryHero() {
  return (
    <header className="relative overflow-hidden px-6 pb-24 pt-16 md:px-16">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-12 md:flex-row">
        <Reveal className="z-10 flex-1 text-center md:text-left">
          <h1 className="font-display mb-4 text-4xl font-black text-primary sm:text-5xl">
            School Gallery — Play Place Aligarh
          </h1>
          <p className="max-w-xl text-lg font-medium text-on-surface-variant">
            Take a peek into our world of laughter, discovery, and endless imagination. Every
            photo tells a story of a child blossoming.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <div className="flex items-center gap-2 rounded-full border-2 border-primary-container bg-surface-container-high px-4 py-2 text-primary">
              <span className="material-symbols-outlined">celebration</span>
              <span className="font-bold">500+ Happy Memories</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative flex-1">
          <div className="relative aspect-square w-full rotate-3 overflow-hidden rounded-[2rem] border-8 border-white shadow-xl md:aspect-video">
            <OptimizedImage
              src={HERO_IMG}
              alt="Play Place International School gallery — junior school life in Aligarh"
              className="h-full w-full object-cover"
            />
          </div>
          <span
            className="material-symbols-outlined absolute -right-10 -top-10 animate-bounce text-8xl text-secondary-container opacity-40"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            wb_sunny
          </span>
        </Reveal>
      </div>
      <div
        className="absolute bottom-0 left-0 h-24 w-full bg-surface-container-low"
        style={{ clipPath: "ellipse(70% 100% at 50% 100%)" }}
      />
    </header>
  );
}
