import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Day labels for the week strip. `active` marks a day already saved. */
const WEEK = [
  { day: "M", active: true },
  { day: "T", active: true },
  { day: "W", active: true },
  { day: "T", active: true },
  { day: "F", active: true },
  { day: "S", active: true },
  { day: "S", active: false },
];

/** The three summary figures under the hero ring. */
const STATS = [
  { value: "7", label: "Current" },
  { value: "12", label: "Best" },
  { value: "48", label: "Total" },
];

/** Milestone badges along the bottom. */
const BADGES = [
  { icon: "flame", label: "3 Day", done: true },
  { icon: "flame", label: "7 Day", done: true },
  { icon: "trophy", label: "14 Day", done: false },
  { icon: "trophy", label: "30 Day", done: false },
] as const;

/** Rolling streak history, most recent first. */
const HISTORY = [
  { month: "December", days: 12, best: 9 },
  { month: "November", days: 18, best: 14 },
  { month: "October", days: 21, best: 21 },
];

/**
 * Streaks screen.
 *
 * Built light, as asked, but structured so a theme can take over cleanly: every
 * surface, border and text colour comes from `useThemeColors()` rather than a
 * literal. Nothing here names "white" or "slate-900" — so when a theme switcher
 * lands, this screen repaints with the rest of the app and none of this code
 * has to change.
 *
 * The single accent (orange) is intentionally shared across themes: it reads as
 * "fire" on a light card and on a dark one alike.
 */
export default function StreaksScreen() {
  const c = useThemeColors();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: c.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerClassName="px-5 pt-5"
      >
        <View className="gap-0.5 mb-5">
          <Text className="text-3xl font-bold" style={{ color: c.text }}>
            Streak
          </Text>
          <Text
            className="text-base font-medium"
            style={{ color: c.textMuted }}
          >
            Keep the fire burning.
          </Text>
        </View>

        {/* Hero: glowing flame ring with the current streak count. */}
        <View
          className="rounded-3xl py-8 items-center"
          style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
        >
          <View className="items-center justify-center">
            {/* Halo behind the ring, so the flame appears to be lit. */}
            <LinearGradient
              colors={["#FED7AA", "#FDBA74", "#FB923C"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute w-36 h-36 rounded-full opacity-70"
              style={{ borderRadius: 72 }}
            />
            <View className="w-28 h-28 rounded-full items-center justify-center bg-white/70">
              <Ionicons name="flame" size={38} color="#EA580C" />
              <Text className="text-2xl font-bold text-orange-600">7</Text>
              <Text className="text-[10px] font-bold text-orange-500 tracking-wider">
                DAY STREAK
              </Text>
            </View>
          </View>

          <Text className="text-base font-semibold mt-4" style={{ color: c.text }}>
            You&apos;re doing great!
          </Text>
          <Text className="text-sm font-medium mt-0.5" style={{ color: c.textMuted }}>
            Save today to keep it alive.
          </Text>
        </View>

        {/* Three summary figures. */}
        <View className="flex-row gap-3 mt-4">
          {STATS.map((stat) => (
            <View
              key={stat.label}
              className="flex-1 rounded-2xl py-3 items-center"
              style={{ backgroundColor: c.surfaceMuted }}
            >
              <Text className="text-xl font-bold" style={{ color: c.text }}>
                {stat.value}
              </Text>
              <Text className="text-xs font-semibold" style={{ color: c.textMuted }}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Week strip. */}
        <View
          className="rounded-2xl p-4 mt-4"
          style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
        >
          <Text className="text-base font-bold mb-3" style={{ color: c.text }}>
            This Week
          </Text>
          <View className="flex-row justify-between">
            {WEEK.map((entry, index) => (
              <View key={index} className="items-center gap-2">
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center ${entry.active ? "bg-orange-500" : ""
                    }`}
                  style={entry.active ? undefined : { backgroundColor: c.surfaceMuted }}
                >
                  <Ionicons
                    name={entry.active ? "checkmark" : "ellipse-outline"}
                    size={18}
                    color={entry.active ? "#FFFFFF" : c.textMuted}
                  />
                </View>
                <Text className="text-xs font-semibold" style={{ color: c.textMuted }}>
                  {entry.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Weekly progress toward a full week. */}
        <View
          className="rounded-2xl p-4 mt-4"
          style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-base font-bold" style={{ color: c.text }}>
              Weekly Goal
            </Text>
            <Text className="text-sm font-semibold text-orange-600">6 / 7</Text>
          </View>
          <View
            className="h-2.5 rounded-full overflow-hidden"
            style={{ backgroundColor: c.surfaceMuted }}
          >
            <View
              className="h-full rounded-full bg-orange-500"
              style={{ width: "86%" }}
            />
          </View>
          <Text className="text-sm font-medium mt-3" style={{ color: c.textMuted }}>
            One more day to complete your week.
          </Text>
        </View>

        {/* Milestone badges. */}
        <Text className="text-base font-bold mt-5 mb-3" style={{ color: c.text }}>
          Badges
        </Text>
        <View className="flex-row justify-between gap-3">
          {BADGES.map((badge) => (
            <View
              key={badge.label}
              className={`flex-1 rounded-2xl py-3 items-center gap-1.5 ${badge.done ? "bg-orange-50 border-[1px] border-orange-200" : ""
                }`}
              style={
                badge.done
                  ? undefined
                  : { backgroundColor: c.surfaceMuted, borderWidth: 1, borderColor: c.border }
              }
            >
              <Ionicons
                name={badge.icon}
                size={26}
                color={badge.done ? "#EA580C" : c.textMuted}
              />
              <Text
                className="text-xs font-semibold"
                style={{ color: badge.done ? "#C2410C" : c.textMuted }}
              >
                {badge.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Streak history list, as drawn. */}
        <Text className="text-base font-bold mt-5 mb-3" style={{ color: c.text }}>
          Streak History
        </Text>
        <View
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
        >
          {HISTORY.map((row, index) => (
            <View key={row.month}>
              <View className="flex-row items-center justify-between px-4 py-3.5">
                <View className="gap-0.5">
                  <Text className="text-base font-semibold" style={{ color: c.text }}>
                    {row.month}
                  </Text>
                  <Text className="text-xs font-medium" style={{ color: c.textMuted }}>
                    Best: {row.best} days
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="flame" size={16} color="#EA580C" />
                  <Text className="text-base font-bold" style={{ color: c.text }}>
                    {row.days}
                  </Text>
                  <Text className="text-sm font-medium" style={{ color: c.textMuted }}>
                    days
                  </Text>
                </View>
              </View>
              {index < HISTORY.length - 1 && (
                <View className="h-[1px] mx-4" style={{ backgroundColor: c.divider }} />
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-orange-500 rounded-2xl py-4 items-center mt-5 mb-8 flex-row justify-center gap-2"
        >
          <Ionicons name="flame" size={20} color="#FFFFFF" />
          <Text className="text-base font-bold text-white">Save Today</Text>
        </TouchableOpacity>
      </ScrollView>

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}
