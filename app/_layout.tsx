import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
  return (
    // Required ancestor for `react-native-gesture-handler`. The Slider in the
    // Edit Goal screen is gesture-driven, and without this wrapper a Pan gesture
    // is silently never recognised on Android — no error, it simply does
    // nothing.
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="goals" options={{ headerShown: false }} />
        <Stack.Screen name="save" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
