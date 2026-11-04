import { Link } from "react-router-dom";
import Container from "./Container";
import Icon from "./Icon";
import Doodle from "./Doodle";

/**
 * Inner-page hero. With `photo`: full-width image with a soft dark overlay.
 * Without: a pastel band with floating doodles.
 */
export default function PageHero({ title, intro, breadcrumb, actions, photo, photoPosition }) {
  const onPhoto = Boolean(photo);
  return (
    <section className={`relative overflow-hidden ${onPhoto ? "bg-navy" : "bg-blue-soft"}`}>
      {onPhoto && (
        <>
          <img
            src={photo.src}
            srcSet={photo.srcSet || `${photo.srcSmall} 560w, ${photo.src} 960w`}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full animate-kenburns object-cover"
            style={{ objectPosition: photoPosition || photo.position || "center 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/35 via-50% to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 bg-navy/25 lg:hidden" aria-hidden="true" />
        </>
      )}
      {!onPhoto && (
        <>
          <Doodle shape="star" color="text-yellow" className="absolute right-[12%] top-10" size={34} />
          <Doodle shape="squiggle" color="text-green" className="absolute bottom-8 right-[30%]" size={48} slow />
          <Doodle shape="circle" color="text-coral/50" className="absolute left-[60%] top-16 hidden md:block" size={46} slow />
        </>
      )}
      <Container className={`relative flex flex-col justify-center py-14 sm:py-20 lg:py-24 ${onPhoto ? "min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]" : ""}`}>
        <div className="max-w-2xl animate-fade-up">
          {breadcrumb && (
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className={`flex items-center gap-1 text-sm font-semibold ${onPhoto ? "text-white/75" : "text-muted"}`}>
                <li>
                  <Link to="/" className={onPhoto ? "hover:text-white" : "hover:text-navy"}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <Icon name="chevron_right" className="!text-base" />
                </li>
                <li aria-current="page" className={onPhoto ? "text-white" : "text-navy"}>
                  {breadcrumb}
                </li>
              </ol>
            </nav>
          )}
          <h1 className={`text-[2.5rem] leading-[1.08] sm:text-6xl ${onPhoto ? "!text-white" : ""}`}>{title}</h1>
          {intro && (
            <p className={`mt-5 max-w-xl text-lg leading-relaxed ${onPhoto ? "text-white/85" : "text-muted"}`}>{intro}</p>
          )}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </Container>
    </section>
  );
}
