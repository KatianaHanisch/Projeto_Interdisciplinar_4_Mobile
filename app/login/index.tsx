import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { Text, View, TextInput } from "react-native";

import { useForm } from "@/hooks/useForm";
import { useNavigate } from "@/hooks/useNavigate";
import { Button } from "@/components/button";
import { Alert } from "@/components/alert";
import { api } from "@/services/api";

import { ImagemTelaLogin } from "@/assets/images/imagem-tela-login";

import { styles } from "./styles";

export default function Login() {
  const navigate = useNavigate();

  const [abrirAlerta, setAbrirAlerta] = useState<boolean>(false);
  const [tipoAlerta, setTipoAlerta] = useState<string>("");
  const [mensagemAlerta, setMensagemAlerta] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(false);

  const { formData, handleInputChange } = useForm<LoginProps>({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async () => {
    if (formData.email == "" || formData.password == "") return;

    setCarregando(true);

    try {
      const response = await api.post("/auth/login", formData);

      const { token } = response.data.body;
      await AsyncStorage.setItem("token", token);

      setCarregando(false);

      navigate("home");
    } catch (error) {
      console.log(error);

      setAbrirAlerta(true);
      setTipoAlerta("erro");
      setMensagemAlerta("Email ou senha inválidos");

      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImagemTelaLogin />
      <View style={styles.containerLogin}>
        <Text>logo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          onChangeText={(text) => handleInputChange("email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        {abrirAlerta && <Alert mensagem={mensagemAlerta} tipo={tipoAlerta} />}
        <View style={styles.containerButton}>
          <Button
            titulo="Entrar"
            onPress={handleSubmit}
            carregando={carregando}
          />
          <Text style={styles.textoCadastro}>
            <Link href={"/cadastro/"}>
              Não tem conta?{" "}
              <Text style={styles.textoCadastroSublinhado}>Cadastre-se</Text>
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
