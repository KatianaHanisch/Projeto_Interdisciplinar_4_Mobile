import { Link } from "expo-router";

import { useState } from "react";

import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { theme } from "@/constants";

import { ModalVerificarEmail } from "@/components/modal-verificar-email";
import { ImagemPaginaCadastro } from "@/assets/images/imagem-pagina-cadastro";
import { Button } from "@/components/button";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerLogin: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 20,
    gap: 15,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E3E5E5",
    borderRadius: 10,
    paddingLeft: 10,
    color: theme.colors.grayMedium,
    fontFamily: theme.fontFamily.montserrat.regular,
    fontSize: 16,
  },
  containerButton: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  textoCadastro: {
    fontSize: 15,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
    marginTop: 10,
  },
  textoCadastroSublinhado: {
    fontSize: 15,
    fontFamily: theme.fontFamily.raleway.semiBold,
    color: theme.colors.grayMedium,
    textDecorationLine: "underline",
  },
  imagem: {
    position: "absolute",
    top: 0,
    zIndex: -99,
    marginBottom: 100,
  },
});
