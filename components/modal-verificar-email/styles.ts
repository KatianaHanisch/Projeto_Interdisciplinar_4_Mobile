import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  containerModal: {
    width: "95%",
    height: "65%",
    backgroundColor: theme.colors.white,
    borderRadius: 30,
    alignItems: "center",
    padding: 25,
    gap: 20,
  },
  containerTextos: {
    width: "100%",
    gap: 5,
  },
  textoTitulo: {
    fontSize: 22,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayMedium,
    width: "100%",
    textAlign: "left",
    lineHeight: 22,
  },
  textoSubtitulo: {
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
    textAlign: "left",
  },
});
