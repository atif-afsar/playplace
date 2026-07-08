import Reveal from "../../common/Reveal";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAX4dHh0lHZnTkOeXaH0tJOCJ8VgDtJ9QyjEwJBvQDfF20iMOFrKPiO8Hbp2ECgXqrQ3CtqiUiExM2loGtBLyk06_SSves6N3gTq7SQ77iPqTX7LXXq_CQWyn8OB1X1kBG6vq_KSve0NSn3G5sbb5G8h9T0U8BmlOBfWcXv4B3yZ7O2tbZ-kzqBMNOPmgdSv4GHr4X4rZ4aYwFh45eVOQdsWYP-CH6o6OqUjG5qTHVwwDI5cu6J35U7";

export default function ContactHero() {
  return (
    <header className="relative mb-24 text-center">
      <Reveal className="relative inline-block">
        <img src={HERO_IMG} alt="Friendly school reception" className="w-full max-w-4xl rounded-[2rem]" />
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
