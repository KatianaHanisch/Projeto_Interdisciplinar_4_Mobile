import React from "react";
import { Text } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { authState, onLogout, isLoanding } = useAuth();

  if (isLoanding) {
    return <Text>Carregando</Text>;
  }

  if (!authState?.authenticated) {
    return <Redirect href="/login" />;
  }

  return <Stack />;
}
