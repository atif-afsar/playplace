import Reveal from "../../common/Reveal";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBgOs-L7JKE0AX-svs68NpllafChQ0KGHE01TnsxC9r33mYA6wTCUl9VaWv5eiyy6BIJ_E8v5vY7DiLV3R4GpF8PNKvETMko6MigxRoDlPBd8LJneTyrq4mTmQ2WvnMdL8We-VilxJI8UM4rRIXEbj0adVE8yB0TPAuiA-8FPKD-wyzdBpapIO9Cb9Gv7Cp7Me9118JeR3pAY0ZA36cYNa6E7_joFppZfomc4Msl9DW3lYDtNvX7Q7N";

export default function GalleryHero() {
  return (
    <header className="relative overflow-hidden px-6 pb-24 pt-16 md:px-16">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-12 md:flex-row">
        <Reveal className="z-10 flex-1 text-center md:text-left">
          <h1 className="font-display mb-4 text-4xl font-black text-primary sm:text-5xl">
            Our Moments of Joy
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
            <img src={HERO_IMG} alt="Children with picture frames" className="h-full w-full object-cover" />
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
