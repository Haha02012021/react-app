export default function SearchIcon({ size = 16, color, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      aria-hidden="true"
      stroke={color}
      className={className}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.67"
        transform="translate(1 1)"
      >
        <circle cx="7.11" cy="7.11" r="7.11"></circle>
        <path d="M16 16l-3.87-3.87"></path>
      </g>
    </svg>
  );
}
