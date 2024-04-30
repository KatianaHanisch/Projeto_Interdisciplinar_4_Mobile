import { Link, router } from "expo-router";
import { Text, View, TextInput } from "react-native";

import { Button } from "@/components/button";

import { ImagemTelaLogin } from "@/assets/images/imagem-tela-login";

import { styles } from "./styles";

export default function Login() {
  const handleNavigation = () => {
    router.navigate("home");
  };

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
          <Button titulo="Entrar" handleNavigation={handleNavigation} />
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
