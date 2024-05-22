import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { Button } from "../button";

import { ImagemVerificarEmail } from "@/assets/images/ImageVerificarEmail";

import { useNavigate } from "@/hooks/useNavigate";

import { styles } from "./styles";
import { api } from "@/services/api";
import { Alert } from "../alert";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ModalVerificarEmail({ tipoModal }: ModalVerificarEmailProps) {
  const navigate = useNavigate();

  const [abrirAlerta, setAbrirAlerta] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [tecladoVisivel, setTecladoVisivel] = useState(false);

  const handleSubmit = async () => {
    if (email === "") return;

    setCarregando(true);
    try {
      const response = await api.get(
        `/auth/confirm/resend?email=${email.toLowerCase()}`
      );

      if (response.status === 200) {
        await AsyncStorage.setItem("email", email.toLowerCase());

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
  const handleSubmitEsqueciSenha = async () => {
    if (email === "") return;

    setCarregando(true);
    try {
      const response = await api.patch(
        `/users/user/send_code?email=${email.toLowerCase()}`
      );

      if (response.status === 200) {
        await AsyncStorage.setItem("email", email.toLowerCase());

        navigate("verificar-codigo-senha");
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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setTecladoVisivel(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setTecladoVisivel(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.containerModal}>
          {!tecladoVisivel && <ImagemVerificarEmail />}

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
            ) : tipoModal === "esqueciSenha" ? (
              <Text style={styles.textoSubtitulo}>
                Informe seu email para recuperação de senha
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
            {tipoModal === "esqueciSenha" && (
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
          ) : tipoModal === "esqueciSenha" ? (
            <Button
              titulo="Enviar"
              onPress={handleSubmitEsqueciSenha}
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
