import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface SelectOption {
  /** Value handed back through `onSelect`. */
  value: string;
  /** Row label. */
  label: string;
  /** Optional supporting line under the label. */
  description?: string;
}

interface Props {
  /** Field label, drawn above the trigger. */
  label: string;
  /** Currently selected value, or `null` for the placeholder state. */
  value: string | null;
  options: SelectOption[];
  onSelect: (value: string) => void;
  /** Shown when nothing is selected yet. */
  placeholder?: string;
  /** Ionicons glyph at the left of the trigger. */
  icon?: keyof typeof Ionicons.glyphMap;
  /** Heading inside the sheet. Defaults to `label`. */
  sheetTitle?: string;
  /** Row layout — stacked rows read better for long option lists. */
  disabled?: boolean;
}

/**
 * A dropdown backed by a bottom sheet.
 *
 * Deliberately not `@react-native-picker/picker`: that is a native module, so
 * adopting it would force a rebuild of every dev client, and its look is the
 * platform's rather than the design's. A modal sheet renders identically on both
 * platforms, needs no native code, and gives room for an option's supporting
 * text — which the deadline and category lists both want.
 *
 * Rendered with a `Modal` rather than an absolutely-positioned overlay so it
 * escapes the parent's bounds and stacking context: an in-flow dropdown inside a
 * ScrollView gets clipped or hidden behind later siblings.
 */
export default function Select({
  label,
  value,
  options,
  onSelect,
  placeholder = "Choose an option",
  icon,
  sheetTitle,
  disabled = false,
}: Props) {
  const c = useThemeColors();
  const [open, setOpen] = useState(false);

  const selected = options.find((option) => option.value === value);
  const hasValue = selected !== undefined;

  return (
    <View className="mb-4">
      <Text
        className="text-sm font-semibold mb-2"
        style={{ color: c.textMuted }}
      >
        {label}
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        disabled={disabled}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open, disabled }}
        accessibilityLabel={`${label}: ${selected?.label ?? placeholder}`}
        className="flex-row items-center gap-3 rounded-2xl px-4"
        style={{
          backgroundColor: c.surface,
          borderWidth: 1,
          borderColor: c.border,
          minHeight: 52,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {icon && <Ionicons name={icon} size={18} color={c.textMuted} />}

        <Text
          className="flex-1 text-[15px]"
          // A placeholder is a prompt, not a value, so it takes the muted tone —
          // otherwise an empty field looks filled in.
          style={{ color: hasValue ? c.text : c.textMuted }}
        >
          {selected?.label ?? placeholder}
        </Text>

        <Ionicons name="chevron-down" size={18} color={c.textMuted} />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        {/* Backdrop. The whole area closes the sheet, so a tap anywhere outside
            dismisses rather than only a tap on a specific strip. */}
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.55)" }}
          onPress={() => setOpen(false)}
        >
          {/* Stopping propagation so a tap inside the sheet does not dismiss it.
              `Pressable` with a no-op handler is how that is expressed here. */}
          <Pressable
            onPress={() => {}}
            style={{
              backgroundColor: c.background,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              maxHeight: "75%",
            }}
          >
            {/* Grab handle. */}
            <View className="items-center pt-3">
              <View
                className="w-10 h-1 rounded-full"
                style={{ backgroundColor: c.border }}
              />
            </View>

            <View className="flex-row items-center justify-between px-5 py-3">
              <Text className="text-lg font-bold" style={{ color: c.text }}>
                {sheetTitle ?? label}
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setOpen(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <Ionicons name="close" size={22} color={c.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView
              className="px-5 pb-8"
              showsVerticalScrollIndicator={false}
            >
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    activeOpacity={0.7}
                    onPress={() => {
                      onSelect(option.value);
                      setOpen(false);
                    }}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                    className="flex-row items-center justify-between py-4"
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: c.divider,
                    }}
                  >
                    <View className="flex-1 pr-3">
                      <Text
                        className="text-base font-semibold"
                        style={{ color: isSelected ? "#2563EB" : c.text }}
                      >
                        {option.label}
                      </Text>
                      {option.description && (
                        <Text
                          className="text-xs font-medium mt-0.5"
                          style={{ color: c.textMuted }}
                        >
                          {option.description}
                        </Text>
                      )}
                    </View>

                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color="#2563EB"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
