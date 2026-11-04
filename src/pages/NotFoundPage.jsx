import Seo from "../components/ui/Seo";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { PAGE_SEO } from "../data/seo";

const SUGGESTIONS = [
  { to: "/franchise", label: "Franchise Opportunity", icon: "handshake" },
  { to: "/franchise-ecosystem", label: "Franchise Ecosystem", icon: "hub" },
  { to: "/admissions", label: "Admissions", icon: "how_to_reg" },
  { to: "/contact", label: "Contact Us", icon: "call" },
];

export default function NotFoundPage() {
  return (
    <>
      <Seo {...PAGE_SEO.notFound} />
      <section className="bg-blue-soft">
        <Container width="prose" className="py-20 text-center sm:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-ink">Error 404</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">We couldn’t find that page</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
            The page may have moved, or the link may be incorrect. Here are some helpful places to start.
          </p>
          <div className="mt-8">
            <Button to="/" size="lg" iconLeft="home">
              Back to home
            </Button>
          </div>
          <ul className="mx-auto mt-12 grid max-w-xl gap-3 sm:grid-cols-2">
            {SUGGESTIONS.map((s) => (
              <li key={s.to}>
                <Button to={s.to} variant="secondary" className="w-full !justify-start" iconLeft={s.icon}>
                  {s.label}
                </Button>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
