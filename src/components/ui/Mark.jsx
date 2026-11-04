/** Highlighter effect behind heading words. color: blue | green | yellow | light */
export default function Mark({ color = "blue", children }) {
  return <span className={`mark ${color === "blue" ? "" : `mark-${color}`}`}>{children}</span>;
}
