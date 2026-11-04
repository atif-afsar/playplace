import Container from "./Container";
import Doodle from "./Doodle";
import Reveal from "./Reveal";

/** Closing call-to-action band with soft colour and floating doodles. */
export default function CTABand({ title, text, actions, image }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-14 sm:px-14">
          <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-coral/40 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-16 right-10 h-56 w-56 rounded-full bg-green/30 blur-3xl" aria-hidden="true" />
          <Doodle shape="star" color="text-yellow" className="absolute right-8 top-8" size={30} />
          <Doodle shape="squiggle" color="text-green" className="absolute bottom-8 left-10 hidden sm:block" size={50} slow />
          <div className={`relative grid items-center gap-10 ${image ? "lg:grid-cols-[1.3fr_0.7fr]" : ""}`}>
            <div className={image ? "" : "mx-auto max-w-2xl text-center"}>
              <h2 className="text-3xl leading-tight !text-white sm:text-[2.6rem]">{title}</h2>
              {text && <p className="mt-4 text-lg leading-relaxed text-white/80">{text}</p>}
              {actions && <div className={`mt-8 flex flex-wrap gap-3 ${image ? "" : "justify-center"}`}>{actions}</div>}
            </div>
            {image}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
