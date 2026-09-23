import BackHeader from "@/components/backheader";
import FormField from "@/components/formfield";
import Slider from "@/components/slider";
import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Icon choices offered for the goal. */
const ICONS = [
  { key: "laptop-outline", label: "Laptop" },
  { key: "airplane-outline", label: "Travel" },
  { key: "home-outline", label: "Home" },
  { key: "car-sport-outline", label: "Car" },
  { key: "school-outline", label: "School" },
  { key: "phone-portrait-outline", label: "Phone" },
] as const;

export default function EditGoalScreen() {
  const c = useThemeColors();

  const [name, setName] = useState("Buy a laptop");
  const [target, setTarget] = useState("5,000");
  const [deadline, setDeadline] = useState("12 Jun 2026");
  const [icon, setIcon] = useState<string>("laptop-outline");
  // Monthly contribution, shown as a slider in the design.
  const [monthly, setMonthly] = useState(400);
  const [reminders, setReminders] = useState(true);

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
          <BackHeader title="Edit Goal" />

          {/* Current icon preview. */}
          <View className="items-center my-5">
            <View
              className="w-24 h-24 rounded-3xl items-center justify-center"
              style={{ backgroundColor: c.goalTile.blue }}
            >
              <Ionicons name={icon as never} size={44} color="#2563EB" />
            </View>
          </View>

          {/* Icon picker. */}
          <Text
            className="text-sm font-semibold mb-3"
            style={{ color: c.textMuted }}
          >
            Change Icon
          </Text>
          <View className="flex-row flex-wrap gap-3 mb-5">
            {ICONS.map((entry) => {
              const selected = entry.key === icon;
              return (
                <TouchableOpacity
                  key={entry.key}
                  activeOpacity={0.7}
                  onPress={() => setIcon(entry.key)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  accessibilityLabel={entry.label}
                  className="w-14 h-14 rounded-2xl items-center justify-center"
                  style={{
                    backgroundColor: selected
                      ? c.goalTile.blue
                      : c.surfaceMuted,
                    borderWidth: selected ? 2 : 1,
                    borderColor: selected ? "#2563EB" : c.border,
                  }}
                >
                  <Ionicons
                    name={entry.key}
                    size={24}
                    color={selected ? "#2563EB" : c.textMuted}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <FormField
            label="Goal Name"
            value={name}
            onChangeText={setName}
            icon="flag-outline"
          />

          <FormField
            label="Target Amount"
            value={target}
            onChangeText={setTarget}
            icon="cash-outline"
            keyboardType="decimal-pad"
            accent="#16A34A"
          />

          <FormField
            label="Target Date"
            value={deadline}
            onChangeText={setDeadline}
            icon="calendar-outline"
            trailingIcon="calendar"
            onPressTrailing={() => {}}
            muted
          />

          {/* Monthly contribution slider. */}
          <View
            className="rounded-2xl p-4 mb-4"
            style={{
              backgroundColor: c.surface,
              borderWidth: 1,
              borderColor: c.border,
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text
                className="text-sm font-semibold"
                style={{ color: c.textMuted }}
              >
                Monthly Saving
              </Text>
              <Text className="text-lg font-bold text-blue-600">
                GH₵ {monthly}
              </Text>
            </View>

            <View className="mt-2">
              <Slider
                value={monthly}
                onValueChange={setMonthly}
                min={50}
                max={2000}
                step={50}
              />
            </View>

            <View className="flex-row justify-between">
              <Text
                className="text-xs font-medium"
                style={{ color: c.textMuted }}
              >
                GH₵ 50
              </Text>
              <Text
                className="text-xs font-medium"
                style={{ color: c.textMuted }}
              >
                GH₵ 2,000
              </Text>
            </View>
          </View>

          {/* Reminder toggle. */}
          <View
            className="rounded-2xl p-4 mb-6 flex-row items-center justify-between"
            style={{
              backgroundColor: c.surface,
              borderWidth: 1,
              borderColor: c.border,
            }}
          >
            <View className="flex-row items-center gap-3 flex-1">
              <View
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{ backgroundColor: c.goalTile.violet }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={c.goalFill.violet}
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold" style={{ color: c.text }}>
                  Saving Reminders
                </Text>
                <Text
                  className="text-xs font-medium mt-0.5"
                  style={{ color: c.textMuted }}
                >
                  Nudge me to save every week.
                </Text>
              </View>
            </View>

            <Switch
              value={reminders}
              onValueChange={setReminders}
              trackColor={{ false: c.surfaceMuted, true: "#93C5FD" }}
              thumbColor={reminders ? "#2563EB" : "#FFFFFF"}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.back()}
            className="bg-blue-600 rounded-2xl py-4 items-center flex-row justify-center gap-2"
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
            <Text className="text-base font-bold text-white">Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <StatusBar barStyle={c.barStyle} />
    </SafeAreaView>
  );
}
