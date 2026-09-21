import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  /** Label above the figure, e.g. "Total Savings". */
  label?: string;
  /** Currency symbol rendered smaller beside the amount. */
  currency?: string;
  /** Main figure, pre-formatted (e.g. "2,450.00"). */
  amount?: string;
  /** Amount saved this month, shown in the delta row. */
  monthlyAmount?: string;
  /** Caption following the delta row. */
  caption?: string;
}

/**
 * The "Total Savings" hero card.
 *
 * The design paints this card with a gradient that runs from a saturated blue
 * in the top-left to a near-white wash in the bottom-right — the amount sits on
 * the deep blue while the delta row lands on the pale end. A diagonal linear
 * gradient reproduces that; two stacked solid views cannot, because the colour
 * has to keep changing across the whole card rather than once at a seam.
 */
export default function TotalSavingCard({
  label = "Total Savings",
  currency = "GH₵",
  amount = "2,450.00",
  monthlyAmount = "350",
  caption = "this month",
}: Props) {
  return (
    <LinearGradient
      // The card itself is the pale card, not the blue: the blue is the sky
      // *behind* it, showing through. So the gradient here is only a faint
      // mint-to-white wash, which is what gives the design's frosted look.
      colors={["#EAF7F1", "#F4FBF8", "#FFFFFF"]}
      locations={[0, 0.55, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-3xl my-4"
      style={{ borderRadius: 24 }}
    >
      <View className="p-5">
        {/* Label + visibility toggle on one line, above the figure. */}
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-semibold text-slate-500">
            {label}
          </Text>

          <TouchableOpacity activeOpacity={0.6}>
            <Ionicons name="eye-outline" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Figure on its own line, with the wallet tile leading it. */}
        <View className="flex-row items-center gap-4 mt-1">
          {/* Wallet tile, as drawn: light-blue square, blue glyph. */}
          <View className="bg-blue-100 rounded-2xl w-14 h-14 items-center justify-center">
            <Ionicons name="wallet" size={26} color="#2563EB" />
          </View>

          <View className="flex-row items-end gap-1.5">
            <Text className="text-xl font-bold text-slate-800">{currency}</Text>
            <Text className="text-4xl font-bold text-slate-900">{amount}</Text>
          </View>
        </View>

        {/* Delta row. */}
        <View className="flex-row items-center gap-1.5 mt-3">
          <Ionicons name="arrow-up" size={15} color="#16A34A" />
          <Text className="text-sm font-bold text-green-600">
            + {currency} {monthlyAmount}
          </Text>
          <Text className="text-sm font-medium text-slate-500">{caption}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}
