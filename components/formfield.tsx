import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type KeyboardTypeOptions,
} from "react-native";

interface Props {
  /** Field label, drawn above the input. */
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  /** Ionicons glyph shown at the left of the input. */
  icon?: keyof typeof Ionicons.glyphMap;
  /** Right-hand affordance — a chevron, calendar, etc. */
  trailingIcon?: keyof typeof Ionicons.glyphMap;
  /** Tap handler for the trailing affordance (e.g. open a date picker). */
  onPressTrailing?: () => void;
  keyboardType?: KeyboardTypeOptions;
  /** Renders the value in a muted colour — used for picker-style fields. */
  muted?: boolean;
  /** Focus ring colour; falls back to the theme's primary blue. */
  accent?: string;
  /**
   * Shows a `used/max` counter under the field and enforces the cap. Only set
   * this where the design shows a counter — a limit nobody stated is just a
   * silently truncated input.
   */
  maxLength?: number;
  /** Caps the input to one line; used where the design shows a single row. */
  singleLine?: boolean;
}

/**
 * A labelled text field, in the style of the Create/Edit Goal forms.
 *
 * Owns its own focus state so the ring is drawn only while the user is actually
 * in the field — the design shows a highlighted border on the active input, and
 * that is per-field state, not something a parent should be tracking.
 *
 * A `trailingIcon` that also has `onPressTrailing` becomes a button; without a
 * handler it stays decorative, which is what the currency field needs (a "GH₵"
 * suffix is a unit, not a control).
 */
export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  trailingIcon,
  onPressTrailing,
  keyboardType,
  muted = false,
  accent = "#2563EB",
  maxLength,
  singleLine = true,
}: Props) {
  const c = useThemeColors();
  const [focused, setFocused] = useState(false);

  // Only meaningful alongside a cap; without one there is no denominator.
  const count = maxLength !== undefined ? value.length : 0;

  const trailing = trailingIcon && (
    <Ionicons
      name={trailingIcon}
      size={18}
      color={focused ? accent : c.textMuted}
    />
  );

  return (
    <View className="mb-4">
      <Text
        className="text-sm font-semibold mb-2"
        style={{ color: c.textMuted }}
      >
        {label}
      </Text>

      <View
        className="flex-row items-center gap-3 rounded-2xl px-4"
        style={{
          backgroundColor: c.surface,
          borderWidth: focused ? 1.5 : 1,
          borderColor: focused ? accent : c.border,
        }}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={focused ? accent : c.textMuted}
          />
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={c.textMuted}
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={!singleLine}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          // `minHeight` rather than a fixed `height`: long values and large
          // system font sizes grow the field instead of clipping the text.
          style={{
            flex: 1,
            minHeight: singleLine ? 48 : 84,
            // Top-align a multi-line input so the caret sits on the first row.
            textAlignVertical: singleLine ? "center" : "top",
            paddingTop: singleLine ? 0 : 12,
            color: muted ? c.textMuted : c.text,
            fontSize: 15,
          }}
        />

        {onPressTrailing ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPressTrailing}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {trailing}
          </TouchableOpacity>
        ) : (
          trailing
        )}
      </View>

      {maxLength !== undefined && (
        <Text className="text-xs font-medium mt-1.5">
          <Text
            style={{
              color: count >= maxLength ? "#DC2626" : c.textMuted,
            }}
          >
            {count}
          </Text>
          <Text style={{ color: c.textMuted }}>/{maxLength}</Text>
        </Text>
      )}
    </View>
  );
}
