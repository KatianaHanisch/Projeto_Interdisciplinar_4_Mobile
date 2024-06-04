import React from "react";

import { View, Text } from "react-native";

import { styles } from "./styles";

import { IconAlert } from "@/assets/icons/icon-alert";
import { IconErro } from "@/assets/icons/icon-erro";
import { IconSucesso } from "@/assets/icons/icon-sucesso";

export function Alert({ tipo, mensagem }: AlertProps) {
  return (
    <View
      style={[
        styles.container,
        tipo === "sucesso"
          ? styles.alertSucesso
          : tipo === "alerta"
          ? styles.alertAlerta
          : styles.alertErro,
      ]}
    >
      {tipo === "erro" ? (
        <IconErro />
      ) : tipo === "sucesso" ? (
        <IconSucesso />
      ) : (
        <IconAlert />
      )}
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}
