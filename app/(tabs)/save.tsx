import SaveCard from "@/components/savecard";
import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SaveScreen() {
  const c = useThemeColors();

  return (
    <SafeAreaView
      className="flex-1 pt-5 px-5"
      style={{ backgroundColor: c.background }}
    >
      <View className="mb-2">
        <View className="flex-row items-center justify-between mb-3">
          <View className="gap-1">
            <Text className="text-3xl font-bold" style={{ color: c.text }}>
              Save Money
            </Text>
            <Text
              className="text-lg font-semibold"
              style={{ color: c.textMuted }}
            >
              Choose how you want to save.
            </Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Saving methods, in the order the design lists them. */}
        <SaveCard
          title="Savings Plan"
          description="Set a target and let us help you plan it."
          icon="card-outline"
          color="#DBEAFE"
          iconColor="#2563EB"
        />
        <SaveCard
          title="Manual Saving"
          description="Make a one-time deposit whenever you want."
          icon="add-circle-outline"
          color="#DCFCE7"
          iconColor="#16A34A"
        />
        <SaveCard
          title="Automatic Saving"
          description="Set up a recurring schedule and save on autopilot."
          icon="refresh-outline"
          color="#EDE9FE"
          iconColor="#7C3AED"
        />
        <SaveCard
          title="Flexible Saving"
          description="Save without a specific goal. Build your safety net."
          icon="wallet-outline"
          color="#FFEDD5"
          iconColor="#F97316"
        />

        {/* Tip banner. The design draws this dark on a light page; keeping it
            as an "inverse" surface is deliberate, and it still works under a
            dark theme because the accent tile carries the contrast. */}
        <View
          className="my-3 rounded-2xl p-4 flex-row items-start gap-3"
          style={{ backgroundColor: c.tipSurface }}
        >
          <View className="bg-blue-600 rounded-full w-9 h-9 items-center justify-center">
            <Ionicons name="bulb-outline" size={20} color="#FFFFFF" />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-base font-bold" style={{ color: c.tipText }}>
              Saving Tip
            </Text>
            <Text
              className="text-sm font-medium"
              style={{ color: c.tipTextMuted }}
            >
              Small amounts add up. Save something every day.
            </Text>
          </View>
        </View>

        <View className="h-6" />
      </ScrollView>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
}
