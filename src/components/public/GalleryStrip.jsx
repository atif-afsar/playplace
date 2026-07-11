import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import { GALLERY_STRIP } from "../../lib/galleryImages";

export default function GalleryStrip() {
  return (
    <section className="overflow-hidden bg-surface-container-low py-16 md:py-24">
      <Reveal className="mx-auto mb-10 flex max-w-[1200px] items-end justify-between px-6">
        <div>
          <h2 className="text-3xl font-extrabold text-on-background">Moments of Joy</h2>
          <p className="text-base font-medium text-on-surface-variant">
            A glimpse into our vibrant daily school life.
          </p>
        </div>
        <Link
          to="/gallery"
          className="hidden items-center gap-2 font-bold text-primary transition-all hover:gap-3 md:flex"
        >
          View Full Gallery <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </Reveal>

      <div className="gallery-mask hide-scrollbar flex snap-x gap-6 overflow-x-auto px-6">
        {GALLERY_STRIP.map((item) => (
          <div
            key={item.id}
            className="group h-96 w-80 flex-shrink-0 snap-center overflow-hidden rounded-3xl border-4 border-white shadow-lg transition-transform duration-300 hover:z-10 hover:-translate-y-2"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
