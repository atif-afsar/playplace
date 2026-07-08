const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBX0pwdU48FhXBOD-Oq3vzkJbgLCgm28D2YZtA2EDpElE9cZWNyay2GZ8vGhExfVz2PHgIYyk7ukpKkqo314sOqe9naofsg4luBOw9yAQGqvFI-0PEXbd_2tPJ-NCw0FjFcpILozo7rB6hyfzUe5hsNj1MIiO33RDS8_TmVk5HHSGqqAJ9kBeW3aVx6fwemGW1PIBw9VBKVU2UDjsczvtzG_1KAFh6Azkq85cqNw3HQ2FRQbQkQ8qS0";

export default function AboutHero() {
  return (
    <section className="relative flex h-[440px] w-full items-center justify-center overflow-hidden md:h-[500px]">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO_BG}')` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/20" />
      </div>

      <div className="relative z-10 px-4 text-center md:px-0">
        <div className="reveal is-visible inline-block -rotate-1 rounded-[2.5rem] border-4 border-white bg-primary-container/90 p-8 shadow-[0_10px_30px_-5px_rgba(159,65,34,0.2)] backdrop-blur-sm md:p-12">
          <h1 className="text-4xl font-black leading-tight text-on-primary-container sm:text-5xl">
            About Play Place
            <br />
            International School
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-on-primary-container">
            Where every day is a new adventure in learning, growing, and playing together!
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-1 left-1/2 flex w-full -translate-x-1/2 justify-between px-10">
        <span className="material-symbols-outlined animate-bounce text-6xl text-secondary">park</span>
        <span className="material-symbols-outlined animate-wiggle text-6xl text-primary-container">wb_sunny</span>
      </div>
    </section>
  );
}
