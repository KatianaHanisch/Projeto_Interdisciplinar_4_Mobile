import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Button } from "../button";

import { ImagemVerificarEmail } from "@/assets/images/ImageVerificarEmail";

import { useNavigate } from "@/hooks/useNavigate";

import { styles } from "./styles";

export function ModalVerificarEmail() {
  const navigate = useNavigate();

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
          <Button
            titulo="Confirmar email"
            onPress={() => navigate("verificar-codigo")}
          />
        </View>
      </View>
    </>
  );
}
