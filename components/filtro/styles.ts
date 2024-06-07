import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
  containerFiltros: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  itemFiltro: {
    width: 60,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },
  itemFiltroSelecionado: {
    backgroundColor: theme.colors.orangePrimaryDark,
  },
});
