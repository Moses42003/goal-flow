import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

/** Height the focused icon rises by. Also the distance the label travels. */
const LIFT = 5;

/** Default spring for the lift — quick, with a touch of overshoot. */
const SPRING = { damping: 14, stiffness: 220, mass: 0.7 };

/**
 * Icon pack: Ionicons.
 *
 * It is the best fit for this tab bar because it ships every concept this app
 * needs in both a solid and an outline cut ("home/home-outline",
 * "flame/flame-outline", ...), so the active tab can read as filled without
 * swapping fonts. It is also bundled with `@expo/vector-icons` (no extra
 * dependency) and shares its rounded, slightly chunky stroke with the rest of
 * the UI, unlike the thinner Feather set or the squarer Material cut.
 */
export type TabIconName = keyof typeof Ionicons.glyphMap;

/**
 * Palette lifted from the design.
 *
 * ACTIVE is the blue used for the focused tab and its icon; the design does
 * NOT change the glyph weight on focus — the same icon simply changes colour
 * and the label goes from grey to blue. So there is no outline/solid pair here,
 * just a single `name` and a tint swap.
 */
export const TAB_ACTIVE = "#2563EB";
export const TAB_INACTIVE = "#94A3B8";

type TabBarIconProps = {
  name: TabIconName;
  focused: boolean;
  color: string;
  size?: number;
};

export default function TabBarIcon({
  name,
  focused,
  color,
  size = 23,
}: TabBarIconProps) {
  // 0 = resting, 1 = focused. A single driver keeps the lift and the scale
  // perfectly in step, so they can never drift out of sync mid-spring.
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(focused ? 1 : 0, SPRING);
  }, [focused, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: -LIFT * progress.value },
      { scale: interpolate(progress.value, [0, 1], [1, 1.12]) },
    ],
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={name}
          size={size}
          color={focused ? TAB_ACTIVE : color}
          style={styles.glyph}
        />
      </Animated.View>
    </View>
  );
}

/**
 * Label slot for a tab.
 *
 * Fades and slides up into place when its tab is focused, and reverses out
 * when it loses focus. The slot keeps a fixed height whether or not the text
 * is visible, so the bar never resizes and the icons never shift sideways.
 */
export function TabBarLabel({
  text,
  focused,
  color,
}: {
  text: string;
  focused: boolean;
  color: string;
}) {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    // Timing rather than spring: text that overshoots looks jittery.
    progress.value = withTiming(focused ? 1 : 0, {
      duration: focused ? 180 : 120,
      easing: Easing.out(Easing.cubic),
    });
  }, [focused, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.4, 1], [0, 0.6, 1]),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [-6, 0]) }],
  }));

  return (
    <View style={styles.labelSlot}>
      <Animated.Text
        numberOfLines={1}
        style={[styles.label, { color }, animatedStyle]}
      >
        {text}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 26,
  },
  glyph: {
    includeFontPadding: false,
  },

  // --- label ---
  // Fixed height whether or not the text is showing, so revealing a label on
  // focus cannot change the bar's height or nudge the icon row.
  labelSlot: {
    height: 14,
    marginTop: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
  },

  // --- "Save" action icon ---
  // Deliberately louder than the other four: a larger filled disc, lifted
  // above the bar line with a halo and shadow, so it reads as the primary
  // action rather than as a fifth destination.
  actionWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  actionHalo: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: TAB_ACTIVE,
    opacity: 0.16,
  },
  actionButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: TAB_ACTIVE,
    shadowColor: TAB_ACTIVE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 9,
    elevation: 8,
  },
  actionGlyph: {
    // Counteracts the `add` glyph's asymmetric side bearing so the plus looks
    // optically centred inside the disc rather than sitting ~1px high.
    marginTop: 1,
  },
});

/**
 * Filled blue disc with a white "+" for the Save tab.
 *
 * Sits on the same baseline as the other icons but is noticeably larger and
 * carries a soft halo, so the eye lands on it first.
 */
export function TabBarActionIcon({ focused }: { focused: boolean }) {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(focused ? 1 : 0, SPRING);
  }, [focused, progress]);

  // The disc rises further than a normal icon so the plus reads as the loudest
  // thing in the bar, and swells slightly as it goes.
  const buttonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: -8 * progress.value },
      { scale: interpolate(progress.value, [0, 1], [1, 1.1]) },
    ],
  }));

  const haloStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.16, 0.26]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.92, 1]) }],
  }));

  return (
    <View style={styles.actionWrapper}>
      <Animated.View style={[styles.actionHalo, haloStyle]} />

      <Animated.View style={[styles.actionButton, buttonStyle]}>
        <Ionicons
          name="add"
          size={27}
          color="#FFFFFF"
          style={styles.actionGlyph}
        />
      </Animated.View>
    </View>
  );
}
