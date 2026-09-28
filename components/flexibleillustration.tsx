import React from "react";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  Path,
  Stop,
  LinearGradient as SvgGradient,
} from "react-native-svg";

interface Props {
  /** Rendered width. Height follows the artwork's aspect ratio. */
  width?: number;
}

const VB_W = 240;
const VB_H = 200;

/**
 * Illustration for the Flexible Savings screen.
 *
 * A piggy bank on the same soft ground plane as the other method artwork, with
 * coins dropping into its slot and two leaves drifting past — the shorthand for
 * "save whenever, whatever you can".
 *
 * Vector rather than a raster asset, matching the rest of the set: it retargets
 * to the theme and stays crisp at any density.
 */
export default function FlexibleIllustration({ width = 180 }: Props) {
  const height = (width / VB_W) * VB_H;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      accessibilityRole="image"
      accessibilityLabel="A piggy bank with coins dropping into it"
    >
      <Defs>
        <SvgGradient id="piggy" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FEF08A" />
          <Stop offset="1" stopColor="#F59E0B" />
        </SvgGradient>
        <SvgGradient id="coinFlex" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FDE68A" />
          <Stop offset="1" stopColor="#F59E0B" />
        </SvgGradient>
        <SvgGradient id="leafFlex" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#6EE7B7" />
          <Stop offset="1" stopColor="#34D399" />
        </SvgGradient>
      </Defs>

      {/* Ground plane. */}
      <Ellipse cx={120} cy={182} rx={96} ry={11} fill="#E2E8F0" />

      <G>
        {/* Body: a dome over a rounded base. */}
        <Path
          d="M 44 112 C 44 80, 74 62, 122 62 C 170 62, 198 80, 198 112
             L 198 146 C 198 160, 186 168, 170 168 L 70 168
             C 54 168, 44 160, 44 146 Z"
          fill="url(#piggy)"
          stroke="#B45309"
          strokeWidth={2}
        />
        {/* Coin slot. */}
        <Path d="M 104 68 L 140 68 L 138 78 L 106 78 Z" fill="#78350F" />
        {/* Snout. */}
        <Ellipse
          cx={196}
          cy={124}
          rx={16}
          ry={13}
          fill="#FDE68A"
          stroke="#B45309"
          strokeWidth={2}
        />
        <Circle cx={191} cy={124} r={2.4} fill="#92400E" />
        <Circle cx={200} cy={124} r={2.4} fill="#92400E" />
        {/* Eye. */}
        <Circle cx={168} cy={100} r={4} fill="#3F3F46" />
        {/* Ear. */}
        <Path
          d="M 118 64 L 130 44 L 144 62 Z"
          fill="#FCD34D"
          stroke="#B45309"
          strokeWidth={2}
        />
        {/* Legs. */}
        <Ellipse cx={86} cy={172} rx={13} ry={7} fill="#A16207" />
        <Ellipse cx={158} cy={172} rx={13} ry={7} fill="#A16207" />
      </G>

      {/* Coins falling toward the slot. */}
      <Ellipse cx={122} cy={22} rx={15} ry={6} fill="url(#coinFlex)" />
      <Ellipse cx={122} cy={42} rx={15} ry={6} fill="url(#coinFlex)" />

      {/* Drifting leaves. */}
      <Path
        d="M 46 54 C 56 42, 74 42, 82 54 C 72 66, 56 66, 46 54 Z"
        fill="url(#leafFlex)"
        opacity={0.9}
      />
      <Path
        d="M 192 40 C 200 32, 214 32, 220 40 C 212 48, 200 48, 192 40 Z"
        fill="url(#leafFlex)"
        opacity={0.75}
      />
    </Svg>
  );
}
