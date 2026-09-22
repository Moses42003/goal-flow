import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  color: string;
  title: string;
  onPress?: () => void;
  icon?: string;
  iconPosition?: "left";
}

export default function CustomButton({
  color,
  title,
  onPress,
  icon,
  iconPosition,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className="p-3 border-[1px] rounded-3xl border-red-400 dark:bg-red-300/25 bg-red-100 items-center"
    >
      {iconPosition === "left" ? (
        <View className="flex-row items-center gap-2">
          <Ionicons
            name={icon || "add-circle-outline"}
            size={20}
            color={color}
          />
          <Text style={{ color: color }} className="font-semibold text-lg">
            {title || "Button"}
          </Text>
        </View>
      ) : (
        <View className="flex-row items-center gap-2">
          <Text style={{ color: color }} className="font-semibold text-lg">
            {title || "Button"}
          </Text>
          <Ionicons
            name={icon || "add-circle-outline"}
            size={20}
            color={color}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
