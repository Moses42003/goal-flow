import React from "react";
import { StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeTabScreen() {
  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
}
