import GoalCard from "@/components/goalcard";
import { useThemeColors } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalsScreen() {
  const c = useThemeColors();

  return (
    <SafeAreaView className="flex-1 pt-5 px-5" style={{ backgroundColor: c.background }}>
      <View className="flex-row items-start justify-between mb-4">
        <View className="gap-0.5 flex-1">
          <Text className="text-3xl font-bold" style={{ color: c.text }}>
            Goals
          </Text>
          <Text className="text-base font-medium" style={{ color: c.textMuted }}>
            Turn your dreams into plans.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          className="bg-blue-600 rounded-full w-11 h-11 items-center justify-center"
        >
          <Ionicons name="add" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Filter chips. "All" is the selected state. */}
      <View className="flex-row pb-3 gap-2">
        {["All", "Active", "Completed", "Paused"].map((filter, index) => (
          <TouchableOpacity
            key={filter}
            activeOpacity={0.7}
            className={`h-9 px-4 rounded-full items-center justify-center ${index === 0 ? "bg-blue-600" : "bg-blue-50 border-[1px] border-blue-100"
              }`}
          >
            <Text
              className={`text-sm font-semibold ${index === 0 ? "text-white" : "text-blue-700"
                }`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <GoalCard />
        <GoalCard
          title="Emergency Fund"
          icon="shield-checkmark-outline"
          accent="amber"
          saved="800"
          target="2,000"
          progress={0.4}
          timeLeft="6 months left"
        />
        <GoalCard
          title="Dream Vacation"
          icon="airplane-outline"
          accent="violet"
          saved="1,600"
          target="8,000"
          progress={0.2}
          timeLeft="8 months left"
        />
        <GoalCard
          title="New Phone"
          icon="phone-portrait-outline"
          accent="amber"
          saved="2,100"
          target="3,000"
          progress={0.7}
          timeLeft="3 months left"
        />

        <View className="h-24" />
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        className="absolute bottom-6 right-5 bg-blue-600 rounded-full w-14 h-14 items-center justify-center shadow-lg"
      >
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>

      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
}
