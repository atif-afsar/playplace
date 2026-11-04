import { useEffect, useRef, useState } from "react";

function CountUp({ value, start }) {
  // Start at the real value so pre-rendered HTML (and crawlers) show the true number;
  // the count-up animation only runs once the strip scrolls into view.
  const [n, setN] = useState(value);
  const done = useRef(false);

  useEffect(() => {
    if (!start || done.current) return undefined;
    done.current = true;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 1100);
      setN(Math.max(1, Math.round(value * (1 - Math.pow(1 - p, 3)))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return n;
}

/** Row of numbers with dividers; numbers count up when scrolled into view. */
export default function StatsStrip({ stats, className = "" }) {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStart(true);
        io.disconnect();
      }
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <dl ref={ref} className={`grid grid-cols-2 gap-y-8 lg:grid-cols-4 ${className}`}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col-reverse items-center border-line px-4 text-center ${i % 2 === 1 ? "border-l" : ""} ${
            i === 2 ? "lg:border-l" : ""
          }`}
        >
          <dt className="mt-1 text-sm font-semibold text-muted">{s.label}</dt>
          <dd className="font-display text-4xl font-semibold text-navy">
            <CountUp value={s.value} start={start} />
            {s.suffix}
          </dd>
        </div>
      ))}
    </dl>
  );
}
