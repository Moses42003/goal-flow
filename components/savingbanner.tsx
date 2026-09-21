import SavingIllustration from "@/components/savingillustration";
import { useThemeColors } from "@/lib/theme";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  /** Headline above the tagline. */
  title?: string;
  /** Supporting line under the headline. */
  tagline?: string;
}

/**
 * The "Saving isn't just about money" banner on the Save Money screen.
 *
 * Composed here rather than inline in the screen so the illustration's size and
 * the copy's wrap stay together — the design seats the artwork above centred
 * text, and splitting the two would let them drift apart on a narrow device.
 */
export default function SavingBanner({
  title = "Saving isn't just about money",
  tagline = "It's about freedom.",
}: Props) {
  const c = useThemeColors();

  return (
    <View
      className="my-3 rounded-3xl py-6 items-center"
      style={{
        backgroundColor: c.surface,
        borderWidth: 1,
        borderColor: c.border,
      }}
    >
      <SavingIllustration width={220} />

      <Text
        className="text-lg font-bold text-center mt-4 px-6"
        style={{ color: c.text }}
      >
        {title}
      </Text>
      <Text
        className="text-sm font-medium text-center mt-1"
        style={{ color: c.textMuted }}
      >
        {tagline}
      </Text>
    </View>
  );
}
