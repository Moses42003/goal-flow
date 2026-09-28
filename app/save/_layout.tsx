import { Stack } from "expo-router";
import React from "react";

/**
 * Saving-method screens.
 *
 * Declared explicitly, as with the goals stack, so each route gets the standard
 * push transition and can be named in `router.push` with a typed path.
 */
export default function SaveLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="manual" />
      <Stack.Screen name="automatic" />
      <Stack.Screen name="flexible" />
      <Stack.Screen name="withdraw" />
      <Stack.Screen name="confirm-withdrawal" />
    </Stack>
  );
}
