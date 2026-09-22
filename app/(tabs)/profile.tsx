import CustomButton from "@/components/custombutton";
import HomeHeaderBackdrop from "@/components/homeheader";
import SettingOption from "@/components/settingoption";
import { useThemeColors } from "@/lib/theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const c = useThemeColors();

  return (
    <SafeAreaView
      className="flex-1 pt-8"
      style={{ backgroundColor: c.background }}
    >
      <HomeHeaderBackdrop height={360} />
      <View className="items-center">
        <TouchableOpacity
          activeOpacity={0.6}
          className="rounded-full w-28 h-28 items-center justify-center border-white dark:border-gray-400 border-2"
          style={{ backgroundColor: c.background }}
        >
          <Ionicons name="person" size={42} color="#1D4ED8" />
          <View
            className="items-center justify-center absolute bottom-0 right-2 rounded-full p-2 border-[1px] border-gray-300 dark:border-gray-400"
            style={{ backgroundColor: c.background }}
          >
            <FontAwesome name="pencil" color="#60a5fa" size={15} />
          </View>
        </TouchableOpacity>

        <Text className="text-3xl font-bold text-white">Moses Otu</Text>
        <View className="flex-row items-center gap-2 mb-2">
          <Text className="font-medium text-white text-lg">
            @elchairmanojnr
          </Text>

          <View
            className="p-1 rounded-lg bg-white"
            style={{ backgroundColor: c.background }}
          >
            <Text className="text-sm dark:text-blue-200 text-blue-700">
              Verified
            </Text>
          </View>
        </View>
        <Text className="text-lg font-medium text-white">
          &quot;Small steps today, big dreams tomorrow.&quot;
        </Text>
      </View>

      <View className="p-4">
        <View
          className="rounded-2xl border-[1px] border-gray-400 p-3 gap-2 flex-row"
          style={{ backgroundColor: c.background }}
        >
          <View className=" flex-1 border-r-[1px] border-gray-400 items-center">
            <Text className="text-xl font-semibold dark:text-white">5</Text>
            <Text className="font-medium dark:text-white">Goals</Text>
          </View>
          <View className="flex-1 border-r-[1px] border-gray-400 items-center">
            <Text className="text-xl font-semibold dark:text-white">7</Text>
            <Text className="font-medium dark:text-white">Day Streak</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-xl font-semibold dark:text-white">2</Text>
            <Text className="font-medium dark:text-white">Months+</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-4">
        <View
          className="border-[1px] rounded-2xl p-4 border-gray-400 gap-3 mb-4"
          style={{ backgroundColor: c.background }}
        >
          <SettingOption
            color="#60a5fa"
            description="Manage your personal details"
            title="Account Information"
            icon="person-outline"
          />
          <SettingOption
            color="orange"
            description="Add or manage payment options"
            title="Payment Methods"
            icon="wallet-outline"
          />
          <SettingOption
            color="orange"
            description="Control your alerts and updates"
            title="Notification Settings"
            icon="notifications-outline"
          />
          <SettingOption
            color="#60a5fa"
            description="Password, biometrics and more"
            title="Security"
            icon="shield-outline"
          />
          <SettingOption
            color="orange"
            description="FAQs, contact us, report and issue"
            title="Help & Support"
            icon="help-circle-outline"
          />
          <SettingOption
            color="#60a5fa"
            description="Version 1.0.0"
            title="About GoalFlow"
            icon="information-circle-outline"
          />
        </View>

        <CustomButton
          title="Log Out"
          iconPosition="left"
          icon="exit-outline"
          color="red"
        />

        <View className="mb-10"></View>
      </ScrollView>

      <StatusBar barStyle={"light-content"} />
    </SafeAreaView>
  );
}
