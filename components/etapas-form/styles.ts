import { StyleSheet } from "react-native";
import { theme } from "@/constants";

export const styles = StyleSheet.create({
  containerEtapas: {
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    gap: 60,
  },
  primeiraLinha: {
    width: 100,
    height: 2,
    backgroundColor: "#d2d2d2",
    position: "absolute",
    zIndex: -1,
    left: 80,
  },
  segundaLinha: {
    width: 80,
    height: 2,
    right: 80,
    backgroundColor: "#d2d2d2",
    position: "absolute",
    zIndex: -1,
  },
  linhaAtiva: {
    backgroundColor: theme.colors.orangePrimaryDark,
  },
  etapa: {
    width: 15,
    height: 15,
    backgroundColor: "#d2d2d2",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  etapaAtiva: {
    backgroundColor: theme.colors.orangePrimaryDark,
  },
});
