/**
 * Performance-friendly image: lazy by default, eager + high priority for LCP heroes.
 */
export default function OptimizedImage({
  alt,
  priority = false,
  className = "",
  width,
  height,
  ...props
}) {
  return (
    <img
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={className}
      {...props}
    />
  );
}
