import { useThemeColors } from "@/lib/theme";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  /** Current value. */
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Snap increment. Defaults to 1. */
  step?: number;
  /** Height of the draggable thumb. */
  thumbSize?: number;
  accent?: string;
}

/**
 * A draggable slider.
 *
 * Built on `react-native-gesture-handler` + `reanimated`, both already in the
 * project, rather than pulling in `@react-native-community/slider` — that is a
 * native module, so adding it would force a rebuild of every dev client and
 * cannot be verified from here. This has no native dependency beyond what the
 * app already links.
 *
 * The drag runs as a Pan gesture on the track rather than on the thumb alone,
 * so tapping anywhere on the rail also moves the handle — what people expect
 * from a slider, and a much larger target than a 24px circle.
 *
 * The animated position is derived from a shared `ratio` (0–1) rather than from
 * pixels, so a rotation or a resize re-lays-out correctly without the thumb
 * jumping: the ratio is resolution-independent, the pixel offset is not.
 */
export default function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  thumbSize = 24,
  accent = "#2563EB",
}: Props) {
  const c = useThemeColors();
  const [trackWidth, setTrackWidth] = useState(0);

  // Guard the range: a zero-width span would divide by zero below.
  const span = max - min || 1;

  const ratio = useSharedValue((value - min) / span);
  const startRatio = useSharedValue(0);

  // Keep the shared value in step when the parent changes `value` itself (e.g.
  // resetting the form) — otherwise the thumb would ignore programmatic updates.
  React.useEffect(() => {
    ratio.value = (value - min) / span;
  }, [value, min, span, ratio]);

  const commit = useCallback(
    (nextRatio: number) => {
      const raw = min + nextRatio * span;
      // Snap to the step, then clamp. Rounding after clamping would let a value
      // land a hair outside the range at the extremes.
      const snapped = Math.round(raw / step) * step;
      onValueChange(Math.min(Math.max(snapped, min), max));
    },
    [min, max, span, step, onValueChange],
  );

  const pan = Gesture.Pan()
    .onBegin((e) => {
      if (trackWidth === 0) return;
      startRatio.value = ratio.value;
      // Absolute jump to the touch point on press, so a tap seeks.
      const next = Math.min(Math.max(e.x / trackWidth, 0), 1);
      ratio.value = next;
      runOnJS(commit)(next);
    })
    .onUpdate((e) => {
      if (trackWidth === 0) return;
      // Position from the absolute touch x rather than accumulating deltas:
      // accumulation drifts when the finger moves faster than frames render.
      const next = Math.min(Math.max(e.x / trackWidth, 0), 1);
      ratio.value = next;
      runOnJS(commit)(next);
    })
    .onFinalize(() => {
      startRatio.value = ratio.value;
    });

  const fillStyle = useAnimatedStyle(() => ({
    width: `${ratio.value * 100}%`,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    left: `${ratio.value * 100}%`,
    transform: [{ scale: withSpring(1) }],
  }));

  const onLayout = (e: LayoutChangeEvent) =>
    setTrackWidth(e.nativeEvent.layout.width);

  return (
    <GestureDetector gesture={pan}>
      {/* Vertical padding grows the touch target without thickening the rail. */}
      <View className="justify-center py-3">
        <View
          onLayout={onLayout}
          style={{
            height: 8,
            borderRadius: 4,
            backgroundColor: c.surfaceMuted,
            overflow: "hidden",
          }}
        >
          <Animated.View
            style={[
              { height: "100%", borderRadius: 4, backgroundColor: accent },
              fillStyle,
            ]}
          />
        </View>

        {/* The thumb is positioned by percentage and pulled back by half its
            own width, so it stays centred on the value at either extreme. */}
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: "#FFFFFF",
              borderWidth: 3,
              borderColor: accent,
              marginLeft: -thumbSize / 2,
            },
            thumbStyle,
          ]}
        />
      </View>
    </GestureDetector>
  );
}
