import BackHeader from "@/components/backheader";
import FormField from "@/components/formfield";
import GoalIllustration from "@/components/goalillustration";
import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
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

/** Tint accents offered for a new goal. */
const ACCENTS = [
  { key: "blue", hex: "#2563EB" },
  { key: "violet", hex: "#7C3AED" },
  { key: "green", hex: "#16A34A" },
  { key: "orange", hex: "#F97316" },
] as const;

export default function CreateGoalScreen() {
  const c = useThemeColors();

  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [deadline, setDeadline] = useState("");
  const [accent, setAccent] = useState<string>("blue");

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: c.background }}>
      {/* KeyboardAvoidingView so the lower fields and the submit button are not
          covered by the keyboard on a small device. */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-5 pt-4 pb-8"
        >
          <BackHeader title="Create a Goal" />
          <Text
            className="text-sm font-medium mt-1 mb-4"
            style={{ color: c.textMuted }}
          >
            Turn your dream into a plan.
          </Text>

          <View className="items-center mb-4">
            <GoalIllustration width={190} />
          </View>

          <FormField
            label="Goal Name"
            value={name}
            onChangeText={setName}
            placeholder="e.g. Buy a laptop"
            icon="flag-outline"
          />

          <FormField
            label="Target Amount"
            value={target}
            onChangeText={setTarget}
            placeholder="0.00"
            icon="cash-outline"
            trailingIcon="logo-usd"
            keyboardType="decimal-pad"
            accent="#16A34A"
          />

          <FormField
            label="Already Saved"
            value={saved}
            onChangeText={setSaved}
            placeholder="0.00"
            icon="wallet-outline"
            trailingIcon="logo-usd"
            keyboardType="decimal-pad"
            accent="#16A34A"
          />

          <FormField
            label="Target Date"
            value={deadline}
            onChangeText={setDeadline}
            placeholder="Select a date"
            icon="calendar-outline"
            trailingIcon="calendar"
            muted
            // Handler is present so the field renders its affordance as a
            // button; wiring a real picker is the next step, and a no-op is
            // honest about that rather than pretending to be one.
            onPressTrailing={() => {}}
          />

          {/* Accent picker. */}
          <Text
            className="text-sm font-semibold mb-2"
            style={{ color: c.textMuted }}
          >
            Colour
          </Text>
          <View className="flex-row gap-3 mb-5">
            {ACCENTS.map((entry) => (
              <TouchableOpacity
                key={entry.key}
                activeOpacity={0.7}
                onPress={() => setAccent(entry.key)}
                accessibilityRole="radio"
                accessibilityState={{ selected: accent === entry.key }}
                accessibilityLabel={`${entry.key} accent`}
                className="w-11 h-11 rounded-full items-center justify-center"
                style={{
                  backgroundColor: entry.hex,
                  borderWidth: accent === entry.key ? 3 : 0,
                  borderColor: c.text,
                }}
              >
                {accent === entry.key && (
                  <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Suggested plan. */}
          <View
            className="rounded-2xl p-4 mb-6 flex-row items-center gap-3"
            style={{
              backgroundColor: c.surface,
              borderWidth: 1,
              borderColor: c.border,
            }}
          >
            <View
              className="w-11 h-11 rounded-xl items-center justify-center"
              style={{ backgroundColor: c.goalTile.blue }}
            >
              <Ionicons name="bulb-outline" size={22} color="#2563EB" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold" style={{ color: c.text }}>
                Suggested saving
              </Text>
              <Text
                className="text-xs font-medium mt-0.5"
                style={{ color: c.textMuted }}
              >
                Save GH₵ 400 a month to reach this on time.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.back()}
            className="bg-blue-600 rounded-2xl py-4 items-center flex-row justify-center gap-2"
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
            <Text className="text-base font-bold text-white">Create Goal</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <StatusBar barStyle={c.barStyle} />
    </SafeAreaView>
  );
}
