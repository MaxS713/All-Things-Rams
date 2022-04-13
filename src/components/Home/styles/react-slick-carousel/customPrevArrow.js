

export default function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", filter: "invert(1)" }}
      onClick={onClick}
    />
  );
}