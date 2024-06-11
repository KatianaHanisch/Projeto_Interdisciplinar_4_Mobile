import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 99,
  },
  containerFiltro: {
    width: "90%",
    height: "50%",
    backgroundColor: theme.colors.white,
    borderRadius: 30,
    alignItems: "center",
    paddingVertical: 30,
    gap: 20,
  },
  containerFecharModal: {
    width: "90%",
    alignItems: "flex-end",
  },
  containerInterno: {
    width: "90%",
    flexDirection: "column",
  },
  containerSelectRegiao: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  textoSelectRegiao: {
    fontFamily: theme.fontFamily.raleway.medium,
    fontSize: 14,
    color: theme.colors.grayMedium,
  },
  dropdownItemTxtStyle: {
    color: theme.colors.grayMedium,
  },
});
