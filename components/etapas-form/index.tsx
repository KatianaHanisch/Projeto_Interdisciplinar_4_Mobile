import React from "react";

import { View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";

export function EtapasForm({ currentEtapa }: EtapasFormProps) {
  return (
    <View style={styles.containerEtapas}>
      <View style={[styles.etapa, styles.etapaAtiva]}>
        {/* <Ionicons
          name="checkmark-done-circle-outline"
          size={14}
          color="#ffffff"
        /> */}
      </View>
      <View
        style={[styles.primeiraLinha, currentEtapa >= 1 && styles.linhaAtiva]}
      ></View>
      <View
        style={[styles.etapa, currentEtapa >= 1 && styles.etapaAtiva]}
      ></View>
      <View
        style={[styles.segundaLinha, currentEtapa >= 2 && styles.linhaAtiva]}
      ></View>
      <View
        style={[styles.etapa, currentEtapa >= 2 && styles.etapaAtiva]}
      ></View>
    </View>
  );
}
