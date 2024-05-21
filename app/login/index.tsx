import React, { useContext, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { Text, View, TextInput } from "react-native";

import { Button } from "@/components/button";
import { Alert } from "@/components/alert";
import { AuthContext } from "@/context/AuthContext";

import { ImagemTelaLogin } from "@/assets/images/imagem-tela-login";
import { useForm } from "@/hooks/useForm";

import { styles } from "./styles";

interface LoginProps {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const {
    signIn,
    carregando,
    abrirAlerta,
    mensagemAlerta,
    tipoAlerta,
    isLoggedIn,
  } = useContext(AuthContext);

  const { formData, handleInputChange } = useForm<LoginProps>({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async () => {
    if (formData.email === "" || formData.password === "") return;

    signIn({ email: formData.email, password: formData.password });
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log(isLoggedIn);
      router.replace({
        pathname: "Home",
        params: { refresh: "true" }, // Corrigido para 'refresh' ao invés de 'refesh'
      });
    }
  }, [isLoggedIn]);

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
