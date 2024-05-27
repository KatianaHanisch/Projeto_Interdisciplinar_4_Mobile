import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot } from "expo-router";
import { theme } from "@/constants";

export default function AppLayout() {
  const { authState, isLoanding } = useAuth();

  if (isLoanding) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={theme.colors.orangePrimaryDark} size={45} />
      </View>
    );
  }

  if (!authState?.authenticated) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
