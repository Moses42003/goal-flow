import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  /** Number of consecutive saving days. */
  days?: number;
  /** Sentence following the streak headline. */
  message?: string;
  /** Short closing encouragement. */
  subMessage?: string;
  onPress?: () => void;
}

/**
 * The orange "saving streak" banner.
 *
 * The headline is composed from `days` rather than passed whole, so the number
 * can be pluralised and the styling of "!" stays consistent across callers.
 */
export default function StreakSaveCard({
  days = 7,
  message = "You've been saving consistently.",
  subMessage = "Keep it up!",
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="border-[1px] bg-orange-100 border-orange-200 rounded-2xl p-3 my-3 flex-row gap-3 items-center"
    >
      <View className="w-14 h-14 rounded-full bg-orange-200 items-center justify-center">
        <Ionicons name="flame" size={32} color="#F97316" />
      </View>

      <View className="gap-1 flex-1">
        <Text className="text-lg font-bold text-orange-500">
          {days} Day Saving Streak!
        </Text>
        <Text className="text-sm text-gray-500 font-medium">{message}</Text>
        <Text className="text-sm text-gray-500 font-medium">{subMessage}</Text>
      </View>

      <View className="items-center justify-center">
        <Ionicons name="arrow-forward" size={15} color="gray" />
      </View>
    </TouchableOpacity>
  );
}
