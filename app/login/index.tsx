import { theme } from "@/constants";
import { Link } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function login() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/imagem-login.png")} />
      <View style={styles.containerLogin}>
        <Text>logo</Text>
        <TextInput style={styles.input} placeholder="Digite seu email" />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
        />
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>
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
  button: {
    backgroundColor: theme.colors.orangePrimaryDark,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  textButton: {
    color: theme.colors.white,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    fontSize: 16,
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
