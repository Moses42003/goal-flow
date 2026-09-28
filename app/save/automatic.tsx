import BackHeader from "@/components/backheader";
import Select, { type SelectOption } from "@/components/select";
import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** How often a deduction repeats. */
const FREQUENCY_OPTIONS: SelectOption[] = [
  { value: "daily", label: "Daily", description: "Every day" },
  { value: "weekly", label: "Weekly", description: "Every 7 days" },
  { value: "biweekly", label: "Every 2 weeks" },
  { value: "monthly", label: "Monthly", description: "Recommended" },
];

/** First deduction date. */
const START_OPTIONS: SelectOption[] = [
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "monday", label: "Next Monday" },
  { value: "1st", label: "1st of next month" },
];

/** Optional goal to attach the schedule to. */
const GOAL_OPTIONS: SelectOption[] = [
  { value: "none", label: "No goal", description: "Grow your balance freely" },
  { value: "laptop", label: "Buy a laptop" },
  { value: "emergency", label: "Emergency Fund" },
  { value: "vacation", label: "Dream Vacation" },
];

/** Amount chips. */
const AMOUNTS = ["20", "50", "100", "200"];

/**
 * Automatic Saving.
 *
 * Sets up a recurring deduction. The design pairs the schedule fields with an
 * explicit minimum-period notice, so the commitment is visible before the user
 * commits rather than disclosed afterwards — worth surfacing in the UI, not in
 * a terms sheet.
 */
export default function AutomaticSavingScreen() {
  const c = useThemeColors();

  const [amount, setAmount] = useState("50");
  const [frequency, setFrequency] = useState<string | null>("monthly");
  const [start, setStart] = useState<string | null>("today");
  const [goal, setGoal] = useState<string | null>("none");

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: c.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pt-4 pb-8"
      >
        <BackHeader title="Automatic Saving" />

        <Text className="text-2xl font-bold mt-4" style={{ color: c.text }}>
          Save on autopilot
        </Text>
        <Text
          className="text-sm font-medium mt-1 mb-5"
          style={{ color: c.textMuted }}
        >
          A set amount moves into savings on a schedule you choose.
        </Text>

        {/* Amount. */}
        <Text
          className="text-sm font-semibold mb-2"
          style={{ color: c.textMuted }}
        >
          Amount per deduction
        </Text>
        <View className="flex-row gap-3 mb-2">
          {AMOUNTS.map((value) => {
            const selected = value === amount;
            return (
              <TouchableOpacity
                key={value}
                activeOpacity={0.7}
                onPress={() => setAmount(value)}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                className="flex-1 py-3 rounded-xl items-center"
                style={{
                  backgroundColor: selected ? "#2563EB" : c.surfaceMuted,
                }}
              >
                <Text
                  className="text-sm font-semibold"
                  style={{ color: selected ? "#FFFFFF" : c.text }}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text
          className="text-xs font-medium mb-5"
          style={{ color: c.textMuted }}
        >
          GH₵ {amount} will be deducted automatically.
        </Text>

        <Select
          label="Frequency"
          value={frequency}
          options={FREQUENCY_OPTIONS}
          onSelect={setFrequency}
          placeholder="How often?"
          icon="repeat-outline"
        />

        <Select
          label="Start Date"
          value={start}
          options={START_OPTIONS}
          onSelect={setStart}
          placeholder="When should it begin?"
          icon="calendar-outline"
        />

        <Select
          label="Save Towards (optional)"
          value={goal}
          options={GOAL_OPTIONS}
          onSelect={setGoal}
          placeholder="No goal"
          icon="flag-outline"
        />

        {/* Minimum-period notice. */}
        <View
          className="rounded-2xl p-4 mb-6 flex-row items-start gap-3"
          style={{ backgroundColor: c.goalTile.blue }}
        >
          <Ionicons name="information-circle" size={20} color="#2563EB" />
          <Text
            className="text-xs font-medium flex-1 leading-5"
            style={{ color: c.text }}
          >
            Automatic saving runs for a minimum of 3 months. You can pause it
            any time from settings.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.back()}
          className="bg-blue-600 rounded-2xl py-4 items-center flex-row justify-center gap-2"
        >
          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
          <Text className="text-base font-bold text-white">Start Saving</Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar barStyle={c.barStyle} />
    </SafeAreaView>
  );
}
