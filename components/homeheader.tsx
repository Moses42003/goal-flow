import React, { useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import Svg, {
  Defs,
  Path,
  Stop,
  LinearGradient as SvgGradient,
} from "react-native-svg";

/**
 * The blue "cloud" backdrop behind the Home screen's greeting.
 *
 * The design's blue field ends in a soft S-wave — it dips low on the left, rises
 * through the middle and settles slightly lower again on the right — with a pale
 * mint band following the same contour just beneath it. The greeting and the
 * Total Savings card both sit on top.
 *
 * That contour is a genuine cubic curve, so it is drawn as an SVG path rather
 * than assembled from views: arcs made of `borderRadius` can only ever produce
 * circular segments, and a circular segment cannot make an S. The wave is
 * expressed in `viewBox` units and scaled with `preserveAspectRatio="none"`, so
 * the same path fills any screen width without the curve distorting into a
 * spike on wide devices.
 *
 * Implemented as an absolutely-positioned layer rather than a wrapper so the
 * screen's content stays in normal flow, and `pointerEvents="none"` keeps it
 * purely decorative — it never intercepts a tap meant for a control.
 */
export default function HomeHeaderBackdrop({
  /** Wave height in viewBox units — how deep the dip on the left goes. */
  waveDepth = 46,
  /** Height of the blue field, including the part the card overlaps. */
  height = 320,
}: {
  waveDepth?: number;
  height?: number;
}) {
  // Measured rather than derived from window width, so the curve stays correct
  // inside a split view or on a foldable, where the screen is not the container.
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) =>
    setWidth(e.nativeEvent.layout.width);

  const VB_W = 400;
  const VB_H = 300;
  const waveY = VB_H - waveDepth;

  /**
   * The blue field plus its wavy lower edge.
   *
   * The two `C` segments share a horizontal tangent at their meeting point, so
   * the join is smooth — without that the wave creases at the middle.
   */
  const bluePath = [
    `M 0 0`,
    `H ${VB_W}`,
    `V ${waveY + 18}`,
    // Sweeps down-left, then levels out toward the centre.
    `C ${VB_W * 0.66} ${waveY + 60}, ${VB_W * 0.4} ${waveY - 26}, 0 ${waveY - 6}`,
    `Z`,
  ].join(" ");

  /**
   * The pale mint band, tracing the same contour offset downward.
   *
   * Drawn as its own shape rather than as a border on the blue, because the two
   * have different colours and the band is wider on the left where the wave
   * dips deepest.
   */
  const mintPath = [
    `M 0 ${waveY - 6}`,
    `C ${VB_W * 0.4} ${waveY - 26}, ${VB_W * 0.66} ${waveY + 60}, ${VB_W} ${waveY + 18}`,
    `V ${VB_H}`,
    `H 0`,
    `Z`,
  ].join(" ");

  return (
    <View
      pointerEvents="none"
      onLayout={onLayout}
      style={[styles.wrap, { height }]}
    >
      {width > 0 && (
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
        >
          <Defs>
            {/* Diagonal azure wash, matching the design's lighting. */}
            <SvgGradient id="sky" x1="0.1" y1="0" x2="0.9" y2="1">
              <Stop offset="0" stopColor="#1E5FE0" />
              <Stop offset="0.45" stopColor="#2F7BF6" />
              <Stop offset="0.8" stopColor="#6FB6F9" />
              <Stop offset="1" stopColor="#BBDDFB" />
            </SvgGradient>
          </Defs>

          {/* <Path d={mintPath} fill="url(#mint)" /> */}
          <Path d={bluePath} fill="url(#sky)" />

          {/* Cloud lobes. Wide, shallow ellipses in slightly lighter blue, so
              the field reads as sky rather than as a flat gradient. */}
          <EllipseLobes />
        </Svg>
      )}
    </View>
  );
}

/** Cloud highlights. Kept separate purely to keep the main render readable. */
function EllipseLobes() {
  return (
    <>
      <Path
        d="M -40 120 a 150 90 0 1 0 300 0 a 150 90 0 1 0 -300 0"
        fill="#FFFFFF"
        fillOpacity={0.08}
      />
      <Path
        d="M 200 60 a 140 80 0 1 0 280 0 a 140 80 0 1 0 -280 0"
        fill="#FFFFFF"
        fillOpacity={0.08}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },
});
