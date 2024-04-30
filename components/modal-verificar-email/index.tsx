import { View, Text } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Button } from "../button";
import { ImagemVerificarEmail } from "@/assets/images/ImageVerificarEmail";

import { styles } from "./styles";

export function ModalVerificarEmail() {
  function handleNavigation() {
    router.navigate("verificar-codigo");
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
