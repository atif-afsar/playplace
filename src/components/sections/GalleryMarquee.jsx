import { MARQUEE_PHOTOS } from "../../data/school";
import Button from "../ui/Button";
import Mark from "../ui/Mark";
import SectionHeading from "../ui/SectionHeading";
import Container from "../ui/Container";

/** Auto-scrolling photo strip. Pauses on hover; static under reduced motion. */
export default function GalleryMarquee() {
  const items = [...MARQUEE_PHOTOS, ...MARQUEE_PHOTOS];
  return (
    <section className="overflow-hidden py-16 sm:py-20">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          title={
            <>
              Little <Mark color="green">moments</Mark>, big smiles
            </>
          }
        />
        <Button to="/gallery" variant="secondary">
          View gallery
        </Button>
      </Container>
      <div className="mt-10 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <ul className="marquee-track flex w-max animate-marquee gap-5 px-3">
          {items.map((p, i) => (
            <li
              key={`${p.src}-${i}`}
              aria-hidden={i >= MARQUEE_PHOTOS.length || undefined}
              className={`w-56 shrink-0 overflow-hidden rounded-3xl sm:w-64 ${i % 2 ? "mt-8" : ""}`}
            >
              <img
                src={p.srcSmall}
                width="560"
                height="747"
                alt={i >= MARQUEE_PHOTOS.length ? "" : p.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
