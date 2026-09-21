import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

/**
 * Accent palette for the goal's icon tile and progress bar.
 *
 * Declared as complete literals (not interpolated strings) so NativeWind's
 * compiler can see every class name it needs to emit — `bg-${accent}-100`
 * would silently produce no style at runtime.
 */
type Accent = "blue" | "orange" | "green" | "violet";

const TILE: Record<Accent, string> = {
  blue: "bg-blue-100",
  orange: "bg-orange-100",
  green: "bg-green-100",
  violet: "bg-violet-100",
};

const FILL: Record<Accent, string> = {
  blue: "bg-blue-600",
  orange: "bg-orange-500",
  green: "bg-green-600",
  violet: "bg-violet-600",
};

const ICON_COLOR: Record<Accent, string> = {
  blue: "#2563EB",
  orange: "#F97316",
  green: "#16A34A",
  violet: "#7C3AED",
};

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
  /** Optional hint shown instead of time remaining, e.g. "Completed". */
  onPress?: () => void;
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
      style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
    >
      <View
        className={`w-16 h-16 rounded-2xl items-center justify-center ${TILE[accent]}`}
      >
        <Ionicons name={icon} size={32} color={ICON_COLOR[accent]} />
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

        {/* Progress bar */}
        <View className="flex-row items-center gap-2">
          <View
            className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: c.surfaceMuted }}
          >
            <View
              className={`h-full rounded-full ${FILL[accent]}`}
              style={{ width: `${percent}%` }}
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
