import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

import { theme } from "../constants";

export default function PaginaInicial() {
  return (
    <View style={styles.container}>
      <Text>Página inicial</Text>
      <Link href="/login/">IR para o Login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
