import React from "react";

import { View, Text } from "react-native";

import { styles } from "./styles";
import { ProtectedRoute } from "../(routes)/protected-route";

export default function MeusPosts() {
  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Text>Meus Posts</Text>
      </View>
    </ProtectedRoute>
  );
}
