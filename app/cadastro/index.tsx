import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Link } from "expo-router";
import {
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
  KeyboardEvent,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ModalVerificarEmail } from "@/components/modal-verificar-email";
import { ImagemPaginaCadastro } from "@/assets/images/imagem-pagina-cadastro";

import { Button } from "@/components/button";
import { Alert } from "@/components/alert";

import { api } from "@/services/api";

import { useForm } from "@/hooks/useForm";

import { styles } from "./styles";
import { Logo } from "@/assets/images/logo";
import { validarEmail } from "@/utils/validarEmail";

export default function Cadastro() {
  const [carregando, setCarregando] = useState<boolean>(false);

  const [abrirAlerta, setAbrirAlerta] = useState<boolean>(false);
  const [tipoAlerta, setTipoAlerta] = useState<string>("");
  const [mensagemAlerta, setMensagemAlerta] = useState<
    string | string[] | undefined
  >("");

  const [abrirModal, setAbrirModal] = useState<boolean>(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const { formData, setFormData, handleInputChange } = useForm<UserProps>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async () => {
    if (
      formData.name == "" ||
      formData.email == "" ||
      formData.password == "" ||
      formData.confirmPassword == ""
    )
      return;

    if (!validarEmail(formData.email)) {
      setTipoAlerta("erro");
      setMensagemAlerta("Digite um email válido");
      setAbrirAlerta(true);

      setTimeout(() => {
        setAbrirAlerta(false);
      }, 4000);

      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setTipoAlerta("erro");
      setMensagemAlerta("As senhas devem ser iguais");
      setAbrirAlerta(true);

      setTimeout(() => {
        setAbrirAlerta(false);
      }, 4000);

      return;
    }

    setCarregando(true);

    try {
      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        setTipoAlerta("sucesso");
        setMensagemAlerta("Cadastro realizado com sucesso");
        setAbrirAlerta(true);

        AsyncStorage.setItem("email", formData.email);

        setTimeout(() => setAbrirAlerta(false), 4000);

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setCarregando(false);
        setAbrirModal(true);
      }
    } catch (err) {
      const error = err as AxiosError<Error>;

      setTipoAlerta("erro");
      setMensagemAlerta(error.response?.data.message);
      setAbrirAlerta(true);

      setCarregando(false);

      setTimeout(() => setAbrirAlerta(false), 6000);

      console.error(error.response?.data.message);
    }
  };

  const handleKeyboardDidShow = (e: KeyboardEvent) => {
    setKeyboardVisible(true);
  };

  const handleKeyboardDidHide = (e: KeyboardEvent) => {
    setKeyboardVisible(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      {abrirModal ? (
        <>
          <Image
            style={styles.imagem}
            source={require("../../assets/images/imagem-cadastro.png")}
          />
          <ModalVerificarEmail tipoModal="" />
        </>
      ) : (
        <View style={styles.container}>
          <ImagemPaginaCadastro />
          <View
            style={[
              styles.containerLogin,
              isKeyboardVisible ? { paddingBottom: 25 } : null,
            ]}
          >
            {isKeyboardVisible ? null : <Logo />}
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              onChangeText={(text) => handleInputChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              inputMode="email"
              autoCapitalize="none"
              onChangeText={(text) => handleInputChange("email", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              secureTextEntry={true}
              onChangeText={(text) => handleInputChange("password", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha"
              secureTextEntry={true}
              onChangeText={(text) =>
                handleInputChange("confirmPassword", text)
              }
            />
            {abrirAlerta && (
              <Alert tipo={tipoAlerta} mensagem={mensagemAlerta} />
            )}
            <View style={styles.containerButton}>
              <Button
                titulo="Cadastrar"
                onPress={handleSubmit}
                carregando={carregando}
              />
              <Text style={styles.textoCadastro}>
                <Link href={"/login/"}>
                  Já tem conta?{" "}
                  <Text style={styles.textoCadastroSublinhado}>Login</Text>
                </Link>
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
