import React from "react";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  Path,
  Rect,
  Stop,
  LinearGradient as SvgGradient,
} from "react-native-svg";

interface Props {
  /** Rendered width. Height follows from the artwork's aspect ratio. */
  width?: number;
}

/**
 * "Saving isn't just about money" illustration.
 *
 * Drawn as vector art rather than shipped as a raster asset: it stays crisp at
 * any density, weighs nothing in the bundle, and — most usefully — every colour
 * is a prop-adjacent constant that a theme can retarget, which a downloaded PNG
 * could not be.
 *
 * The composition follows the design: a person seated at a laptop, a plant on
 * either side, and drifting leaves around them. Ordering matters here — the
 * plant behind the desk, then the desk, then the person, so the person's body
 * overlaps the desktop the way it does in the design.
 */
export default function SavingIllustration({ width = 260 }: Props) {
  // The artwork's natural coordinate space. Everything below is expressed in
  // these units and scaled by `width`, so the proportions never drift.
  const VB_W = 280;
  const VB_H = 220;
  const height = (width / VB_W) * VB_H;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      accessibilityRole="image"
      accessibilityLabel="A person saving at a laptop, surrounded by plants and leaves"
    >
      <Defs>
        {/* Coin pile and laptop screen pick up a soft blue. */}
        <SvgGradient id="screen" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#93C5FD" />
          <Stop offset="1" stopColor="#3B82F6" />
        </SvgGradient>
        <SvgGradient id="shirt" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#34D399" />
          <Stop offset="1" stopColor="#10B981" />
        </SvgGradient>
        <SvgGradient id="coin" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FDE68A" />
          <Stop offset="1" stopColor="#F59E0B" />
        </SvgGradient>
        <SvgGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#6EE7B7" />
          <Stop offset="1" stopColor="#34D399" />
        </SvgGradient>
      </Defs>

      {/* --- Background: the soft mint halo the figures sit on. --- */}
      <Ellipse cx={140} cy={196} rx={104} ry={14} fill="#DCF2E8" />

      {/* --- Left plant, behind the desk. --- */}
      <G>
        <Path
          d="M 52 176 C 40 160, 38 138, 52 122 C 62 138, 64 160, 52 176 Z"
          fill="url(#leaf)"
        />
        <Path
          d="M 52 176 C 64 166, 78 152, 76 134 C 62 140, 52 156, 52 176 Z"
          fill="#6EE7B7"
        />
        <Path
          d="M 46 178 C 36 170, 26 158, 30 146 C 40 150, 46 164, 46 178 Z"
          fill="#34D399"
        />
      </G>

      {/* --- Right plant, taller. --- */}
      <G>
        <Path
          d="M 228 176 C 240 156, 244 130, 230 110 C 218 130, 216 156, 228 176 Z"
          fill="url(#leaf)"
        />
        <Path
          d="M 228 176 C 214 164, 204 146, 208 128 C 222 136, 230 154, 228 176 Z"
          fill="#34D399"
        />
        <Path
          d="M 234 178 C 246 172, 258 160, 256 146 C 244 150, 236 164, 234 178 Z"
          fill="#6EE7B7"
        />
      </G>

      {/* --- Drifting leaves. --- */}
      <Path
        d="M 96 52 C 104 44, 116 44, 120 52 C 112 60, 100 60, 96 52 Z"
        fill="#6EE7B7"
        opacity={0.9}
      />
      <Path
        d="M 186 34 C 192 28, 202 28, 206 34 C 200 40, 190 40, 186 34 Z"
        fill="#34D399"
        opacity={0.85}
      />
      <Path
        d="M 150 20 C 155 15, 163 15, 166 20 C 161 25, 155 25, 150 20 Z"
        fill="#6EE7B7"
        opacity={0.7}
      />

      {/* --- Person. Drawn FIRST so the desk and laptop sit in front of them,
          which is the design's depth order. The torso stops at y=150, above
          the desk line at y=168, so the laptop screen stays fully visible
          rather than being painted over. --- */}
      <G>
        {/* Torso, from the shoulders down to where it disappears behind the
            desk. Narrower than the shoulders so it reads as a seated figure. */}
        <Path
          d="M 140 100 C 158 100, 170 114, 170 134 L 170 152 L 110 152 L 110 134 C 110 114, 122 100, 140 100 Z"
          fill="#FFFFFF"
        />
        {/* Collar / shirt front. */}
        <Path
          d="M 130 106 C 135 113, 145 113, 150 106 L 153 122 L 127 122 Z"
          fill="url(#shirt)"
        />
        {/* Head. */}
        <Circle cx={140} cy={88} r={17} fill="#F4C9A8" />
        {/* Hair. */}
        <Path
          d="M 123 88 C 122 74, 132 68, 140 68 C 148 68, 158 74, 157 88 C 154 78, 148 74, 140 74 C 132 74, 126 78, 123 88 Z"
          fill="#3F3F46"
        />
        {/* Arms reaching forward toward the keyboard, ending behind the desk. */}
        <Path
          d="M 112 126 C 104 136, 106 146, 114 152"
          stroke="#F4C9A8"
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M 168 126 C 176 136, 174 146, 166 152"
          stroke="#F4C9A8"
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
        />
      </G>

      {/* --- Desk, in front of the person. --- */}
      <Rect x={54} y={168} width={172} height={11} rx={5.5} fill="#FCD9A8" />
      <Rect x={68} y={179} width={8} height={28} rx={4} fill="#E8B87A" />
      <Rect x={204} y={179} width={8} height={28} rx={4} fill="#E8B87A" />

      {/* --- Laptop, in front of the desk line. --- */}
      <Path d="M 114 120 L 166 120 L 170 168 L 110 168 Z" fill="url(#screen)" />
      {/* Screen bezel, so the panel reads as a device rather than a slab. */}
      <Path
        d="M 114 120 L 166 120 L 170 168 L 110 168 Z"
        fill="none"
        stroke="#1E3A8A"
        strokeWidth={2}
        strokeLinejoin="round"
        opacity={0.25}
      />
      {/* Chart drawn on the screen. */}
      <Path
        d="M 121 156 L 133 145 L 146 150 L 159 133"
        stroke="#FFFFFF"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Circle cx={159} cy={133} r={4} fill="#FFFFFF" />
      {/* Keyboard base. */}
      <Rect x={102} y={166} width={76} height={7} rx={3.5} fill="#CBD5E1" />
      <Rect x={102} y={166} width={76} height={3} rx={1.5} fill="#E2E8F0" />

      {/* --- Coin stack, right of the laptop, resting on the desk plane. --- */}
      <G>
        <Ellipse cx={228} cy={166} rx={15} ry={6} fill="url(#coin)" />
        <Ellipse cx={228} cy={158} rx={15} ry={6} fill="url(#coin)" />
        <Ellipse cx={228} cy={150} rx={15} ry={6} fill="url(#coin)" />
        <Circle cx={228} cy={144} r={9} fill="url(#coin)" />
        <Path
          d="M 228 139 C 230 141, 231 142, 231 144 C 231 146, 229 147, 228 147 C 227 147, 225 146, 225 144"
          stroke="#B45309"
          strokeWidth={1.6}
          fill="none"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}
