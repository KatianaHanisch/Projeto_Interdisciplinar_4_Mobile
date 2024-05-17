import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.orangeLight,
  },
  containerItens: {
    backgroundColor: theme.colors.white,
    width: "95%",
    height: "60%",
    borderRadius: 30,
    marginTop: -60,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    gap: 20,
    elevation: 3,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  containerTextos: {
    width: "100%",
    gap: 10,
  },
  textoTitulo: {
    fontSize: 24,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayMedium,
    width: "100%",
    textAlign: "left",
  },
  textoSubtitulo: {
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
    textAlign: "left",
  },
  containerInputs: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 5,
  },
  input: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.grayLight,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 32,
    color: theme.colors.grayDark,
  },
  imagem: {
    position: "absolute",
    top: 0,
    zIndex: -99,
    marginBottom: 100,
  },
});
