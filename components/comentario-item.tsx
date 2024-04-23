import { theme } from "@/constants";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export function ComentarioItem() {
  return (
    <View style={styles.container}>
      <View style={styles.containerImagem}></View>
      <View style={styles.containerComentario}>
        <View style={styles.containerHeaderComentario}>
          <Text style={styles.informacoesComentario}>lucas_oliveira</Text>
          <Text style={styles.informacoesComentario}>7d</Text>
        </View>
        <Text style={styles.textoComentario}>Comentário</Text>
        <TouchableOpacity style={styles.buttonResponder}>
          <Text style={styles.textoResponder}>Responder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: theme.colors.white,
    width: "100%",
    borderRadius: 10,
    padding: 10,
  },
  containerImagem: {},
  containerComentario: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
  },
  containerHeaderComentario: {
    flexDirection: "row",
    gap: 10,
  },
  informacoesComentario: {
    fontSize: 12,
    color: theme.colors.grayMedium,
    fontFamily: theme.fontFamily.raleway.medium,
  },
  textoComentario: {
    fontSize: 15,
    color: theme.colors.grayDark,
    fontFamily: theme.fontFamily.raleway.semiBold,
  },
  buttonResponder: {
    padding: 2,
  },
  textoResponder: {
    fontSize: 12,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
  },
});
