import { useEffect, useMemo, useState } from "react";
import Reveal from "../../common/Reveal";
import { GALLERY_IMAGES } from "../../../lib/galleryImages";

const FILTERS = ["All", "Events", "Sports Day", "Annual Function", "Classroom"];

const BADGES = [
  "bg-tertiary-container text-on-tertiary-container",
  "bg-primary-container text-on-primary-container",
  "bg-secondary-container text-on-secondary-container",
];

const CATEGORIES = ["Classroom", "Events", "Sports Day", "Annual Function"];

const ITEMS = GALLERY_IMAGES.map((img, i) => ({
  id: img.id,
  title: img.title,
  category: CATEGORIES[i % CATEGORIES.length],
  filter: CATEGORIES[i % CATEGORIES.length],
  badge: BADGES[i % BADGES.length],
  src: img.src,
  alt: img.alt,
}));

export default function GalleryGrid() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(
    () => (active === "All" ? ITEMS : ITEMS.filter((i) => i.filter === active)),
    [active]
  );

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const navigate = (dir) => {
    if (lightbox === null) return;
    const idx = filtered.findIndex((i) => i.id === lightbox);
    const next = (idx + dir + filtered.length) % filtered.length;
    setLightbox(filtered[next].id);
  };

  const current = filtered.find((i) => i.id === lightbox) ?? ITEMS.find((i) => i.id === lightbox);

  return (
    <>
      <section className="bg-surface-container-low px-6 pb-8 md:px-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap justify-center gap-4 py-8">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`font-display rounded-full px-8 py-3 text-xl font-bold transition-transform hover:scale-105 active:scale-95 ${
                  active === f
                    ? "bg-primary text-white shadow-md"
                    : "border-2 border-transparent bg-surface-container-highest text-on-surface-variant hover:border-primary-container"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 60}
              className="image-zoom group cursor-pointer overflow-hidden rounded-[1.5rem] border-4 border-white bg-white p-4 shadow-[0_10px_30px_-5px_rgba(159,65,34,0.1)] transition-transform hover:scale-105"
              onClick={() => setLightbox(item.id)}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-container">
                <img
                  src={item.src}
                  alt={item.alt ?? item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-on-surface">{item.title}</h3>
                  <p className="text-base font-medium text-on-surface-variant">{item.category}</p>
                </div>
                <div className={`rounded-full p-2 ${item.badge}`}>
                  <span className="material-symbols-outlined">zoom_in</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-lg font-medium text-on-surface-variant">
            No photos in this category yet.
          </p>
        )}

        <div className="mt-16 text-center">
          <button
            type="button"
            className="font-display rounded-full border-4 border-primary-container bg-white px-12 py-4 text-2xl font-extrabold text-primary shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            View More Joy
          </button>
        </div>
      </section>

      {current && (
        <div
          className="lightbox-bg fixed inset-0 z-50 flex animate-[fadeIn_0.3s_ease-out] items-center justify-center p-8"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-8 top-8 text-white"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-5xl">close</span>
          </button>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="rounded-[1.5rem] border-8 border-white bg-white p-6 shadow-2xl">
              <img src={current.src} alt={current.title} className="w-full rounded-xl" />
              <div className="mt-6 flex items-center justify-between">
                <h2 className="font-display text-3xl font-extrabold text-on-surface">
                  {current.title}
                </h2>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="rounded-full bg-surface-container-highest p-4 text-primary transition-transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(1)}
                    className="rounded-full bg-surface-container-highest p-4 text-primary transition-transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
