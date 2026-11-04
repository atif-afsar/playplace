import Photo from "./Photo";
import Reveal from "./Reveal";

const FRAMES = {
  yellow: "bg-yellow",
  green: "bg-green",
  coral: "bg-coral",
  blue: "bg-blue",
};

/** Photo with a tilted colour frame behind it (as in the design reference). */
export default function FramedPhoto({ photo, frame = "yellow", aspect = "aspect-[4/5]", className = "", sizes, priority, children }) {
  return (
    <Reveal className={`relative mx-auto w-full max-w-md lg:max-w-none ${className}`}>
      <div className={`absolute inset-0 -rotate-3 rounded-[1.75rem] ${FRAMES[frame]} transition-transform duration-500`} aria-hidden="true" />
      <div className="group relative overflow-hidden rounded-[1.75rem] shadow-lift">
        <Photo
          photo={photo}
          priority={priority}
          sizes={sizes || "(min-width: 1024px) 40vw, 90vw"}
          className={`${aspect} w-full transition-transform duration-700 group-hover:scale-105`}
        />
      </div>
      {children}
    </Reveal>
  );
}
