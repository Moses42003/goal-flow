import GoalCard from "@/components/goalcard";
import QuickAction from "@/components/quickaction";
import StreakSaveCard from "@/components/streaksavecarc";
import TotalSavingCard from "@/components/totalsavecard";
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

export default function HomeTabScreen() {
  return (
    <SafeAreaView className="flex-1 pt-5 px-5 bg-white">
      {/* Header: greeting on the left, bell + avatar on the right. */}
      <View className="flex-row items-start justify-between mb-1">
        <View className="gap-0.5 flex-1">
          <Text className="text-xl font-medium text-gray-600">
            Good morning,
          </Text>
          <Text className="text-3xl font-bold">Moses</Text>
          <Text className="text-sm text-gray-500 font-medium mt-1">
            Keep going! Your future self will thank you.
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            activeOpacity={0.6}
            className="bg-blue-50 rounded-full w-11 h-11 items-center justify-center border-[1px] border-blue-100"
          >
            <Ionicons name="notifications-outline" size={22} color="#2563EB" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            className="rounded-full w-12 h-12 bg-blue-600 items-center justify-center"
          >
            <Ionicons name="person" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <TotalSavingCard />

        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-xl font-bold">Your Goals</Text>
          <TouchableOpacity activeOpacity={0.6}>
            <Text className="text-blue-600 font-semibold">View all</Text>
          </TouchableOpacity>
        </View>

        <GoalCard />
        <GoalCard
          title="Emergency Fund"
          icon="shield-checkmark-outline"
          accent="green"
          saved="800"
          target="2,000"
          progress={0.4}
          timeLeft="6 months left"
        />

        <StreakSaveCard />

        {/* "Need Inspiration?" promo banner. */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-blue-50 rounded-2xl p-4 my-3 flex-row items-center gap-3 border-[1px] border-blue-100"
        >
          <View className="bg-blue-600 rounded-2xl w-12 h-12 items-center justify-center">
            <Ionicons name="bulb-outline" size={24} color="#FFFFFF" />
          </View>
          <View className="flex-1 gap-0.5">
            <Text className="text-base font-bold">Need Inspiration?</Text>
            <Text className="text-sm text-gray-500 font-medium">
              Explore saving tips that actually work.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#2563EB" />
        </TouchableOpacity>

        <Text className="text-xl font-bold mt-2 mb-3">Quick Actions</Text>
        <View className="flex-row justify-between gap-3">
          <QuickAction icon="add-circle" label="Save Money" variant="solid" />
          <QuickAction icon="cash-outline" label="Withdraw" />
          <QuickAction icon="people-outline" label="Refer Friend" />
        </View>

        <View className="h-24" />
      </ScrollView>

      {/* Floating action button, bottom-right. */}
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
