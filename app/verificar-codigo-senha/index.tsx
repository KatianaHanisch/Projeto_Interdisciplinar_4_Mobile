import React from "react";
import { useRef, useState } from "react";
import { Text, View, TextInput, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ModalStatusVerificarEmail } from "@/components/modal-status-verificar-email";
import { Button } from "@/components/button";

import { ImagemTelaLogin } from "@/assets/images/imagem-tela-login";

import { useForm } from "@/hooks/useForm";
import { api } from "@/services/api";

import { theme } from "@/constants";
import { styles } from "./styles";

interface InputProps {
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
  input6: string;
}

export default function VerificarEmail() {
  const [abrirModal, setAbrirModal] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(false);

  const [status, setStatus] = useState<string>("");
  const [titulo, setTitulo] = useState<string>("");
  const [subtitulo, setSubtitulo] = useState<string>("");
  const [tituloButton, setTituloButton] = useState<string>("");
  const [rota, setRota] = useState<string>("");
  const [tipoButton, setTipoButton] = useState<string>("");

  const { formData, handleInputChange, setFormData } = useForm<InputProps>({
    initialValues: {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
    },
  });

  const inputRef1 = useRef<TextInput | null>(null);
  const inputRef2 = useRef<TextInput | null>(null);
  const inputRef3 = useRef<TextInput | null>(null);
  const inputRef4 = useRef<TextInput | null>(null);
  const inputRef5 = useRef<TextInput | null>(null);
  const inputRef6 = useRef<TextInput | null>(null);

  const handleButton = () => {
    setAbrirModal(false);
  };

  const handleSubmit = async () => {
    if (
      formData.input1 == "" ||
      formData.input2 == "" ||
      formData.input3 == "" ||
      formData.input4 == "" ||
      formData.input5 == "" ||
      formData.input6 == ""
    ) {
      return;
    }

    const code =
      formData.input1 +
      formData.input2 +
      formData.input3 +
      formData.input4 +
      formData.input5 +
      formData.input6;

    const email = await AsyncStorage.getItem("email");

    if (!email) return;

    setCarregando(true);

    try {
      console.log(`/users/user/confirm_email?email=${email}&code=${code}`);
      const response = await api.get(
        `/users/user/confirm_email?email=${email}&code=${code}`
      );

      if (response.status === 200) {
        setStatus("sucesso");
        setTitulo("Email confirmado!");
        setSubtitulo("Seu email foi confirmado com sucesso.");
        setTituloButton("Trocar senha");
        setRota("trocar-senha");
        setTipoButton("navegacao");

        setCarregando(false);

        setFormData({
          input1: "",
          input2: "",
          input3: "",
          input4: "",
          input5: "",
          input6: "",
        });

        setAbrirModal(true);
      }
    } catch (error) {
      console.log(error);

      setStatus("erro");
      setTitulo("Erro ao verificar código");
      setSubtitulo(
        "Verifique se o código está correto ou tente novamente mais tarde"
      );
      setTituloButton("Tentar novamente");
      setTipoButton("button");

      setCarregando(false);

      setFormData({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
      });

      setAbrirModal(true);
    }
  };

  return (
    <>
      {abrirModal ? (
        <>
          <Image
            style={styles.imagem}
            source={require("../../assets/images/imagem-cadastro.png")}
          />
          <ModalStatusVerificarEmail
            status={status}
            titulo={titulo}
            subTitulo={subtitulo}
            tituloButton={tituloButton}
            rota={rota}
            handleButton={handleButton}
            tipoButton={tipoButton}
          />
        </>
      ) : (
        <View style={styles.container}>
          <ImagemTelaLogin />
          <View style={styles.containerItens}>
            <View style={styles.containerTextos}>
              <Text style={styles.textoTitulo}>
                Digite seu código de verificação
              </Text>
              <Text style={styles.textoSubtitulo}>
                Enviamos um código de verificação para seu email. Verifique sua
                caixa de entrada
              </Text>
            </View>
            <View style={styles.containerInputs}>
              <TextInput
                ref={inputRef1}
                style={styles.input}
                keyboardType="numeric"
                value={formData.input1}
                maxLength={1}
                cursorColor={theme.colors.grayLight}
                onChangeText={(text) => {
                  handleInputChange("input1", text);
                  if (text.length === 1) {
                    inputRef2.current?.focus();
                  }
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    formData.input1 === ""
                  ) {
                    inputRef1.current?.focus();
                  }
                }}
              />
              <TextInput
                ref={inputRef2}
                style={styles.input}
                keyboardType="numeric"
                value={formData.input2}
                maxLength={1}
                cursorColor={"#6b6b6b"}
                onChangeText={(text) => {
                  handleInputChange("input2", text);
                  if (text.length === 1) {
                    inputRef3.current?.focus();
                  }
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    formData.input2 === ""
                  ) {
                    inputRef1.current?.focus();
                  }
                }}
              />
              <TextInput
                ref={inputRef3}
                style={styles.input}
                value={formData.input3}
                keyboardType="numeric"
                maxLength={1}
                cursorColor={"#6b6b6b"}
                onChangeText={(text) => {
                  handleInputChange("input3", text);
                  if (text.length === 1) {
                    inputRef4.current?.focus();
                  }
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    formData.input3 === ""
                  ) {
                    inputRef2.current?.focus();
                  }
                }}
              />
              <TextInput
                ref={inputRef4}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                value={formData.input4}
                cursorColor={"#6b6b6b"}
                onChangeText={(text) => {
                  handleInputChange("input4", text);
                  if (text.length === 1) {
                    inputRef5.current?.focus();
                  }
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    formData.input4 === ""
                  ) {
                    inputRef3.current?.focus();
                  }
                }}
              />
              <TextInput
                ref={inputRef5}
                style={styles.input}
                keyboardType="numeric"
                value={formData.input5}
                maxLength={1}
                cursorColor={"#6b6b6b"}
                onChangeText={(text) => {
                  handleInputChange("input5", text);
                  if (text.length === 1) {
                    inputRef6.current?.focus();
                  }
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    formData.input5 === ""
                  ) {
                    inputRef4.current?.focus();
                  }
                }}
              />
              <TextInput
                ref={inputRef6}
                style={styles.input}
                keyboardType="numeric"
                value={formData.input6}
                maxLength={1}
                cursorColor={"#6b6b6b"}
                onChangeText={(text) => {
                  handleInputChange("input6", text);
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    formData.input6 === ""
                  ) {
                    inputRef5.current?.focus();
                  }
                }}
              />
            </View>
            <Button
              titulo="Verificar código"
              onPress={handleSubmit}
              carregando={carregando}
            />
          </View>
        </View>
      )}
    </>
  );
}
