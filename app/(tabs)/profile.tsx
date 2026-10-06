import CustomButton from "@/components/custombutton";
import HomeHeaderBackdrop from "@/components/homeheader";
import SettingOption from "@/components/settingoption";
import { useThemeColors } from "@/lib/theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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
      {/* Shorter than Home's wave: the profile only carries a name, so a 360pt
          sky would leave a wide empty blue field below the text. */}
      <HomeHeaderBackdrop height={280} />
      <View className="items-center">
        <TouchableOpacity
          activeOpacity={0.6}
          className="rounded-full w-28 h-28 items-center justify-center border-white border-2"
          style={{ backgroundColor: "#DBEAFE" }}
          accessibilityRole="button"
          accessibilityLabel="Change profile photo"
        >
          <Ionicons name="person" size={48} color="#1D4ED8" />
          <View className="absolute bottom-0 right-2 rounded-full p-2 border-[1px] border-white bg-blue-600">
            <FontAwesome name="pencil" color="#FFFFFF" size={14} />
          </View>
        </TouchableOpacity>

        <Text className="text-3xl font-bold text-white mt-2">Moses Otu</Text>

        <View className="flex-row items-center gap-2 mt-1">
          <Text className="font-medium text-white text-lg">
            @elchairmanojnr
          </Text>

          <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-full bg-white/20">
            <Ionicons name="checkmark-circle" size={13} color="#FFFFFF" />
            <Text className="text-xs font-semibold text-white">Verified</Text>
          </View>
        </View>

        <Text className="text-lg font-medium text-white mt-2">
          &quot;Small steps today, big dreams tomorrow.&quot;
        </Text>
      </View>

      {/* Stats sit on a card that overlaps the wave, so it reads as one with the
          header rather than floating in the white space below it. */}
      <View className="p-4 -mt-2">
        <View
          className="rounded-2xl border-[1px] p-3 flex-row"
          style={{ backgroundColor: c.surface, borderColor: c.border }}
        >
          <Stat value="5" label="Goals" divider={c.divider} />
          <Stat value="7" label="Day Streak" divider={c.divider} />
          <Stat value="2" label="Months+" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4"
        contentContainerClassName="pb-10"
      >
        {/* Total Savings — the figure the user most wants at a glance. */}
        <View
          className="rounded-3xl p-5 mb-4"
          style={{ backgroundColor: "#2563EB" }}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-semibold text-blue-100">
              Total Savings
            </Text>
            <Ionicons name="wallet-outline" size={22} color="#DBEAFE" />
          </View>

          <Text className="text-4xl font-bold text-white mt-1">
            GH₵ 2,450.00
          </Text>

          <View className="flex-row items-center gap-1.5 mt-3">
            <Ionicons name="arrow-up" size={15} color="#BBF7D0" />
            <Text className="text-sm font-bold text-green-200">
              + GH₵ 350
            </Text>
            <Text className="text-sm font-medium text-blue-100">
              this month
            </Text>
          </View>
        </View>

        <View
          className="border-[1px] rounded-3xl p-4"
          style={{ backgroundColor: c.surface, borderColor: c.border }}
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
            color="#F59E0B"
            description="Control your alerts and updates"
            title="Notification Settings"
            icon="notifications-outline"
            onPress={() => router.push("/notification-settings")}
          />
          <SettingOption
            color="#60a5fa"
            description="Password, biometrics and more"
            title="Security"
            icon="shield-outline"
          />
          <SettingOption
            color="#F59E0B"
            description="FAQs, contact us, report an issue"
            title="Help & Support"
            icon="help-circle-outline"
          />
          <SettingOption
            color="#60a5fa"
            description="App preferences and data"
            title="Settings"
            icon="settings-outline"
            onPress={() => router.push("/settings")}
          />
          <SettingOption
            color="#94A3B8"
            description="Version 1.0.0"
            title="About GoalFlow"
            icon="information-circle-outline"
          />
        </View>

        <View className="mt-5">
          <CustomButton
            title="Log Out"
            iconPosition="left"
            icon="exit-outline"
            color="red"
          />
        </View>
      </ScrollView>

      <StatusBar barStyle={"light-content"} />
    </SafeAreaView>
  );
}

/**
 * One stat in the overlapping summary card. `divider` draws the vertical rule on
 * the right edge; the last stat omits it.
 */
function Stat({
  value,
  label,
  divider,
}: {
  value: string;
  label: string;
  divider?: string;
}) {
  return (
    <View
      className="flex-1 items-center py-1"
      style={
        divider
          ? { borderRightWidth: 1, borderRightColor: divider }
          : undefined
      }
    >
      <Text className="text-xl font-bold dark:text-white">{value}</Text>
      <Text className="font-medium text-sm text-gray-500 dark:text-gray-300">
        {label}
      </Text>
    </View>
  );
}
