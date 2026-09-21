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
      // Azure at the top-left, fading to a pale mint-white at the bottom-right.
      colors={["#1D6FE8", "#4FA3F7", "#C7E9F5", "#EEFBF4"]}
      locations={[0, 0.42, 0.78, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-3xl my-4"
      style={{ borderRadius: 24 }}
    >
      <View className="p-5">
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center gap-4 flex-1">
            {/* Wallet badge: white tile on the blue end of the gradient. */}
            <View className="bg-white rounded-2xl w-16 h-16 items-center justify-center shadow-sm">
              <Ionicons name="wallet" size={30} color="#1D6FE8" />
            </View>

            <View className="flex-1 gap-0.5">
              <Text className="text-base font-medium text-white/90">
                {label}
              </Text>

              <View className="flex-row items-end gap-1.5">
                <Text className="text-xl font-bold text-white">{currency}</Text>
                <Text className="text-3xl font-bold text-white">{amount}</Text>
              </View>
            </View>
          </View>

          {/* Visibility toggle shown in the design's top-right corner. */}
          <TouchableOpacity activeOpacity={0.6} className="pt-1">
            <Ionicons name="eye-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Delta row — sits over the pale end, so it uses a dark green. */}
        <View className="flex-row items-center gap-1.5 mt-3 ml-1">
          <Ionicons name="arrow-up" size={15} color="#15803D" />
          <Text className="text-sm font-bold text-green-700">
            + {currency} {monthlyAmount}
          </Text>
          <Text className="text-sm font-medium text-green-700">{caption}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}
