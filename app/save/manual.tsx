import BackHeader from "@/components/backheader";
import SavingIllustration from "@/components/savingillustration";
import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Quick-pick amounts shown as chips, per the design. */
const QUICK_AMOUNTS = ["50", "100", "200", "500"];

/**
 * Manual Saving.
 *
 * A one-off deposit: pick an amount, choose where the money comes from, and go.
 * There is no schedule here by design — that is what Automatic Saving is for.
 */
export default function ManualSavingScreen() {
  const c = useThemeColors();
  const [amount, setAmount] = useState("100");

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: c.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pt-4 pb-8"
      >
        <BackHeader title="Manual Saving" />

        <View className="items-center my-4">
          <SavingIllustration width={200} />
        </View>

        <Text
          className="text-2xl font-bold text-center"
          style={{ color: c.text }}
        >
          Make a deposit
        </Text>
        <Text
          className="text-sm font-medium text-center mt-1 mb-6"
          style={{ color: c.textMuted }}
        >
          Add money to your savings whenever you like.
        </Text>

        {/* Amount. */}
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
            Amount to deposit
          </Text>
          <Text className="text-4xl font-bold mt-1" style={{ color: c.text }}>
            GH₵ {amount}
          </Text>
        </View>

        {/* Quick amounts. */}
        <View className="flex-row gap-3 mt-4">
          {QUICK_AMOUNTS.map((value) => {
            const selected = value === amount;
            return (
              <Text
                key={value}
                onPress={() => setAmount(value)}
                className="flex-1 text-center py-3 rounded-xl text-sm font-semibold overflow-hidden"
                style={{
                  backgroundColor: selected ? "#2563EB" : c.surfaceMuted,
                  color: selected ? "#FFFFFF" : c.text,
                }}
              >
                {value}
              </Text>
            );
          })}
        </View>

        {/* Payment source. */}
        <Text
          className="text-sm font-semibold mt-6 mb-2"
          style={{ color: c.textMuted }}
        >
          Pay from
        </Text>
        <View
          className="rounded-2xl p-4 flex-row items-center gap-3"
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
            <Ionicons name="phone-portrait-outline" size={20} color="#2563EB" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold" style={{ color: c.text }}>
              Mobile Money
            </Text>
            <Text
              className="text-xs font-medium"
              style={{ color: c.textMuted }}
            >
              **** 4821
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={c.textMuted} />
        </View>

        <View className="rounded-2xl py-4 items-center mt-6 flex-row justify-center gap-2 bg-blue-600">
          <Ionicons name="arrow-down-circle" size={20} color="#FFFFFF" />
          <Text className="text-base font-bold text-white">Deposit</Text>
        </View>
      </ScrollView>
      <StatusBar barStyle={c.barStyle} />
    </SafeAreaView>
  );
}
