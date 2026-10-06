import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Which bucket a notification belongs to — drives its glyph and colour. */
type Kind = "success" | "reminder" | "streak" | "info";

interface Notification {
  id: string;
  kind: Kind;
  title: string;
  body: string;
  /** Pre-formatted relative time, e.g. "2m ago". */
  time: string;
  /** Unread entries carry a much stronger surface and a blue dot. */
  unread?: boolean;
}

const SEED: Notification[] = [
  {
    id: "n1",
    kind: "success",
    title: "Goal reached 🎉",
    body: 'You completed "New Phone". That\'s three goals done this year.',
    time: "2m ago",
    unread: true,
  },
  {
    id: "n2",
    kind: "reminder",
    title: "Weekly saving due",
    body: "Your GH₵ 400 for “Buy a laptop” is ready to go in.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "n3",
    kind: "streak",
    title: "7 day streak!",
    body: "You've saved every day this week. Keep the flame alive.",
    time: "5h ago",
  },
  {
    id: "n4",
    kind: "info",
    title: "Automatic saving deposit",
    body: "GH₵ 250 moved from your wallet into “Emergency Fund”.",
    time: "Yesterday",
  },
  {
    id: "n5",
    kind: "success",
    title: "Milestone hit",
    body: "“Dream Vacation” is now 25% funded. Nice work.",
    time: "2d ago",
  },
  {
    id: "n6",
    kind: "reminder",
    title: "Target date approaching",
    body: "“Emergency Fund” is due in 3 weeks. Top up to stay on track.",
    time: "3d ago",
  },
  {
    id: "n7",
    kind: "info",
    title: "Welcome to GoalFlow",
    body: "Set your first goal and start turning dreams into plans.",
    time: "1w ago",
  },
];

/**
 * Per-kind presentation.
 *
 * The tile tint and glyph colour are chosen per kind rather than one shared
 * accent, so a glance at the icon alone tells you whether this is good news, a
 * nudge, a streak, or housekeeping — the design leans on that distinction.
 */
const PRESENTATION: Record<
  Kind,
  { icon: keyof typeof Ionicons.glyphMap; tint: string; fill: string }
> = {
  success: {
    icon: "checkmark-circle-outline",
    tint: "#DCFCE7",
    fill: "#16A34A",
  },
  reminder: { icon: "alarm-outline", tint: "#DBEAFE", fill: "#2563EB" },
  streak: { icon: "flame-outline", tint: "#FEF3C7", fill: "#F59E0B" },
  info: {
    icon: "information-circle-outline",
    tint: "#EDE9FE",
    fill: "#7C3AED",
  },
};

/** The four filters across the top; `All` is selected on mount. */
const FILTERS = ["All", "Unread", "Goals", "Reminders"] as const;
type Filter = (typeof FILTERS)[number];

/** Maps a filter to the kinds it keeps. `All`/`Unread` keep everything. */
const FILTER_KINDS: Record<Filter, Kind[] | null> = {
  All: null,
  Unread: null,
  Goals: ["success", "info"],
  Reminders: ["reminder", "streak"],
};

export default function NotificationsScreen() {
  const c = useThemeColors();
  const [filter, setFilter] = useState<Filter>("All");
  // Held in state rather than derived so "Mark all read" has somewhere to land.
  const [items, setItems] = useState<Notification[]>(SEED);

  const unreadCount = items.filter((n) => n.unread).length;

  const visible = useMemo(() => {
    const kinds = FILTER_KINDS[filter];
    return items.filter((n) => {
      if (filter === "Unread" && !n.unread) return false;
      if (kinds && !kinds.includes(n.kind)) return false;
      return true;
    });
  }, [items, filter]);

  /** Reading the list is the point of the screen, so opening it clears the dot. */
  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: c.background }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-4">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => router.back()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            className="w-9 h-9 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={22} color={c.text} />
          </TouchableOpacity>

          <View className="flex-row items-center gap-2">
            <Text className="text-2xl font-bold" style={{ color: c.text }}>
              Notifications
            </Text>
            {unreadCount > 0 && (
              <View className="bg-blue-600 rounded-full min-w-6 h-6 px-1.5 items-center justify-center">
                <Text className="text-xs font-bold text-white">
                  {unreadCount}
                </Text>
              </View>
            )}
          </View>
        </View>

        {unreadCount > 0 && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={markAllRead}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text className="text-sm font-semibold text-blue-600">
              Mark all read
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter chips */}
      <View className="flex-row gap-2 px-5 pt-4 pb-2">
        {FILTERS.map((entry) => {
          const selected = entry === filter;
          return (
            <TouchableOpacity
              key={entry}
              activeOpacity={0.7}
              onPress={() => setFilter(entry)}
              className={`h-9 px-4 rounded-full items-center justify-center ${
                selected
                  ? "bg-blue-600"
                  : "bg-blue-50 border-[1px] border-blue-100"
              }`}
              accessibilityRole="button"
              accessibilityState={{ selected }}
            >
              <Text
                className={`text-sm font-semibold ${
                  selected ? "text-white" : "text-blue-700"
                }`}
              >
                {entry}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pb-8"
      >
        {visible.length === 0 ? (
          <EmptyState
            textMuted={c.textMuted}
            surface={c.surface}
            border={c.border}
          />
        ) : (
          visible.map((item) => (
            <NotificationRow
              key={item.id}
              item={item}
              onPress={() =>
                setItems((prev) =>
                  prev.map((n) =>
                    n.id === item.id ? { ...n, unread: false } : n,
                  ),
                )
              }
            />
          ))
        )}
      </ScrollView>

      <StatusBar barStyle={c.barStyle} />
    </SafeAreaView>
  );
}

function NotificationRow({
  item,
  onPress,
}: {
  item: Notification;
  onPress: () => void;
}) {
  const c = useThemeColors();
  const p = PRESENTATION[item.kind];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row gap-3 rounded-3xl p-4 my-2"
      style={{
        // Unread rows sit on a brighter surface with an accent edge; read rows
        // recede into the page so the eye lands on what's new first.
        backgroundColor: item.unread ? c.surface : c.surfaceMuted,
        borderWidth: 1,
        borderColor: item.unread ? "#BFDBFE" : c.border,
      }}
    >
      <View
        className="w-11 h-11 rounded-2xl items-center justify-center"
        style={{ backgroundColor: p.tint }}
      >
        <Ionicons name={p.icon} size={22} color={p.fill} />
      </View>

      <View className="flex-1 gap-1">
        <View className="flex-row items-center justify-between gap-2">
          <Text
            className="text-base flex-1"
            style={{ color: c.text, fontWeight: item.unread ? "700" : "600" }}
          >
            {item.title}
          </Text>
          <Text className="text-xs font-medium" style={{ color: c.textMuted }}>
            {item.time}
          </Text>
        </View>

        <Text
          className="text-sm font-medium leading-5"
          style={{ color: c.textMuted }}
        >
          {item.body}
        </Text>
      </View>

      {item.unread && (
        <View className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1.5" />
      )}
    </TouchableOpacity>
  );
}

function EmptyState({
  textMuted,
  surface,
  border,
}: {
  textMuted: string;
  surface: string;
  border: string;
}) {
  return (
    <View
      className="items-center justify-center rounded-3xl py-12 px-6 mt-4"
      style={{ backgroundColor: surface, borderWidth: 1, borderColor: border }}
    >
      <Ionicons name="notifications-off-outline" size={40} color={textMuted} />
      <Text
        className="text-base font-semibold mt-3"
        style={{ color: textMuted }}
      >
        Nothing here
      </Text>
      <Text
        className="text-sm font-medium mt-1 text-center"
        style={{ color: textMuted }}
      >
        You&apos;re all caught up in this filter.
      </Text>
    </View>
  );
}
