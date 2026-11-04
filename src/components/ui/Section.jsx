import Container from "./Container";

const TONES = {
  white: "bg-white",
  cream: "bg-cream",
  blue: "bg-blue-soft",
  green: "bg-green-soft",
  pink: "bg-pink-soft",
  lilac: "bg-lilac-soft",
  navy: "bg-navy text-white",
};

/** Page section with consistent vertical rhythm and background tones. */
export default function Section({
  id,
  tone = "white",
  width,
  className = "",
  containerClassName = "",
  children,
  ...rest
}) {
  return (
    <section id={id} className={`relative py-16 sm:py-20 lg:py-24 ${TONES[tone]} ${className}`} {...rest}>
      <Container width={width} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
