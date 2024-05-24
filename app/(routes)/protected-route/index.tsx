import React from "react";

import { Stack } from "expo-router";

export default function ProtectedRoute() {
  return (
    <Stack>
      <Stack.Screen name="home/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="chat-coversas/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
