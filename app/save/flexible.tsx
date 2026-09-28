import BackHeader from "@/components/backheader";
import FlexibleIllustration from "@/components/flexibleillustration";
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

/**
 * Flexible Savings.
 *
 * The no-strings option: save whatever you can, whenever you can, with no goal
 * attached and no fixed amount. The design calls that out explicitly in the info
 * note, because the absence of a commitment is the feature.
 */
export default function FlexibleSavingScreen() {
  const c = useThemeColors();
  const [amount, setAmount] = useState("");

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: c.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pt-4 pb-8"
      >
        <BackHeader title="Flexible Savings" />

        <View className="items-center my-4">
          <FlexibleIllustration width={180} />
        </View>

        <Text
          className="text-2xl font-bold text-center"
          style={{ color: c.text }}
        >
          Save your way
        </Text>
        <Text
          className="text-sm font-medium text-center mt-1 mb-6"
          style={{ color: c.textMuted }}
        >
          No targets, no schedules. Just put money aside when you can.
        </Text>

        {/* Info note. */}
        <View
          className="rounded-2xl p-4 mb-5 flex-row items-start gap-3"
          style={{ backgroundColor: c.goalTile.green }}
        >
          <Ionicons name="sparkles" size={20} color={c.goalFill.green} />
          <Text
            className="text-xs font-medium flex-1 leading-5"
            style={{ color: c.text }}
          >
            Flexible savings earn the same interest as a plan, but you are free
            to withdraw at any time without a penalty.
          </Text>
        </View>

        {/* Opening amount. */}
        <View
          className="rounded-2xl p-5 items-center"
          style={{
            backgroundColor: c.surface,
            borderWidth: 1,
            borderColor: c.border,
          }}
        >
          <Text
            className="text-sm font-semibold"
            style={{ color: c.textMuted }}
          >
            Start with (optional)
          </Text>
          <Text className="text-4xl font-bold mt-1" style={{ color: c.text }}>
            GH₵ {amount || "0"}
          </Text>
        </View>

        <View className="flex-row gap-3 mt-4">
          {["50", "100", "250", "500"].map((value) => {
            const selected = value === amount;
            return (
              <TouchableOpacity
                key={value}
                activeOpacity={0.7}
                onPress={() => setAmount(selected ? "" : value)}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                className="flex-1 py-3 rounded-xl items-center"
                style={{
                  backgroundColor: selected ? c.goalFill.green : c.surfaceMuted,
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

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.back()}
          className="bg-blue-600 rounded-2xl py-4 items-center mt-6 flex-row justify-center gap-2"
        >
          <Ionicons name="wallet-outline" size={20} color="#FFFFFF" />
          <Text className="text-base font-bold text-white">
            Create Flexible Wallet
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar barStyle={c.barStyle} />
    </SafeAreaView>
  );
}
