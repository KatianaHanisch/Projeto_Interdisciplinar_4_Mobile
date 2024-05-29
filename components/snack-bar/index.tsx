import React from "react";

import { Text, TouchableOpacity, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { styles } from "./styles";

export function SnackBar({ mensagem, tipo, onClose }: SnackBarProps) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.containerInterno,
          tipo === "sucesso" ? styles.snackBarSucesso : styles.snackBarErro,
        ]}
      >
        <Text style={styles.textoSnackBar}>{mensagem}</Text>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name="close" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
