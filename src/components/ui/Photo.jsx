/** Responsive local photo from the PHOTOS library (src/data/school.js). */
export default function Photo({
  photo,
  className = "",
  sizes = "(min-width: 1024px) 40vw, 90vw",
  priority = false,
  alt,
}) {
  return (
    <img
      src={photo.src}
      srcSet={`${photo.srcSmall} 560w, ${photo.src} 960w`}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={alt ?? photo.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={`object-cover ${className}`}
    />
  );
}
