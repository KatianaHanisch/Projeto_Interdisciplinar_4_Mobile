import { Link } from "expo-router";

import { useState } from "react";

import { Text, View, Image, TextInput } from "react-native";

import { ModalVerificarEmail } from "@/components/modal-verificar-email";
import { ImagemPaginaCadastro } from "@/assets/images/imagem-pagina-cadastro";
import { Button } from "@/components/button";

import { styles } from "./styles";

export default function Cadastro() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {open ? (
        <>
          <Image
            style={styles.imagem}
            source={require("../../assets/images/imagem-cadastro.png")}
          />
          <ModalVerificarEmail />
        </>
      ) : (
        <View style={styles.container}>
          <ImagemPaginaCadastro />
          <View style={styles.containerLogin}>
            <Text>logo</Text>
            <TextInput style={styles.input} placeholder="Digite seu nome" />
            <TextInput style={styles.input} placeholder="Digite seu email" />
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha"
              secureTextEntry={true}
            />
            <View style={styles.containerButton}>
              <Button
                titulo="Cadastrar"
                handleNavigation={() => setOpen(true)}
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
