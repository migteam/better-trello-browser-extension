import { SVGProps } from "react";

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 208 208"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <g filter="url(#b)">
        <path
          fill="url(#c)"
          d="M0 36.688C0 15.874 16.874-1 37.688-1h133.623C192.126-1 209 15.874 209 36.688v133.623C209 191.126 192.126 208 171.311 208H37.688C16.875 208 0 191.126 0 170.311V36.688Z"
        />
      </g>
      <path
        fill="url(#d)"
        fillOpacity={0.9}
        d="M47.463 152C39.475 152 33 145.525 33 137.537V40.463C33 32.475 39.475 26 47.463 26h11.074C66.525 26 73 32.475 73 40.463v97.074C73 145.525 66.525 152 58.537 152H47.463Z"
      />
      <path
        fill="url(#e)"
        fillOpacity={0.9}
        d="M102.463 116C94.476 116 88 109.525 88 101.537V40.463C88 32.475 94.475 26 102.463 26h11.074C121.525 26 128 32.475 128 40.463v61.074c0 7.988-6.475 14.463-14.463 14.463h-11.074Z"
      />
    </g>
    <defs>
      <linearGradient
        id="c"
        x1={15.046}
        x2={191.347}
        y1={201.892}
        y2={20.153}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E812C6" />
        <stop offset={1} stopColor="#EB440F" />
      </linearGradient>
      <linearGradient
        id="d"
        x1={46.408}
        x2={46.408}
        y1={153.896}
        y2={-7.923}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <linearGradient
        id="e"
        x1={101.408}
        x2={101.408}
        y1={117.354}
        y2={1.769}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h208v208H0z" />
      </clipPath>
      <filter
        id="b"
        width={219}
        height={219}
        x={-5}
        y={-5}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={2.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2389_2" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_2389_2"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={-4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
        <feBlend in2="shape" result="effect2_innerShadow_2389_2" />
      </filter>
    </defs>
  </svg>
);
export default Logo;
