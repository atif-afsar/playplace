import Icon from "./Icon";

const COLORS = {
  pink: "bg-pink-soft text-coral",
  green: "bg-green-soft text-green-ink",
  lilac: "bg-lilac-soft text-[#8a4fd0]",
  yellow: "bg-yellow-soft text-[#a06c00]",
  blue: "bg-blue-soft text-blue",
  navy: "bg-navy text-white",
  white: "bg-white text-navy",
  onDark: "bg-white/10 text-yellow",
};

const SIZES = {
  sm: "h-10 w-10 rounded-xl [&>.icon]:!text-[1.35rem]",
  md: "h-12 w-12 rounded-2xl",
  lg: "h-16 w-16 rounded-2xl [&>.icon]:!text-[2rem]",
};

export default function IconBadge({ name, color = "pink", size = "md", className = "" }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center transition-transform duration-300 ${SIZES[size]} ${COLORS[color]} ${className}`}
    >
      <Icon name={name} />
    </span>
  );
}
