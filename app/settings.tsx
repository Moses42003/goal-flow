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

/**
 * Account & preferences, grouped.
 *
 * Kept deliberately short: the Profile tab already links the heavy destinations
 * directly, so this screen carries only the account-level choices that had no
 * home of their own.
 */
interface Row {
  key: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  tint: string;
  /** Where the row leads, when it leads anywhere yet. */
  route?: string;
}

const GROUPS: { label: string; rows: Row[] }[] = [
  {
    label: "Account",
    rows: [
      {
        key: "edit",
        title: "Edit Profile",
        description: "Name, username and photo",
        icon: "person-outline",
        accent: "#2563EB",
        tint: "#DBEAFE",
      },
      {
        key: "security",
        title: "Security",
        description: "Password, PIN and biometrics",
        icon: "shield-checkmark-outline",
        accent: "#7C3AED",
        tint: "#EDE9FE",
      },
      {
        key: "notifications",
        title: "Notifications",
        description: "Alerts, delivery and quiet hours",
        icon: "notifications-outline",
        accent: "#F59E0B",
        tint: "#FEF3C7",
        route: "/notification-settings",
      },
    ],
  },
  {
    label: "Preferences",
    rows: [
      {
        key: "currency",
        title: "Currency",
        description: "GH₵ — Ghanaian Cedi",
        icon: "cash-outline",
        accent: "#16A34A",
        tint: "#DCFCE7",
      },
      {
        key: "language",
        title: "Language",
        description: "English (UK)",
        icon: "language-outline",
        accent: "#0891B2",
        tint: "#CFFAFE",
      },
    ],
  },
  {
    label: "Privacy",
    rows: [
      {
        key: "data",
        title: "Data & Privacy",
        description: "Download or delete your data",
        icon: "lock-closed-outline",
        accent: "#EA580C",
        tint: "#FFEDD5",
      },
    ],
  },
];

export default function SettingsScreen() {
  const c = useThemeColors();

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
            Settings
          </Text>
        </View>

        {GROUPS.map((group) => (
          <View key={group.label}>
            <Text
              className="text-base font-bold mt-6 mb-2"
              style={{ color: c.textMuted }}
            >
              {group.label}
            </Text>

            <View
              className="rounded-3xl"
              style={{
                backgroundColor: c.surface,
                borderWidth: 1,
                borderColor: c.border,
              }}
            >
              {group.rows.map((row, index) => (
                <TouchableOpacity
                  key={row.key}
                  activeOpacity={0.6}
                  onPress={() => row.route && router.push(row.route as never)}
                  className="flex-row items-center gap-3 p-4"
                  style={
                    index < group.rows.length - 1
                      ? { borderBottomWidth: 1, borderBottomColor: c.divider }
                      : undefined
                  }
                >
                  <View
                    className="w-11 h-11 rounded-2xl items-center justify-center"
                    style={{ backgroundColor: row.tint }}
                  >
                    <Ionicons name={row.icon} size={22} color={row.accent} />
                  </View>

                  <View className="flex-1">
                    <Text
                      className="text-base font-bold"
                      style={{ color: c.text }}
                    >
                      {row.title}
                    </Text>
                    <Text
                      className="text-xs font-medium mt-0.5"
                      style={{ color: c.textMuted }}
                    >
                      {row.description}
                    </Text>
                  </View>

                  <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Destructive action sits apart from the groups, as the design does. */}
        <TouchableOpacity
          activeOpacity={0.6}
          className="flex-row items-center justify-center gap-2 rounded-2xl py-4 mt-8"
          style={{ borderWidth: 1, borderColor: "#FCA5A5" }}
        >
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text className="text-base font-bold text-red-600">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <StatusBar barStyle={c.barStyle} />
    </SafeAreaView>
  );
}
