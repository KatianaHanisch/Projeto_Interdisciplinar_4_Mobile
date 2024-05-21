import React, { useContext, useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import { Text, View, TextInput, Image } from "react-native";

import { Button } from "@/components/button";
import { Alert } from "@/components/alert";
import { AuthContext } from "@/context/AuthContext";

import { ImagemTelaLogin } from "@/assets/images/imagem-tela-login";
import { useForm } from "@/hooks/useForm";

import { styles } from "./styles";
import { ModalVerificarEmail } from "@/components/modal-verificar-email";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginProps {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [abrirModal, setAbrirModal] = useState<boolean>(false);
  const [tipoModal, setTipoModal] = useState<string>("");

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

  const openModalEsqueciSenha = async () => {
    setTipoModal("esqueciSenha");
    setAbrirModal(true);
  };
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
    <>
      {abrirModal ? (
        <>
          <Image
            style={styles.imagem}
            source={require("../../assets/images/imagem-cadastro.png")}
          />
          <ModalVerificarEmail tipoModal={tipoModal} />
        </>
      ) : (
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
            {abrirAlerta && (
              <Alert mensagem={mensagemAlerta} tipo={tipoAlerta} />
            )}
            <View style={styles.containerButton}>
              <Button
                titulo="Entrar"
                onPress={handleSubmit}
                carregando={carregando}
              />
              <Text style={styles.textoCadastro}>
                <Link href={"/cadastro/"}>
                  Não tem conta?{" "}
                  <Text style={styles.textoCadastroSublinhado}>
                    Cadastre-se
                  </Text>
                </Link>
              </Text>
              <Text onPress={openModalEsqueciSenha}>
                <Text style={styles.textoCadastroSublinhado}>
                  Esqueci a senha
                </Text>
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
