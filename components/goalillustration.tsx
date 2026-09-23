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
  /** Rendered width. Height follows the artwork's aspect ratio. */
  width?: number;
}

/**
 * The goal tracker illustration: a phone on a stand with a flag on a peak.
 *
 * Vector rather than a raster asset, matching `SavingIllustration` — it stays
 * sharp at any density, costs nothing in the bundle, and every colour can be
 * retargeted by a theme, which a downloaded PNG cannot.
 *
 * The composition reads outer-to-inner: the halo, then the stand, then the
 * phone, then the flag on its hill. Drawing in that order matters — the phone
 * has to sit in front of the stand's legs, and the flag has to sit on top of
 * the phone's screen rather than behind it.
 */
export default function GoalIllustration({ width = 200 }: Props) {
  const VB_W = 220;
  const VB_H = 170;
  const height = (width / VB_W) * VB_H;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      accessibilityRole="image"
      accessibilityLabel="A phone showing a flag planted on a mountain peak"
    >
      <Defs>
        <SvgGradient id="phoneBody" x1="0" y1="0" x2="0.4" y2="1">
          <Stop offset="0" stopColor="#1E3A8A" />
          <Stop offset="1" stopColor="#0F172A" />
        </SvgGradient>
        <SvgGradient id="screenGlow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#DBEAFE" />
          <Stop offset="1" stopColor="#93C5FD" />
        </SvgGradient>
        <SvgGradient id="hill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#34D399" />
          <Stop offset="1" stopColor="#059669" />
        </SvgGradient>
        <SvgGradient id="stand" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#94A3B8" />
          <Stop offset="1" stopColor="#64748B" />
        </SvgGradient>
      </Defs>

      {/* Halo behind everything, grounding the device. */}
      <Ellipse cx={110} cy={150} rx={72} ry={11} fill="#E2E8F0" />
      <Circle cx={110} cy={78} r={58} fill="#EFF6FF" />

      {/* Stand legs, behind the phone. */}
      <Path
        d="M 96 108 L 74 148"
        stroke="url(#stand)"
        strokeWidth={7}
        strokeLinecap="round"
      />
      <Path
        d="M 124 108 L 146 148"
        stroke="url(#stand)"
        strokeWidth={7}
        strokeLinecap="round"
      />
      <Path
        d="M 110 112 L 110 150"
        stroke="url(#stand)"
        strokeWidth={6}
        strokeLinecap="round"
      />

      {/* Phone body. */}
      <Rect
        x={84}
        y={34}
        width={52}
        height={84}
        rx={10}
        fill="url(#phoneBody)"
      />
      {/* Screen inset. */}
      <Rect
        x={89}
        y={40}
        width={42}
        height={72}
        rx={6}
        fill="url(#screenGlow)"
      />
      {/* Speaker notch. */}
      <Rect x={103} y={37} width={14} height={2.5} rx={1.25} fill="#334155" />

      {/* Hill with the flag, on the screen. */}
      <G>
        <Path
          d="M 92 108 C 100 92, 106 84, 110 84 C 114 84, 120 92, 128 108 Z"
          fill="url(#hill)"
        />
        {/* Flag pole. */}
        <Rect x={109} y={58} width={2.5} height={28} rx={1.25} fill="#475569" />
        {/* Flag. */}
        <Path d="M 111.5 58 L 128 63.5 L 111.5 69 Z" fill="#F97316" />
        {/* Summit marker. */}
        <Circle cx={110} cy={84} r={2.6} fill="#FFFFFF" />
      </G>

      {/* Sparkles around the device, as in the design. */}
      <Path
        d="M 62 46 L 64.5 52 L 70.5 54.5 L 64.5 57 L 62 63 L 59.5 57 L 53.5 54.5 L 59.5 52 Z"
        fill="#FBBF24"
      />
      <Path
        d="M 158 62 L 159.8 66.2 L 164 68 L 159.8 69.8 L 158 74 L 156.2 69.8 L 152 68 L 156.2 66.2 Z"
        fill="#60A5FA"
      />
      <Circle cx={152} cy={40} r={3} fill="#FBBF24" />
    </Svg>
  );
}
