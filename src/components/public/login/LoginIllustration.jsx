const ILLUSTRATION =
  "https://lh3.googleusercontent.com/aida/AP1WRLvObHZlMG-QmfgrwI97OHglxKaA0tkUAUaibiDtKfmA19a886jX2zBzJS44tCwkX4Z0HsyMzrm5nRsBJq4MQupTNSaY0K52AFi9ArXP8vv93JP_hvCMCTyvRyojc-AQ8nl8pdwJq6YOvIO_h91chc0dt9jjdIE1a0KkS2HlS5uD2D5N-kn3qDYNStcfRLOzgD7qd2O95vXw6leiebZlCXT-nddIYQa1aT4--y03J0qq1oVL8FlXijo06x0";

export default function LoginIllustration() {
  return (
    <div className="hidden w-full flex-col items-center justify-center md:flex md:w-1/2">
      <div className="group relative">
        <span
          className="material-symbols-outlined absolute -top-12 left-1/2 -translate-x-1/2 text-[64px] text-primary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          face_5
        </span>
        <img
          src={ILLUSTRATION}
          alt="Play Place student"
          className="w-full drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h1 className="font-display mt-8 text-center text-3xl font-bold text-primary">
        Ready for School?
      </h1>
      <p className="mt-2 max-w-sm text-center text-lg font-medium text-on-surface-variant">
        Sign in to explore your playground of learning!
      </p>
    </div>
  );
}
