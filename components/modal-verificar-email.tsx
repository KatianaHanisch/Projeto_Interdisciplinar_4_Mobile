import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { router } from "expo-router";

import { StatusBar } from "expo-status-bar";

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
          <TouchableOpacity style={styles.button} onPress={handleNavigation}>
            <Text style={styles.textButton}>Enviar email</Text>
          </TouchableOpacity>
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
    width: "90%",
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
    fontSize: 20,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayMedium,
    width: "100%",
    textAlign: "center",
    lineHeight: 22,
  },
  textoSubtitulo: {
    fontSize: 15,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayLight,
    textAlign: "left",
  },
  button: {
    backgroundColor: theme.colors.orangePrimaryDark,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  textButton: {
    color: theme.colors.white,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    fontSize: 16,
  },
});
