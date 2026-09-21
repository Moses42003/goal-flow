import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
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

/** Milestone badges shown along the bottom of the screen. */
const BADGES = [
  { icon: "flame", label: "3 Day", done: true },
  { icon: "flame", label: "7 Day", done: true },
  { icon: "trophy", label: "14 Day", done: false },
  { icon: "trophy", label: "30 Day", done: false },
] as const;

/**
 * Streaks screen.
 *
 * Unlike the other tabs this one is a dark surface, so the palette is inverted
 * locally rather than through a theme: slate-900 for the page, slate-800 cards,
 * with the orange flame as the single accent.
 */
export default function StreaksScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerClassName="px-5 pt-5"
      >
        <View className="gap-0.5 mb-5">
          <Text className="text-3xl font-bold text-white">Streak</Text>
          <Text className="text-base text-slate-400 font-medium">
            Keep the fire burning.
          </Text>
        </View>

        {/* Hero: flame ring with the current streak count. */}
        <View className="bg-slate-800 rounded-3xl py-8 items-center gap-3">
          <View className="w-32 h-32 rounded-full bg-orange-500/15 items-center justify-center border-4 border-orange-500">
            <Ionicons name="flame" size={44} color="#F97316" />
            <Text className="text-3xl font-bold text-white mt-1">7</Text>
            <Text className="text-xs font-semibold text-orange-400">
              DAY STREAK
            </Text>
          </View>
          <Text className="text-base text-slate-300 font-medium mt-1">
            You&apos;re on a roll!
          </Text>
        </View>

        {/* Week strip. */}
        <View className="bg-slate-800 rounded-2xl p-4 mt-4">
          <Text className="text-base font-bold text-white mb-3">This Week</Text>
          <View className="flex-row justify-between">
            {WEEK.map((entry, index) => (
              <View key={index} className="items-center gap-2">
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center ${entry.active ? "bg-orange-500" : "bg-slate-700"
                    }`}
                >
                  <Ionicons
                    name={entry.active ? "checkmark" : "ellipse-outline"}
                    size={18}
                    color={entry.active ? "#FFFFFF" : "#64748B"}
                  />
                </View>
                <Text className="text-xs font-semibold text-slate-400">
                  {entry.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Weekly progress toward a full week. */}
        <View className="bg-slate-800 rounded-2xl p-4 mt-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-base font-bold text-white">Weekly Goal</Text>
            <Text className="text-sm font-semibold text-orange-400">6 / 7</Text>
          </View>
          <View className="h-2.5 rounded-full bg-slate-700 overflow-hidden">
            <View className="h-full rounded-full bg-orange-500" style={{ width: "86%" }} />
          </View>
          <Text className="text-sm text-slate-400 font-medium mt-3">
            One more day to complete your week.
          </Text>
        </View>

        {/* Milestone badges. */}
        <Text className="text-base font-bold text-white mt-5 mb-3">
          Badges
        </Text>
        <View className="flex-row justify-between gap-3">
          {BADGES.map((badge) => (
            <View
              key={badge.label}
              className={`flex-1 rounded-2xl py-3 items-center gap-1.5 ${badge.done ? "bg-orange-500/15" : "bg-slate-800"
                }`}
            >
              <Ionicons
                name={badge.icon}
                size={26}
                color={badge.done ? "#F97316" : "#475569"}
              />
              <Text
                className={`text-xs font-semibold ${badge.done ? "text-orange-400" : "text-slate-500"
                  }`}
              >
                {badge.label}
              </Text>
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

      <StatusBar barStyle={"light-content"} />
    </SafeAreaView>
  );
}
