import { theme } from "@/constants";

import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.white,
  },
  containerSlide: {
    width: width,
    height: 280,
    alignItems: "center",
  },
  buttonVoltar: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 5,
  },
  containerItens: {
    width: "100%",
    alignItems: "center",
  },
  containerPublicacao: {
    width: "95%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flexDirection: "column",
    marginTop: 10,
    marginBottom: 25,
  },
  dataPublicacao: {
    fontSize: 12,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
  },
  informacoesPublicacao: {
    fontSize: 14,
    fontFamily: theme.fontFamily.raleway.semiBold,
    color: theme.colors.grayDark,
  },
  containerInformacoes: {
    width: "95%",
    flexDirection: "row",
    backgroundColor: theme.colors.orangeLight,
    height: 135,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerIdadeGenero: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: -70,
    height: "100%",
  },
  containerIdade: {
    backgroundColor: theme.colors.orangePrimaryDark,
    width: 50,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  idade: {
    fontSize: 12,
    fontFamily: theme.fontFamily.raleway.medium,
    color: theme.colors.white,
  },
  containerGenero: {
    backgroundColor: theme.colors.orangePrimaryDark,
    width: 50,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  genero: {
    fontSize: 12,
    fontFamily: theme.fontFamily.raleway.medium,
    color: theme.colors.white,
  },
  containerTextos: {
    gap: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  textoNome: {
    fontSize: 18,
    fontFamily: theme.fontFamily.montserrat.bold,
    color: theme.colors.grayDark,
  },
  descricao: {
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
    fontSize: 14,
  },
  containerLocalidade: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 3,
    marginTop: 5,
  },
  localidade: {
    fontFamily: theme.fontFamily.raleway.light,
    color: theme.colors.grayMedium,
    fontSize: 12,
  },

  containerComentarios: {
    width: "95%",
    marginTop: 15,
    alignItems: "center",
    padding: 15,
    backgroundColor: theme.colors.orangeLight,
    height: 270,
    borderRadius: 20,
  },
  listaComentarios: {
    width: "100%",
    height: 160,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
  },
  tituloComentarios: {
    fontSize: 18,
    fontFamily: theme.fontFamily.montserrat.bold,
    color: theme.colors.grayDark,
    marginBottom: 12,
  },
  buttonComentarios: {
    fontSize: 16,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayMedium,
    padding: 5,
    marginTop: 5,
  },
});
