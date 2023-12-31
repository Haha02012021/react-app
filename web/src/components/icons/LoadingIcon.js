export default function LoadingIcon({ size = 16, color = "#444", className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      stroke={color}
      className={className}
      aria-hidden="true"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18"></circle>
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            ></animateTransform>
          </path>
        </g>
      </g>
    </svg>
  );
}
