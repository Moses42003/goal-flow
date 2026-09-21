import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  /** Target fill, 0–1. Animates to this whenever it changes. */
  progress: number;
  /** Track colour behind the fill. */
  trackColor: string;
  /** Fill colour. */
  fillColor: string;
  /** Bar height in px. */
  height?: number;
  /** Milliseconds for the fill to travel. */
  duration?: number;
  /**
   * Stagger before starting, in ms, so several bars on a screen don't all
   * twitch in unison.
   */
  delay?: number;
}

/**
 * A progress bar that animates to its value.
 *
 * Why not `width` with `withTiming`: animating `width` re-runs layout on every
 * frame, which is both slower and jankier than a transform, and on some Android
 * builds it visibly stutters. Instead the fill is drawn at full width and
 *scaled* horizontally from 0 to the target — a transform, so it stays on the
 * UI thread and never touches layout.
 *
 * `transformOrigin` is set to the left edge so the scale grows rightward from
 * the start rather than out from the centre, which is what a naive
 * `scaleX` would do.
 *
 * The animation runs on mount (so first entry and reload both sweep up from
 * empty) and re-runs whenever `progress` changes, so updating an amount moves
 * the bar smoothly instead of snapping it.
 */
export default function ProgressBar({
  progress,
  trackColor,
  fillColor,
  height = 8,
  duration = 900,
  delay = 0,
}: Props) {
  // Guard the input: a NaN or out-of-range ratio would scale the fill to
  // nothing, or past the track's edge.
  const target = Number.isFinite(progress)
    ? Math.min(Math.max(progress, 0), 1)
    : 0;

  // Starts empty, so the very first frame is a zero-length bar and the sweep
  // is visible even when the value is already known at mount.
  const scale = useSharedValue(0);

  // The stagger is a one-shot: it applies to the initial sweep only. If it were
  // passed as `withTiming`'s delay it would re-apply on every value change,
  // re-introducing the lag each time an amount updates.
  const [ready, setReady] = React.useState(delay === 0);

  useEffect(() => {
    if (delay === 0) return;
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!ready) return;

    scale.value = withTiming(target, {
      duration,
      // Decelerating curve: fast off the mark, settling gently at the value —
      // reads as "filling" rather than as a linear wipe.
      easing: Easing.out(Easing.cubic),
    });
  }, [target, duration, scale, ready]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: scale.value }],
  }));

  return (
    <View
      style={{
        height,
        borderRadius: height / 2,
        backgroundColor: trackColor,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={[
          {
            height: "100%",
            borderRadius: height / 2,
            backgroundColor: fillColor,
            // Grow from the left edge rather than from the centre.
            transformOrigin: "left",
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}
