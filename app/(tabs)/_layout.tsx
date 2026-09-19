import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />
      <Tabs.Screen
        name="goals"
        options={{ headerShown: false, title: "Goals" }}
      />
      <Tabs.Screen
        name="save"
        options={{ headerShown: false, title: "Save" }}
      />
      <Tabs.Screen
        name="streaks"
        options={{ headerShown: false, title: "Streaks" }}
      />
      <Tabs.Screen
        name="profile"
        options={{ headerShown: false, title: "Profile" }}
      />
    </Tabs>
  );
}
