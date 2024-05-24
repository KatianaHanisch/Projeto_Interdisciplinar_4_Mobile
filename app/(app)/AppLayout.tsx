import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function AppLayout() {
  const { authState, onLogout, isLoanding } = useAuth();

  if (isLoanding) {
    return <Text>Carregando</Text>;
  }
}
