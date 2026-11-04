import Seo from "../components/ui/Seo";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import Photo from "../components/ui/Photo";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import { PAGE_SEO } from "../data/seo";
import { GALLERY } from "../data/school";
import { SOCIAL } from "../config/site";

export default function GalleryPage() {
  const instagram = SOCIAL.find((s) => s.label === "Instagram");
  return (
    <>
      <Seo {...PAGE_SEO.gallery} />
      <PageHero breadcrumb="Gallery" title="Little moments, big smiles" intro="Classrooms, play spaces and celebrations at Play Place." />
      <Section>
        <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {GALLERY.map((img, i) => (
            <Reveal as="li" key={img.src} delay={(i % 3) * 80} className="mb-5 break-inside-avoid">
              <figure className="group relative overflow-hidden rounded-3xl">
                <Photo
                  photo={img}
                  priority={i < 3}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className={`w-full transition-transform duration-700 group-hover:scale-105 ${i % 3 === 1 ? "aspect-square" : "aspect-[3/4]"}`}
                />
                <figcaption className="absolute inset-x-3 bottom-3 translate-y-2 rounded-2xl bg-white/90 px-4 py-2.5 text-sm font-bold text-navy opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        {instagram && (
          <div className="mt-10 text-center">
            <Button href={instagram.href} external>
              More on Instagram
            </Button>
          </div>
        )}
      </Section>
    </>
  );
}
