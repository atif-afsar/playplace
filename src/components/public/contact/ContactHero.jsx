import Reveal from "../../common/Reveal";
import OptimizedImage from "../../common/OptimizedImage";

const HERO_IMG = "/images/image3.png";

export default function ContactHero() {
  return (
    <header className="relative mb-24 text-center">
      <Reveal className="relative inline-block">
        <OptimizedImage
          src={HERO_IMG}
          alt="Contact Play Place International School Aligarh"
          className="w-full max-w-4xl rounded-[2rem]"
        />
        <div className="absolute -bottom-10 left-1/2 w-[90%] max-w-lg -translate-x-1/2 rounded-full border-2 border-surface-variant bg-white px-8 py-6 shadow-[0_10px_30px_-5px_rgba(209,228,251,0.5)] md:px-12">
          <h1 className="text-3xl font-black text-primary md:text-5xl">Say Hello!</h1>
          <p className="text-lg font-medium text-on-surface-variant">
            We'd love to hear from you and your little ones.
          </p>
        </div>
      </Reveal>
    </header>
  );
}
