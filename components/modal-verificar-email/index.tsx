import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Button } from "../button";

import { ImagemVerificarEmail } from "@/assets/images/ImageVerificarEmail";

import { useNavigate } from "@/hooks/useNavigate";

import { styles } from "./styles";
import { api } from "@/services/api";
import { Alert } from "../alert";

export function ModalVerificarEmail({ tipoModal }: ModalVerificarEmailProps) {
  const navigate = useNavigate();

  const [abrirAlerta, setAbrirAlerta] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async () => {
    if (email === "") return;

    setCarregando(true);
    try {
      const response = await api.get(`/auth/confirm/resend?email=${email}`);

      if (response.status === 200) {
        navigate("verificar-codigo");
      }

      setCarregando(false);
    } catch (error) {
      setAbrirAlerta(true);
      setCarregando(false);

      setTimeout(() => {
        setAbrirAlerta(false);
      }, 4000);

      console.log(error);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.containerModal}>
          <ImagemVerificarEmail />
          <View style={styles.containerTextos}>
            {tipoModal === "reenviarEmail" ? (
              <Text style={styles.textoTitulo}>Reenviar email</Text>
            ) : (
              <Text style={styles.textoTitulo}>
                Confirmar seu endereço de email
              </Text>
            )}
            {tipoModal === "reenviarEmail" ? (
              <Text style={styles.textoSubtitulo}>
                Digite seu endereço de email para reenviar o seu código de
                verificação.
              </Text>
            ) : (
              <Text style={styles.textoSubtitulo}>
                Seu cadastro está quase pronto. Mas precisamos que confirme seu
                endereço de email.
              </Text>
            )}
            {tipoModal === "reenviarEmail" && (
              <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                onChangeText={(text) => setEmail(text)}
              />
            )}
          </View>
          {abrirAlerta && (
            <Alert tipo="erro" mensagem="Email invalido. Tente novamente" />
          )}
          {tipoModal === "reenviarEmail" ? (
            <Button
              titulo="Reenviar email"
              onPress={handleSubmit}
              carregando={carregando}
            />
          ) : (
            <Button
              titulo="Confirmar email"
              onPress={() => navigate("verificar-codigo")}
            />
          )}
        </View>
      </View>
    </>
  );
}
