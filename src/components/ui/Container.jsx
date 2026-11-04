const WIDTHS = {
  default: "max-w-7xl",
  narrow: "max-w-5xl",
  prose: "max-w-3xl",
};

export default function Container({ as: Tag = "div", width = "default", className = "", children, ...rest }) {
  return (
    <Tag className={`mx-auto w-full px-5 sm:px-6 lg:px-8 ${WIDTHS[width]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
