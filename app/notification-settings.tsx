import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** One switchable alert, rendered as a tile + label + switch row. */
interface Toggle {
  key: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  tint: string;
}

const ALERTS: Toggle[] = [
  {
    key: "reminders",
    title: "Saving Reminders",
    description: "A nudge when your weekly contribution is due.",
    icon: "alarm-outline",
    accent: "#2563EB",
    tint: "#DBEAFE",
  },
  {
    key: "milestones",
    title: "Goal Milestones",
    description: "Celebrate when a goal is reached or hits a checkpoint.",
    icon: "trophy-outline",
    accent: "#F59E0B",
    tint: "#FEF3C7",
  },
  {
    key: "streak",
    title: "Streak Alerts",
    description: "Warn me before a saving streak is about to break.",
    icon: "flame-outline",
    accent: "#EA580C",
    tint: "#FFEDD5",
  },
  {
    key: "deposits",
    title: "Deposit Confirmations",
    description: "A receipt each time money moves into a goal.",
    icon: "wallet-outline",
    accent: "#16A34A",
    tint: "#DCFCE7",
  },
];

/** Delivery channels, kept separate from the alert types in the design. */
const CHANNELS: Toggle[] = [
  {
    key: "push",
    title: "Push Notifications",
    description: "Send alerts to this device.",
    icon: "phone-portrait-outline",
    accent: "#7C3AED",
    tint: "#EDE9FE",
  },
  {
    key: "email",
    title: "Email Digest",
    description: "A weekly summary of your progress.",
    icon: "mail-outline",
    accent: "#0891B2",
    tint: "#CFFAFE",
  },
];

/** The design's quiet-hours choice, shown as selectable chips. */
const QUIET_OPTIONS = ["Off", "10 PM", "11 PM", "12 AM"] as const;

export default function NotificationSettingsScreen() {
  const c = useThemeColors();

  // All alert types default on — the app is a savings nudge tool, so opting out
  // is the deliberate act rather than opting in.
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    reminders: true,
    milestones: true,
    streak: true,
    deposits: false,
    push: true,
    email: false,
  });
  const [quiet, setQuiet] = useState<(typeof QUIET_OPTIONS)[number]>("10 PM");

  const toggle = (key: string, value: boolean) =>
    setEnabled((prev) => ({ ...prev, [key]: value }));

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: c.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pt-4 pb-8"
      >
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => router.back()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            className="w-9 h-9 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={22} color={c.text} />
          </TouchableOpacity>
          <Text className="text-2xl font-bold" style={{ color: c.text }}>
            Notifications
          </Text>
        </View>

        <Text
          className="text-sm font-medium mt-3 mb-1"
          style={{ color: c.textMuted }}
        >
          Choose what you want to hear about and how it reaches you.
        </Text>

        {/* Alert types */}
        <SectionLabel text="Alerts" color={c.textMuted} />
        <View
          className="rounded-3xl"
          style={{
            backgroundColor: c.surface,
            borderWidth: 1,
            borderColor: c.border,
          }}
        >
          {ALERTS.map((entry, index) => (
            <ToggleRow
              key={entry.key}
              entry={entry}
              value={enabled[entry.key]}
              onValueChange={(v) => toggle(entry.key, v)}
              divider={index < ALERTS.length - 1}
            />
          ))}
        </View>

        {/* Delivery channels */}
        <SectionLabel text="Delivery" color={c.textMuted} />
        <View
          className="rounded-3xl"
          style={{
            backgroundColor: c.surface,
            borderWidth: 1,
            borderColor: c.border,
          }}
        >
          {CHANNELS.map((entry, index) => (
            <ToggleRow
              key={entry.key}
              entry={entry}
              value={enabled[entry.key]}
              onValueChange={(v) => toggle(entry.key, v)}
              divider={index < CHANNELS.length - 1}
            />
          ))}
        </View>

        {/* Quiet hours */}
        <SectionLabel text="Quiet Hours" color={c.textMuted} />
        <View
          className="rounded-3xl p-4"
          style={{
            backgroundColor: c.surface,
            borderWidth: 1,
            borderColor: c.border,
          }}
        >
          <Text
            className="text-sm font-medium mb-3"
            style={{ color: c.textMuted }}
          >
            Mute non-urgent alerts after this time.
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {QUIET_OPTIONS.map((option) => {
              const selected = option === quiet;
              return (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.7}
                  onPress={() => setQuiet(option)}
                  className={`h-10 px-5 rounded-full items-center justify-center ${
                    selected
                      ? "bg-blue-600"
                      : "bg-blue-50 border-[1px] border-blue-100"
                  }`}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selected ? "text-white" : "text-blue-700"
                    }`}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Primary action */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.back()}
          className="bg-blue-600 rounded-2xl py-4 items-center flex-row justify-center gap-2 mt-6"
        >
          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
          <Text className="text-base font-bold text-white">
            Save Preferences
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <StatusBar barStyle={c.barStyle} />
    </SafeAreaView>
  );
}

/** Small section heading above each group. */
function SectionLabel({ text, color }: { text: string; color: string }) {
  return (
    <Text className="text-base font-bold mt-6 mb-2" style={{ color }}>
      {text}
    </Text>
  );
}

/**
 * One alert row.
 *
 * `divider` draws the hairline between rows rather than a border on every row,
 * so the group reads as a single card with internal separators.
 */
function ToggleRow({
  entry,
  value,
  onValueChange,
  divider,
}: {
  entry: Toggle;
  value: boolean;
  onValueChange: (value: boolean) => void;
  divider: boolean;
}) {
  const c = useThemeColors();

  return (
    <View
      className="flex-row items-center gap-3 p-4"
      style={
        divider
          ? { borderBottomWidth: 1, borderBottomColor: c.divider }
          : undefined
      }
    >
      <View
        className="w-11 h-11 rounded-2xl items-center justify-center"
        style={{ backgroundColor: entry.tint }}
      >
        <Ionicons name={entry.icon} size={22} color={entry.accent} />
      </View>

      <View className="flex-1">
        <Text className="text-base font-bold" style={{ color: c.text }}>
          {entry.title}
        </Text>
        <Text
          className="text-xs font-medium mt-0.5"
          style={{ color: c.textMuted }}
        >
          {entry.description}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: c.surfaceMuted, true: "#93C5FD" }}
        thumbColor={value ? "#2563EB" : "#FFFFFF"}
      />
    </View>
  );
}
