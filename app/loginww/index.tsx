import { useAuth } from "@/context/AuthContext";
import React from "react";

import { View, Text } from "react-native";

export default function Login() {
  const { onLogin } = useAuth();

  const login = async () => {
    const response = await onLogin!(email, password);

    if (response && response.error) {
      alert(response.msg);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login</Text>
    </View>
  );
}
