import React, { useState } from "react";
import { Link } from "expo-router";
import { Text, View, TextInput, Image } from "react-native";

import { Button } from "@/components/button";
import { Alert } from "@/components/alert";

import { ImagemTelaLogin } from "@/assets/images/imagem-tela-login";
import { useForm } from "@/hooks/useForm";

import { styles } from "./styles";
import { ModalVerificarEmail } from "@/components/modal-verificar-email";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/assets/images/logo";

interface LoginProps {
  email: string;
  password: string;
}

export default function Login() {
  const { onLogin, isLoanding } = useAuth();

  const [abrirModal, setAbrirModal] = useState<boolean>(false);
  const [abrirAlerta, setAbrirAlerta] = useState<boolean>(false);
  const [tipoAlerta, setTipoAlerta] = useState<string>("");
  const [mensagemAlerta, setMensagemAlerta] = useState<string>("");
  const [tipoModal, setTipoModal] = useState<string>("");

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

    const response = await onLogin!(formData.email, formData.password);

    if (response && response.error) {
      setTipoAlerta("erro");
      setMensagemAlerta("Email ou senha inválidos");
      setAbrirAlerta(true);

      setTimeout(() => {
        setAbrirAlerta(false);
      }, 5000);
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
          <ModalVerificarEmail tipoModal={tipoModal} />
        </>
      ) : (
        <View style={styles.container}>
          <ImagemTelaLogin />
          <View style={styles.containerLogin}>
            <Logo />
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
                carregando={isLoanding}
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
