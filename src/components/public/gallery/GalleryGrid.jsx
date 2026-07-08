import { useEffect, useMemo, useState } from "react";
import Reveal from "../../common/Reveal";

const FILTERS = ["All", "Events", "Sports Day", "Annual Function", "Classroom"];

const ITEMS = [
  {
    id: 1,
    title: "Finger Painting Fun",
    category: "Classroom",
    filter: "Classroom",
    badge: "bg-tertiary-container text-on-tertiary-container",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiCE3gzqf6hLe0IQX_CH4hzcOw9Xfu0CquL_FA5VfEtPAsHl2iqUpOTjDyhfrrmAxB27fbbtgaaykSftLs0ggefEXiUSe3KEifVsPgqspMKhakpCsIygTuxbAgSB99E3FKLvzngyIOeS_TV6BRDxo6uyT4zrJT8UBl2j9G1-IY_Y2RpzbrsAYU8bmKoZoCIgYhrmzLisDC3Rb-Tm9eUXnkkzXU1KN2hj7Ha0C_q8TD_r8r58sRnSes",
  },
  {
    id: 2,
    title: "Little Champions",
    category: "Sports Day",
    filter: "Sports Day",
    badge: "bg-primary-container text-on-primary-container",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIZ7LIrgbnCOirzeGpqViz42rY2j_TDpVE3i2d_zn61DP-bh62IE3qltza32y6myBGrKqZ68u333HbXhyFGmMUGS_j9dx_nzBnMgffP7sZvipbhAwQ-5nJesgV7btnZsYu4s0tyE7-ocR4A0VFembN2bgf8Mnh60PRVflXZbD3P6atOdKZppz7CZxweqGElsKdlvHaH_Yq5k20JV4KEHHxKAxCeYpxFF9HnrLIMfm9a4xBjn7YwWl8",
  },
  {
    id: 3,
    title: "Annual Concert",
    category: "Events",
    filter: "Events",
    badge: "bg-secondary-container text-on-secondary-container",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN2p3MfQ6th8hZpLXWDD750TcIXd8HjoPtJCKzU4OAK-3gtw6EMBC68Nhp7DCI33p4ZoglZ8VsAARuskocMcHkYgh9W5T4RXMCjN1ajLv18kKuJHqgzJBo-XRt1K1NIg0WyVs5VXFE5MS9ouLKxzPPR-pYTkDDlDiTaId37gxbJTh214f6tA16gbqGgaTVpciR8p2ulEG0ma5Moq5LkqioAUQde_NLOMNkaPiPeKwY3JgSATFHOf2J",
  },
  {
    id: 4,
    title: "Library Time",
    category: "Classroom",
    filter: "Classroom",
    badge: "bg-tertiary-container text-on-tertiary-container",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsh15P2yrTOgyE-zeMnDCu1gnMILjdN0i-D3mM2yIqOXdtbbgcR_FFKO3XFsaUUUByIcnlnPYFG1-IStM5y6Ra66hJ18Iw6KbNIiMFY2dBrxq5gFb666EyEsy_m96gVt_MzQgkO_kCfXEqW2CHzvXWQNteX91FJEZz_XrGX_XxclbzYWBj4yP_UqkpDX7Qy7QoNnxL6HtnI5ngXzNGdWO3qDDoltrT0d1GqG2z79eTYqXzcU6mY5lX",
  },
  {
    id: 5,
    title: "Block Builders",
    category: "Classroom",
    filter: "Classroom",
    badge: "bg-primary-container text-on-primary-container",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlNxxbkkR445XJTbywilzjcUtfkqOQeJEo9SFD91ZLo7snI5hVmHF7EFEVjzoCwcIGij0p4sQGr20Z2PvNti0vQDCnop563_kqh6-Yk34gKbZTigtLsNS-2xrXpIDYPwlXLnxLYlIiuAACZttvmmyPOIYG_b5AB7rdBVa7aaRp8Rev_lj83E8CCh2TCOcAGYDG5GftYsgmhdFo43XFulhuiSwe8PtUre_n7MCs-LPIypm8AhZ_DD81",
  },
  {
    id: 6,
    title: "Science Explorers",
    category: "Events",
    filter: "Events",
    badge: "bg-secondary-container text-on-secondary-container",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVYSDMrd2UsRhO06-hKTU2tiAEPBYv6ErRzvlRv3Y_Z92LflRAc8OAyNaTiGjCR6X33kR3o-CNPVIicYXy3yNWnikd_RJU41L5ubZJP4l4mGxVN8wOVv8BoR3hqqfRPPs1Hvyumr4UgBPIIjve769DOxdI4qii4M9ejIMAB6qUc2GMq2dT_xAlV93XqPmjhft7cpyraJb3gJYSLzbPpRjasRqpPAMNdo-MHH609eZ8hgmGZly81nbe",
  },
  {
    id: 7,
    title: "Annual Day Parade",
    category: "Annual Function",
    filter: "Annual Function",
    badge: "bg-primary-container text-on-primary-container",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLDGQNMtW47quIvepdx-bLcZ7vCcovnF9ywMD7id8Kj_JQVg-5R9J6-BylZ69kiij19PfUbO3ymNJyLmaJG3HCxqMbEm6lpgdZCD_zyN7Vwq2KlQv8SZNw1OGwyaZDzbLFCLBJkxIwZR44Wvp9Q4N1Kz2vbgpTJjEjuqPX0A6O-jdD6eQnqmt_arLHstRrwzYAZYOZrQIwwz8j2jOU8PMnVLyOik4JXjhKXmL-BYOFOq_Mja2ZOaR0",
  },
];

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
                  alt={item.title}
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
