import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

/**
 * The blue "cloud" backdrop behind the Home screen's greeting.
 *
 * The design fills the top of Home with a blue field whose lower edge is a soft
 * wavy curve, and the greeting and the Total Savings card sit on top of it. The
 * curve matters: a straight bottom edge reads as a header bar rather than as a
 * sky, which is why this is built from two overlapping ellipses rather than a
 * single rectangle.
 *
 * How the curve works — two very wide, very short rounded views sit at the
 * bottom. The fill sits a little LOWER on the left than the right, so the edge
 * sweeps down and back up instead of being level. Because a `rounded-full` view
 * of this aspect ratio is effectively an ellipse, the visible boundary is a
 * smooth arc rather than a corner.
 *
 * Implemented as an absolutely-positioned layer rather than a wrapper so the
 * screen's content stays in normal flow, and `pointerEvents="none"` keeps it
 * purely decorative — it never intercepts a tap meant for a control.
 */
export default function HomeHeaderBackdrop({
  /** Gradient stops, deep first. */
  colors = ["#1E5FE0", "#2F7BF6", "#5EB0F8", "#DCEFFB"],
  /** Height of the blue field, including the part the card overlaps. */
  height = 300,
}: {
  colors?: readonly [string, string, ...string[]];
  height?: number;
}) {
  return (
    <View pointerEvents="none" style={[styles.wrap, { height }]}>
      <LinearGradient
        colors={colors}
        locations={[0, 0.38, 0.72, 1]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={StyleSheet.absoluteFill}
      >
        {/* Cloud lobes — wide, shallow ellipses tinted lighter than the field,
            hinting at drifting cloud without needing an image asset. */}
        <View className="absolute -left-16 top-16 w-72 h-40 rounded-full bg-white/10" />
        <View className="absolute -right-20 top-4 w-64 h-36 rounded-full bg-white/10" />
        <View className="absolute left-10 top-28 w-56 h-32 rounded-full bg-white/[0.07]" />
      </LinearGradient>

      {/* Bottom edge. Two ellipses whose centres sit at different heights give
          the boundary a gentle asymmetric sweep. `rounded-t-full` (not
          `rounded-full`) keeps the bottom of each shape flat and off-screen, so
          only the top arc is ever visible. */}
      <View
        style={[styles.curve, { bottom: -34, backgroundColor: colors[0] }]}
        className="-left-24 rounded-t-full"
      />
      <View
        style={[styles.curve, { bottom: -58, backgroundColor: colors[0] }]}
        className="-right-24 rounded-t-full"
      />
    </View>
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
  // Deliberately far wider than it is tall: at this ratio the rounded top is a
  // shallow arc, which is what reads as a cloud edge rather than a bubble.
  curve: {
    position: "absolute",
    width: 460,
    height: 150,
  },
});
