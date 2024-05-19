import React from "react";

import { View, Text } from "react-native";

import { styles } from "./styles";

import { IconAlertErro } from "@/assets/icons/icon-alert-erro";
import { IconAlertSucesso } from "@/assets/icons/icon-alert-sucesso";
import { IconAlert } from "@/assets/icons/icon-alert";

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
        <IconAlertErro />
      ) : tipo === "sucesso" ? (
        <IconAlertSucesso />
      ) : (
        <IconAlert />
      )}
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}
