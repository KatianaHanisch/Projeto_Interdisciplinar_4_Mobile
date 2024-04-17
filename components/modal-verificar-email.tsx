import { View, Text, StyleSheet } from "react-native";

import { router } from "expo-router";

import { StatusBar } from "expo-status-bar";

import { Button } from "./button";

import { theme } from "@/constants";
import { ImagemVerificarEmail } from "@/assets/images/ImageVerificarEmail";

export function ModalVerificarEmail() {
  function handleNavigation() {
    router.navigate("verificar-email");
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.containerModal}>
          <ImagemVerificarEmail />
          <View style={styles.containerTextos}>
            <Text style={styles.textoTitulo}>
              Confirmar seu endereço de email
            </Text>
            <Text style={styles.textoSubtitulo}>
              Seu cadastro está quase pronto. Mas precisamos que confirme seu
              endereço de email.
            </Text>
          </View>
          <Button titulo="Enviar email" handleNavigation={handleNavigation} />
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
    height: "65%",
    backgroundColor: theme.colors.white,
    borderRadius: 30,
    alignItems: "center",
    padding: 25,
    gap: 20,
  },
  containerTextos: {
    width: "100%",
    gap: 5,
  },
  textoTitulo: {
    fontSize: 22,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayMedium,
    width: "100%",
    textAlign: "left",
    lineHeight: 22,
  },
  textoSubtitulo: {
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
    textAlign: "left",
  },
});
