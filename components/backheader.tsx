import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  title: string;
  /** Optional override; defaults to going back a screen. */
  onBack?: () => void;
}

/**
 * Screen header: a back chevron and a title.
 *
 * The chevron is a real button rather than a decorative glyph — the design shows
 * it as the primary way out of every detail screen, and a header arrow that
 * doesn't respond is worse than no arrow at all.
 */
export default function BackHeader({ title, onBack }: Props) {
  const c = useThemeColors();

  return (
    <View className="flex-row gap-3 items-center">
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onBack ?? (() => router.back())}
        // Generous hit area: the glyph is small, and a 20px target is below
        // the ~44px minimum for a comfortable tap.
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        className="w-9 h-9 items-center justify-center"
      >
        <Ionicons name="arrow-back" size={22} color={c.text} />
      </TouchableOpacity>

      <Text className="text-2xl font-semibold" style={{ color: c.text }}>
        {title}
      </Text>
    </View>
  );
}
