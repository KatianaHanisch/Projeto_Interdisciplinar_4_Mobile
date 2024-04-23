import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 5,
    backgroundColor: theme.colors.white,
    width: "100%",
    borderRadius: 10,
    padding: 10,
  },
  containerImagem: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
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
  buttonVerMais: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  containerIconeVerMais: {
    width: 20,
    height: 18,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textoVerMais: {
    fontSize: 12,
    fontFamily: theme.fontFamily.raleway.light,
    color: theme.colors.grayMedium,
  },
});
