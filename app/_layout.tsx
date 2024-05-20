import React from "react";

import { Slot } from "expo-router";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

import {
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";

import { View, Text } from "react-native";

import { AuthProvider } from "@/context/AuthContext";

// SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  if (!fontsLoaded) {
    <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <Text>Carregando....</Text>
    </View>;
  } else {
    return (
      <>
        <AuthProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <Slot />
          </GestureHandlerRootView>
        </AuthProvider>
      </>
    );
  }
}
