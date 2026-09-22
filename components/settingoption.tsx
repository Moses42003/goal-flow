import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  color: string;
  title: string;
  onPress?: () => void;
  icon: string;
  description: string;
}

export default function SettingOption({
  color,
  title,
  onPress,
  description,
  icon,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className="flex-row items-center justify-between my-3"
    >
      <View className="gap-3 flex-row items-center">
        <View className=" p-2 rounded-2xl">
          <Ionicons
            // @ts-ignore
            name={icon}
            color={color}
            size={24}
          />
        </View>
        <View className="gap-1">
          <Text className="text-xl font-semibold dark:text-white">
            {title || "title"}
          </Text>
          <Text className="text-gray-400 font-medium">
            {description || "Description"}
          </Text>
        </View>
      </View>

      <Ionicons name="arrow-forward-outline" color="gray" size={15} />
    </TouchableOpacity>
  );
}
