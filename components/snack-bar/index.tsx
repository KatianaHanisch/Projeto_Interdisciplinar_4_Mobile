import React from "react";

import { Text, TouchableOpacity, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { IconSucesso } from "@/assets/icons/icon-sucesso";
import { IconErro } from "@/assets/icons/icon-erro";

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
        <View style={styles.containerIcone}>
          {tipo === "sucesso" ? <IconSucesso /> : <IconErro />}
          <Text style={styles.textoSnackBar}>{mensagem}</Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name="close" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
