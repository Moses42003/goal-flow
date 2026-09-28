import BackHeader from "@/components/backheader";
import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Human labels for the method param handed over by the withdraw screen. */
const METHOD_LABELS: Record<
  string,
  { label: string; detail: string; eta: string }
> = {
  momo: {
    label: "Mobile Money",
    detail: "**** 4821",
    eta: "Within minutes",
  },
  bank: {
    label: "Bank Account",
    detail: "**** 7710",
    eta: "1–2 business days",
  },
  wallet: {
    label: "GoalFlow Wallet",
    detail: "Instant balance",
    eta: "Immediately",
  },
};

/** Fee tiers keyed by method; wallet transfers are free. */
const FEES: Record<string, number> = {
  momo: 5,
  bank: 8,
  wallet: 0,
};

/**
 * Withdrawal confirmation.
 *
 * Reads `amount` and `method` from the previous screen rather than recomputing
 * them, so what the user reviews is exactly what they entered. Params arrive as
 * strings — expo-router serialises every param — so both are parsed back here
 * and every value is guarded before it reaches the screen.
 */
export default function ConfirmWithdrawalScreen() {
  const c = useThemeColors();
  const params = useLocalSearchParams<{ amount?: string; method?: string }>();

  const parsedAmount = Number(params.amount);
  // Falls back to 0 rather than rendering "GH₵ NaN" if a param is missing — a
  // confirmation screen showing a broken number is worse than showing none.
  const amount =
    Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : 0;

  const methodKey = params.method ?? "momo";
  const method = METHOD_LABELS[methodKey] ?? METHOD_LABELS.momo;
  const fee = FEES[methodKey] ?? 0;
  const total = Math.max(amount - fee, 0);

  const rows = [
    { label: "Amount requested", value: `GH₵ ${amount.toLocaleString()}` },
    { label: "Fee", value: fee === 0 ? "Free" : `GH₵ ${fee.toLocaleString()}` },
    {
      label: "You receive",
      value: `GH₵ ${total.toLocaleString()}`,
      emphasis: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: c.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pt-4 pb-8"
      >
        <BackHeader title="Confirm Withdrawal" />

        {/* Success mark. */}
        <View className="items-center mt-6 mb-4">
          <View
            className="w-20 h-20 rounded-full items-center justify-center"
            style={{ backgroundColor: c.goalTile.green }}
          >
            <Ionicons
              name="checkmark-circle"
              size={44}
              color={c.goalFill.green}
            />
          </View>

          <Text className="text-2xl font-bold mt-4" style={{ color: c.text }}>
            GH₵ {amount.toLocaleString()}
          </Text>
          <Text
            className="text-sm font-medium mt-1 text-center"
            style={{ color: c.textMuted }}
          >
            Ready to withdraw from Buy a laptop
          </Text>
        </View>

        {/* Summary. */}
        <View
          className="rounded-2xl overflow-hidden mb-4"
          style={{
            backgroundColor: c.surface,
            borderWidth: 1,
            borderColor: c.border,
          }}
        >
          {rows.map((row, index) => (
            <View
              key={row.label}
              className="flex-row items-center justify-between px-4 py-3.5"
              style={
                index < rows.length - 1
                  ? { borderBottomWidth: 1, borderBottomColor: c.divider }
                  : undefined
              }
            >
              <Text
                className="text-sm font-medium"
                style={{ color: c.textMuted }}
              >
                {row.label}
              </Text>
              <Text
                className="text-sm font-bold"
                style={{ color: row.emphasis ? c.goalFill.green : c.text }}
              >
                {row.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Destination. */}
        <View
          className="rounded-2xl p-4 mb-4 flex-row items-center gap-3"
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
              {method.label}
            </Text>
            <Text
              className="text-xs font-medium mt-0.5"
              style={{ color: c.textMuted }}
            >
              {method.detail}
            </Text>
          </View>
        </View>

        {/* Expected arrival. */}
        <View
          className="rounded-2xl p-4 mb-4 flex-row items-center gap-3"
          style={{ backgroundColor: c.goalTile.blue }}
        >
          <Ionicons name="time-outline" size={20} color="#2563EB" />
          <View className="flex-1">
            <Text className="text-sm font-bold" style={{ color: c.text }}>
              Expected arrival
            </Text>
            <Text
              className="text-xs font-medium mt-0.5"
              style={{ color: c.textMuted }}
            >
              {method.eta}
            </Text>
          </View>
        </View>

        {/* Reassurance. */}
        <View
          className="rounded-2xl p-4 mb-6 flex-row items-start gap-3"
          style={{ backgroundColor: c.goalTile.amber }}
        >
          <Ionicons name="shield-checkmark-outline" size={20} color="#B45309" />
          <Text
            className="text-xs font-medium flex-1 leading-5"
            style={{ color: c.textMuted }}
          >
            Your request is reviewed instantly. If anything looks wrong you can
            cancel before the transfer is processed.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.back()}
          className="bg-blue-600 rounded-2xl py-4 items-center flex-row justify-center gap-2"
        >
          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
          <Text className="text-base font-bold text-white">
            Confirm Withdrawal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          className="rounded-2xl py-4 items-center mt-3"
          style={{ borderWidth: 1, borderColor: c.border }}
        >
          <Text className="text-base font-bold" style={{ color: c.textMuted }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <StatusBar barStyle={c.barStyle} />
    </SafeAreaView>
  );
}
