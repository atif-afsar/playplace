import { Link } from "react-router-dom";
import Icon from "./Icon";

const VARIANTS = {
  primary: { btn: "bg-coral text-white hover:bg-coral-dark shadow-[0_10px_24px_-12px_rgb(229_72_59/0.8)]", dot: "bg-white text-coral" },
  secondary: { btn: "border-2 border-navy/15 bg-white text-navy hover:border-navy/40", dot: "bg-navy text-white" },
  light: { btn: "bg-white text-navy hover:bg-yellow-soft shadow-soft", dot: "bg-coral text-white" },
  glass: { btn: "border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20", dot: "bg-white text-navy" },
  whatsapp: { btn: "bg-[#1a8a4a] text-white hover:bg-[#157340] shadow-soft", dot: "bg-white text-[#1a8a4a]" },
};

const SIZES = {
  sm: { btn: "text-sm py-1.5 pl-4 pr-1.5", plain: "px-4 py-2 text-sm", dot: "h-7 w-7 [&_.icon]:!text-base" },
  md: { btn: "text-[0.95rem] py-1.5 pl-5 pr-1.5", plain: "px-5 py-2.5 text-[0.95rem]", dot: "h-9 w-9 [&_.icon]:!text-lg" },
  lg: { btn: "text-base py-2 pl-6 pr-2", plain: "px-6 py-3 text-base", dot: "h-10 w-10 [&_.icon]:!text-xl" },
};

/**
 * Pill button with a round arrow badge (set `arrow={false}` for a plain pill).
 * `to` → router Link, `href` → anchor, otherwise <button>.
 */
export default function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  arrow = true,
  arrowIcon = "arrow_outward",
  iconLeft,
  external = false,
  className = "",
  type = "button",
  children,
  ...rest
}) {
  const v = VARIANTS[variant];
  const s = SIZES[size];
  const classes = `group inline-flex items-center justify-center gap-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 ${v.btn} ${arrow ? s.btn : s.plain} ${className}`;

  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} className="-mr-1 !text-[1.25em]" />}
      <span>{children}</span>
      {arrow && (
        <span className={`inline-flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${v.dot} ${s.dot}`}>
          <Icon name={arrowIcon} />
        </span>
      )}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
