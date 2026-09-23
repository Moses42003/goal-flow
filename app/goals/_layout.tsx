import { Stack } from "expo-router";
import React from "react";

export default function GoalsLAyout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Declared explicitly so each goal screen gets the platform's standard
          push transition and can be targeted by name from `router.push`. */}
      <Stack.Screen name="create" />
      <Stack.Screen name="details" />
      <Stack.Screen name="edit" />
    </Stack>
  );
}
