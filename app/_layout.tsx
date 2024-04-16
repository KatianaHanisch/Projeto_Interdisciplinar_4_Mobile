import { Slot } from "expo-router";

import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import {
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";

import { View, Text } from "react-native";

// SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_700Bold,
  });

  if (!fontsLoaded) {
    <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <Text>Carregando....</Text>
    </View>;
  } else {
    return <Slot />;
  }
}
