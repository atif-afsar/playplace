/**
 * Material Symbols icon. The glyph comes from the `data-icon` attribute via CSS
 * (::before), so icon names like "arrow_forward" never appear as page text for
 * search engines or screen readers. Pass `label` only when the icon carries meaning alone.
 */
export default function Icon({ name, className = "", fill = false, label }) {
  return (
    <span
      data-icon={name}
      className={`icon ${fill ? "icon-fill" : ""} ${className}`}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    />
  );
}
