import React from "react";

import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import { IconDone } from "@/assets/icons/icon-done";
import { IconError } from "@/assets/icons/icon-error";

import { useNavigate } from "@/hooks/useNavigate";

import { Button } from "../button";

import { styles } from "./styles";

export function ModalStatusVerificarEmail({
  status,
  titulo,
  subTitulo,
  tituloButton,
  rota,
  tipoButton,
  handleButton,
}: ModalStatusVerificarEmailProps) {
  const navigate = useNavigate();

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.containerModal}>
          {status === "sucesso" ? <IconDone /> : <IconError />}
          <View style={styles.containerTextos}>
            <Text style={styles.textoTitulo}>{titulo}</Text>
            <Text style={styles.textoSubtitulo}>{subTitulo}</Text>
          </View>
          <Button
            titulo={tituloButton}
            onPress={
              tipoButton === "button"
                ? () => handleButton!()
                : () => navigate(rota || "login")
            }
          />
        </View>
      </View>
    </>
  );
}
