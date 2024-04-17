import { Link } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Button } from "@/components/button";

import { theme } from "@/constants";

import { ImagemTelaLogin } from "@/assets/images/imagem-tela-login";

export default function Login() {
  return (
    <View style={styles.container}>
      <ImagemTelaLogin />
      <View style={styles.containerLogin}>
        <Text>logo</Text>
        <TextInput style={styles.input} placeholder="Digite seu email" />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
        />
        <View style={styles.containerButton}>
          <Button titulo="Entrar" />
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
    paddingTop: 40,
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
    color: theme.colors.grayPrimary,
    textDecorationLine: "underline",
  },
});
