/**
 * SVG scene illustrations for scratch card reveals.
 * Each scene is a self-contained SVG string with explicit width/height
 * for reliable rendering as an Image source.
 *
 * 5 scenes — one per card at max num_cards setting.
 */

export interface ElementRegion {
  /** Human-readable label for the visual element */
  name: string;
  /** Normalized bounding box (0–1 relative to canvas dimensions) */
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Background {
  name: string;
  svg: string;
  /** Key visual elements with normalized bounding boxes for scratch pattern analysis */
  elements: ElementRegion[];
}

/** Person sitting under a tree on a hill, reading a book */
const treeReader: Background = {
  name: "tree_reader",
  elements: [
    { name: "sun",    x: 0.70, y: 0.10, w: 0.20, h: 0.20 },
    { name: "tree",   x: 0.24, y: 0.39, w: 0.28, h: 0.30 },
    { name: "person", x: 0.38, y: 0.74, w: 0.12, h: 0.17 },
    { name: "book",   x: 0.44, y: 0.79, w: 0.04, h: 0.04 },
    { name: "hill",   x: 0.00, y: 0.70, w: 1.00, h: 0.30 },
  ],
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="#87CEEB"/>
    <circle cx="320" cy="80" r="40" fill="#FFD93D"/>
    <circle cx="60" cy="60" r="12" fill="#fff" opacity="0.8"/>
    <circle cx="90" cy="45" r="16" fill="#fff" opacity="0.7"/>
    <circle cx="340" cy="50" r="10" fill="#fff" opacity="0.6"/>
    <ellipse cx="200" cy="400" rx="250" ry="120" fill="#7EC850"/>
    <rect x="145" y="200" width="12" height="80" rx="3" fill="#8B5E3C"/>
    <ellipse cx="150" cy="200" rx="55" ry="45" fill="#2D8B4E"/>
    <ellipse cx="130" cy="185" rx="35" ry="30" fill="#34A853"/>
    <ellipse cx="170" cy="190" rx="40" ry="32" fill="#3CB371"/>
    <circle cx="160" cy="175" r="5" fill="#FF6B6B"/>
    <circle cx="135" cy="195" r="4" fill="#FFD93D"/>
    <circle cx="175" cy="182" r="4" fill="#FF6B6B"/>
    <circle cx="170" cy="310" r="12" fill="#FFDAB9"/>
    <rect x="163" y="320" width="14" height="20" rx="4" fill="#5B9BD5"/>
    <rect x="160" y="335" width="8" height="12" fill="#4A4A4A"/>
    <rect x="172" y="335" width="8" height="12" fill="#4A4A4A"/>
    <rect x="178" y="316" width="12" height="16" rx="2" fill="#E8D5B7" transform="rotate(-15 184 324)"/>
    <circle cx="166" cy="308" r="1.5" fill="#333"/>
    <circle cx="174" cy="308" r="1.5" fill="#333"/>
    <path d="M167 314 Q170 317 173 314" stroke="#333" fill="none" stroke-width="1"/>
    <circle cx="80" cy="340" r="8" fill="#FFD93D" opacity="0.6"/>
    <circle cx="260" cy="330" r="6" fill="#FF9FF3" opacity="0.7"/>
    <circle cx="300" cy="350" r="7" fill="#FFD93D" opacity="0.5"/>
    <path d="M95 360 Q97 350 99 360" stroke="#3CB371" fill="none" stroke-width="2"/>
    <path d="M270 355 Q272 345 274 355" stroke="#3CB371" fill="none" stroke-width="2"/>
  </svg>`,
};

/** Boat on a calm lake with mountains at sunset */
const lakeBoat: Background = {
  name: "lake_boat",
  elements: [
    { name: "sun",       x: 0.68, y: 0.05, w: 0.25, h: 0.25 },
    { name: "mountains", x: 0.15, y: 0.20, w: 0.55, h: 0.30 },
    { name: "boat",      x: 0.42, y: 0.62, w: 0.16, h: 0.10 },
    { name: "person",    x: 0.47, y: 0.63, w: 0.04, h: 0.04 },
    { name: "sail",      x: 0.49, y: 0.59, w: 0.07, h: 0.05 },
    { name: "lake",      x: 0.00, y: 0.50, w: 1.00, h: 0.46 },
  ],
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="#FFA07A"/>
    <circle cx="320" cy="70" r="50" fill="#FFD93D"/>
    <circle cx="320" cy="70" r="42" fill="#FFE082"/>
    <polygon points="80,200 160,100 240,200" fill="#6B8E6B"/>
    <polygon points="160,200 260,80 360,200" fill="#5A7D5A"/>
    <polygon points="230,120 260,80 280,105" fill="#fff" opacity="0.6"/>
    <rect x="0" y="200" width="400" height="200" fill="#4A90D9"/>
    <ellipse cx="100" cy="250" rx="80" ry="5" fill="#5BA0E9" opacity="0.5"/>
    <ellipse cx="300" cy="280" rx="60" ry="4" fill="#5BA0E9" opacity="0.4"/>
    <ellipse cx="200" cy="320" rx="100" ry="5" fill="#5BA0E9" opacity="0.3"/>
    <path d="M170 270 Q200 285 230 270 L225 260 Q200 250 175 260 Z" fill="#C0392B"/>
    <rect x="197" y="235" width="4" height="30" fill="#8B5E3C"/>
    <polygon points="201,235 201,255 225,248" fill="#FFF" opacity="0.9"/>
    <circle cx="195" cy="256" r="5" fill="#FFDAB9"/>
    <circle cx="193" cy="254" r="1" fill="#333"/>
    <circle cx="197" cy="254" r="1" fill="#333"/>
    <rect x="0" y="385" width="400" height="15" fill="#C2B280"/>
    <circle cx="50" cy="392" r="4" fill="#D4C5A0"/>
    <circle cx="350" cy="390" r="3" fill="#D4C5A0"/>
  </svg>`,
};

/** Stargazer lying on a blanket at night */
const stargazer: Background = {
  name: "stargazer",
  elements: [
    { name: "moon",    x: 0.69, y: 0.09, w: 0.13, h: 0.13 },
    { name: "stars",   x: 0.00, y: 0.00, w: 1.00, h: 0.45 },
    { name: "person",  x: 0.45, y: 0.76, w: 0.10, h: 0.10 },
    { name: "blanket", x: 0.30, y: 0.80, w: 0.40, h: 0.02 },
    { name: "hill",    x: 0.00, y: 0.75, w: 1.00, h: 0.25 },
  ],
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="#1a1a3e"/>
    <circle cx="300" cy="60" r="25" fill="#F5F5DC"/>
    <circle cx="290" cy="55" r="22" fill="#1a1a3e"/>
    <circle cx="50" cy="30" r="2" fill="#FFF" opacity="0.9"/>
    <circle cx="120" cy="60" r="1.5" fill="#FFF" opacity="0.7"/>
    <circle cx="200" cy="25" r="2.5" fill="#FFF" opacity="0.8"/>
    <circle cx="340" cy="40" r="1.8" fill="#FFF" opacity="0.6"/>
    <circle cx="380" cy="90" r="2.2" fill="#FFF" opacity="0.9"/>
    <circle cx="30" cy="120" r="1.3" fill="#FFF" opacity="0.7"/>
    <circle cx="170" cy="100" r="2.8" fill="#FFF" opacity="0.8"/>
    <circle cx="290" cy="130" r="1.5" fill="#FFF" opacity="0.6"/>
    <circle cx="60" cy="170" r="2" fill="#FFF" opacity="0.9"/>
    <circle cx="250" cy="80" r="1.8" fill="#FFF" opacity="0.7"/>
    <circle cx="150" cy="50" r="2.3" fill="#FFF" opacity="0.8"/>
    <circle cx="330" cy="150" r="1.2" fill="#FFF" opacity="0.6"/>
    <circle cx="90" cy="90" r="2.5" fill="#FFF" opacity="0.9"/>
    <circle cx="220" cy="140" r="1.5" fill="#FFF" opacity="0.7"/>
    <circle cx="370" cy="30" r="2" fill="#FFF" opacity="0.8"/>
    <circle cx="40" cy="70" r="1.8" fill="#FFF" opacity="0.6"/>
    <circle cx="180" cy="160" r="2.2" fill="#FFF" opacity="0.9"/>
    <circle cx="310" cy="100" r="1.3" fill="#FFF" opacity="0.7"/>
    <circle cx="130" cy="140" r="2.8" fill="#FFF" opacity="0.8"/>
    <circle cx="270" cy="50" r="1.5" fill="#FFF" opacity="0.6"/>
    <circle cx="350" cy="120" r="2" fill="#FFF" opacity="0.9"/>
    <circle cx="80" cy="45" r="1.8" fill="#FFF" opacity="0.7"/>
    <circle cx="240" cy="35" r="2.3" fill="#FFF" opacity="0.8"/>
    <ellipse cx="200" cy="400" rx="260" ry="100" fill="#2D5016"/>
    <rect x="120" y="320" width="160" height="6" rx="2" fill="#E74C3C"/>
    <circle cx="200" cy="316" r="10" fill="#FFDAB9"/>
    <rect x="190" y="310" width="20" height="6" rx="2" fill="#6D4C41"/>
    <rect x="185" y="323" width="30" height="14" rx="3" fill="#5B9BD5"/>
    <rect x="180" y="335" width="12" height="8" fill="#4A4A4A"/>
    <rect x="208" y="335" width="12" height="8" fill="#4A4A4A"/>
    <circle cx="196" cy="314" r="1.2" fill="#333"/>
    <circle cx="204" cy="314" r="1.2" fill="#333"/>
    <path d="M197 318 Q200 320 203 318" stroke="#333" fill="none" stroke-width="0.8"/>
    <path d="M170 316 L180 310" stroke="#FFDAB9" stroke-width="3" stroke-linecap="round"/>
    <path d="M230 316 L220 310" stroke="#FFDAB9" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
};

/** Garden with flowers, butterflies, and a little house */
const garden: Background = {
  name: "garden",
  elements: [
    { name: "sun",         x: 0.11, y: 0.06, w: 0.18, h: 0.18 },
    { name: "house",       x: 0.66, y: 0.49, w: 0.20, h: 0.18 },
    { name: "flower_red",  x: 0.13, y: 0.75, w: 0.06, h: 0.10 },
    { name: "flower_purple", x: 0.28, y: 0.77, w: 0.06, h: 0.10 },
    { name: "sunflower",   x: 0.48, y: 0.78, w: 0.06, h: 0.10 },
    { name: "flower_pink", x: 0.38, y: 0.71, w: 0.06, h: 0.08 },
    { name: "butterfly_1", x: 0.34, y: 0.29, w: 0.04, h: 0.04 },
    { name: "butterfly_2", x: 0.74, y: 0.36, w: 0.04, h: 0.04 },
    { name: "meadow",      x: 0.00, y: 0.68, w: 1.00, h: 0.32 },
  ],
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="#87CEEB"/>
    <circle cx="80" cy="60" r="35" fill="#FFD93D"/>
    <ellipse cx="200" cy="400" rx="250" ry="130" fill="#7EC850"/>
    <rect x="270" y="230" width="70" height="60" fill="#E8D5B7"/>
    <polygon points="265,230 340,230 305,195" fill="#C0392B"/>
    <rect x="290" y="255" width="18" height="25" fill="#8B5E3C"/>
    <rect x="318" y="242" width="12" height="12" fill="#87CEEB" stroke="#8B5E3C" stroke-width="1.5"/>
    <path d="M60 340 Q60 310 60 310" stroke="#3CB371" stroke-width="3" fill="none"/>
    <circle cx="55" cy="305" r="8" fill="#FF6B6B"/>
    <circle cx="65" cy="302" r="8" fill="#FF6B6B"/>
    <circle cx="60" cy="310" r="5" fill="#FFD93D"/>
    <path d="M120 350 Q120 320 120 315" stroke="#3CB371" stroke-width="3" fill="none"/>
    <circle cx="115" cy="310" r="7" fill="#9B59B6"/>
    <circle cx="125" cy="308" r="7" fill="#9B59B6"/>
    <circle cx="120" cy="313" r="4" fill="#FFD93D"/>
    <path d="M200 360 Q200 325 200 320" stroke="#3CB371" stroke-width="3" fill="none"/>
    <circle cx="195" cy="315" r="9" fill="#FFD93D"/>
    <circle cx="205" cy="313" r="9" fill="#FFD93D"/>
    <circle cx="200" cy="318" r="5" fill="#8B5E3C"/>
    <path d="M160 320 Q160 295 160 290" stroke="#3CB371" stroke-width="2.5" fill="none"/>
    <circle cx="156" cy="286" r="6" fill="#FF9FF3"/>
    <circle cx="164" cy="284" r="6" fill="#FF9FF3"/>
    <circle cx="160" cy="289" r="4" fill="#FFD93D"/>
    <g transform="translate(140 120)">
      <path d="M0 0 Q-5 -8 0 -5 Q5 -8 0 0" fill="#FF6B6B" transform="rotate(-30)"/>
      <path d="M0 0 Q-5 -8 0 -5 Q5 -8 0 0" fill="#FF9FF3" transform="rotate(30)"/>
      <ellipse cx="0" cy="0" rx="2" ry="3" fill="#333"/>
    </g>
    <g transform="translate(300 150)">
      <path d="M0 0 Q-4 -7 0 -4 Q4 -7 0 0" fill="#4D96FF" transform="rotate(-25)"/>
      <path d="M0 0 Q-4 -7 0 -4 Q4 -7 0 0" fill="#87CEEB" transform="rotate(25)"/>
      <ellipse cx="0" cy="0" rx="1.5" ry="2.5" fill="#333"/>
    </g>
    <circle cx="50" cy="370" r="5" fill="#FFD93D" opacity="0.5"/>
    <circle cx="350" cy="360" r="4" fill="#FF6B6B" opacity="0.5"/>
  </svg>`,
};

/** Cat sleeping on a windowsill with rain outside */
const sleepyCat: Background = {
  name: "sleepy_cat",
  elements: [
    { name: "window",    x: 0.13, y: 0.13, w: 0.75, h: 0.63 },
    { name: "cat",       x: 0.38, y: 0.67, w: 0.24, h: 0.10 },
    { name: "cat_face",  x: 0.40, y: 0.69, w: 0.06, h: 0.06 },
    { name: "tail",      x: 0.59, y: 0.72, w: 0.06, h: 0.04 },
    { name: "windowsill", x: 0.10, y: 0.73, w: 0.80, h: 0.05 },
    { name: "phone",     x: 0.64, y: 0.73, w: 0.06, h: 0.04 },
    { name: "rain",      x: 0.13, y: 0.13, w: 0.75, h: 0.63 },
  ],
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="#B8D4E3"/>
    <rect x="50" y="50" width="300" height="250" rx="8" fill="#D6E8F0" stroke="#8BAEC4" stroke-width="3"/>
    <line x1="200" y1="50" x2="200" y2="300" stroke="#8BAEC4" stroke-width="2"/>
    <line x1="50" y1="175" x2="350" y2="175" stroke="#8BAEC4" stroke-width="2"/>
    <line x1="70" y1="80" x2="67" y2="92" stroke="#6BA3C7" stroke-width="1.5" opacity="0.6"/>
    <line x1="130" y1="100" x2="127" y2="112" stroke="#6BA3C7" stroke-width="1.5" opacity="0.6"/>
    <line x1="90" y1="150" x2="87" y2="162" stroke="#6BA3C7" stroke-width="1.5" opacity="0.6"/>
    <line x1="270" y1="70" x2="267" y2="82" stroke="#6BA3C7" stroke-width="1.5" opacity="0.6"/>
    <line x1="310" y1="90" x2="307" y2="102" stroke="#6BA3C7" stroke-width="1.5" opacity="0.6"/>
    <line x1="250" y1="140" x2="247" y2="152" stroke="#6BA3C7" stroke-width="1.5" opacity="0.6"/>
    <line x1="300" y1="160" x2="297" y2="172" stroke="#6BA3C7" stroke-width="1.5" opacity="0.6"/>
    <line x1="85" y1="200" x2="82" y2="212" stroke="#6BA3C7" stroke-width="1.5" opacity="0.6"/>
    <line x1="140" y1="220" x2="137" y2="232" stroke="#6BA3C7" stroke-width="1.5" opacity="0.6"/>
    <line x1="110" y1="260" x2="107" y2="272" stroke="#6BA3C7" stroke-width="1.5" opacity="0.6"/>
    <line x1="280" y1="210" x2="277" y2="222" stroke="#6BA3C7" stroke-width="1.5" opacity="0.6"/>
    <line x1="320" y1="240" x2="317" y2="252" stroke="#6BA3C7" stroke-width="1.5" opacity="0.6"/>
    <line x1="260" y1="270" x2="257" y2="282" stroke="#6BA3C7" stroke-width="1.5" opacity="0.6"/>
    <rect x="40" y="290" width="320" height="20" rx="3" fill="#D4A574"/>
    <rect x="30" y="300" width="340" height="100" fill="#E8D5B7"/>
    <ellipse cx="200" cy="295" rx="45" ry="18" fill="#FF9F43"/>
    <ellipse cx="175" cy="285" rx="12" ry="10" fill="#FF9F43"/>
    <polygon points="165,280 170,268 178,278" fill="#FF9F43"/>
    <polygon points="172,278 180,266 185,278" fill="#FF9F43"/>
    <polygon points="166,277 171,270 176,276" fill="#FFB87A"/>
    <polygon points="174,276 179,268 183,276" fill="#FFB87A"/>
    <path d="M170 286 Q172 288 175 286" stroke="#333" fill="none" stroke-width="0.8"/>
    <line x1="168" y1="284" x2="172" y2="284" stroke="#333" stroke-width="0.8"/>
    <line x1="177" y1="284" x2="181" y2="284" stroke="#333" stroke-width="0.8"/>
    <ellipse cx="172" cy="283" rx="1.2" ry="0.6" fill="#333"/>
    <ellipse cx="179" cy="283" rx="1.2" ry="0.6" fill="#333"/>
    <circle cx="175" cy="286" r="1.5" fill="#FFB87A"/>
    <path d="M155 288 Q148 285 142 290" stroke="#FF9F43" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M155 291 Q148 288 142 293" stroke="#FF9F43" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M155 294 Q150 292 144 296" stroke="#FF9F43" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M240 290 C250 285 255 295 245 298" stroke="#FF9F43" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="248" cy="298" rx="4" ry="3" fill="#FF9F43"/>
    <rect x="255" y="290" width="22" height="14" rx="3" fill="#5B9BD5"/>
    <rect x="260" y="293" width="12" height="8" rx="1" fill="#4A90D9"/>
  </svg>`,
};

export const backgrounds: Background[] = [
  treeReader,
  lakeBoat,
  stargazer,
  garden,
  sleepyCat,
];

/**
 * Returns a shuffled copy of backgrounds, limited to `count`.
 * Ensures no repeats across a session's cards.
 */
export function getShuffledBackgrounds(count: number): Background[] {
  const shuffled = [...backgrounds].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
