import ProgressBar from "@/components/progressbar";
import { GoalAccent, useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

/**
 * Goal accent. Blue/violet/green/amber match the four tinted cards in the
 * design; every colour comes from `useThemeColors()` so the same card repaints
 * correctly in dark mode (pastel literals would flare).
 */
type Accent = GoalAccent;

interface Props {
  /** Goal title, e.g. "Buy a laptop". */
  title?: string;
  /** Ionicons glyph shown in the tile. */
  icon?: keyof typeof Ionicons.glyphMap;
  /** Accent driving the tile, icon and progress bar. */
  accent?: Accent;
  /** Amount saved so far, pre-formatted (e.g. "1,250"). */
  saved?: string;
  /** Target amount, pre-formatted (e.g. "5,000"). */
  target?: string;
  /** Currency symbol. */
  currency?: string;
  /** Progress 0–1. Drives both the bar width and the percentage label. */
  progress?: number;
  /** Human-readable time remaining, e.g. "10 months left". */
  timeLeft?: string;
  /** Optional handler for the whole row. */
  onPress?: () => void;
  /** Stagger for the bar's sweep, in ms, so a list fills in sequence. */
  animationDelay?: number;
}

/**
 * A single goal row: accent icon tile, title, saved/target figures, a progress
 * bar with its percentage, and a time-remaining footer.
 */
export default function GoalCard({
  title = "Buy a laptop",
  icon = "laptop-outline",
  accent = "blue",
  saved = "1,250",
  target = "5,000",
  currency = "GH₵",
  progress = 0.25,
  timeLeft = "10 months left",
  onPress,
  animationDelay = 0,
}: Props) {
  // Guard against callers passing an out-of-range or NaN ratio: the bar width
  // is a percentage string, and `NaN%` would blank the whole bar.
  const c = useThemeColors();
  const ratio = Number.isFinite(progress) ? Math.min(Math.max(progress, 0), 1) : 0;
  const percent = Math.round(ratio * 100);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="rounded-2xl p-3 my-3 flex-row gap-3"
      style={{ backgroundColor: c.goalTint[accent] }}
    >
      <View
        className="w-16 h-16 rounded-2xl items-center justify-center"
        style={{ backgroundColor: c.goalTile[accent] }}
      >
        <Ionicons name={icon} size={32} color={c.goalFill[accent]} />
      </View>

      <View className="gap-1.5 flex-1 justify-center">
        <Text className="text-xl font-semibold" style={{ color: c.text }}>
          {title}
        </Text>

        <View className="flex-row items-end gap-1.5">
          <Text className="text-lg font-semibold" style={{ color: c.text }}>
            {currency} {saved}
          </Text>
          <Text className="text-base font-medium" style={{ color: c.textMuted }}>
            / {currency} {target}
          </Text>
        </View>

        {/* Progress bar — animates to its value on mount and whenever it
            changes, so an updated amount moves rather than snapping. */}
        <View className="flex-row items-center gap-2">
          <View className="flex-1">
            <ProgressBar
              progress={ratio}
              trackColor={c.scheme === "dark" ? c.surfaceMuted : "#FFFFFF"}
              fillColor={c.goalFill[accent]}
              delay={animationDelay}
            />
          </View>
          <Text className="text-sm font-semibold" style={{ color: c.textMuted }}>
            {percent}%
          </Text>
        </View>

        <View className="flex-row items-center gap-1">
          <Ionicons name="calendar-outline" size={14} color={c.textMuted} />
          <Text className="text-sm font-medium" style={{ color: c.textMuted }}>
            {timeLeft}
          </Text>
        </View>
      </View>

      <View className="items-center justify-center">
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
}
