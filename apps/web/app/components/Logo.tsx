'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-auto', size, showText = true }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* SVG RG Speed Logo Symbol */}
      <svg
        viewBox="0 0 320 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto max-h-12 drop-shadow-sm transition-transform hover:scale-105"
        style={size ? { width: `${size}px`, height: `${(size * 180) / 320}px` } : undefined}
      >
        <defs>
          <linearGradient id="rgBrandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="50%" stopColor="#7e22ce" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
          <linearGradient id="rgAccentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Speed Trails Left */}
        <g fill="url(#rgBrandGradient)">
          <polygon points="15,115 85,90 70,103" opacity="0.7" />
          <polygon points="30,125 105,93 90,109" opacity="0.85" />
          <polygon points="45,135 125,97 110,115" opacity="1" />
        </g>

        {/* Bullet Train Top Nose Outline */}
        <path
          d="M 145 28 C 175 18, 210 22, 235 42 C 212 42, 185 35, 158 48 Z"
          fill="url(#rgBrandGradient)"
        />
        {/* Bullet Train Windshield */}
        <path
          d="M 192 30 C 204 31, 215 35, 222 40 L 210 42 C 201 37, 193 34, 188 33 Z"
          fill="#ffffff"
        />

        {/* Letter 'R' */}
        <path
          d="M 85 128 L 122 52 L 172 52 C 194 52, 206 63, 196 81 C 189 93, 175 97, 160 97 L 182 128 L 155 128 L 138 100 L 120 100 L 106 128 Z M 128 88 L 154 88 C 167 88, 174 83, 177 73 C 179 65, 173 62, 161 62 L 140 62 Z"
          fill="url(#rgBrandGradient)"
        />

        {/* Letter 'G' */}
        <path
          d="M 238 58 L 212 58 C 186 58, 170 77, 158 102 C 150 122, 160 136, 186 136 C 210 136, 234 120, 240 98 L 200 98 L 205 85 L 254 85 C 250 117, 220 148, 180 148 C 142 148, 132 121, 144 93 C 157 62, 186 45, 228 45 L 244 45 Z"
          fill="url(#rgBrandGradient)"
        />

        {/* Outer Orbital Ring Swoosh */}
        <path
          d="M 40 128 C 28 162, 78 174, 130 164 C 225 146, 290 102, 280 46 C 274 20, 242 16, 215 24 C 242 28, 264 45, 258 70 C 248 114, 190 148, 115 156 C 72 160, 48 148, 56 130 Z"
          fill="url(#rgBrandGradient)"
        />

        {/* Railway Track Cross Ties Bottom Right */}
        <g fill="url(#rgBrandGradient)">
          <polygon points="208,142 220,138 236,155 224,159" />
          <polygon points="228,150 240,146 256,163 244,167" />
          <polygon points="248,158 260,154 276,171 264,175" />
          <polygon points="202,148 274,166 272,169 200,151" />
          <polygon points="212,138 284,156 282,159 210,141" />
        </g>
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 leading-none">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight gradient-text" style={{ fontFamily: 'Outfit, sans-serif' }}>
              RailGo
            </span>
            <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 border border-purple-200">
              28 Mesh
            </span>
          </div>
          <span className="text-[11px] font-medium text-stone-500 mt-1 leading-none">
            Official IRCTC Express Partner
          </span>
        </div>
      )}
    </div>
  );
};
