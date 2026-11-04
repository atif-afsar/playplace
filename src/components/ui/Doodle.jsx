/** Small hand-drawn decorative marks that float gently. Purely decorative. */
const SHAPES = {
  spark: (
    <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M6 22 L14 14" />
      <path d="M20 10 L22 2" />
      <path d="M26 16 L34 13" />
    </g>
  ),
  star: <path d="M20 3l4.9 10 11 1.6-8 7.8 1.9 11L20 28.2 10.2 33.4l1.9-11-8-7.8 11-1.6z" fill="currentColor" />,
  squiggle: (
    <path d="M2 20c6-10 10-10 14 0s8 10 14 0 8-10 8-10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" />
  ),
  circle: <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="3.5" fill="none" strokeDasharray="5 5" />,
};

export default function Doodle({ shape = "spark", className = "", color = "text-coral", size = 40, slow = false }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      aria-hidden="true"
      className={`pointer-events-none ${color} ${slow ? "animate-float-slow" : "animate-float"} ${className}`}
    >
      {SHAPES[shape]}
    </svg>
  );
}
