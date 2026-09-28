import BackHeader from "@/components/backheader";
import FormField from "@/components/formfield";
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

/** Quick-pick amounts. */
const QUICK_AMOUNTS = ["50", "100", "200", "500"];

/**
 * Where the money is going.
 *
 * Each option carries the payout channel, since the choice changes how long the
 * transfer takes — and the next screen commits to an expected date, so the two
 * have to agree.
 */
const METHOD_OPTIONS: SelectOption[] = [
  {
    value: "momo",
    label: "Mobile Money",
    description: "Arrives within minutes",
  },
  {
    value: "bank",
    label: "Bank Account",
    description: "1–2 business days",
  },
  {
    value: "wallet",
    label: "GoalFlow Wallet",
    description: "Instant, no fees",
  },
];

/**
 * Withdrawal type.
 *
 * `partial` leaves the goal running; `full` closes it. They have different
 * consequences, so the design asks which before showing the lock notice.
 */
const TYPE_OPTIONS: SelectOption[] = [
  {
    value: "partial",
    label: "Partial withdrawal",
    description: "Keep the goal open",
  },
  { value: "full", label: "Full withdrawal", description: "Close the goal" },
];

export default function WithdrawScreen() {
  const c = useThemeColors();

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<string | null>("momo");
  const [type, setType] = useState<string | null>("partial");

  // Goal figures the withdrawal is drawn from. In a real build these come from
  // the goal record; the balance is what caps the input.
  const balance = 1250;
  const target = 5000;

  const parsed = useMemo(() => {
    const cleaned = Number(amount.replace(/[^0-9.]/g, ""));
    return Number.isFinite(cleaned) && cleaned > 0 ? cleaned : null;
  }, [amount]);

  /** A request above the balance is refused, not silently clamped. */
  const exceedsBalance = parsed !== null && parsed > balance;

  const remaining =
    parsed !== null && !exceedsBalance ? balance - parsed : balance;

  const canSubmit = parsed !== null && !exceedsBalance && method !== null;

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
          <BackHeader title="Withdraw Savings" />

          {/* The goal being drawn from. */}
          <View
            className="rounded-2xl p-4 mt-5 flex-row items-center gap-3"
            style={{
              backgroundColor: c.surface,
              borderWidth: 1,
              borderColor: c.border,
            }}
          >
            <View
              className="w-14 h-14 rounded-2xl items-center justify-center"
              style={{ backgroundColor: c.goalTile.blue }}
            >
              <Ionicons name="laptop-outline" size={26} color="#2563EB" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold" style={{ color: c.text }}>
                Buy a laptop
              </Text>
              <Text
                className="text-sm font-medium mt-0.5"
                style={{ color: c.textMuted }}
              >
                Balance: GH₵ {balance.toLocaleString()}
              </Text>
            </View>
            <Text
              className="text-xs font-semibold"
              style={{ color: c.textMuted }}
            >
              of GH₵ {target.toLocaleString()}
            </Text>
          </View>

          <View className="mt-5">
            <FormField
              label="Amount to Withdraw"
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              icon="cash-outline"
              keyboardType="decimal-pad"
              // The field rings red on an over-balance request so the error is
              // anchored to the input rather than only appearing below it.
              accent={exceedsBalance ? "#DC2626" : "#2563EB"}
            />
          </View>

          {exceedsBalance && (
            <Text className="text-xs font-semibold text-red-600 -mt-2 mb-4">
              You can withdraw at most GH₵ {balance.toLocaleString()}.
            </Text>
          )}

          {/* Quick amounts. */}
          <View className="flex-row gap-3 mb-5">
            {QUICK_AMOUNTS.map((value) => {
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

          <Select
            label="Withdrawal Type"
            value={type}
            options={TYPE_OPTIONS}
            onSelect={setType}
            icon="swap-horizontal-outline"
          />

          <Select
            label="Receive Via"
            value={method}
            options={METHOD_OPTIONS}
            onSelect={setMethod}
            icon="cash-outline"
          />

          {/* Lock-period notice. */}
          <View
            className="rounded-2xl p-4 mb-6 flex-row items-start gap-3"
            style={{ backgroundColor: c.goalTile.amber }}
          >
            <Ionicons name="time-outline" size={20} color="#B45309" />
            <View className="flex-1">
              <Text className="text-sm font-bold" style={{ color: c.text }}>
                Lock period
              </Text>
              <Text
                className="text-xs font-medium mt-0.5 leading-5"
                style={{ color: c.textMuted }}
              >
                Withdrawing within 3 months of your last deposit may attract a
                small fee. Your remaining balance will be GH₵{" "}
                {remaining.toLocaleString()}.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={!canSubmit}
            onPress={() =>
              router.push({
                pathname: "/save/confirm-withdrawal",
                params: { amount: String(parsed ?? 0), method: method ?? "" },
              })
            }
            accessibilityState={{ disabled: !canSubmit }}
            className="bg-blue-600 rounded-2xl py-4 items-center flex-row justify-center gap-2"
            // Dimmed rather than hidden while incomplete, so the button does not
            // move around as the form fills in.
            style={{ opacity: canSubmit ? 1 : 0.5 }}
          >
            <Ionicons name="arrow-forward-circle" size={20} color="#FFFFFF" />
            <Text className="text-base font-bold text-white">Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <StatusBar barStyle={c.barStyle} />
    </SafeAreaView>
  );
}
