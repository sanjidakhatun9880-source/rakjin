import React from 'react';

interface StoreLogoEmblemSvgProps {
  className?: string;
}

export const StoreLogoEmblemSvg: React.FC<StoreLogoEmblemSvgProps> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sanjida Food Store Logo"
    >
      {/* Outer Golden Border */}
      <circle cx="100" cy="100" r="95" stroke="#d97706" strokeWidth="4.5" fill="#ffffff" />
      <circle cx="100" cy="100" r="90" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />

      {/* --- CART & FRESH PRODUCE (Top Half) --- */}
      <g transform="translate(100, 68)">
        {/* Fresh Produce inside the cart */}
        {/* Wheat Sprig */}
        <path d="M-6 -26 Q-3 -34 0 -38 Q3 -34 6 -26" stroke="#eab308" strokeWidth="2.5" fill="none" />
        <ellipse cx="-4" cy="-32" rx="2.5" ry="4.5" fill="#eab308" transform="rotate(-30 -4 -32)" />
        <ellipse cx="4" cy="-32" rx="2.5" ry="4.5" fill="#eab308" transform="rotate(30 4 -32)" />
        <ellipse cx="-2" cy="-26" rx="2.5" ry="4" fill="#ca8a04" transform="rotate(-25 -2 -26)" />
        <ellipse cx="2" cy="-26" rx="2.5" ry="4" fill="#ca8a04" transform="rotate(25 2 -26)" />

        {/* Honey / Mustard Oil Jar */}
        <rect x="-18" y="-24" width="13" height="15" rx="3" fill="#f59e0b" stroke="#b45309" strokeWidth="1.2" />
        <rect x="-16.5" y="-27" width="10" height="3.5" rx="1.5" fill="#78350f" />
        <line x1="-16" y1="-17" x2="-7" y2="-17" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />

        {/* Green Vegetable Leaf */}
        <path
          d="M-2 -24 C-8 -32 2 -36 5 -28 C8 -24 3 -18 -2 -24 Z"
          fill="#22c55e"
          stroke="#15803d"
          strokeWidth="1"
        />

        {/* Red Fresh Tomato */}
        <circle cx="9" cy="-17" r="9" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
        <ellipse cx="7" cy="-20" rx="3" ry="1.5" fill="#f87171" opacity="0.6" />
        {/* Tomato leafy calyx */}
        <path d="M9 -26 L7.5 -23 L10.5 -23 Z M6 -25 L8 -23 M12 -25 L10 -23" stroke="#16a34a" strokeWidth="1.5" fill="#16a34a" />

        {/* Orange Citrus */}
        <circle cx="-1" cy="-14" r="7.5" fill="#ea580c" stroke="#c2410c" strokeWidth="1" />
        <ellipse cx="-3" cy="-16" rx="2.5" ry="1.2" fill="#fdba74" opacity="0.7" />

        {/* --- Green Shopping Cart Basket --- */}
        {/* Basket Body */}
        <path
          d="M-26 -14 L-22 4 C-21 6 -19 7 -16 7 L16 7 C19 7 21 6 22 4 L26 -14 Z"
          fill="#166534"
          stroke="#14532d"
          strokeWidth="1.5"
        />
        {/* Handle */}
        <path
          d="M-26 -14 L-32 -16 C-34 -17 -34 -19 -32 -20 C-30 -21 -29 -19 -28 -17"
          stroke="#166534"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Cart Wire Grid Details */}
        <line x1="-19" y1="-8" x2="19" y2="-8" stroke="#22c55e" strokeWidth="1" opacity="0.7" />
        <line x1="-16" y1="-1" x2="16" y2="-1" stroke="#22c55e" strokeWidth="1" opacity="0.7" />
        <line x1="-12" y1="-13" x2="-9" y2="6" stroke="#22c55e" strokeWidth="1" opacity="0.6" />
        <line x1="-2" y1="-13" x2="-1" y2="6" stroke="#22c55e" strokeWidth="1" opacity="0.6" />
        <line x1="8" y1="-13" x2="7" y2="6" stroke="#22c55e" strokeWidth="1" opacity="0.6" />

        {/* Little decorative organic leaves on cart side */}
        <path
          d="M26 -14 C32 -18 34 -12 28 -8 Z"
          fill="#22c55e"
          stroke="#15803d"
          strokeWidth="0.8"
        />
        <path
          d="M27 -8 C33 -7 32 -1 26 -4 Z"
          fill="#16a34a"
          stroke="#15803d"
          strokeWidth="0.8"
        />

        {/* Wheels */}
        <circle cx="-13" cy="12" r="4.5" fill="#14532d" />
        <circle cx="-13" cy="12" r="1.8" fill="#ffffff" />
        <circle cx="13" cy="12" r="4.5" fill="#14532d" />
        <circle cx="13" cy="12" r="1.8" fill="#ffffff" />
      </g>

      {/* --- CENTER BRAND NAME: "Sanjida" --- */}
      <text
        x="100"
        y="122"
        textAnchor="middle"
        fontFamily="Georgia, 'Playfair Display', serif"
        fontSize="27"
        fontWeight="bold"
        fill="#14532d"
        letterSpacing="-0.5"
      >
        Sanjida
      </text>

      {/* Small leaf on top of 'i' in Sanjida */}
      <path
        d="M109 104 C112 101 116 102 115 106 C113 108 110 106 109 104 Z"
        fill="#22c55e"
      />

      {/* --- SUBTITLE BANNER: "— FOOD STORE —" --- */}
      {/* Left Line */}
      <line x1="36" y1="138" x2="56" y2="138" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      {/* Middle text */}
      <text
        x="100"
        y="141"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="8.5"
        fontWeight="800"
        fill="#b45309"
        letterSpacing="2.5"
      >
        FOOD STORE
      </text>
      {/* Right Line */}
      <line x1="144" y1="138" x2="164" y2="138" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />

      {/* --- BOTTOM ORNAMENTAL LEAVES --- */}
      <g transform="translate(100, 166)">
        {/* Left Leaf */}
        <path
          d="M-2 2 C-14 -2 -24 6 -28 12 C-20 12 -10 9 -2 2 Z"
          fill="#15803d"
        />
        {/* Right Leaf */}
        <path
          d="M2 2 C14 -2 24 6 28 12 C20 12 10 9 2 2 Z"
          fill="#15803d"
        />
        {/* Stem center dot */}
        <circle cx="0" cy="4" r="2" fill="#d97706" />
      </g>
    </svg>
  );
};
