import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import OptimizedImage from "../common/OptimizedImage";
import { GALLERY_STRIP } from "../../lib/galleryImages";

export default function GalleryStrip() {
  return (
    <section className="overflow-hidden bg-surface-container-low py-12 md:py-24">
      <Reveal className="mx-auto mb-8 flex max-w-[1200px] flex-col gap-3 px-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <h2 className="text-2xl font-extrabold text-on-background sm:text-3xl">Moments of Joy</h2>
          <p className="text-sm font-medium text-on-surface-variant sm:text-base">
            A glimpse into our vibrant daily school life.
          </p>
        </div>
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 self-start text-sm font-bold text-primary sm:self-auto sm:text-base"
        >
          View Full Gallery <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </Link>
      </Reveal>

      <div className="gallery-mask hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:gap-6 sm:px-6">
        {GALLERY_STRIP.map((item) => (
          <div
            key={item.id}
            className="group h-64 w-[78vw] max-w-[300px] flex-shrink-0 snap-center overflow-hidden rounded-3xl border-4 border-white shadow-lg sm:h-80 sm:w-72"
          >
            <OptimizedImage
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
