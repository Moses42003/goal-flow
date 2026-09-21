import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  title: string;
  description: string;
  /**
   * Ionicons glyph for the tile. Defaulted rather than required: the value goes
   * straight to `Ionicons`, and an undefined glyph renders nothing (or throws)
   * instead of failing loudly at the call site.
   */
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  /** Tile background tint. Kept optional so existing call sites compile. */
  color?: string;
  /** Glyph colour. */
  iconColor: string;
}

/** One selectable saving method on the Save Money screen. */
export default function SaveCard({
  title,
  description,
  icon = "wallet",
  onPress,
  color = "#EFF6FF",
  iconColor,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="border-[1px] border-gray-200 bg-white rounded-2xl p-3 my-3 flex-row gap-3 items-center"
      onPress={onPress}
    >
      {/* Tint is applied via `style` because `color` is a runtime value the
          NativeWind compiler cannot resolve into a class. */}
      <View
        className="w-16 h-16 rounded-2xl items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <Ionicons name={icon} size={30} color={iconColor} />
      </View>

      <View className="gap-1 flex-1">
        <Text className="text-lg font-semibold">{title}</Text>
        <Text className="text-sm text-gray-500 font-medium">{description}</Text>
      </View>

      <View className="items-center justify-center">
        <Ionicons name="arrow-forward" size={16} color="gray" />
      </View>
    </TouchableOpacity>
  );
}
