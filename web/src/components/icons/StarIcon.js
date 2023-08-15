export default function StarIcon({ size, color, className }) {
  return (
    <svg
      className={`star-icon ${className}`}
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill={color}
      width={size}
      height={size}
    >
      <path
        fillRule="evenodd"
        d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"
      ></path>
    </svg>
  );
}
