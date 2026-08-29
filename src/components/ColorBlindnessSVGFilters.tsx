import React from 'react';

/**
 * Invisible SVG containing standard color matrix filters for simulating color vision deficiencies:
 * - Protanopia (L-cone absent / Red-blind)
 * - Deuteranopia (M-cone absent / Green-blind)
 * - Tritanopia (S-cone absent / Blue-blind)
 * - Achromatopsia (Complete color blindness / Monochromacy)
 */
export const ColorBlindnessSVGFilters: React.FC = () => {
  return (
    <svg aria-hidden="true" className="sr-only" style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        {/* Protanopia (Red blind) */}
        <filter id="protanopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.567, 0.433, 0,     0, 0
                    0.558, 0.442, 0,     0, 0
                    0,     0.242, 0.758, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>

        {/* Deuteranopia (Green blind) */}
        <filter id="deuteranopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.625, 0.375, 0,   0, 0
                    0.7,   0.3,   0,   0, 0
                    0,     0.3,   0.7, 0, 0
                    0,     0,     0,   1, 0"
          />
        </filter>

        {/* Tritanopia (Blue blind) */}
        <filter id="tritanopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.95, 0.05,  0,     0, 0
                    0,    0.433, 0.567, 0, 0
                    0,    0.475, 0.525, 0, 0
                    0,    0,     0,     1, 0"
          />
        </filter>

        {/* Achromatopsia (Monochromacy) */}
        <filter id="achromatopsia-filter">
          <feColorMatrix
            type="matrix"
            values="0.299, 0.587, 0.114, 0, 0
                    0.299, 0.587, 0.114, 0, 0
                    0.299, 0.587, 0.114, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>
      </defs>
    </svg>
  );
};
