import { View, Text } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { IconDone } from "@/assets/icons/icon-done";
import { IconError } from "@/assets/icons/icon-error";

import { Button } from "../button";

import { styles } from "./styles";

export function ModalStatusVerificarEmail({
  status,
  titulo,
  subTitulo,
  tituloButton,
  rota,
}: ModalStatusVerificarEmailProps) {
  function handleNavigation() {
    router.navigate(rota || "login");
  }

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
          <Button titulo={tituloButton} handleNavigation={handleNavigation} />
        </View>
      </View>
    </>
  );
}
