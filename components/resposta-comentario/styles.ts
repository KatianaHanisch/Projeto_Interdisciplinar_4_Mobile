import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerRespontasComentarios: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: 40,
    width: "100%",
    padding: 10,
    // marginBottom: 15,
    backgroundColor: theme.colors.white,
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
});
