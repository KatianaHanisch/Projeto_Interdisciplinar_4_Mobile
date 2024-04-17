import { View, Text, StyleSheet } from "react-native";

import { router } from "expo-router";

import { StatusBar } from "expo-status-bar";

import { Button } from "./button";

import { theme } from "@/constants";

import { ImagemVerificarEmail } from "@/assets/images/ImageVerificarEmail";
import { IconDone } from "@/assets/icons/icon-done";
import { IconError } from "@/assets/icons/icon-error";

interface ModalStatusVerificarEmailProps {
  status: string;
  titulo: string;
  subTitulo: string;
  tituloButton: string;
  rota?: string;
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  containerModal: {
    width: "95%",
    height: "60%",
    backgroundColor: theme.colors.white,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  containerTextos: {
    width: "100%",
    gap: 5,
    marginBottom: 10,
  },
  textoTitulo: {
    fontSize: 22,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayMedium,
    width: "100%",
    textAlign: "left",
  },
  textoSubtitulo: {
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
    textAlign: "left",
  },
});
