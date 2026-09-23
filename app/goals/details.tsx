import BackHeader from "@/components/backheader";
import ProgressBar from "@/components/progressbar";
import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** The three summary tiles under the hero. */
const STATS = [
  { label: "Target", value: "GH₵ 5,000", icon: "flag-outline" },
  { label: "Saved", value: "GH₵ 1,250", icon: "wallet-outline" },
  { label: "Remaining", value: "GH₵ 3,750", icon: "hourglass-outline" },
] as const;

/** Milestones along the timeline. `done` marks the ones already cleared. */
const TIMELINE = [
  { label: "Goal created", date: "12 Aug 2025", done: true },
  { label: "25% reached", date: "02 Sep 2025", done: true },
  { label: "50% reached", date: "Expected Dec 2025", done: false },
  { label: "Goal complete", date: "Expected Jun 2026", done: false },
];

/** Recent deposits. */
const ACTIVITY = [
  { label: "Deposit", date: "Today", amount: "+ GH₵ 150" },
  { label: "Deposit", date: "Yesterday", amount: "+ GH₵ 200" },
  { label: "Deposit", date: "12 Oct 2025", amount: "+ GH₵ 120" },
];

export default function GoalDetails() {
  const c = useThemeColors();

  // Matches the design's 25% progress. Kept as a plain ratio so the bar and the
  // percentage label can never disagree.
  const progress = 0.25;
  const percent = Math.round(progress * 100);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: c.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pt-4 pb-8"
      >
        <BackHeader title="Goal Details" />

        {/* Hero card. */}
        <View
          className="rounded-3xl p-5 mt-5"
          style={{
            backgroundColor: c.surface,
            borderWidth: 1,
            borderColor: c.border,
          }}
        >
          <View className="flex-row items-center gap-4">
            <View
              className="w-16 h-16 rounded-2xl items-center justify-center"
              style={{ backgroundColor: c.goalTile.blue }}
            >
              <Ionicons name="laptop-outline" size={30} color="#2563EB" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold" style={{ color: c.text }}>
                Buy a laptop
              </Text>
              <Text
                className="text-sm font-medium mt-0.5"
                style={{ color: c.textMuted }}
              >
                Due 12 Jun 2026
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between mt-5 mb-2">
            <Text className="text-lg font-bold" style={{ color: c.text }}>
              GH₵ 1,250
            </Text>
            <Text
              className="text-sm font-semibold"
              style={{ color: c.textMuted }}
            >
              of GH₵ 5,000
            </Text>
          </View>

          <ProgressBar
            progress={progress}
            trackColor={c.surfaceMuted}
            fillColor={c.goalFill.blue}
            height={10}
          />

          <Text
            className="text-sm font-semibold mt-2"
            style={{ color: c.textMuted }}
          >
            {percent}% complete
          </Text>
        </View>

        {/* Summary tiles. */}
        <View className="flex-row gap-3 mt-4">
          {STATS.map((stat) => (
            <View
              key={stat.label}
              className="flex-1 rounded-2xl p-3"
              style={{
                backgroundColor: c.surface,
                borderWidth: 1,
                borderColor: c.border,
              }}
            >
              <Ionicons name={stat.icon} size={18} color={c.textMuted} />
              <Text
                className="text-xs font-semibold mt-2"
                style={{ color: c.textMuted }}
              >
                {stat.label}
              </Text>
              <Text
                className="text-sm font-bold mt-0.5"
                style={{ color: c.text }}
              >
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Timeline. */}
        <Text
          className="text-base font-bold mt-6 mb-3"
          style={{ color: c.text }}
        >
          Timeline
        </Text>
        <View
          className="rounded-2xl p-4"
          style={{
            backgroundColor: c.surface,
            borderWidth: 1,
            borderColor: c.border,
          }}
        >
          {TIMELINE.map((step, index) => (
            <View key={step.label} className="flex-row gap-3">
              {/* Rail: a dot plus a connecting line, drawn per row so the last
                  row simply omits the line rather than needing its own shape. */}
              <View className="items-center">
                <View
                  className="w-4 h-4 rounded-full items-center justify-center"
                  style={{
                    backgroundColor: step.done ? "#16A34A" : c.surfaceMuted,
                    borderWidth: step.done ? 0 : 1,
                    borderColor: c.border,
                  }}
                >
                  {step.done && (
                    <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                  )}
                </View>
                {index < TIMELINE.length - 1 && (
                  <View
                    className="w-[2px] flex-1 my-1"
                    style={{
                      backgroundColor: step.done ? "#16A34A" : c.divider,
                    }}
                  />
                )}
              </View>

              <View
                className={index < TIMELINE.length - 1 ? "pb-5 flex-1" : "flex-1"}
              >
                <Text
                  className="text-sm font-semibold"
                  style={{ color: step.done ? c.text : c.textMuted }}
                >
                  {step.label}
                </Text>
                <Text
                  className="text-xs font-medium mt-0.5"
                  style={{ color: c.textMuted }}
                >
                  {step.date}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recent activity. */}
        <Text
          className="text-base font-bold mt-6 mb-3"
          style={{ color: c.text }}
        >
          Recent Activity
        </Text>
        <View
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: c.surface,
            borderWidth: 1,
            borderColor: c.border,
          }}
        >
          {ACTIVITY.map((row, index) => (
            <View key={`${row.label}-${row.date}`}>
              <View className="flex-row items-center justify-between px-4 py-3.5">
                <View className="flex-row items-center gap-3">
                  <View
                    className="w-9 h-9 rounded-full items-center justify-center"
                    style={{ backgroundColor: c.goalTile.green }}
                  >
                    <Ionicons
                      name="arrow-down"
                      size={16}
                      color={c.goalFill.green}
                    />
                  </View>
                  <View>
                    <Text
                      className="text-sm font-semibold"
                      style={{ color: c.text }}
                    >
                      {row.label}
                    </Text>
                    <Text
                      className="text-xs font-medium mt-0.5"
                      style={{ color: c.textMuted }}
                    >
                      {row.date}
                    </Text>
                  </View>
                </View>
                <Text
                  className="text-sm font-bold"
                  style={{ color: c.goalFill.green }}
                >
                  {row.amount}
                </Text>
              </View>
              {index < ACTIVITY.length - 1 && (
                <View
                  className="h-[1px] mx-4"
                  style={{ backgroundColor: c.divider }}
                />
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/goals/edit")}
          className="rounded-2xl py-4 items-center mt-6 flex-row justify-center gap-2"
          style={{
            backgroundColor: c.surface,
            borderWidth: 1,
            borderColor: "#2563EB",
          }}
        >
          <Ionicons name="create-outline" size={20} color="#2563EB" />
          <Text className="text-base font-bold text-blue-600">Edit Goal</Text>
        </TouchableOpacity>
      </ScrollView>

      <StatusBar barStyle={c.barStyle} />
    </SafeAreaView>
  );
}
