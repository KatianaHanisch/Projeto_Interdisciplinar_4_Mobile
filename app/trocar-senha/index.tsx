import React, { useContext, useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import { Text, View, TextInput, Image } from "react-native";

import { Button } from "@/components/button";
import { Alert } from "@/components/alert";

import { ImagemTelaLogin } from "@/assets/images/imagem-tela-login";
import { useForm } from "@/hooks/useForm";

import { styles } from "./styles";
import { ModalVerificarEmail } from "@/components/modal-verificar-email";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { useNavigate } from "@/hooks/useNavigate";

interface TrocarSenhaProps {
  password: string;
  confirmPassword: String;
}

export default function TrocarSenha() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState<boolean>(false);

  const [abrirAlerta, setAbrirAlerta] = useState<boolean>(false);
  const [tipoAlerta, setTipoAlerta] = useState<string>("");
  const [mensagemAlerta, setMensagemAlerta] = useState<
    string | string[] | undefined
  >("");

  const { formData, handleInputChange, setFormData } =
    useForm<TrocarSenhaProps>({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
    });

  const handleSubmit = async () => {
    setCarregando(true);

    const email = await AsyncStorage.getItem("email");
    const code = await AsyncStorage.getItem("code");

    if (formData.password == "" || formData.confirmPassword == "") return;

    if (formData.password !== formData.confirmPassword) {
      setTipoAlerta("erro");
      setMensagemAlerta("As senhas devem ser iguais");
      setAbrirAlerta(true);
      setCarregando(false);

      setTimeout(() => {
        setAbrirAlerta(false);
      }, 4000);

      return;
    }

    try {
      const response = await api.patch(
        `/users/user/change_password?email=${email}&code=${code}`,
        {
          password: formData.password,
        }
      );

      if (response.status === 200) {
        setCarregando(true);

        setTipoAlerta("sucesso");
        setMensagemAlerta("Senha alterada com sucesso");
        setAbrirAlerta(true);

        await AsyncStorage.removeItem("code");
        await AsyncStorage.removeItem("email");

        setTimeout(() => {
          setAbrirAlerta(false);
          navigate("login");
          setCarregando(false);
        }, 4000);
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

  return (
    <>
      <View style={styles.container}>
        <ImagemTelaLogin />
        <View style={styles.containerLogin}>
          <Text style={styles.textoCadastro}>Alteração de Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Digite sua nova senha"
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            secureTextEntry={true}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
          />
          {abrirAlerta && <Alert mensagem={mensagemAlerta} tipo={tipoAlerta} />}
          <View style={styles.containerButton}>
            <Button
              titulo="Confirmar"
              onPress={handleSubmit}
              carregando={carregando}
            />
          </View>
        </View>
      </View>
    </>
  );
}
