import React from "react";

import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { IconClose } from "@/assets/icons/icon-close";
import { StatusBar } from "expo-status-bar";

export function ModalEditar({ handleFecharModal }: ModalEditarProps) {
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.containerModal}>
          <View style={styles.containerHeader}>
            <Text style={styles.textoHeader}>Editar perfil</Text>
            <TouchableOpacity onPress={handleFecharModal}>
              <IconClose />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
