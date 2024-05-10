import React from "react";

import { Stack } from "expo-router";

export default function Root() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="cadastro/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="verificar-codigo/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="home/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="chat-coversas/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
