import HomeHeaderBackdrop from "@/components/homeheader";
import { useThemeColors } from "@/lib/theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const c = useThemeColors();

  return (
    <SafeAreaView className="flex-1 pt-8">
      <HomeHeaderBackdrop height={360} />
      <View className="items-center mb-7">
        <TouchableOpacity
          activeOpacity={0.6}
          className="rounded-full w-32 h-32 items-center justify-center border-white dark:border-gray-400 border-2"
          style={{ backgroundColor: c.background }}
        >
          <Ionicons name="person" size={42} color="#1D4ED8" />
          <View
            className="items-center justify-center absolute bottom-0 right-2 rounded-full w-10 h-10 border-[1px] border-gray-300 dark:border-gray-400"
            style={{ backgroundColor: c.background }}
          >
            <FontAwesome name="pencil" color="#60a5fa" size={20} />
          </View>
        </TouchableOpacity>

        <Text className="text-3xl font-bold text-white my-3">Moses Otu</Text>
        <View className="flex-row items-center gap-2 mb-2">
          <Text className="font-medium text-white text-lg">
            @elchairmanojnr
          </Text>

          <View className="p-2 rounded-2xl bg-white">
            <Text className="text-blue-700">Verified</Text>
          </View>
        </View>
        <Text className="text-lg font-medium text-white">
          &quot;Small steps today, big dreams tomorrow.&quot
        </Text>
      </View>

      <View
        className="rounded-2xl border-[1px] border-gray-400 p-3"
        style={{ backgroundColor: c.background }}
      ></View>
      <StatusBar barStyle={"light-content"} />
    </SafeAreaView>
  );
}
