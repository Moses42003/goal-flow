import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  /** Ionicons glyph shown above the label. */
  icon?: keyof typeof Ionicons.glyphMap;
  /** Caption under the icon. */
  label?: string;
  /**
   * Visual weight. `solid` is the filled blue tile the design uses for the
   * primary action; `soft` is the pale blue tint used for the other two.
   */
  variant?: "solid" | "soft";
  onPress?: () => void;
}

/** A single tile in the Home screen's "Quick Actions" row. */
export default function QuickAction({
  icon = "add-circle",
  label = "Save Money",
  variant = "soft",
  onPress,
}: Props) {
  const solid = variant === "solid";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`items-center justify-center gap-2 flex-1 rounded-2xl p-3 ${solid
        ? "bg-blue-600"
        : "bg-blue-50 border-[1px] border-blue-100"
        }`}
    >
      {/* The icon sits on its own tinted disc so both variants share a
          silhouette and the row reads as one set. */}
      <Ionicons
        name={icon}
        size={26}
        color={solid ? "#FFFFFF" : "#2563EB"}
      />
      <Text
        numberOfLines={2}
        className={`text-center text-xs font-semibold ${solid ? "text-white" : "text-blue-700"
          }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
