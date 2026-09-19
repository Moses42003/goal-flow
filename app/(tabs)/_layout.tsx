import TabBarIcon, {
    TAB_ACTIVE,
    TAB_INACTIVE,
    TabBarActionIcon,
    TabBarLabel,
} from "@/components/TabBarIcon";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

/**
 * Binds a tab's label text to the animated label component, so every screen
 * can write `tabBarLabel: label("Home")` and get the shared reveal animation.
 */
function label(text: string) {
  const Slot = ({ focused, color }: { focused: boolean; color: string }) => (
    <TabBarLabel text={text} focused={focused} color={color} />
  );

  Slot.displayName = `TabLabel(${text})`;
  return Slot;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: TAB_ACTIVE,
        tabBarInactiveTintColor: TAB_INACTIVE,
        // Every label slot is the same height whether or not its text is
        // visible, so revealing one on focus never resizes the bar.
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        tabBarStyle: {
          height: 72,
          paddingTop: 9,
          paddingBottom: 12,
          backgroundColor: "#FFFFFF",
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "#E2E8F0",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: label("Home"),
          tabBarIcon: (props) => <TabBarIcon name="home" {...props} />,
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: "Goals",
          tabBarLabel: label("Goals"),
          tabBarIcon: (props) => <TabBarIcon name="flag" {...props} />,
        }}
      />
      <Tabs.Screen
        name="save"
        options={{
          title: "Save",
          // The disc carries the meaning; a label under a raised button would
          // collide with the bar edge and crowd the halo.
          tabBarLabel: () => null,
          tabBarIcon: (props) => <TabBarActionIcon focused={props.focused} />,
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          title: "Streak",
          tabBarLabel: label("Streak"),
          tabBarIcon: (props) => <TabBarIcon name="flame" {...props} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: label("Profile"),
          tabBarIcon: (props) => <TabBarIcon name="person" {...props} />,
        }}
      />
    </Tabs>
  );
}
