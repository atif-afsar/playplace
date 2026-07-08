import Reveal from "../../common/Reveal";

const PRINCIPAL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBVYEODeeeXpv8b6bctvL6Doy6cJeiMcscF3WXSOas55eekXjUH65U2fx0Lj0mL_s0PirIjQvXcrldQDJHH8BdrtF7cEvspIs5-kXDXerm3rVCaBgxv-4DPuwzvjyespovFEIqY7C001CJv9Sq98LI88k_qj6sY80DVp4nYXPVQgstq7ZeK10hz_AWA8-pAgDCgsFf54trYoe_vpCr8lPpHVaknReP_O2mO5KCMZ9O7dK-2lAeoGUpj";

export default function PrincipalMessage() {
  return (
    <section className="bg-surface-container-low py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <Reveal className="relative shrink-0">
            <div className="absolute -inset-4 animate-pulse rounded-full bg-secondary-container opacity-30" />
            <img
              src={PRINCIPAL}
              alt="Principal Elena Martinez"
              className="relative z-10 h-64 w-64 rounded-full border-8 border-white shadow-xl md:h-80 md:w-80"
            />
          </Reveal>

          <Reveal
            delay={140}
            className="relative flex-1 rounded-[2.5rem] border-2 border-outline-variant bg-surface-container-lowest p-8 shadow-[0_10px_30px_-5px_rgba(159,65,34,0.1)] md:p-12"
          >
            <span className="material-symbols-outlined absolute -top-6 left-12 text-6xl text-secondary-container">
              format_quote
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-on-surface">
              A Message from Principal Martinez
            </h2>
            <div className="space-y-4 text-lg font-medium italic text-on-surface-variant">
              <p>
                "Welcome to Play Place! Our school is more than just a building; it's a vibrant
                community where your child's first educational steps are taken with joy and
                confidence."
              </p>
              <p>
                "We believe that every child is a unique bundle of potential. Our curriculum is
                designed to balance academic readiness with the critical social-emotional skills
                that come from playing, sharing, and creating together. I invite you to join our
                family and witness the magic of childhood at its best."
              </p>
            </div>
            <div className="mt-8">
              <p className="text-xl font-bold text-primary">Elena Martinez</p>
              <p className="text-sm font-bold uppercase tracking-widest text-secondary">
                School Director &amp; Principal
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
