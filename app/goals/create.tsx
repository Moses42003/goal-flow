import BackHeader from "@/components/backheader";
import FormField from "@/components/formfield";
import GoalIllustration from "@/components/goalillustration";
import Select, { type SelectOption } from "@/components/select";
import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Cap on the goal name, matching the design's "0/50" counter. */
const NAME_MAX = 50;

/**
 * Deadline choices.
 *
 * The shortest offered plan is three months — anything tighter is not a saving
 * plan so much as a bill, and the design sets that floor deliberately. `custom`
 * is a sentinel rather than a duration: picking it reveals a months field, whose
 * own lower bound enforces the same floor for hand-entered values.
 */
const DEADLINE_OPTIONS: SelectOption[] = [
  { value: "3m", label: "3 months", description: "Minimum plan length" },
  { value: "6m", label: "6 months" },
  { value: "1y", label: "1 year" },
  { value: "2y", label: "2 years" },
  { value: "custom", label: "Custom", description: "Enter your own months" },
];

const CUSTOM_DEADLINE = "custom";

/** Lower bound for any deadline, in months. */
export const MIN_MONTHS = 3;

/** Amount presets. `custom` reveals a free-text amount field. */
const AMOUNT_OPTIONS: SelectOption[] = [
  { value: "1000", label: "GH₵ 1,000" },
  { value: "5000", label: "GH₵ 5,000" },
  { value: "10000", label: "GH₵ 10,000" },
  { value: "50000", label: "GH₵ 50,000" },
  { value: "custom", label: "Custom amount", description: "Enter any amount" },
];

const CUSTOM_AMOUNT = "custom";

/** What the money is for. Drives the goal's icon later. */
const CATEGORY_OPTIONS: SelectOption[] = [
  {
    value: "gadget",
    label: "Gadget",
    description: "Phones, laptops, consoles",
  },
  { value: "travel", label: "Travel", description: "Trips and holidays" },
  { value: "home", label: "Home", description: "Rent, furniture, repairs" },
  { value: "education", label: "Education", description: "School and courses" },
  { value: "emergency", label: "Emergency Fund", description: "A safety net" },
  { value: "other", label: "Other", description: "Anything else" },
];

/** Number of months a non-custom deadline choice represents. */
function monthsFor(value: string): number | null {
  switch (value) {
    case "3m":
      return 3;
    case "6m":
      return 6;
    case "1y":
      return 12;
    case "2y":
      return 24;
    default:
      return null;
  }
}

export default function CreateGoalScreen() {
  const c = useThemeColors();

  const [name, setName] = useState("");
  const [amountChoice, setAmountChoice] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [deadlineChoice, setDeadlineChoice] = useState<string | null>(null);
  const [customMonths, setCustomMonths] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const isCustomDeadline = deadlineChoice === CUSTOM_DEADLINE;
  const isCustomAmount = amountChoice === CUSTOM_AMOUNT;

  /** Months the plan will run, or null while incomplete/invalid. */
  const months = useMemo(() => {
    if (isCustomDeadline) {
      const parsed = Number.parseInt(customMonths, 10);
      // Reject NaN and anything under the floor rather than silently clamping:
      // clamping a typed "1" to 3 would hide the fact that it was refused.
      return Number.isFinite(parsed) && parsed >= MIN_MONTHS ? parsed : null;
    }
    return deadlineChoice ? monthsFor(deadlineChoice) : null;
  }, [deadlineChoice, isCustomDeadline, customMonths]);

  /** The target figure, or null while incomplete/invalid. */
  const targetAmount = useMemo(() => {
    if (isCustomAmount) {
      const cleaned = Number(customAmount.replace(/[^0-9.]/g, ""));
      return Number.isFinite(cleaned) && cleaned > 0 ? cleaned : null;
    }
    return amountChoice ? Number(amountChoice) : null;
  }, [amountChoice, isCustomAmount, customAmount]);

  /**
   * Monthly figure for the suggested plan.
   *
   * Only shown once both a target and a duration exist — a suggestion derived
   * from half the inputs would be a made-up number presented as advice.
   */
  const perMonth =
    targetAmount !== null && months !== null && months > 0
      ? Math.ceil(targetAmount / months)
      : null;

  /** A custom deadline below the floor is an error the user needs to see. */
  const monthsTooLow = useMemo(() => {
    if (!isCustomDeadline || customMonths === "") return false;
    const parsed = Number.parseInt(customMonths, 10);
    return !Number.isFinite(parsed) || parsed < MIN_MONTHS;
  }, [isCustomDeadline, customMonths]);

  const canSubmit =
    name.trim().length > 0 &&
    targetAmount !== null &&
    months !== null &&
    category !== null;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: c.background }}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-5 pt-4 pb-8"
        >
          <BackHeader title="Savings Plan" />

          <View className="items-center justify-center">
            <GoalIllustration />
          </View>

          <FormField
            label="Goal Name"
            value={name}
            onChangeText={setName}
            placeholder="What are you saving for?"
            icon="flag-outline"
            maxLength={NAME_MAX}
          />

          <Select
            label="Target Amount"
            value={amountChoice}
            options={AMOUNT_OPTIONS}
            onSelect={setAmountChoice}
            placeholder="Select an amount"
            icon="cash-outline"
          />

          {isCustomAmount && (
            <FormField
              label="Enter Amount"
              value={customAmount}
              onChangeText={setCustomAmount}
              placeholder="0.00"
              icon="cash-outline"
              keyboardType="decimal-pad"
              accent="#16A34A"
            />
          )}

          <Select
            label="Deadline"
            value={deadlineChoice}
            options={DEADLINE_OPTIONS}
            onSelect={setDeadlineChoice}
            placeholder="How long will this take?"
            icon="calendar-outline"
          />

          {isCustomDeadline && (
            <FormField
              label="Number of Months"
              value={customMonths}
              onChangeText={setCustomMonths}
              placeholder={`${MIN_MONTHS} or more`}
              icon="time-outline"
              keyboardType="number-pad"
              // Surfaces the floor rather than silently enforcing it.
              accent={monthsTooLow ? "#DC2626" : "#2563EB"}
            />
          )}

          {monthsTooLow && (
            <Text className="text-xs font-semibold text-red-600 -mt-2 mb-4">
              A plan must run for at least {MIN_MONTHS} months.
            </Text>
          )}

          <Select
            label="Category"
            value={category}
            options={CATEGORY_OPTIONS}
            onSelect={setCategory}
            placeholder="What is this for?"
            icon="pricetag-outline"
          />

          {/* Suggested plan, once there is enough to compute one. */}
          {perMonth !== null && (
            <View
              className="rounded-2xl p-4 mb-6 flex-row items-center gap-3"
              style={{ backgroundColor: c.goalTile.blue }}
            >
              <View className="w-11 h-11 rounded-xl bg-white/70 items-center justify-center">
                <Ionicons name="bulb-outline" size={22} color="#2563EB" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold" style={{ color: c.text }}>
                  Save GH₵ {perMonth.toLocaleString()} a month
                </Text>
                <Text
                  className="text-xs font-medium mt-0.5"
                  style={{ color: c.textMuted }}
                >
                  Over {months} months to reach your goal.
                </Text>
              </View>
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={!canSubmit}
            onPress={() => router.back()}
            accessibilityState={{ disabled: !canSubmit }}
            className="bg-blue-600 rounded-2xl py-4 items-center flex-row justify-center gap-2"
            // Dimmed rather than hidden while incomplete, so the button's
            // position doesn't shift as the form fills in.
            style={{ opacity: canSubmit ? 1 : 0.5 }}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
            <Text className="text-base font-bold text-white">Create Plan</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <StatusBar barStyle={c.barStyle} />
    </SafeAreaView>
  );
}
