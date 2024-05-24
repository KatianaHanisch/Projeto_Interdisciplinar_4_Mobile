import React from "react";

import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

import { styles } from "./styles";

export function Button({ titulo, onPress, carregando }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={carregando}
    >
      {carregando ? (
        <ActivityIndicator color={"#fff"} size={30} />
      ) : (
        <Text style={styles.textButton}>{titulo}</Text>
      )}
    </TouchableOpacity>
  );
}
